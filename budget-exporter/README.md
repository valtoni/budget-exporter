Budget Exporter (MV3) – Browser Extension Skeleton

This directory contains a minimal, modern Chrome/Edge extension skeleton compatible with Manifest V3.

What's included
- manifest.json (MV3)
- background.js (service worker)
- content.js (content script)
- popup.html + popup.js (browser action UI)
- options.html (options page)

How to load the extension (Chrome/Edge)
1. Open chrome://extensions (or edge://extensions).
2. Enable "Developer mode" (top-right).
3. Click "Load unpacked" and select this directory: budget-exporter.
4. The extension "Budget Exporter" should appear. Click the toolbar icon to open the popup.

Notes
- The content script is configured to run only on selected bank domains (see manifest.json → matches/host_permissions).
- No icons are provided to keep the skeleton lightweight. You can add PNG icons later and include them in manifest.json → icons.
- The background script listens for a simple PING message. The popup sends a PING and shows the response.
- Options page demonstrates saving a simple value via chrome.storage.sync.

Next steps (ideas)
- Add domain-specific logic to scrape/export financial data from target sites.
- Implement export to CSV/OFX or integration with existing ofx_exporter Python utilities via downloads or APIs.
- Add permissions only as required by your features.

Setup
``` shell
npm install --save-dev @types/chrome
```