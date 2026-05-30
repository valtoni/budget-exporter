// Budget Exporter — Transaction Capture
//
// Observes JSON responses returned by the bank's own pages so the extension
// can read transactions from the bank's API instead of parsing HTML (which
// breaks every time the site changes its layout).
//
// SCOPE — IMPORTANT FOR REVIEW:
//   * Runs in the page's main world only on the bank domains declared in the
//     manifest (Desjardins, Koho). It does NOT run on arbitrary sites.
//   * Only OBSERVES responses. It does not modify requests, response bodies,
//     headers, cookies, or any browser state. It does not call any external
//     server. It does not exfiltrate data.
//   * Only JSON responses are forwarded; non-JSON responses are ignored.
//   * Communication with the extension content script is local-only, via
//     window.postMessage with a fixed source tag. Nothing leaves the browser.
//   * Optional debug mode (localStorage 'BUDGET_EXPORTER_DEBUG' = '1') prints
//     a one-line summary per JSON response to the developer console. Used
//     only during initial integration with a new bank.

(function () {
    'use strict';

    if (window.__budgetExporterCaptureInstalled) {
        return;
    }
    window.__budgetExporterCaptureInstalled = true;

    const SOURCE_TAG = 'budget-exporter-capture';
    const MAX_BODY_BYTES = 5 * 1024 * 1024; // 5 MB — ignore anything bigger
    const DEBUG_FLAG = 'BUDGET_EXPORTER_DEBUG';

    function isDebug() {
        try {
            return window.localStorage.getItem(DEBUG_FLAG) === '1';
        } catch (e) {
            return false;
        }
    }

    function looksLikeJson(contentType, bodyText) {
        if (contentType && /\bjson\b/i.test(contentType)) return true;
        if (!bodyText) return false;
        const trimmed = bodyText.trimStart();
        return trimmed.startsWith('{') || trimmed.startsWith('[');
    }

    // eTLD+1 approximation: last two dot-separated parts of the hostname.
    // Works for the supported banks (koho.ca, desjardins.com). Does not handle
    // suffixes like co.uk — fine because no current bank uses them.
    function rootDomain(hostname) {
        if (!hostname) return '';
        const parts = String(hostname).split('.');
        if (parts.length < 2) return hostname;
        return parts.slice(-2).join('.').toLowerCase();
    }

    function isSameBankDomain(url) {
        try {
            const u = new URL(url, window.location.href);
            return rootDomain(u.hostname) === rootDomain(window.location.hostname);
        } catch (e) {
            return false;
        }
    }

    function shapeSummary(parsed) {
        if (Array.isArray(parsed)) {
            const first = parsed[0];
            const keys = first && typeof first === 'object' ? Object.keys(first).slice(0, 8) : [];
            return `array(${parsed.length})` + (keys.length ? ` of objects with keys: [${keys.join(', ')}]` : '');
        }
        if (parsed && typeof parsed === 'object') {
            return `object with keys: [${Object.keys(parsed).slice(0, 8).join(', ')}]`;
        }
        return typeof parsed;
    }

    // Heuristic: does the parsed body look like (or contain) a transaction list?
    // A transaction list is an array of objects whose collective field names
    // include something date-ish AND something amount-ish.
    function looksLikeTransactionList(parsed) {
        const candidates = [];
        if (Array.isArray(parsed)) candidates.push(parsed);
        if (parsed && typeof parsed === 'object') {
            for (const v of Object.values(parsed)) {
                if (Array.isArray(v)) candidates.push(v);
            }
        }
        const dateRx = /(date|time|stamp|posted|created|booked)/i;
        const amountRx = /(amount|value|sum|total|debit|credit|montant)/i;
        for (const arr of candidates) {
            if (!arr.length) continue;
            const sample = arr.slice(0, 5).filter((x) => x && typeof x === 'object');
            if (!sample.length) continue;
            const keys = new Set();
            for (const obj of sample) {
                for (const k of Object.keys(obj)) keys.add(k);
            }
            const hasDate = [...keys].some((k) => dateRx.test(k));
            const hasAmount = [...keys].some((k) => amountRx.test(k));
            if (hasDate && hasAmount && arr.length >= 1) return true;
        }
        return false;
    }

    function emit(payload) {
        try {
            window.postMessage({ source: SOURCE_TAG, ...payload }, window.location.origin);
        } catch (e) {
            // Ignore — postMessage is best-effort.
        }
        if (isDebug()) {
            try {
                const parsed = JSON.parse(payload.body);
                const tag = looksLikeTransactionList(parsed) ? ' ← candidate?' : '';
                console.log(`[budget-exporter] ${payload.method} ${payload.url}\n          → ${shapeSummary(parsed)}${tag}`);
            } catch (e) {
                // Body not parseable as JSON in debug summary — skip.
            }
        }
    }

    // ── fetch ───────────────────────────────────────────────────────────────
    const originalFetch = window.fetch;
    if (typeof originalFetch === 'function') {
        window.fetch = function patchedFetch(input, init) {
            const method = (init && init.method) || (typeof input === 'object' && input.method) || 'GET';
            const url = typeof input === 'string' ? input : (input && input.url) || '';

            return originalFetch.apply(this, arguments).then((response) => {
                try {
                    const effectiveUrl = url || response.url;
                    if (!isSameBankDomain(effectiveUrl)) return response;
                    const contentType = response.headers.get('content-type') || '';
                    if (!/\bjson\b/i.test(contentType)) return response;

                    const clone = response.clone();
                    clone.text().then((bodyText) => {
                        if (!bodyText || bodyText.length > MAX_BODY_BYTES) return;
                        emit({
                            url: effectiveUrl,
                            method: method.toUpperCase(),
                            status: response.status,
                            body: bodyText,
                            ts: Date.now()
                        });
                    }).catch(() => {});
                } catch (e) {
                    // Never let observation break the page's request.
                }
                return response;
            });
        };
    }

    // ── XMLHttpRequest ──────────────────────────────────────────────────────
    const OriginalXHR = window.XMLHttpRequest;
    if (typeof OriginalXHR === 'function' && OriginalXHR.prototype) {
        const origOpen = OriginalXHR.prototype.open;
        const origSend = OriginalXHR.prototype.send;

        OriginalXHR.prototype.open = function patchedOpen(method, url) {
            this.__budgetExporterMethod = String(method || 'GET').toUpperCase();
            this.__budgetExporterUrl = String(url || '');
            return origOpen.apply(this, arguments);
        };

        OriginalXHR.prototype.send = function patchedSend() {
            this.addEventListener('load', () => {
                try {
                    if (!isSameBankDomain(this.__budgetExporterUrl)) return;
                    const contentType = this.getResponseHeader && this.getResponseHeader('content-type');
                    let bodyText = '';
                    try {
                        bodyText = this.responseType === '' || this.responseType === 'text' ? this.responseText : '';
                    } catch (e) {
                        bodyText = '';
                    }
                    if (!looksLikeJson(contentType, bodyText)) return;
                    if (!bodyText || bodyText.length > MAX_BODY_BYTES) return;
                    emit({
                        url: this.__budgetExporterUrl,
                        method: this.__budgetExporterMethod || 'GET',
                        status: this.status,
                        body: bodyText,
                        ts: Date.now()
                    });
                } catch (e) {
                    // Never let observation break the page's request.
                }
            });
            return origSend.apply(this, arguments);
        };
    }
})();
