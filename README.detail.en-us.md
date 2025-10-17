# Budget Exporter

A Firefox extension that drastically simplifies exporting bank transactions to a YNAB‑compatible CSV (You Need A Budget).

## 🎯 Motivation

Managing personal finances is essential, but importing bank transactions into budgeting tools like YNAB is often **tedious and error‑prone**.

### The Problem

Without this extension, the manual process involves:

1. **Visiting multiple bank sites** — Logging in to each bank separately
2. **Navigating inconsistent UIs** — Every bank has its own structure
3. **Exporting transactions** — Often in incompatible formats (OFX, PDF, proprietary CSV)
4. **Converting formats** — Using external tools or spreadsheets
5. **Standardizing payee names** — Cleaning and normalizing merchant descriptions
   - "NETFLIX.COM*ASSINATU" → "Netflix"
   - "UBER *TRIP 12345678" → "Uber"
   - "PAG*MERCADO123456" → "Supermarket"
6. **Manual categorization** — Assigning categories for every transaction
7. **Importing into YNAB** — Upload and final validation

**Estimated time:** 15–30 minutes per bank, per month
**Common errors:** Duplicates, wrong categories, inconsistent formatting
**Frustration:** High 😤

### The Solution

With Budget Exporter, the process becomes:

1. **Open your bank’s page** in Firefox
2. **Click the extension icon**
3. **Download a ready‑to‑import CSV** — Formatted, categorized, and standardized

**Estimated time:** 30 seconds
**Errors:** Near zero
**Frustration:** None 😊

## ✨ Key Features

### Smart Automation
- Automatically extracts transactions directly from your bank page
- Instantly converts to YNAB‑compatible CSV
- Auto‑detects bank based on the URL

### Rule Management
- **Payee Rules:** Turn noisy descriptions into clean names
  - Supports plain text and regular expressions (regex)
  - Capture‑group substitutions
- **Auto‑Categorization:** Assign categories based on patterns
- **Memo Templates:** Add contextual details to memos

### Friendly UI
- Management page built with Bootstrap 5.3
- Real‑time rule search
- Searchable inputs for accounts and categories
- Automatic pagination for large rule sets
- Responsive, intuitive design

### Multi‑Bank Support
- Flexible per‑account configuration
- Account‑specific or global rules (apply to all accounts)
- Easy to add new banks/accounts

## 🚀 How to Use

1. **Install the extension** in Firefox
2. **Configure your rules** (optional):
   - Click the extension icon
   - Open "Manage Rules"
   - Add accounts, categories, and payee rules
3. **Open your online banking**
4. **Click the extension icon**
5. **Download the CSV** — Ready to import into YNAB!

## 🛠️ Development

### Technologies

#### Frontend
- **HTML5** — Semantic structure
- **CSS3** — Custom styling
- **Bootstrap 5.3** — Modern, responsive UI framework
- **Bootstrap Icons** — SVG icon set

#### JavaScript
- **Vanilla JavaScript (ES6+)** — No external deps
  - Promises and Async/Await
  - ES Modules
  - Arrow Functions
  - Destructuring
  - Template Literals
- **WebExtensions API** (Firefox)
  - `browser.storage.local` — Persistent storage
  - `browser.tabs` — Tab manipulation
  - `browser.runtime` — Component messaging
  - Content Scripts — Code injected into pages

#### Architecture
- **Content Scripts** — Run in the web page context
  - Scrape data from the DOM
  - Auto‑detect the bank
  - Apply transformation rules
- **Background Scripts** — Handle global events
- **Popup UI** — Main extension interface
- **Management Page** — Configuration UI

### Project Structure

```
budget-exporter/
├── manifest.json              # Extension configuration
├── background.js              # Background script
├── popup.html                 # Main popup UI
├── popup.js                   # Popup logic
├── manage.html                # Management page
├── manage.js                  # Management logic (pagination, search)
├── manage.css                 # Custom styles
├── storage-manager.js         # Storage abstraction
├── icon.svg                   # Main icon
├── icons/                     # Icons in multiple sizes
│   ├── icon-48.png
│   ├── icon-96.png
│   └── icon-128.png
└── content-scripts/           # Bank‑specific scripts
    ├── koho.js                # Koho extractor
    ├── desjardins.js          # Desjardins extractor
    └── ...                    # Others
```

### Coding Patterns

#### Storage Manager
Data management abstraction:
```javascript
await StorageManager.init();
const rules = await StorageManager.getPayeeRules();
await StorageManager.addPayeeRule({ pattern, replacement, category });
```

#### Payee Rules
Data shape:
```javascript
{
  id: Number,              // Unique timestamp
  bankId: Number,          // Account/bank ID (0 = all)
  pattern: String,         // Text or regex
  replacement: String,     // New payee
  category: String,        // YNAB category
  isRegex: Boolean,        // Uses regex?
  memoTemplate: String,    // Template with \1, \2, etc.
  enabled: Boolean         // Enable/disable
}
```

#### Content Scripts
Each bank has its own extractor:
```javascript
function extractTransactions() {
  // 1. Select DOM elements
  // 2. Extract data (date, payee, amount)
  // 3. Apply transformation rules
  // 4. Return an array of transactions
}
```

### Build & Distribution

#### Requirements
- PowerShell 5.1+ (Windows)
- Firefox Developer Edition (recommended for testing)

#### Automated Build

Run the build script:
```powershell
.\build.ps1
```

The script will:
1. Read the `manifest.json` version
2. Create the `dist/` directory
3. Copy only necessary files
4. Exclude unnecessary files (.git, .md, node_modules)
5. Produce a versioned ZIP: `budget-exporter-v1.0.0-YYYYMMDD-HHMMSS.zip`
6. Validate basic structure
7. Print package info
8. Open the `dist/` folder automatically

#### Package Contents

ZIP includes only:
- `manifest.json`
- JavaScript files (`.js`)
- HTML files (`.html`)
- CSS files (`.css`)
- Icons (`.svg`, `icons/` folder)
- Content scripts (`content-scripts/`)

Excluded from ZIP:
- Documentation (`.md`)
- Version control (`.git`)
- Temp files (`.log`, `.tmp`)
- System files (`.DS_Store`, `Thumbs.db`)

#### Local Testing

Before publishing:
```
1. Firefox → about:debugging
2. "This Firefox" → "Load Temporary Add-on"
3. Select the generated ZIP
4. Test all features
```

#### Submit to Mozilla

1. **Go to:** https://addons.mozilla.org/developers/
2. **Submit a New Add-on**
3. **Choose type:**
   - **Listed** — Appears in the store (manual review)
   - **Self‑distributed** — Your own distribution (automatic signing)
4. **Upload** the ZIP produced by the build script
5. **Fill in details:**
   - Name, description, category
   - Screenshots (optional but recommended)
   - Privacy notes
6. **Wait for approval** (listed) or **automatic signing** (self‑distributed)

### Advanced Technical Features

#### Real‑time Search
- Filters rules as you type
- Visual validation (red for < 3 characters)
- Automatic debounce

#### Searchable Dropdowns
- Input + dropdown combined
- Dynamic option filtering
- Keyboard support (Ctrl+F for global search)

#### Smart Pagination
- 10 items per page (configurable)
- Previous/next navigation
- Auto‑adjust when removing items
- Reset on add/edit

#### Form Validation
- Required account/bank checks
- Regex validation
- Visual error feedback
- Duplicate prevention

### Extensibility

#### Add a New Bank/Account

1. **Create a content script:**
```javascript
// content-scripts/new-bank.js
function extractTransactions() {
  const transactions = [];
  // Your extraction logic here
  return transactions;
}
```

2. **Register in manifest.json:**
```json
{
  "matches": ["*://*.newbank.com/*"],
  "js": ["content-scripts/new-bank.js"]
}
```

3. **Expose in the UI:**
   - Manage → Accounts → Add "New Bank"

#### Customize Output Format

Edit the CSV conversion function in each content script:
```javascript
function convertToYNABFormat(transactions) {
  // Modify as needed
  return csvString;
}
```

## 📝 Roadmap

Planned features:
- [ ] Chrome/Edge support
- [ ] Rule import/export
- [ ] Optional cloud sync
- [ ] Automatic duplicate detection
- [ ] Dashboard with stats
- [ ] Dark mode

## 🤝 Contributing

Contributions are welcome! To add support for a new bank/account:

1. Fork the repository
2. Create your content script in `content-scripts/`
3. Test locally
4. Open a Pull Request

## 📄 License

This is an open‑source project. See LICENSE for details.

## 🙏 Acknowledgments

- **YNAB** — For the great budgeting tool
- **Bootstrap Team** — For the UI framework
- **Mozilla** — For the robust extensions platform
- **Open Source Community** — For inspiration and feedback

---

Built with ❤️ by Valtoni Boaventura to simplify your financial life.
