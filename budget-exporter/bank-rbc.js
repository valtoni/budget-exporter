// RBC (Royal Bank of Canada) - Seletores DOM e conversão CSV

// Seletores para extrair transações do DOM
export const selectors = {
    table: 'table.transaction-table, #transactionTable, table[summary*="transaction"]',
    row: 'tbody tr',
    cells: {
        date: 0,
        payee: 2,
        amount: 3
    }
};

// Função de conversão para CSV
export function toCsv(rows = []) {
    const header = ["date", "payee", "amount"];
    const sanitize = (v) => String(v ?? "").replace(/\r|\n/g, " ").trim();

    const body = rows.map((r) => {
        const date = sanitize(r.date);
        const payee = sanitize(r.payee);
        const amount = sanitize(r.amount).replace(/,/g, "");
        return [date, payee, amount].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",");
    });

    return [header.join(","), ...body].join("\n");
}

export default { selectors, toCsv };
