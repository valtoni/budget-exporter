// Content script: extracts transactions from the page and prepares review data.
const runtimeAPI = typeof browser !== 'undefined' ? browser.runtime : chrome.runtime;

const CAPTURE_SOURCE_TAG = 'budget-exporter-capture';
const CAPTURE_BUFFER_MAX = 50;
const CAPTURE_TTL_MS = 10 * 60 * 1000;

const capturedResponses = [];

window.addEventListener('message', (event) => {
    if (event.source !== window) return;
    const data = event.data;
    if (!data || data.source !== CAPTURE_SOURCE_TAG) return;
    if (typeof data.url !== 'string' || typeof data.body !== 'string') return;

    capturedResponses.push({
        url: data.url,
        method: data.method || 'GET',
        status: data.status || 0,
        body: data.body,
        ts: data.ts || Date.now()
    });

    pruneCapturedResponses();
});

function pruneCapturedResponses() {
    const cutoff = Date.now() - CAPTURE_TTL_MS;
    while (capturedResponses.length && capturedResponses[0].ts < cutoff) {
        capturedResponses.shift();
    }
    while (capturedResponses.length > CAPTURE_BUFFER_MAX) {
        capturedResponses.shift();
    }
}

function getCapturedResponses() {
    pruneCapturedResponses();
    return capturedResponses.slice();
}

async function extractTransactionsForReview() {
    const accountId = rootBankUtils().detectBank(window.location.href);
    if (!accountId) {
        throw new Error('Banco nao suportado ou nao detectado.');
    }

    const bankModule = await rootBankUtils().loadBankModule(accountId);
    if (!Array.isArray(bankModule.apiMatchers) || bankModule.apiMatchers.length === 0) {
        throw new Error(`Extrator nao configurado para ${accountId} (sem apiMatchers).`);
    }
    if (typeof bankModule.extractFromCaptures !== 'function') {
        throw new Error(`Extrator nao configurado para ${accountId} (sem extractFromCaptures).`);
    }

    const captures = getCapturedResponses();
    const matched = captures.filter((c) =>
        bankModule.apiMatchers.some((m) =>
            (!m.method || m.method.toUpperCase() === c.method.toUpperCase())
            && m.urlPattern instanceof RegExp
            && m.urlPattern.test(c.url)
        )
    );

    if (matched.length === 0) {
        throw new Error(
            'Nenhuma resposta da API capturada nesta sessao. '
            + 'Atualize a pagina (F5) e tente coletar de novo.'
        );
    }

    const rows = bankModule.extractFromCaptures(matched);
    if (!Array.isArray(rows) || rows.length === 0) {
        throw new Error(
            'A API do banco respondeu, mas nenhuma transacao pode ser extraida. '
            + 'O formato pode ter mudado — a extensao precisa ser atualizada.'
        );
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
