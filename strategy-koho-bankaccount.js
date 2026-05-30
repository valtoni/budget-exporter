// Koho — Extração via API JSON
//
// Lê transações a partir das respostas da API do Koho capturadas por
// transaction-capture.js. O endpoint relevante é:
//
//   GET https://api.koho.ca/1.0/user/past_transactions
//
// Resposta: { transactions: [...], last_timestamp, results_count, ... }
//
// Cada transação tem (entre outros):
//   - identifier       — chave para deduplicação
//   - when             — ISO 8601 da data real da transação (preferido)
//   - postTimestamp    — ISO 8601 da liquidação; "0001-01-01..." para pending
//   - amount           — string tipo "-$0.12" / "$215.00"
//   - details          — descrição amigável (merchant, "E-Transfer From:", "KOHO Essential Plan", etc.)

export const apiMatchers = [
    { method: 'GET', urlPattern: /\/user\/past_transactions(\?|$|\/)/i }
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

        const list = Array.isArray(parsed?.transactions) ? parsed.transactions : [];
        for (const tx of list) {
            if (!tx || typeof tx !== 'object') continue;

            const id = tx.identifier || '';
            if (id) {
                if (seen.has(id)) continue;
                seen.add(id);
            }

            const isoDate = isoDateFrom(tx.when) || isoDateFrom(tx.postTimestamp);
            if (!isoDate) continue;

            const payee = String(tx.details || tx.merchant?.name || tx.description || '').trim();
            if (!payee) continue;

            const rawAmount = String(tx.amount || '').trim();
            if (!rawAmount) continue;

            // parseKohoAmount distingue inflow/outflow pela presença de '+'.
            // A API omite o '+' nos valores positivos, então prefixamos manualmente.
            const normalizedAmount = /^-/.test(rawAmount) ? rawAmount : `+${rawAmount}`;

            rows.push({
                date: isoDate,
                payee,
                amount: normalizedAmount
            });
        }
    }

    return rows;
}

function isoDateFrom(value) {
    const s = String(value || '');
    if (!s || s.startsWith('0001')) return '';
    const match = s.match(/^(\d{4}-\d{2}-\d{2})/);
    return match ? match[1] : '';
}

export async function toCsv(rows = []) {
    return window.BankUtils.toCsv(
        rows,
        'koho-bankaccount',
        window.BankUtils.enDateToISO,
        window.BankUtils.parseKohoAmount
    );
}

export default { apiMatchers, extractFromCaptures, toCsv };
