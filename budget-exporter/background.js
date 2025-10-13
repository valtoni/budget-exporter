// Background script - processa dados e gera CSV
// Usa BankUtils (carregado via bank-utils.js no manifest)

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "EXPORT_ROWS" && Array.isArray(msg.rows)) {
        (async () => {
            const siteUrl = sender.url || sender.tab?.url || '';

            try {
                // Detecta o banco pela URL
                const bankName = window.BankUtils.detectBank(siteUrl);

                if (!bankName) {
                    sendResponse({ ok: false, error: 'Banco não identificado pela URL.' });
                    return;
                }

                // Carrega o módulo do banco com a função toCsv
                const bankModule = await window.BankUtils.loadBankModule(bankName);

                if (!bankModule.toCsv || typeof bankModule.toCsv !== 'function') {
                    sendResponse({ ok: false, error: `Função toCsv não encontrada para o banco: ${bankName}` });
                    return;
                }

                // Converte para CSV usando a função do banco
                const csv = bankModule.toCsv(msg.rows);

                // Cria o blob e inicia o download
                const blob = new Blob([csv], { type: "text/csv" });
                const url = URL.createObjectURL(blob);

                const downloadId = await chrome.downloads.download({
                    url,
                    filename: `${bankName.toUpperCase()}-EXPORT-${new Date().toISOString().slice(0,10)}.csv`,
                    saveAs: true
                });

                URL.revokeObjectURL(url);
                console.log('Download iniciado com ID:', downloadId);
                sendResponse({ ok: true, downloadId });

            } catch (error) {
                console.error('Erro ao processar exportação:', error);
                sendResponse({ ok: false, error: error.message });
            }
        })();

        return true; // mantém canal aberto para resposta assíncrona
    }
});

// Listener para quando usuário clicar no ícone
chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, { type: 'EXTRACT_AND_EXPORT' });
});
