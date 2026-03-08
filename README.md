# Budget Exporter

Budget Exporter is a Firefox WebExtension focused on turning supported bank statement pages into reviewed, YNAB-ready CSV exports.

Current architecture highlights:
- Firefox-first WebExtension using Manifest V3
- review-first workflow through a sidebar
- deterministic payee normalization and category suggestion
- local rule engine only, with no AI or remote processing
- local management page for rules, categories, accounts, import, and export

Core flow:
1. Open a supported bank page in Firefox.
2. Click the extension action.
3. Review extracted transactions in the sidebar.
4. Accept edits or create new rules from suggestions.
5. Export the reviewed CSV.

Supported banks today:
- Desjardins bank account
- Desjardins credit card
- Koho prepaid card

Documentation:
- [Português (Brasil)](README.detail.pt-br.md)
- [Français (Canada)](README.detail.fr-ca.md)
- [English (US)](README.detail.en-us.md)
- [Build notes](README-BUILD.md)
