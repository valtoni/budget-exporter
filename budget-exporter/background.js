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

                console.log('CSV gerado com sucesso:', csv.substring(0, 100) + '...');

                // Cria o blob e inicia o download
                const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
                const url = URL.createObjectURL(blob);

                const filename = `${bankName.toUpperCase()}-EXPORT-${new Date().toISOString().slice(0,10)}.csv`;

                // Usa a API correta dependendo do browser
                const downloadsAPI = (typeof browser !== 'undefined' ? browser.downloads : chrome.downloads);

                let downloadId;
                try {
                    downloadId = await downloadsAPI.download({
                        url: url,
                        filename: filename,
                        saveAs: true,
                        conflictAction: 'uniquify'
                    });

                    console.log('Download iniciado com ID:', downloadId);

                    // Aguarda um pouco antes de revogar a URL (Firefox precisa disso)
                    setTimeout(() => {
                        URL.revokeObjectURL(url);
                    }, 1000);

                    sendResponse({ ok: true, downloadId });
                } catch (downloadError) {
                    URL.revokeObjectURL(url);
                    console.error('Erro ao iniciar download:', downloadError);
                    sendResponse({ ok: false, error: `Erro no download: ${downloadError.message}` });
                }

            } catch (error) {
                console.error('Erro ao processar exportação:', error);
                sendResponse({ ok: false, error: error.message });
            }
        })();

        return true; // mantém canal aberto para resposta assíncrona
    }
});

// Listener para quando usuário clicar no ícone principal (browser_action)
// Abre a página do GitHub
const browserActionAPI = (typeof browser !== 'undefined' ? browser.browserAction : chrome.browserAction);

browserActionAPI.onClicked.addListener(() => {
    chrome.tabs.create({ url: 'https://github.com/valtoni' });
});

// Listener para quando usuário clicar no ícone na barra de endereços (page_action)
// Exporta as transações
const pageActionAPI = (typeof browser !== 'undefined' ? browser.pageAction : chrome.pageAction);

pageActionAPI.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, { type: 'EXTRACT_AND_EXPORT' });
});
