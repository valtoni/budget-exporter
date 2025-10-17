// Desjardins - Seletores DOM e conversão CSV

// Seletores para extrair transações do DOM
// Desjardins usa <dsd-table> como componente web customizado
export const selectors = {
    table: 'dsd-table.dsd-table.hydrated',
    row: 'tbody tr',
    cells: {
        date: 0,      // coluna com data (dentro de .dsd-sr-only)
        payee: 1,     // coluna com descrição
        amount: -2    // penúltima célula com classe dsd-cell-num (valor negativo indica contagem reversa)
    }
};

// Extrai descrição de diferentes formatos do DOM do Desjardins
function extractDescription(td) {
    if (!td) return '';

    // 1. Descrição moderna (usada em faturas recentes)
    const spanDesc = td.querySelector('.descriptionTransaction');
    if (spanDesc) {
        return spanDesc.innerText.trim();
    }

    // 2. Fallback: td simples com class "description"
    if (td.classList.contains('description')) {
        const divIconCol = td.querySelector('.iconCol');
        if (!divIconCol) {
            return td.innerText.trim();
        }

        // Tenta pegar todos os spans dentro do <p>
        const p = divIconCol.querySelector('p');
        const spans = p?.querySelectorAll('span');
        if (spans?.length >= 2) {
            return spans[1].innerText.trim(); // segundo span
        }
        return p?.innerText.trim() || '';
    }

    // 3. Último fallback: pegar o primeiro <span> não vazio dentro do td
    const fallbackSpan = td.querySelector('span');
    if (fallbackSpan && fallbackSpan.innerText.trim()) {
        return fallbackSpan.innerText.trim();
    }

    return td.innerText.trim();
}


// Função de conversão para CSV no formato YNAB
// Aplica regras de matching automaticamente
export async function toCsv(rows = []) {
    return window.BankUtils.toCsv(
        rows,
        'desjardins-bankaccount',
        window.BankUtils.frDateToISO,
        window.BankUtils.parseDesjardinsAmount
    );
}

// Função customizada para extrair transações do DOM do Desjardins
export function extractTransactions() {
    const tables = Array.from(document.querySelectorAll('dsd-table-v3-1-0.dsd-mb-md.hydrated.dsd-table-host-v3-1-0.dsd-component'));
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

            // Extrai valor da penúltima célula com classe dsd-cell-num
            const cellNumTds = [...tds].filter(td => td.classList.contains('dsd-cell-num'));
            const penultimateTd = cellNumTds.length >= 2 ? cellNumTds[cellNumTds.length - 2] : null;
            const amountRaw = penultimateTd?.innerText.trim() || '';

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
