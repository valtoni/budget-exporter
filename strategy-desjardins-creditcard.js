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
//   - montantTransaction     string. O sinal e SEMPRE confiavel e indica direcao:
//                              * sectionAutorisee: negativo = outflow, positivo = inflow
//                              * sectionFacturee:  positivo = outflow (debito ao cartao),
//                                                  negativo = inflow (pagamento ou retorno)
//                            Convencao oposta entre as secoes: a autorisee mostra o
//                            cash flow do usuario, a facturee mostra o balanco do cartao.
//   - typeTransaction        "Achat" | "AutreAutorisation" | "Paiement" | "Operation"
//                            (label informativo apenas; a direcao vem do sinal)
//   - descriptionSimplifiee  (payee amigavel, preferido)
//   - descriptionCourte      (fallback)

export const apiMatchers = [
    {
        method: 'GET',
        urlPattern: /\/api\/distribution-libreservice\/dossier-operation\/operations\/v\d+\/transactions\//i
    }
];

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

        const sections = [
            { key: 'autorisee', items: parsed?.sectionAutorisee?.transactionListe },
            { key: 'facturee',  items: parsed?.sectionFacturee?.transactionListe }
        ];

        for (const { key, items } of sections) {
            if (!Array.isArray(items)) continue;

            for (const tx of items) {
                if (!tx || typeof tx !== 'object') continue;

                const id = tx.identifiant || tx.numeroSequence || '';
                if (id) {
                    if (seen.has(id)) continue;
                    seen.add(id);
                }

                const date = isoDateFrom(tx.dateTransaction) || isoDateFrom(tx.dateInscription);
                if (!date) continue;

                const payee = String(tx.descriptionSimplifiee || tx.descriptionCourte || '').trim();
                if (!payee) continue;

                const raw = String(tx.montantTransaction || '').trim();
                if (!raw) continue;

                const num = parseFloat(raw.replace(',', '.'));
                if (!Number.isFinite(num)) continue;

                // Sign convention (verified across both sections):
                //   - autorisee:  negative = outflow (purchase pending), positive = inflow (credit pending)
                //   - facturee:   positive = outflow (charge billed), negative = inflow (payment received / refund)
                // typeTransaction ("Achat"/"Paiement"/"Operation") is just a label — the sign of
                // montantTransaction is the source of truth (a returned Achat comes in as negative).
                const isInflow = key === 'autorisee' ? num > 0 : num < 0;

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
