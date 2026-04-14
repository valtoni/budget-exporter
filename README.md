# Budget Exporter

Budget Exporter is a cross-browser WebExtension (Firefox, Chrome, Edge) focused on turning supported bank statement pages into reviewed, YNAB-ready CSV exports.

Current architecture highlights:
- Manifest V3 WebExtension, runs on Firefox, Chrome and Edge
- review-first workflow through a sidebar (Firefox) or side panel (Chrome/Edge)
- deterministic payee normalization and category suggestion
- local rule engine only, with no AI or remote processing
- local management page for rules, categories, accounts, import, and export

Core flow:
1. Open a supported bank page in your browser.
2. Click the extension toolbar icon.
3. Review extracted transactions in the sidebar / side panel.
4. Accept edits or create new rules from suggestions.
5. Export the reviewed CSV.

Supported browsers:
- Firefox (uses `sidebar_action` + URL-bar `page_action` icon)
- Chrome 114+ (uses `side_panel`)
- Edge 114+ (uses `side_panel`)

Supported banks today:
- Desjardins bank account
- Desjardins credit card
- Koho prepaid card

Documentation:
- [Português (Brasil)](README.detail.pt-br.md)
- [Français (Canada)](README.detail.fr-ca.md)
- [English (US)](README.detail.en-us.md)
- [Build notes](README-BUILD.md)
