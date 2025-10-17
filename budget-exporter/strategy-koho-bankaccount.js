// Koho - Seletores DOM e conversão CSV

// Seletores para extrair transações do DOM
// Koho usa divs com classes Tailwind específicas
export const selectors = {
    container: 'div.flex.flex-col.p-0.md\\:px-24.md\\:pb-24',
    row: 'div.flex.items-center.justify-between.border-b.border-grey-200.py-8'
};

// Função de conversão para CSV no formato YNAB
// Usa funções compartilhadas de BankUtils
export async function toCsv(rows = []) {
    return window.BankUtils.toCsv(
        rows,
        'koho-bankaccount',
        window.BankUtils.enDateToISO,
        window.BankUtils.parseKohoAmount
    );
}

// Função customizada para extrair transações do DOM do Koho
export function extractTransactions() {
    const transactions = [];

    // Seleciona todas as linhas de transação
    const rows = document.querySelectorAll('div.flex.items-center.justify-between.border-b.border-grey-200.py-8');

    rows.forEach(row => {
        // Extrai payee (descrição) - primeiro <p> dentro do segundo div
        const payeeElement = row.querySelector('div.ml-16.flex.flex-col p.font-basel-grotesk.text-base');
        const payee = payeeElement ? payeeElement.innerText.trim() : '';

        // Extrai data e categoria - segundo <p>
        const dateElement = row.querySelector('div.ml-16.flex.flex-col p.m-0.p-0.font-basel-grotesk.text-sm');
        const dateText = dateElement ? dateElement.innerText.trim() : '';

        // Extrai valor - último <span> da linha
        const amountElement = row.querySelector('span.font-basel-grotesk.text-base\\/\\[18px\\].font-semibold');
        const amount = amountElement ? amountElement.innerText.trim() : '';

        if (payee && dateText && amount) {
            transactions.push({
                date: dateText,
                payee: payee,
                amount: amount
            });
        }
    });

    return transactions;
}

export default { selectors, toCsv, extractTransactions };
