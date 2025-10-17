// strategy-desjardins-creditcard.js
// Desjardins (Cartão de Crédito) - Extrato de cartão de crédito

// Seletores para extrair transações do DOM (mesma família de componentes DSD)
export const selectors = {
    table: 'dsd-table.dsd-table.hydrated, dsd-table-v3-1-0.dsd-mb-md.hydrated.dsd-table-host-v3-1-0.dsd-component',
    row: 'tbody tr',
    cells: {
        date: 0,      // coluna com data (dentro de .dsd-sr-only)
        payee: 1,     // coluna com descrição
        amount: -1    // última célula com classe dsd-cell-num (valor negativo indica contagem reversa)
    }
};

// Mesma lógica robusta da strategy de conta para capturar a descrição
function extractDescription(td) {
    if (!td) return '';

    // 1) Formato moderno
    const spanDesc = td.querySelector('.descriptionTransaction');
    if (spanDesc) {
        return spanDesc.innerText.trim();
    }

    // 2) Fallback: td com class "description" (layout antigo)
    if (td.classList.contains('description')) {
        const divIconCol = td.querySelector('.iconCol');
        if (!divIconCol) {
            return td.innerText.trim();
        }
        const p = divIconCol.querySelector('p');
        const spans = p?.querySelectorAll('span');
        if (spans?.length >= 2) {
            return spans[1].innerText.trim();
        }
        return p?.innerText.trim() || '';
    }

    // 3) Fallback genérico: primeiro <span> não vazio
    const fallbackSpan = td.querySelector('span');
    if (fallbackSpan && fallbackSpan.innerText.trim()) {
        return fallbackSpan.innerText.trim();
    }

    return td.innerText.trim();
}

// Converte para CSV no formato YNAB
// Usa funções compartilhadas de BankUtils
export async function toCsv(rows = []) {
    return window.BankUtils.toCsv(
        rows,
        'desjardins-creditcard',
        window.BankUtils.frDateToISO,
        window.BankUtils.parseDesjardinsAmount
    );
}

// Extrai as transações publicadas do DOM
export function extractTransactions() {
    const tables = Array.from(document.querySelectorAll('dsd-table.dsd-table.hydrated'));
    const transactions = [];

    tables.forEach(dsdTable => {
        const tbody = dsdTable.querySelector('tbody');
        if (!tbody) return;

        const rows = Array.from(tbody.querySelectorAll('tr'));

        rows.forEach(row => {
            const tds = row.querySelectorAll('td');
            if (tds.length < 3) return;

            // Extrai data
            const dateText = tds[0].querySelector('.dsd-sr-only')?.innerText.trim() || tds[0].innerText.trim();

            // Extrai descrição usando função especializada
            const description = extractDescription(tds[1]);

            // Extrai valor da última célula com classe dsd-cell-num
            // Em cartão de crédito, tipicamente é a última coluna numérica
            const cellNumTds = [...tds].filter(td => td.classList.contains('dsd-cell-num'));
            const lastTd = cellNumTds.length >= 1 ? cellNumTds[cellNumTds.length - 1] : null;
            const amountRaw = lastTd?.innerText.trim() || '';

            if (dateText && description) {
                transactions.push({
                    date: dateText,
                    payee: description,
                    amount: amountRaw
                });
            }
        });
    });

    return transactions;
}

export default { selectors, toCsv, extractTransactions };
