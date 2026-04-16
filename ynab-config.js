// Budget Exporter — YNAB OAuth configuration.
//
// To enable the YNAB integration:
//
// 1. Open https://app.ynab.com/settings/developer → New OAuth Application.
// 2. In "Redirect URI(s)", paste the redirect URI this extension prints in the
//    manage.html YNAB tab (something like https://<uuid>.extensions.allizom.org/).
// 3. Save. YNAB gives you a client_id.
// 4. Paste the client_id between the quotes below, save this file, and reload
//    the extension in about:debugging / chrome://extensions.
//
// After that, the YNAB tab in manage.html will show just a "Conectar ao YNAB" button.

var BudgetExporterRoot = typeof globalThis !== 'undefined' ? globalThis : self;

BudgetExporterRoot.YNAB_CONFIG = {
    CLIENT_ID: 'Mf07ajF4A9sKwb_tOgGw-53ArKz5I9g5ika5bGNFCTo'
};
