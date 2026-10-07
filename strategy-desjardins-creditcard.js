// Desjardins — Carte de credit — Extracao via API JSON
//
// Le transacoes a partir das respostas da API do AccesD capturadas por
// transaction-capture.js. Endpoint:
//
//   GET https://accesdc.mouv.desjardins.com/api/distribution-libreservice/
//       dossier-operation/operations/v<n>/transactions/<token-jwe>
//
// Resposta:
//   {
//     sectionCompte:    { codeRelation, nomProgrammeRecompense },
//     sectionAutorisee: { transactionListe: [...] },   // autorizacoes (pendentes)
//     sectionFacturee:  { transactionListe: [...] },   // faturadas (postadas)
//     listeSwitch, synonymes
//   }
//
// Cada transacao (campos relevantes):
//   - identifiant            (token JWE, usado como chave de dedup)
//   - numeroSequence         (fallback de id)
//   - dateInscription        "YYYY-MM-DD"
//   - dateTransaction        "YYYY-MM-DDTHH:mm:ss±tz" (preferido)
//   - montantTransaction     string. O sinal e SEMPRE confiavel e indica direcao,
//                            com a MESMA convencao nas duas secoes:
//                              * positivo = debito ao cartao  (outflow / compra / frais)
//                              * negativo = credito ao cartao (inflow  / reembolso / pagamento)
//                            A UI do Desjardins reforca: valores com prefixo "+" sao
//                            creditos (refunds), valores sem prefixo sao debitos (compras).
//                            Internamente a API inverte o sinal — refund chega como negativo.
//   - typeTransaction        "Achat" | "AutreAutorisation" | "Paiement" | "Operation"
//                            (label informativo apenas; a direcao vem do sinal)
//   - descriptionSimplifiee  (payee amigavel, preferido)
//   - descriptionCourte      (fallback)

export const apiMatchers = [
    {
        method: 'GET',
        // Sem a barra final de proposito: a vista "Par mois" do AccesD pode usar
        // um sufixo diferente (ex.: .../transactions-par-mois/...). Qualquer
        // resposta sem transacoes e ignorada pelo extrator, entao o matcher
        // mais largo nao produz falsos positivos.
        urlPattern: /\/api\/distribution-libreservice\/dossier-operation\/operations\/v\d+\/transactions/i
    }
];

// Campos minimos para tratar um objeto como transacao da API do Desjardins.
function looksLikeTransaction(tx) {
    return !!tx
        && typeof tx === 'object'
        && !Array.isArray(tx)
        && 'montantTransaction' in tx
        && ('dateTransaction' in tx || 'dateInscription' in tx);
}

// Percorre a resposta inteira em busca de listas de transacoes, em qualquer
// profundidade. Cobre tanto o formato classico (sectionAutorisee /
// sectionFacturee no topo) quanto agrupamentos novos (ex.: por mes faturado),
// sem depender do nome da chave que envolve a lista.
function collectTransactionLists(node, out = [], depth = 0) {
    if (depth > 8 || !node || typeof node !== 'object') return out;

    if (Array.isArray(node)) {
        if (node.some(looksLikeTransaction)) {
            out.push(node);
            return out;
        }
        for (const item of node) collectTransactionLists(item, out, depth + 1);
        return out;
    }

    for (const value of Object.values(node)) {
        collectTransactionLists(value, out, depth + 1);
    }
    return out;
}

export function extractFromCaptures(captures) {
    const seen = new Set();
    const rows = [];

    for (const capture of captures) {
        let parsed;
        try {
            parsed = JSON.parse(capture.body);
        } catch (e) {
            continue;
        }

        for (const items of collectTransactionLists(parsed)) {
            for (const tx of items) {
                if (!looksLikeTransaction(tx)) continue;

                const id = tx.identifiant || tx.numeroSequence || '';
                if (id) {
                    if (seen.has(id)) continue;
                    seen.add(id);
                }

                const date = isoDateFrom(tx.dateTransaction) || isoDateFrom(tx.dateInscription);
                if (!date) continue;

                const payee = String(tx.descriptionSimplifiee || tx.descriptionCourte || '').trim();
                if (!payee) continue;

                const raw = String(tx.montantTransaction ?? '').trim();
                if (!raw) continue;

                const num = parseFloat(raw.replace(',', '.'));
                if (!Number.isFinite(num)) continue;

                // Unified sign convention across BOTH sections (autorisee + facturee):
                //   positive montantTransaction = debit to the card  (outflow / purchase / fee)
                //   negative montantTransaction = credit to the card (inflow  / refund / payment)
                // typeTransaction ("Achat"/"Paiement"/"Operation") is just a label — the sign
                // is the source of truth. Cross-checked against the live Desjardins UI:
                // displayed "+59,46 $" refund maps to montantTransaction "-59.46" in the API.
                const isInflow = num < 0;

                // parseDesjardinsAmount expects French-Canadian formatting (comma as
                // decimal separator). The API ships dot-decimal, so convert
                // "295.44" -> "295,44" before prefixing the sign.
                const magnitude = Math.abs(num).toFixed(2).replace('.', ',');
                const amount = (isInflow ? '+' : '-') + magnitude;

                rows.push({ date, payee, amount });
            }
        }
    }

    return rows;
}


function isoDateFrom(value) {
    const m = String(value || '').match(/^(\d{4}-\d{2}-\d{2})/);
    return m ? m[1] : '';
}

export async function toCsv(rows = []) {
    return window.BankUtils.toCsv(
        rows,
        'desjardins-creditcard',
        window.BankUtils.frDateToISO,
        window.BankUtils.parseDesjardinsAmount
    );
}

export default { apiMatchers, extractFromCaptures, toCsv };
