// MV3 service worker: opens the sidebar, stores the active review, and exports CSV files.
// In Chrome/Edge the service worker loads ynab-client.js via importScripts.
// In Firefox the background runs in document env and loads ynab-client.js via manifest "scripts".
if (typeof self !== 'undefined' && typeof importScripts === 'function') {
    if (!self.YNAB_CONFIG) importScripts('ynab-config.js');
    if (!self.YnabClient) importScripts('ynab-client.js');
}

const storageArea = typeof browser !== 'undefined' ? browser.storage.local : chrome.storage.local;
const runtimeAPI = typeof browser !== 'undefined' ? browser.runtime : chrome.runtime;
const actionAPI = typeof browser !== 'undefined' ? browser.action : chrome.action;
const downloadsAPI = typeof browser !== 'undefined' ? browser.downloads : chrome.downloads;
const tabsAPI = typeof browser !== 'undefined' ? browser.tabs : chrome.tabs;
const sidebarActionAPI = typeof browser !== 'undefined' ? browser.sidebarAction : undefined;
const sidePanelAPI = typeof chrome !== 'undefined' ? chrome.sidePanel : undefined;
const pageActionAPI = typeof browser !== 'undefined' ? browser.pageAction : undefined;
const commandsAPI = typeof browser !== 'undefined' ? browser.commands : chrome.commands;
const scriptingAPI = typeof browser !== 'undefined' ? browser.scripting : chrome.scripting;
const identityAPI = typeof browser !== 'undefined' ? browser.identity : chrome.identity;

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

// Must be called synchronously inside a user-gesture handler (Firefox sidebarAction.open()
// and Chrome sidePanel.open() both enforce this). Returns the underlying promise so the
// caller can attach error logging without awaiting in the gesture path.
function openSidebar(tabId) {
    if (sidebarActionAPI?.open) {
        return sidebarActionAPI.open();
    }
    if (sidePanelAPI?.open && tabId != null) {
        return sidePanelAPI.open({ tabId });
    }
    return Promise.resolve(false);
}

async function openManagePage(hash) {
    // Without a hash, the built-in openOptionsPage focuses the existing manage tab.
    if (!hash) {
        return runtimeAPI.openOptionsPage();
    }

    const targetUrl = runtimeAPI.getURL(`manage.html${hash}`);
    const baseUrl = runtimeAPI.getURL('manage.html');

    // Reuse an existing manage tab if already open; otherwise create a new one.
    try {
        const existing = await tabsAPI.query({ url: `${baseUrl}*` });
        if (existing && existing.length > 0) {
            const tab = existing[0];
            await tabsAPI.update(tab.id, { url: targetUrl, active: true });
            if (tab.windowId != null && typeof browser !== 'undefined' && browser.windows?.update) {
                await browser.windows.update(tab.windowId, { focused: true });
            } else if (tab.windowId != null && chrome.windows?.update) {
                chrome.windows.update(tab.windowId, { focused: true });
            }
            return;
        }
    } catch (_) {
        // tabs.query may fail without "tabs" permission; fall through to create.
    }

    return tabsAPI.create({ url: targetUrl });
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

// ---------------- YNAB integration ----------------

function getYnabRedirectUri() {
    if (identityAPI?.getRedirectURL) {
        return identityAPI.getRedirectURL();
    }
    return null;
}

async function getYnabConfigSafe() {
    const items = await storageArea.get('ynab_config');
    return items.ynab_config || {};
}

async function patchYnabConfigSafe(partial) {
    const current = await getYnabConfigSafe();
    const next = Object.assign({}, current, partial);
    await storageArea.set({ ynab_config: next });
    return next;
}

async function ynabConnect(requestedClientId) {
    const clientId = getHardcodedClientId() || requestedClientId || (await getYnabConfigSafe()).clientId;
    if (!clientId) throw new Error('client_id nao informado. Edite ynab-config.js.');
    if (!identityAPI?.launchWebAuthFlow) {
        throw new Error('API de autenticacao nao disponivel neste navegador.');
    }
    const redirectUri = getYnabRedirectUri();
    const authUrl = self.YnabClient.buildAuthorizeUrl(clientId, redirectUri);

    // launchWebAuthFlow: callback API (Chrome) vs Promise (Firefox)
    const callbackUrl = await new Promise((resolve, reject) => {
        try {
            const maybePromise = identityAPI.launchWebAuthFlow(
                { url: authUrl, interactive: true },
                (result) => {
                    const err = (typeof chrome !== 'undefined' && chrome.runtime?.lastError) || null;
                    if (err) return reject(new Error(err.message || String(err)));
                    if (!result) return reject(new Error('Autenticacao cancelada.'));
                    resolve(result);
                }
            );
            if (maybePromise && typeof maybePromise.then === 'function') {
                maybePromise.then(resolve, reject);
            }
        } catch (e) {
            reject(e);
        }
    });

    const parsed = self.YnabClient.parseImplicitCallback(callbackUrl);
    if (!parsed?.token) throw new Error('Token nao recebido do YNAB.');

    let userEmail = '';
    try {
        const user = await self.YnabClient.getUser(parsed.token);
        userEmail = user?.id || '';
    } catch (_) {
        // non-fatal: token might still be valid; we store it regardless.
    }

    const config = await patchYnabConfigSafe({
        clientId,
        token: parsed.token,
        tokenExpiresAt: parsed.expiresAt,
        userEmail,
        lastConnectedAt: Date.now()
    });
    return sanitizeYnabConfigForResponse(config);
}

async function ynabDisconnect() {
    const current = await getYnabConfigSafe();
    const { clientId, budgetId, accountMap } = current;
    await storageArea.set({
        ynab_config: { clientId: clientId || '', budgetId: budgetId || '', accountMap: accountMap || {} }
    });
    return sanitizeYnabConfigForResponse(await getYnabConfigSafe());
}

function isYnabTokenValid(config) {
    if (!config?.token) return false;
    if (!config.tokenExpiresAt) return true; // unknown expiration, assume valid
    return Date.now() < config.tokenExpiresAt - 30_000; // 30s safety margin
}

function getHardcodedClientId() {
    if (typeof self !== 'undefined' && self.YNAB_CONFIG && typeof self.YNAB_CONFIG.CLIENT_ID === 'string') {
        return self.YNAB_CONFIG.CLIENT_ID.trim();
    }
    return '';
}

// Normalizes the stored accountMap into { bankAccountId: [{id, name}, ...] } shape.
// Accepts legacy { bankAccountId: 'uuid' } string form as well.
function normalizeAccountMap(raw) {
    const out = {};
    if (!raw || typeof raw !== 'object') return out;
    for (const [bankId, value] of Object.entries(raw)) {
        if (!value) continue;
        if (typeof value === 'string') {
            out[bankId] = [{ id: value, name: '' }];
        } else if (Array.isArray(value)) {
            out[bankId] = value
                .map((entry) => {
                    if (!entry) return null;
                    if (typeof entry === 'string') return { id: entry, name: '' };
                    if (typeof entry === 'object' && entry.id) {
                        return { id: String(entry.id), name: String(entry.name || '') };
                    }
                    return null;
                })
                .filter(Boolean);
        } else if (typeof value === 'object' && value.id) {
            out[bankId] = [{ id: String(value.id), name: String(value.name || '') }];
        }
    }
    return out;
}

function sanitizeYnabConfigForResponse(config) {
    const hardcoded = getHardcodedClientId();
    const effectiveClientId = hardcoded || (config?.clientId || '');
    const accountMap = normalizeAccountMap(config?.accountMap);
    const lastUsed = (config && typeof config.lastUsedYnabAccount === 'object' && config.lastUsedYnabAccount) || {};
    if (!config) return { connected: false, clientId: effectiveClientId, clientIdHardcoded: !!hardcoded, redirectUri: getYnabRedirectUri(), accountMap: {}, lastUsedYnabAccount: {} };
    return {
        connected: isYnabTokenValid(config),
        clientId: effectiveClientId,
        clientIdHardcoded: !!hardcoded,
        budgetId: config.budgetId || '',
        accountMap,
        lastUsedYnabAccount: lastUsed,
        userEmail: config.userEmail || '',
        tokenExpiresAt: config.tokenExpiresAt || 0,
        redirectUri: getYnabRedirectUri()
    };
}

async function ynabListBudgets() {
    const config = await getYnabConfigSafe();
    if (!isYnabTokenValid(config)) throw new Error('Token YNAB expirado ou ausente. Reconecte.');
    return self.YnabClient.listBudgets(config.token);
}

async function ynabListAccounts(budgetId) {
    const config = await getYnabConfigSafe();
    if (!isYnabTokenValid(config)) throw new Error('Token YNAB expirado ou ausente. Reconecte.');
    return self.YnabClient.listAccounts(config.token, budgetId);
}

async function ynabSendTransactions(transactions, ynabAccountIdOverride) {
    const config = await getYnabConfigSafe();
    if (!isYnabTokenValid(config)) throw new Error('Token YNAB expirado ou ausente. Reconecte.');
    if (!config.budgetId) throw new Error('Orcamento YNAB nao selecionado. Abra "Gerenciar" e escolha um orcamento.');

    const normalizedMap = normalizeAccountMap(config.accountMap);
    const payload = [];
    const skipped = [];
    const sentIds = [];

    for (const tx of transactions) {
        const destinations = normalizedMap[tx.bankAccountId] || [];
        const ynabAccountId = ynabAccountIdOverride || destinations[0]?.id;
        if (!ynabAccountId) {
            skipped.push({ id: tx.id, reason: `Sem mapping YNAB para ${tx.bankAccountId}` });
            continue;
        }
        payload.push(self.YnabClient.toYnabTransaction(tx, ynabAccountId));
        sentIds.push(tx.id);
    }

    if (payload.length === 0) {
        return { created: [], duplicates: [], skipped, sentIds: [] };
    }

    const result = await self.YnabClient.postTransactions(config.token, config.budgetId, payload);

    if (ynabAccountIdOverride && transactions[0]?.bankAccountId) {
        const last = Object.assign({}, config.lastUsedYnabAccount || {});
        last[transactions[0].bankAccountId] = ynabAccountIdOverride;
        await patchYnabConfigSafe({ lastUsedYnabAccount: last });
    }

    return {
        created: result.transactions || [],
        duplicates: result.duplicate_import_ids || [],
        skipped,
        sentIds
    };
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
                const tabId = _sender?.tab?.id ?? (await getCurrentTab())?.id;
                openSidebar(tabId).catch((error) => console.warn('Falha ao abrir sidebar:', error));
                const result = await refreshActiveTabReview();
                sendResponse(result);
                return;
            }
            case 'EXPORT_REVIEW_CSV': {
                const downloadId = await exportCsv(message.csv || '', message.filename || 'budget-export.csv');
                sendResponse({ ok: true, downloadId });
                return;
            }
            case 'OPEN_MANAGE_PAGE': {
                await openManagePage(message.hash || '');
                sendResponse({ ok: true });
                return;
            }
            case 'YNAB_GET_CONFIG': {
                const config = await getYnabConfigSafe();
                sendResponse({ ok: true, config: sanitizeYnabConfigForResponse(config) });
                return;
            }
            case 'YNAB_SAVE_CLIENT_ID': {
                const next = await patchYnabConfigSafe({ clientId: message.clientId || '' });
                sendResponse({ ok: true, config: sanitizeYnabConfigForResponse(next) });
                return;
            }
            case 'YNAB_CONNECT': {
                const config = await ynabConnect(message.clientId);
                sendResponse({ ok: true, config });
                return;
            }
            case 'YNAB_DISCONNECT': {
                const config = await ynabDisconnect();
                sendResponse({ ok: true, config });
                return;
            }
            case 'YNAB_LIST_BUDGETS': {
                const budgets = await ynabListBudgets();
                sendResponse({ ok: true, budgets });
                return;
            }
            case 'YNAB_LIST_ACCOUNTS': {
                const accounts = await ynabListAccounts(message.budgetId);
                sendResponse({ ok: true, accounts });
                return;
            }
            case 'YNAB_SAVE_MAPPING': {
                const next = await patchYnabConfigSafe({
                    budgetId: message.budgetId || '',
                    accountMap: message.accountMap || {}
                });
                sendResponse({ ok: true, config: sanitizeYnabConfigForResponse(next) });
                return;
            }
            case 'YNAB_SEND_TRANSACTIONS': {
                const result = await ynabSendTransactions(message.transactions || [], message.ynabAccountId || null);
                sendResponse({ ok: true, result });
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

// Toolbar action:
// - Firefox: opens the management page (manage.html) — daily review flow lives on the URL-bar page_action.
// - Chrome/Edge: opens the side panel (no URL-bar icon exists there, so the toolbar is the main entry point).
actionAPI.onClicked.addListener((tab) => {
    if (sidebarActionAPI?.open) {
        runtimeAPI.openOptionsPage().catch((error) => console.error('Falha ao abrir manage:', error));
        return;
    }
    openSidebar(tab?.id).catch((error) => console.error('Falha ao abrir side panel:', error));
    refreshActiveTabReview().catch((error) => console.error('Falha ao atualizar revisao:', error));
});

// Firefox-only: page_action (URL bar icon, shown on supported bank pages) opens the review sidebar.
if (pageActionAPI?.onClicked) {
    pageActionAPI.onClicked.addListener((tab) => {
        openSidebar(tab?.id).catch((error) => console.error('Falha ao abrir sidebar:', error));
        refreshActiveTabReview().catch((error) => console.error('Falha ao atualizar revisao:', error));
    });
}

if (commandsAPI?.onCommand) {
    commandsAPI.onCommand.addListener((command) => {
        if (command !== 'open-review-sidebar') return;
        // Firefox: sidebarActionAPI.open() does not need a tabId.
        if (sidebarActionAPI?.open) {
            sidebarActionAPI.open().catch((error) => console.error('Falha ao abrir sidebar via atalho:', error));
        } else if (sidePanelAPI?.open) {
            // Chrome/Edge: must resolve tabId; gesture survives one await in the handler.
            getCurrentTab()
                .then((tab) => (tab?.id != null ? sidePanelAPI.open({ tabId: tab.id }) : undefined))
                .catch((error) => console.error('Falha ao abrir side panel via atalho:', error));
        }
        refreshActiveTabReview().catch((error) => console.error('Falha ao atualizar revisao via atalho:', error));
    });
}

if (runtimeAPI.onInstalled) {
    runtimeAPI.onInstalled.addListener(() => {
        setActiveReview(null).catch(() => undefined);
    });
}

// Auto-refresh: when the active tab finishes loading a supported bank URL,
// pull the freshly captured transactions and broadcast to any open sidebar.
// Debounced because SPA navigations fire onUpdated multiple times and the
// transaction-capture script needs a moment to intercept the API calls.
const AUTO_REFRESH_DELAY_MS = 1500;
const autoRefreshTimers = new Map();

function scheduleAutoRefresh(tabId) {
    const existing = autoRefreshTimers.get(tabId);
    if (existing) clearTimeout(existing);
    const timer = setTimeout(async () => {
        autoRefreshTimers.delete(tabId);
        try {
            const result = await refreshActiveTabReview();
            if (result?.review) {
                await setActiveReview(result.review);
            }
        } catch (error) {
            console.warn('Auto-refresh falhou:', error);
        }
    }, AUTO_REFRESH_DELAY_MS);
    autoRefreshTimers.set(tabId, timer);
}

if (tabsAPI?.onUpdated) {
    tabsAPI.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (changeInfo.status !== 'complete') return;
        if (!tab?.active) return;
        if (!detectAccountFromUrl(tab.url || '')) return;
        scheduleAutoRefresh(tabId);
    });
}

if (tabsAPI?.onActivated) {
    tabsAPI.onActivated.addListener(async ({ tabId }) => {
        try {
            const tab = await tabsAPI.get(tabId);
            if (!detectAccountFromUrl(tab?.url || '')) return;
            scheduleAutoRefresh(tabId);
        } catch (_) {
            // ignored
        }
    });
}
