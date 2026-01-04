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
        // Extrai payee (descrição) - div com classe type-paragraph-medium
        const payeeElement = row.querySelector('.type-paragraph-medium');
        const payee = payeeElement ? payeeElement.innerText.trim() : '';

        // Extrai data e categoria - div com classe type-subtitle
        const dateElement = row.querySelector('.type-subtitle');
        const dateText = dateElement ? dateElement.innerText.trim() : '';

        // Extrai valor - div com classe type-number-small
        const amountElement = row.querySelector('.type-number-small');
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
