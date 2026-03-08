# Budget Exporter

Budget Exporter is a Firefox extension that extracts transactions from supported bank pages, applies local payee normalization rules, offers deterministic non-AI suggestions, and exports a reviewed YNAB-ready CSV.

## Current Architecture

The project now targets Firefox with Manifest V3 and a review-first workflow:

1. open a supported bank page in Firefox
2. click the extension action
3. review transactions in the sidebar
4. adjust payee, category, and memo if needed
5. create new rules from local suggestions
6. export the reviewed CSV

Everything runs locally in the browser. No AI model, cloud sync, or remote processing is required.

## Main Components

- `manifest.json`: MV3 extension manifest
- `background.js`: service worker coordination and export
- `content.js`: page extraction and review-state preparation
- `bank-utils.js`: bank detection, normalization, suggestions, CSV generation
- `storage-manager.js`: local persistence for rules, categories, accounts, and suggestion history
- `sidebar.html`, `sidebar.js`, `sidebar.css`: operational review UI
- `manage.html`, `manage.js`, `manage.css`: full management page

## Supported Accounts

- Desjardins - Bank Account
- Desjardins - Credit Card
- Koho - Prepaid Card

## Suggestion Model

Suggestions are deterministic and local-only.

Current criteria:
- at least 2 occurrences on the current page, or
- at least 3 accumulated occurrences in local suggestion history

The goal is to reduce noise while still surfacing recurring unmatched payees.

## Build

Use:

```powershell
.\build.ps1
```

The build produces a Firefox `.xpi` package and automatically falls back to a timestamped filename if the previous archive is locked.

For build details, see [README-BUILD.md](README-BUILD.md).

## Note

This file has been refreshed to match the current MV3 + sidebar architecture. If you need the most detailed up-to-date walkthrough, the PT-BR guide is currently the most complete:
- [README.detail.pt-br.md](README.detail.pt-br.md)
