// Content script: extracts transactions from the page and prepares review data.
const runtimeAPI = typeof browser !== 'undefined' ? browser.runtime : chrome.runtime;

async function extractTransactionsForReview() {
    const accountId = rootBankUtils().detectBank(window.location.href);
    if (!accountId) {
        throw new Error('Banco nao suportado ou nao detectado.');
    }

    const bankModule = await rootBankUtils().loadBankModule(accountId);
    if (!bankModule.extractTransactions || typeof bankModule.extractTransactions !== 'function') {
        throw new Error(`Extrator nao configurado para ${accountId}`);
    }

    const rows = bankModule.extractTransactions();
    if (!Array.isArray(rows) || rows.length === 0) {
        throw new Error('Nenhuma transacao encontrada na pagina.');
    }

    const review = await rootBankUtils().buildReviewState(accountId, rows);
    return {
        ...review,
        pageUrl: window.location.href,
        pageTitle: document.title
    };
}

function buildErrorReview(errorMessage) {
    const accountId = rootBankUtils().detectBank(window.location.href);
    const account = accountId ? rootBankUtils().getAccountByAccountId(accountId) : null;

    return {
        generatedAt: new Date().toISOString(),
        error: errorMessage,
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
        pageUrl: window.location.href,
        pageTitle: document.title
    };
}

function rootBankUtils() {
    const sharedRoot = typeof globalThis !== 'undefined' ? globalThis : self;
    if (!sharedRoot.BankUtils) {
        throw new Error('BankUtils indisponivel');
    }
    return sharedRoot.BankUtils;
}

runtimeAPI.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.type !== 'COLLECT_TRANSACTIONS') {
        return undefined;
    }

    (async () => {
        try {
            const review = await extractTransactionsForReview();
            await runtimeAPI.sendMessage({ type: 'STORE_ACTIVE_REVIEW', review });
            sendResponse({ ok: true, review });
        } catch (error) {
            const review = buildErrorReview(error.message);
            await runtimeAPI.sendMessage({ type: 'STORE_ACTIVE_REVIEW', review });
            sendResponse({ ok: false, error: error.message, review });
        }
    })();

    return true;
});

console.log('Budget Exporter content script loaded');
