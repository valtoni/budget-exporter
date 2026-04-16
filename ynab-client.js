// Thin wrapper around the YNAB REST API (v1). Runs in the background service worker.
// All functions assume an OAuth access_token (Implicit Grant flow) is supplied by the caller.
var BudgetExporterRoot = typeof globalThis !== 'undefined' ? globalThis : self;

const YNAB_API_BASE = 'https://api.ynab.com/v1';
const YNAB_AUTHORIZE_URL = 'https://app.ynab.com/oauth/authorize';

async function ynabFetch(path, token, init) {
    const url = `${YNAB_API_BASE}${path}`;
    const headers = Object.assign({
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
    }, (init && init.headers) || {});
    if (init && init.body) {
        headers['Content-Type'] = 'application/json';
    }
    const response = await fetch(url, Object.assign({}, init, { headers }));
    const text = await response.text();
    let json = null;
    try { json = text ? JSON.parse(text) : null; } catch (_) { /* non-JSON */ }

    if (!response.ok) {
        const errMsg = json?.error?.detail || json?.error?.name || `HTTP ${response.status}`;
        const err = new Error(errMsg);
        err.status = response.status;
        err.body = json;
        throw err;
    }
    return json;
}

async function getUser(token) {
    const data = await ynabFetch('/user', token);
    return data?.data?.user || null;
}

async function listBudgets(token) {
    const data = await ynabFetch('/budgets', token);
    return data?.data?.budgets || [];
}

async function listAccounts(token, budgetId) {
    const data = await ynabFetch(`/budgets/${encodeURIComponent(budgetId)}/accounts`, token);
    return (data?.data?.accounts || []).filter((a) => !a.closed && !a.deleted);
}

async function postTransactions(token, budgetId, transactions) {
    const body = JSON.stringify({ transactions });
    const data = await ynabFetch(`/budgets/${encodeURIComponent(budgetId)}/transactions`, token, {
        method: 'POST',
        body
    });
    return data?.data || {};
}

// Converts the review's internal transaction shape into the YNAB API payload.
// Handles split transactions via `subtransactions`. Returns one YNAB transaction per extension tx.
function toYnabTransaction(tx, ynabAccountId) {
    const hasSplits = Array.isArray(tx.splits) && tx.splits.length > 0;
    const direction = tx.outflow ? -1 : 1;
    const absMain = parseFloat(String(tx.outflow || tx.inflow || '').replace(',', '.')) || 0;
    const mainMilli = Math.round(absMain * 1000) * direction;
    const importBase = `YNAB:${Math.abs(mainMilli)}:${tx.dateIso || ''}:${tx.rawIndex ?? ''}`;
    const importId = importBase.slice(0, 36);
    const payeeName = (tx.payeeFinal || tx.payeeRaw || '').slice(0, 50);
    const memo = hasSplits ? null : (tx.memoFinal ? String(tx.memoFinal).slice(0, 200) : null);

    const base = {
        account_id: ynabAccountId,
        date: tx.dateIso || null,
        amount: mainMilli,
        payee_name: payeeName,
        memo,
        cleared: 'cleared',
        approved: false,
        import_id: importId
    };

    if (!hasSplits) return base;

    base.subtransactions = tx.splits.map((split) => {
        const absSplit = parseFloat(String(split.amount || '').replace(',', '.')) || 0;
        return {
            amount: Math.round(absSplit * 1000) * direction,
            payee_name: payeeName,
            memo: split.memo ? String(split.memo).slice(0, 200) : null
            // category_id intentionally omitted: MVP does not map strings → YNAB UUIDs.
            // The free-form split.category stays in the memo-adjacent field for visibility.
        };
    });

    return base;
}

function buildAuthorizeUrl(clientId, redirectUri) {
    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: 'token'
    });
    return `${YNAB_AUTHORIZE_URL}?${params.toString()}`;
}

// Parses the URL fragment returned by the Implicit Grant flow.
// Ex: "https://...chromiumapp.org/#access_token=xxx&token_type=bearer&expires_in=7200"
function parseImplicitCallback(callbackUrl) {
    try {
        const url = new URL(callbackUrl);
        const hash = url.hash.startsWith('#') ? url.hash.slice(1) : url.hash;
        const params = new URLSearchParams(hash);
        const token = params.get('access_token');
        const expiresIn = parseInt(params.get('expires_in') || '0', 10);
        if (!token) return null;
        const expiresAt = Date.now() + (Number.isFinite(expiresIn) && expiresIn > 0 ? expiresIn * 1000 : 0);
        return { token, expiresAt };
    } catch (_) {
        return null;
    }
}

BudgetExporterRoot.YnabClient = {
    API_BASE: YNAB_API_BASE,
    AUTHORIZE_URL: YNAB_AUTHORIZE_URL,
    getUser,
    listBudgets,
    listAccounts,
    postTransactions,
    toYnabTransaction,
    buildAuthorizeUrl,
    parseImplicitCallback
};
