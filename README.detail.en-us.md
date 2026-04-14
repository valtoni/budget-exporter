# Budget Exporter

Budget Exporter is a cross-browser extension (Firefox, Chrome, Edge) that extracts transactions from supported bank pages, applies local payee normalization rules, offers deterministic non-AI suggestions, and exports a reviewed YNAB-ready CSV.

## Current Architecture

The project targets Firefox, Chrome and Edge with Manifest V3 and a review-first workflow:

1. open a supported bank page in your browser
2. click the extension toolbar icon
3. review transactions in the sidebar (Firefox) / side panel (Chrome, Edge)
4. adjust payee, category, and memo if needed
5. create new rules from local suggestions
6. export the reviewed CSV

Everything runs locally in the browser. No AI model, cloud sync, or remote processing is required.

## Install

### Firefox

1. Build the package: `.\build.ps1 -Target firefox`
2. Open `about:debugging` → This Firefox → Load Temporary Add-on → select the `.xpi`.

When you visit a supported bank page, an extra icon appears inside the URL bar next to the favorites star (Firefox `page_action`).

### Chrome

1. Build the package: `.\build.ps1 -Target chrome`
2. Unzip the produced `.zip` into a folder.
3. Open `chrome://extensions`, enable Developer mode, click `Load unpacked`, select the folder.

Chrome does not show an icon inside the URL bar — use the always-visible toolbar icon instead.

### Edge

1. Build the package: `.\build.ps1 -Target edge`
2. Unzip the produced `.zip` into a folder.
3. Open `edge://extensions`, enable Developer mode, click `Load unpacked`, select the folder.

## Main Components

- `manifest.firefox.json` / `manifest.chrome.json`: per-browser MV3 manifests (build script renames the chosen one to `manifest.json`)
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

Default (Firefox):

```powershell
.\build.ps1
```

Produce a specific target:

```powershell
.\build.ps1 -Target firefox   # .xpi
.\build.ps1 -Target chrome    # .zip
.\build.ps1 -Target edge      # .zip
.\build.ps1 -Target all       # all three artifacts
```

Artifacts are written to `dist/` with names like `budget-exporter-v1.3.0-<target>.<ext>` and fall back to a timestamped filename if the previous archive is locked.

For build details, see [README-BUILD.md](README-BUILD.md).

## Note

This file has been refreshed to match the current MV3 + sidebar architecture. If you need the most detailed up-to-date walkthrough, the PT-BR guide is currently the most complete:
- [README.detail.pt-br.md](README.detail.pt-br.md)
