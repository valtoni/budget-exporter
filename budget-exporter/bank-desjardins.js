// Desjardins - Seletores DOM e conversão CSV

// Seletores para extrair transações do DOM
export const selectors = {
    table: 'table.transactions, table[id*="transaction"], table[class*="transaction"]',
    row: 'tbody tr',
    cells: {
        date: 0,
        payee: 1,
        amount: 2
    }
};

// Função de conversão para CSV
export function toCsv(rows = []) {
    const header = ["date", "payee", "amount"];

    const sanitize = (v) => String(v ?? "").replace(/[\r\n]/g, " ").trim();

    const body = rows.map((r) => {
        const date = sanitize(r.date);
        const payee = sanitize(r.payee);
        // Desjardins costuma usar vírgula para decimais no FR; normalize para ponto
        const amount = sanitize(r.amount).replace(/\./g, "").replace(",", ".");
        return [date, payee, amount].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",");
    });

    return [header.join(","), ...body].join("\n");
}

export default { selectors, toCsv };
