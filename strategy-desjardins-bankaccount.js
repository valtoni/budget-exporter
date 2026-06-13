// Desjardins — Compte courant — Extracao via API JSON
//
// Le transacoes a partir das respostas da API do AccesD capturadas por
// transaction-capture.js. Endpoint:
//
//   GET https://accesdc.mouv.desjardins.com/api/distribution-libreservice/
//       dossier-operation/operations/v<n>/transactions-caisse?cleChiffree=<token>
//
// Resposta:
//   {
//     sectionCaisse: {
//       devise: "CAD",
//       dateDebutPeriode, dateFinPeriode,
//       transactionListe: [...]
//     }
//   }
//
// Cada transacao (campos relevantes):
//   - identifiantTransaction      (id estavel, chave de dedup)
//   - dateTransaction             "YYYY-MM-DDTHH:mm:ss±tz" (timestamp do processamento)
//   - dateEffectiveTransaction    "YYYY-MM-DD" (data efetiva — bate com o extrato)
//   - montantTransaction          "38.97" (sempre positivo, sem sinal)
//   - typeDebitCredit             "D" = debit (outflow) | "C" = credit (inflow)
//   - descriptionSimplifiee       "Achat /BOUSTAN PLACE LAURIER" (preferido)
//   - descriptionOperation        (fallback)
//   - codeTransaction             ACH, CRM, VMW, DI, DMD, RIS, FIX, PWW, etc.

export const apiMatchers = [
    {
        method: 'GET',
        urlPattern: /\/api\/distribution-libreservice\/dossier-operation\/operations\/v\d+\/transactions-caisse(\?|$)/i
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

        const items = parsed?.sectionCaisse?.transactionListe;
        if (!Array.isArray(items)) continue;

        for (const tx of items) {
            if (!tx || typeof tx !== 'object') continue;

            const id = tx.identifiantTransaction || tx.identifiantTransactionExterne || '';
            if (id) {
                if (seen.has(id)) continue;
                seen.add(id);
            }

            // Effective date matches what the user sees on their statement
            // (the timestamp dateTransaction can be a day off due to weekend posting).
            const date = isoDateFrom(tx.dateEffectiveTransaction) || isoDateFrom(tx.dateTransaction);
            if (!date) continue;

            const payee = String(tx.descriptionSimplifiee || tx.descriptionOperation || '').trim();
            if (!payee) continue;

            const raw = String(tx.montantTransaction || '').trim();
            if (!raw) continue;

            const num = parseFloat(raw.replace(',', '.'));
            if (!Number.isFinite(num)) continue;

            const isInflow = String(tx.typeDebitCredit || '').toUpperCase() === 'C';

            // parseDesjardinsAmount expects French-Canadian formatting (comma as
            // decimal separator). The API ships dot-decimal, so convert
            // "38.97" -> "38,97" before prefixing the sign.
            const magnitude = Math.abs(num).toFixed(2).replace('.', ',');
            const amount = (isInflow ? '+' : '-') + magnitude;

            rows.push({ date, payee, amount });
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
        'desjardins-bankaccount',
        window.BankUtils.frDateToISO,
        window.BankUtils.parseDesjardinsAmount
    );
}

export default { apiMatchers, extractFromCaptures, toCsv };
