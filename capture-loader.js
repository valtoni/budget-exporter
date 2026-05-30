// Budget Exporter — Firefox loader
//
// Firefox MV3 does not yet support `world: MAIN` for content scripts, so we
// load transaction-capture.js into the page's main world by inserting a
// <script> element pointing to it. Runs at document_start so the script is
// installed before the page begins making API requests.

(function () {
    'use strict';

    const runtime = (typeof browser !== 'undefined' && browser.runtime)
        || (typeof chrome !== 'undefined' && chrome.runtime);
    if (!runtime || typeof runtime.getURL !== 'function') return;

    try {
        const s = document.createElement('script');
        s.src = runtime.getURL('transaction-capture.js');
        s.async = false;
        s.onload = () => s.remove();
        (document.head || document.documentElement).appendChild(s);
    } catch (e) {
        console.warn('[budget-exporter] capture loader failed:', e);
    }
})();
