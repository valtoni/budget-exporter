// MV3 service worker: opens the sidebar, stores the active review, and exports CSV files.
const storageArea = typeof browser !== 'undefined' ? browser.storage.local : chrome.storage.local;
const runtimeAPI = typeof browser !== 'undefined' ? browser.runtime : chrome.runtime;
const actionAPI = typeof browser !== 'undefined' ? browser.action : chrome.action;
const downloadsAPI = typeof browser !== 'undefined' ? browser.downloads : chrome.downloads;
const tabsAPI = typeof browser !== 'undefined' ? browser.tabs : chrome.tabs;
const sidebarAPI = typeof browser !== 'undefined' ? browser.sidebarAction : chrome.sidebarAction;
const commandsAPI = typeof browser !== 'undefined' ? browser.commands : chrome.commands;
const scriptingAPI = typeof browser !== 'undefined' ? browser.scripting : chrome.scripting;

const ACTIVE_REVIEW_KEY = 'active_review';
const ACCOUNTS = {
    WILDCARD: { id: 0, accountId: 'all', name: 'all', displayName: 'Todas as contas' },
    DESJARDINS_CREDITCARD: { id: 1, accountId: 'desjardins-creditcard', name: 'Desjardins - Credit Card', displayName: 'Desjardins - Credit Card' },
    DESJARDINS_BANKACCOUNT: { id: 2, accountId: 'desjardins-bankaccount', name: 'Desjardins - Bank Account', displayName: 'Desjardins - Bank Account' },
    KOHO_BANKACCOUNT: { id: 3, accountId: 'koho-bankaccount', name: 'Koho - Prepaid Card', displayName: 'Koho - Prepaid Card' }
};

function setActiveReview(review) {
    return storageArea.set({ [ACTIVE_REVIEW_KEY]: review }).then(() => {
        if (runtimeAPI?.sendMessage) {
            return runtimeAPI.sendMessage({ type: 'ACTIVE_REVIEW_UPDATED', review }).catch(() => undefined);
        }
        return undefined;
    });
}

async function getActiveReview() {
    const items = await storageArea.get(ACTIVE_REVIEW_KEY);
    return items[ACTIVE_REVIEW_KEY] || null;
}

async function getCurrentTab() {
    const tabs = await tabsAPI.query({ active: true, currentWindow: true });
    return tabs[0] || null;
}

async function refreshActiveTabReview() {
    const tab = await getCurrentTab();
    if (!tab?.id) {
        return { ok: false, error: 'Nenhuma aba ativa encontrada.' };
    }

    try {
        return await tabsAPI.sendMessage(tab.id, { type: 'COLLECT_TRANSACTIONS' });
    } catch (error) {
        try {
            await ensureContentScriptsInjected(tab.id);
            return await tabsAPI.sendMessage(tab.id, { type: 'COLLECT_TRANSACTIONS' });
        } catch (retryError) {
            const account = detectAccountFromUrl(tab.url || '');
            const review = {
                generatedAt: new Date().toISOString(),
                error: 'Nao foi possivel acessar a pagina ativa. Recarregue a pagina do banco e tente novamente.',
                account: account ? {
                    id: account.id,
                    accountId: account.accountId,
                    name: account.name,
                    displayName: account.displayName
                } : null,
                rowsCount: 0,
                transactions: [],
                suggestions: [],
                summary: { total: 0, selected: 0, matched: 0, suggested: 0, unmatched: 0 },
                pageUrl: tab.url || '',
                pageTitle: tab.title || ''
            };
            await setActiveReview(review);
            return { ok: false, error: retryError.message || error.message, review };
        }
    }
}

function detectAccountFromUrl(url) {
    try {
        const parsed = new URL(url);
        const pathname = parsed.pathname;
        if (!parsed.hostname.includes('desjardins.com')) {
            if (parsed.hostname.includes('koho.ca')) {
                return ACCOUNTS.KOHO_BANKACCOUNT;
            }
            return null;
        }

        if (pathname.includes('/sommaire-perso/sommaire/sommaire-spa/CC/')) {
            return ACCOUNTS.DESJARDINS_CREDITCARD;
        }
        if (pathname.includes('/comptes/courant/')) {
            return ACCOUNTS.DESJARDINS_BANKACCOUNT;
        }
        return ACCOUNTS.DESJARDINS_BANKACCOUNT;
    } catch (_) {
        return null;
    }
}

async function ensureContentScriptsInjected(tabId) {
    if (!scriptingAPI?.executeScript) {
        throw new Error('API de injecao de scripts indisponivel.');
    }

    await scriptingAPI.executeScript({
        target: { tabId },
        files: ['bank-utils.js', 'storage-manager.js', 'content.js']
    });
}

async function openSidebarAndRefresh() {
    if (sidebarAPI?.open) {
        await sidebarAPI.open();
    }
    return refreshActiveTabReview();
}

async function exportCsv(csv, filename) {
    const safeFilename = filename || `budget-export-${new Date().toISOString().slice(0, 10)}.csv`;
    return downloadsAPI.download({
        url: `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`,
        filename: safeFilename,
        saveAs: true,
        conflictAction: 'uniquify'
    });
}

runtimeAPI.onMessage.addListener((message, _sender, sendResponse) => {
    (async () => {
        switch (message.type) {
            case 'STORE_ACTIVE_REVIEW': {
                await setActiveReview(message.review || null);
                sendResponse({ ok: true });
                return;
            }
            case 'GET_ACTIVE_REVIEW': {
                const review = await getActiveReview();
                sendResponse({ ok: true, review });
                return;
            }
            case 'REFRESH_ACTIVE_TAB_REVIEW': {
                const result = await refreshActiveTabReview();
                sendResponse(result);
                return;
            }
            case 'OPEN_REVIEW_SIDEBAR': {
                const result = await openSidebarAndRefresh();
                sendResponse(result);
                return;
            }
            case 'EXPORT_REVIEW_CSV': {
                const downloadId = await exportCsv(message.csv || '', message.filename || 'budget-export.csv');
                sendResponse({ ok: true, downloadId });
                return;
            }
            case 'OPEN_MANAGE_PAGE': {
                await runtimeAPI.openOptionsPage();
                sendResponse({ ok: true });
                return;
            }
            default:
                sendResponse({ ok: false, error: `Mensagem nao suportada: ${message.type}` });
        }
    })().catch((error) => {
        console.error('Erro no service worker:', error);
        sendResponse({ ok: false, error: error.message });
    });

    return true;
});

actionAPI.onClicked.addListener(() => {
    openSidebarAndRefresh().catch((error) => {
        console.error('Falha ao abrir sidebar:', error);
    });
});

if (commandsAPI?.onCommand) {
    commandsAPI.onCommand.addListener((command) => {
        if (command === 'open-review-sidebar') {
            openSidebarAndRefresh().catch((error) => {
                console.error('Falha ao abrir sidebar via atalho:', error);
            });
        }
    });
}

if (runtimeAPI.onInstalled) {
    runtimeAPI.onInstalled.addListener(() => {
        setActiveReview(null).catch(() => undefined);
    });
}
