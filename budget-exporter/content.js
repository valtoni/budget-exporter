// Content script - extrai transações do DOM usando seletores específicos do banco
// Usa BankUtils (carregado via bank-utils.js no manifest)

// Extrai transações usando os seletores fornecidos
function extractRows(selectors) {
    const table = document.querySelector(selectors.table);

    if (!table) {
        return { ok: false, error: 'Tabela de transações não encontrada na página' };
    }

    const rows = [...table.querySelectorAll(selectors.row)]
        .map(tr => {
            const cells = tr.querySelectorAll('td');
            if (cells.length === 0) return null;

            return {
                date: cells[selectors.cells.date]?.textContent.trim() || '',
                payee: cells[selectors.cells.payee]?.textContent.trim() || '',
                amount: cells[selectors.cells.amount]?.textContent.trim() || ''
            };
        })
        .filter(row => row && row.date);

    if (rows.length === 0) {
        return { ok: false, error: 'Nenhuma transação encontrada na tabela' };
    }

    return { ok: true, rows };
}

// Listener para quando usuário clicar no ícone
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'EXTRACT_AND_EXPORT') {
        (async () => {
            try {
                // Detecta o banco pela URL atual
                const bankName = window.BankUtils.detectBank(window.location.href);

                if (!bankName) {
                    alert('Banco não suportado ou não detectado.');
                    return;
                }

                // Carrega o módulo do banco com os seletores
                const bankModule = await window.BankUtils.loadBankModule(bankName);

                if (!bankModule.selectors) {
                    alert(`Seletores não configurados para o banco: ${bankName}`);
                    return;
                }

                // Extrai os dados usando os seletores do banco
                const result = extractRows(bankModule.selectors);

                if (!result.ok) {
                    alert(`Erro ao extrair transações: ${result.error}`);
                    return;
                }

                // Envia os dados brutos para o background processar
                chrome.runtime.sendMessage({ type: 'EXPORT_ROWS', rows: result.rows });

            } catch (error) {
                alert(`Erro: ${error.message}`);
            }
        })();
    }
});

console.log('Budget Exporter content script loaded');
