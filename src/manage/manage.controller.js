/* global StorageManager, BankUtils */

const runtimeAPI = typeof browser !== 'undefined' ? browser.runtime : chrome.runtime;

const state = {
    rules: [],
    accounts: [],
    categories: [],
    editingRuleId: null,
    sortCol: 'pattern',
    sortDir: 'asc',
    page: 1,
    pageSize: 20,
    searchTerm: '',
    activeTab: 'rules',
    ynabConfig: null,
    ynabBudgets: [],
    ynabAccounts: []
};

const dom = {};
let ruleAccountSelect = null;
let ruleCategorySelect = null;
let toastTimer = null;

document.addEventListener('DOMContentLoaded', init);

async function init() {
    cacheDom();
    await StorageManager.init();
    displayVersion();
    await loadAccounts();
    await loadCategories();
    await loadRules();
    bindEvents();
    setupRuleTomSelects();
    applyHashRoute();
    window.addEventListener('hashchange', applyHashRoute);
}

function cacheDom() {
    dom.railItems = Array.from(document.querySelectorAll('.rail-item[data-section]'));
    dom.tabs = {
        rules: document.getElementById('tab-rules'),
        categories: document.getElementById('tab-categories'),
        accounts: document.getElementById('tab-accounts'),
        ynab: document.getElementById('tab-ynab')
    };
    dom.counts = {
        rules: document.querySelector('[data-count="rules"]'),
        categories: document.querySelector('[data-count="categories"]'),
        accounts: document.querySelector('[data-count="accounts"]')
    };

    dom.btnExport = document.getElementById('btn-export');
    dom.btnImport = document.getElementById('btn-import');
    dom.importFile = document.getElementById('import-file');

    dom.rulesTable = document.getElementById('rules-table');
    dom.rulesSearch = document.getElementById('rules-search');
    dom.rulesFooter = document.getElementById('rules-footer-info');

    dom.ruleDialog = document.getElementById('rule-dialog');
    dom.openRuleDialogBtn = document.getElementById('open-rule-dialog-btn');
    dom.addRuleForm = document.getElementById('add-rule-form');
    dom.ruleAccount = document.getElementById('rule-account');
    dom.ruleCategory = document.getElementById('rule-category');
    dom.rulePattern = document.getElementById('rule-pattern');
    dom.ruleReplacement = document.getElementById('rule-replacement');
    dom.ruleMemo = document.getElementById('rule-memo');
    dom.ruleRegex = document.getElementById('rule-regex');
    dom.memoField = document.getElementById('memo-field');
    dom.ruleFormHint = document.getElementById('rule-form-hint');
    dom.submitBtn = document.getElementById('submit-btn');
    dom.cancelBtn = document.getElementById('cancel-btn');

    dom.categoriesList = document.getElementById('categories-list');
    dom.addCategoryForm = document.getElementById('add-category-form');
    dom.categoryName = document.getElementById('category-name');
    dom.categoriesFooter = document.getElementById('categories-footer-info');

    dom.accountsList = document.getElementById('accounts-list');
    dom.addAccountForm = document.getElementById('add-account-form');
    dom.accountName = document.getElementById('account-name');
    dom.accountsFooter = document.getElementById('accounts-footer-info');

    dom.ynabStatusDot = document.getElementById('ynab-status-dot');
    dom.ynabSetupCard = document.getElementById('ynab-setup-card');
    dom.ynabConnectCard = document.getElementById('ynab-connect-card');
    dom.ynabBudgetCard = document.getElementById('ynab-budget-card');
    dom.ynabMappingCard = document.getElementById('ynab-mapping-card');
    dom.ynabStatus = document.getElementById('ynab-status');
    dom.ynabConnectBtn = document.getElementById('ynab-connect-btn');
    dom.ynabDisconnectBtn = document.getElementById('ynab-disconnect-btn');
    dom.ynabRedirectInput = document.getElementById('ynab-redirect-uri');
    dom.ynabCopyRedirect = document.getElementById('ynab-copy-redirect');
    dom.ynabBudgetSelect = document.getElementById('ynab-budget-select');
    dom.ynabMappingRows = document.getElementById('ynab-mapping-rows');
    dom.ynabSaveMappingBtn = document.getElementById('ynab-save-mapping-btn');
    dom.ynabFooter = document.getElementById('ynab-footer-info');

    dom.toast = document.getElementById('toast');
    dom.toastMsg = document.getElementById('toast-msg');
}

function displayVersion() {
    try {
        const manifest = chrome.runtime.getManifest();
        const v = document.querySelector('.version');
        if (v && manifest.version) v.textContent = `v${manifest.version}`;
    } catch (_) { /* noop */ }
}

/* ───────── Bindings ───────── */
function bindEvents() {
    dom.railItems.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            location.hash = `#tab-${section}`;
        });
    });

    dom.btnExport.addEventListener('click', async () => {
        try {
            await StorageManager.exportData();
            showToast('Exportação iniciada.', 'success');
        } catch (e) {
            showToast(`Falha ao exportar: ${e.message || e}`, 'danger');
        }
    });

    dom.btnImport.addEventListener('click', () => dom.importFile.click());
    dom.importFile.addEventListener('change', async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        if (!confirm('Importar substituirá regras, categorias e contas atuais. Deseja continuar?')) {
            e.target.value = '';
            return;
        }
        try {
            await StorageManager.importData(file);
            showToast('Importação concluída.', 'success');
            await loadAccounts();
            await loadCategories();
            await loadRules();
            rebuildRuleAccountSelect();
            rebuildRuleCategorySelect();
        } catch (err) {
            showToast(`Falha ao importar: ${err.message || err}`, 'danger');
        } finally {
            e.target.value = '';
        }
    });

    dom.openRuleDialogBtn.addEventListener('click', () => openRuleDialog());
    dom.submitBtn.addEventListener('click', saveRule);
    dom.cancelBtn.addEventListener('click', () => closeRuleDialog());
    dom.addRuleForm.addEventListener('submit', (e) => { e.preventDefault(); saveRule(); });
    dom.ruleRegex.addEventListener('change', (e) => {
        dom.memoField.hidden = !e.target.checked;
    });

    dom.rulesSearch.addEventListener('input', (e) => {
        state.searchTerm = e.target.value.toLowerCase();
        state.page = 1;
        renderRulesTable();
    });

    dom.rulesTable.addEventListener('sort-change', (e) => {
        state.sortCol = e.detail.col;
        state.sortDir = e.detail.dir;
        renderRulesTable();
    });
    dom.rulesTable.addEventListener('page-change', (e) => {
        state.page = e.detail.page;
        renderRulesTable();
    });
    dom.rulesTable.addEventListener('rule-edit', (e) => editRule(e.detail.rule));
    dom.rulesTable.addEventListener('rule-toggle', (e) => toggleRule(e.detail.id));
    dom.rulesTable.addEventListener('rule-remove', (e) => removeRule(e.detail.id));

    dom.addCategoryForm.addEventListener('submit', (e) => { e.preventDefault(); addCategory(); });
    dom.categoriesList.addEventListener('chip-remove', (e) => removeCategory(e.detail.key));

    dom.addAccountForm.addEventListener('submit', (e) => { e.preventDefault(); addAccount(); });
    dom.accountsList.addEventListener('chip-remove', (e) => removeAccount(parseInt(e.detail.key, 10)));

    setupYnab();
}

/* ───────── Hash routing ───────── */
const HASH_MAP = {
    '#tab-rules': 'rules',
    '#tab-categories': 'categories',
    '#tab-accounts': 'accounts',
    '#tab-ynab': 'ynab'
};

function applyHashRoute() {
    const section = HASH_MAP[(location.hash || '').toLowerCase()] || 'rules';
    setActiveTab(section);
}

function setActiveTab(section) {
    state.activeTab = section;
    Object.entries(dom.tabs).forEach(([key, el]) => el.classList.toggle('is-active', key === section));
    dom.railItems.forEach((item) => item.classList.toggle('is-active', item.dataset.section === section));
    if (section === 'ynab') loadYnabSection();
}

/* ───────── Counts ───────── */
function refreshCounts() {
    if (dom.counts.rules) dom.counts.rules.textContent = String(state.rules.length);
    if (dom.counts.categories) dom.counts.categories.textContent = String(state.categories.length);
    if (dom.counts.accounts) dom.counts.accounts.textContent = String(state.accounts.length);
}

/* ───────── Rules ───────── */
async function loadRules() {
    const [rules, accounts, categories] = await Promise.all([
        StorageManager.getPayeeRules(),
        StorageManager.getAccounts(),
        StorageManager.getCategories()
    ]);
    state.accounts = accounts;
    state.categories = categories;
    const idToName = new Map(categories.map((c) => [c.id, c.name]));
    state.rules = rules.map((r) => ({
        ...r,
        _categoryName: r.categoryId ? (idToName.get(r.categoryId) || '') : (r.category || '')
    }));
    refreshCounts();
    renderRulesTable();
}

function filteredRules() {
    const q = state.searchTerm.trim().toLowerCase();
    if (!q) return state.rules;
    return state.rules.filter((rule) => {
        const accName = state.accounts.find((a) => a.id === rule.accountId);
        const accLabel = accName ? (accName.id === 0 ? 'Todas' : accName.name) : '';
        const blob = [accLabel, rule.pattern, rule.replacement, rule._categoryName, rule.memoTemplate]
            .map((s) => String(s || '').toLowerCase()).join(' ');
        return blob.includes(q);
    });
}

function renderRulesTable() {
    const rules = filteredRules();
    dom.rulesTable.rules = rules;
    dom.rulesTable.accounts = state.accounts;
    dom.rulesTable.sortCol = state.sortCol;
    dom.rulesTable.sortDir = state.sortDir;
    dom.rulesTable.page = state.page;
    dom.rulesTable.pageSize = state.pageSize;
    dom.rulesTable.requestUpdate();

    const total = rules.length;
    const totalAll = state.rules.length;
    dom.rulesFooter.textContent = total === totalAll
        ? `${total} regra${total === 1 ? '' : 's'}`
        : `${total} de ${totalAll} regras (filtradas)`;
}

function openRuleDialog(rule = null) {
    if (rule) {
        state.editingRuleId = rule.id;
        dom.ruleDialog.setAttribute('label', 'Editar regra');
        dom.ruleFormHint.textContent = rule.pattern ? `Editando: ${rule.pattern}` : '';
        dom.submitBtn.textContent = 'Salvar alterações';

        if (ruleAccountSelect) ruleAccountSelect.setValue(String(rule.accountId), true);
        dom.rulePattern.value = rule.pattern || '';
        dom.ruleReplacement.value = rule.replacement || '';
        if (ruleCategorySelect) {
            if (rule._categoryName) {
                if (!ruleCategorySelect.options[rule._categoryName]) {
                    ruleCategorySelect.addOption({ value: rule._categoryName, text: rule._categoryName });
                }
                ruleCategorySelect.setValue(rule._categoryName, true);
            } else {
                ruleCategorySelect.clear(true);
            }
        }
        dom.ruleRegex.checked = !!rule.isRegex;
        dom.ruleMemo.value = rule.memoTemplate || '';
        dom.memoField.hidden = !rule.isRegex;
    } else {
        clearRuleForm();
        dom.ruleDialog.setAttribute('label', 'Nova regra');
        dom.submitBtn.textContent = 'Adicionar regra';
    }
    dom.ruleDialog.open = true;
}

function closeRuleDialog() {
    dom.ruleDialog.open = false;
    clearRuleForm();
}

function clearRuleForm() {
    state.editingRuleId = null;
    if (ruleAccountSelect) ruleAccountSelect.clear(true);
    if (ruleCategorySelect) ruleCategorySelect.clear(true);
    dom.rulePattern.value = '';
    dom.ruleReplacement.value = '';
    dom.ruleMemo.value = '';
    dom.ruleRegex.checked = false;
    dom.memoField.hidden = true;
    dom.ruleFormHint.textContent = '';
}

async function saveRule() {
    const accountValue = ruleAccountSelect ? ruleAccountSelect.getValue() : dom.ruleAccount.value;
    const accountId = accountValue === '' ? NaN : parseInt(accountValue, 10);
    if (Number.isNaN(accountId)) { showToast('Conta é obrigatória.', 'danger'); return; }

    const pattern = dom.rulePattern.value.trim();
    if (!pattern) { showToast('Padrão é obrigatório.', 'danger'); return; }

    const isRegex = dom.ruleRegex.checked;
    if (isRegex) {
        try { new RegExp(pattern); }
        catch { showToast('Regex inválida.', 'danger'); return; }
    }

    const categoryName = ruleCategorySelect ? (ruleCategorySelect.getValue() || '').trim() : dom.ruleCategory.value.trim();
    const found = state.categories.find((c) => c.name.toLowerCase() === categoryName.toLowerCase());
    const categoryId = found ? String(found.id) : '';

    const payload = {
        accountId,
        pattern,
        replacement: dom.ruleReplacement.value.trim(),
        categoryId,
        category: categoryName,
        isRegex,
        memoTemplate: isRegex ? dom.ruleMemo.value.trim() : ''
    };

    if (state.editingRuleId) {
        const all = await StorageManager.getPayeeRules();
        const idx = all.findIndex((r) => r.id === state.editingRuleId);
        if (idx !== -1) {
            all[idx] = { ...all[idx], ...payload };
            await StorageManager.setPayeeRules(all);
        }
        showToast('Regra atualizada.', 'success');
    } else {
        await StorageManager.addPayeeRule(payload);
        showToast('Regra criada.', 'success');
    }

    closeRuleDialog();
    state.page = 1;
    await loadRules();
}

function editRule(rule) {
    openRuleDialog(rule);
}

async function removeRule(id) {
    if (!confirm('Remover esta regra?')) return;
    await StorageManager.removePayeeRule(id);
    const after = await StorageManager.getPayeeRules();
    const totalPages = Math.max(1, Math.ceil(after.length / state.pageSize));
    if (state.page > totalPages) state.page = totalPages;
    await loadRules();
}

async function toggleRule(id) {
    const all = await StorageManager.getPayeeRules();
    const rule = all.find((r) => r.id === id);
    if (!rule) return;
    await StorageManager.updatePayeeRule(id, { enabled: rule.enabled === false ? true : false });
    await loadRules();
}

/* ───────── Categories ───────── */
async function loadCategories() {
    state.categories = await StorageManager.getCategories();
    renderCategoriesChips();
    refreshCounts();
    rebuildRuleCategorySelect();
}

function renderCategoriesChips() {
    dom.categoriesList.items = state.categories.map((c) => ({
        key: c.name,
        label: c.name
    }));
    dom.categoriesList.emptyText = 'Nenhuma categoria cadastrada.';
    dom.categoriesList.requestUpdate();
    dom.categoriesFooter.textContent = `${state.categories.length} categoria${state.categories.length === 1 ? '' : 's'}`;
}

async function addCategory() {
    const name = dom.categoryName.value.trim();
    if (!name) return;
    if (state.categories.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
        showToast('Categoria já existe.', 'warn');
        return;
    }
    await StorageManager.setCategories(state.categories.concat([{ name }]));
    dom.categoryName.value = '';
    await loadCategories();
    showToast(`Categoria "${name}" adicionada.`, 'success');
}

async function removeCategory(name) {
    if (!confirm(`Remover categoria "${name}"?`)) return;
    await StorageManager.setCategories(state.categories.filter((c) => c.name !== name));
    await loadCategories();
}

/* ───────── Accounts ───────── */
async function loadAccounts() {
    state.accounts = await StorageManager.getAccounts();
    renderAccountsChips();
    refreshCounts();
    rebuildRuleAccountSelect();
}

function renderAccountsChips() {
    dom.accountsList.items = state.accounts.map((a) => ({
        key: String(a.id),
        label: a.id === 0 ? 'Todas as contas (coringa)' : a.name,
        locked: a.id >= 0 && a.id <= 3,
        tooltip: a.id >= 0 && a.id <= 3 ? 'Conta pré-definida — não pode ser removida' : ''
    }));
    dom.accountsList.emptyText = 'Nenhuma conta cadastrada.';
    dom.accountsList.requestUpdate();
    dom.accountsFooter.textContent = `${state.accounts.length} conta${state.accounts.length === 1 ? '' : 's'}`;
}

async function addAccount() {
    const name = dom.accountName.value.trim();
    if (!name) return;
    if (state.accounts.some((a) => a.name.toLowerCase() === name.toLowerCase())) {
        showToast('Conta já existe.', 'warn');
        return;
    }
    await StorageManager.addAccount({ name });
    dom.accountName.value = '';
    await loadAccounts();
    showToast(`Conta "${name}" adicionada.`, 'success');
}

async function removeAccount(id) {
    const acc = state.accounts.find((a) => a.id === id);
    if (!acc) return;
    if (!confirm(`Remover conta "${acc.name}"?`)) return;
    await StorageManager.removeAccount(id);
    await loadAccounts();
}

/* ───────── Tom Select for rule form ───────── */
function setupRuleTomSelects() {
    const { TomSelect } = window.__manageDeps || {};
    if (!TomSelect) return;

    rebuildRuleAccountSelect();
    rebuildRuleCategorySelect();
}

function rebuildRuleAccountSelect() {
    const { TomSelect } = window.__manageDeps || {};
    if (!TomSelect || !dom.ruleAccount) return;

    if (ruleAccountSelect) {
        ruleAccountSelect.destroy();
        ruleAccountSelect = null;
    }

    dom.ruleAccount.innerHTML = '<option value="">Selecione…</option>';
    state.accounts.forEach((a) => {
        const opt = document.createElement('option');
        opt.value = String(a.id);
        opt.textContent = a.id === 0 ? 'Todas as contas' : a.name;
        dom.ruleAccount.appendChild(opt);
    });

    ruleAccountSelect = new TomSelect(dom.ruleAccount, {
        create: false,
        maxItems: 1,
        sortField: { field: 'text', direction: 'asc' }
    });
}

function rebuildRuleCategorySelect() {
    const { TomSelect } = window.__manageDeps || {};
    if (!TomSelect || !dom.ruleCategory) return;

    if (ruleCategorySelect) {
        ruleCategorySelect.destroy();
        ruleCategorySelect = null;
    }

    dom.ruleCategory.innerHTML = '<option value="">Opcional</option>';
    state.categories.forEach((c) => {
        const opt = document.createElement('option');
        opt.value = c.name;
        opt.textContent = c.name;
        dom.ruleCategory.appendChild(opt);
    });

    ruleCategorySelect = new TomSelect(dom.ruleCategory, {
        create: true,
        createOnBlur: true,
        persist: false,
        maxItems: 1,
        sortField: { field: 'text', direction: 'asc' },
        onItemAdd: async (value) => {
            const name = String(value || '').trim();
            if (!name) return;
            if (state.categories.some((c) => c.name.toLowerCase() === name.toLowerCase())) return;
            await StorageManager.setCategories(state.categories.concat([{ name }]));
            state.categories = await StorageManager.getCategories();
            renderCategoriesChips();
            refreshCounts();
            showToast(`Categoria "${name}" adicionada.`, 'success');
        }
    });
}

/* ───────── YNAB ───────── */
function setupYnab() {
    dom.ynabCopyRedirect.addEventListener('click', async () => {
        try {
            await navigator.clipboard?.writeText(dom.ynabRedirectInput.value);
            showToast('Redirect URI copiada.', 'success');
        } catch (_) {
            showToast('Selecione e copie manualmente (Ctrl+C).', 'warn');
        }
    });

    dom.ynabConnectBtn.addEventListener('click', async () => {
        if (!state.ynabConfig?.clientId) {
            showToast('Configure ynab-config.js antes de conectar.', 'warn');
            return;
        }
        showToast('Abrindo popup de autenticação YNAB…');
        const response = await runtimeAPI.sendMessage({ type: 'YNAB_CONNECT' });
        if (!response?.ok) {
            showToast(response?.error || 'Falha ao conectar.', 'danger');
            return;
        }
        state.ynabConfig = response.config;
        showToast('Conectado.', 'success');
        await refreshYnabStatus();
        await loadYnabBudgets();
    });

    dom.ynabDisconnectBtn.addEventListener('click', async () => {
        const response = await runtimeAPI.sendMessage({ type: 'YNAB_DISCONNECT' });
        if (!response?.ok) {
            showToast(response?.error || 'Falha ao desconectar.', 'danger');
            return;
        }
        state.ynabConfig = response.config;
        state.ynabBudgets = [];
        state.ynabAccounts = [];
        showToast('Desconectado.', 'success');
        refreshYnabStatus();
        dom.ynabBudgetCard.hidden = true;
        dom.ynabMappingCard.hidden = true;
    });

    dom.ynabBudgetSelect.addEventListener('change', async (e) => {
        const budgetId = e.target.value;
        if (!budgetId) return;
        await loadYnabAccounts(budgetId);
    });

    dom.ynabSaveMappingBtn.addEventListener('click', async () => {
        const budgetId = dom.ynabBudgetSelect.value;
        const accountMap = {};
        document.querySelectorAll('[data-bank-group]').forEach((group) => {
            const bankId = group.dataset.bankGroup;
            const destinations = [];
            group.querySelectorAll('input[type="checkbox"]:checked').forEach((cb) => {
                destinations.push({ id: cb.value, name: cb.dataset.accountName || '' });
            });
            if (destinations.length > 0) accountMap[bankId] = destinations;
        });
        const response = await runtimeAPI.sendMessage({
            type: 'YNAB_SAVE_MAPPING',
            budgetId,
            accountMap
        });
        if (!response?.ok) {
            showToast(response?.error || 'Falha ao salvar mapeamento.', 'danger');
            return;
        }
        state.ynabConfig = response.config;
        applyYnabStatusDot();
        showToast('Mapeamento salvo. A sidebar já reflete a mudança.', 'success');
    });
}

async function loadYnabSection() {
    await refreshYnabStatus();
    if (state.ynabConfig?.connected) {
        await loadYnabBudgets();
    }
}

async function refreshYnabStatus() {
    const response = await runtimeAPI.sendMessage({ type: 'YNAB_GET_CONFIG' });
    if (!response?.ok) {
        dom.ynabStatus.textContent = 'Erro ao ler configuração YNAB.';
        return;
    }
    state.ynabConfig = response.config;
    const cfg = state.ynabConfig;

    dom.ynabRedirectInput.value = cfg.redirectUri || '(redirect URI indisponível — recarregue a extensão)';

    const hasClientId = !!cfg.clientId;
    dom.ynabSetupCard.hidden = hasClientId;
    dom.ynabConnectCard.hidden = !hasClientId;

    applyYnabStatusDot();

    if (!hasClientId) return;

    if (cfg.connected) {
        const expiresIn = cfg.tokenExpiresAt ? Math.max(0, cfg.tokenExpiresAt - Date.now()) : 0;
        const minutes = Math.floor(expiresIn / 60000);
        const who = cfg.userEmail || 'usuário YNAB';
        dom.ynabStatus.innerHTML = `<strong>Conectado</strong> como ${who} · token expira em ~${minutes} min`;
        dom.ynabConnectBtn.hidden = true;
        dom.ynabDisconnectBtn.hidden = false;
        markStep('ynab-connect-card', 'done');
    } else {
        dom.ynabStatus.textContent = 'Não conectado. Clique em "Conectar ao YNAB" para autenticar.';
        dom.ynabConnectBtn.hidden = false;
        dom.ynabDisconnectBtn.hidden = true;
        markStep('ynab-connect-card', 'active');
    }
}

function applyYnabStatusDot() {
    const cfg = state.ynabConfig;
    const ready = !!cfg?.connected && !!cfg?.budgetId && cfg?.accountMap && Object.keys(cfg.accountMap).length > 0;
    dom.ynabStatusDot.classList.remove('is-ready', 'is-warn');
    const railYnab = dom.railItems.find((el) => el.dataset.section === 'ynab');
    if (railYnab) {
        railYnab.classList.toggle('is-ready', ready);
        railYnab.classList.toggle('is-warn', cfg?.connected && !ready);
    }
}

async function loadYnabBudgets() {
    const response = await runtimeAPI.sendMessage({ type: 'YNAB_LIST_BUDGETS' });
    if (!response?.ok) {
        showToast(response?.error || 'Falha ao listar orçamentos.', 'danger');
        return;
    }
    state.ynabBudgets = response.budgets;
    dom.ynabBudgetSelect.innerHTML = '<option value="">Selecione um orçamento</option>';
    response.budgets.forEach((b) => {
        const opt = document.createElement('option');
        opt.value = b.id;
        opt.textContent = b.name;
        dom.ynabBudgetSelect.appendChild(opt);
    });
    dom.ynabBudgetCard.hidden = false;
    markStep('ynab-budget-card', state.ynabConfig?.budgetId ? 'done' : 'active');

    if (state.ynabConfig?.budgetId) {
        dom.ynabBudgetSelect.value = state.ynabConfig.budgetId;
        await loadYnabAccounts(state.ynabConfig.budgetId);
    }
}

async function loadYnabAccounts(budgetId) {
    const response = await runtimeAPI.sendMessage({ type: 'YNAB_LIST_ACCOUNTS', budgetId });
    if (!response?.ok) {
        showToast(response?.error || 'Falha ao listar contas.', 'danger');
        return;
    }
    state.ynabAccounts = response.accounts;

    const bankAccounts = Object.values(BankUtils.ACCOUNTS).filter((a) => a.accountId !== 'all');
    dom.ynabMappingRows.innerHTML = '';
    const savedMap = state.ynabConfig?.accountMap || {};

    bankAccounts.forEach((bank) => {
        const savedIds = new Set((savedMap[bank.accountId] || []).map((entry) => entry.id || entry));
        const group = document.createElement('div');
        group.className = 'ynab-mapping-group';
        group.dataset.bankGroup = bank.accountId;

        const head = document.createElement('div');
        head.className = 'ynab-mapping-head';
        head.textContent = bank.displayName;
        group.appendChild(head);

        const hint = document.createElement('div');
        hint.className = 'ynab-mapping-hint';
        hint.textContent = 'Marque todas as contas YNAB que recebem transações deste tipo.';
        group.appendChild(hint);

        const options = document.createElement('div');
        options.className = 'ynab-mapping-options';
        state.ynabAccounts.forEach((acc) => {
            const label = document.createElement('label');
            label.className = 'cbx';
            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.value = acc.id;
            cb.dataset.accountName = acc.name;
            if (savedIds.has(acc.id)) cb.checked = true;
            label.appendChild(cb);
            const span = document.createElement('span');
            span.textContent = `${acc.name}`;
            const muted = document.createElement('span');
            muted.style.color = 'var(--muted)';
            muted.style.marginLeft = '4px';
            muted.textContent = `(${acc.type})`;
            span.appendChild(muted);
            label.appendChild(span);
            options.appendChild(label);
        });
        group.appendChild(options);
        dom.ynabMappingRows.appendChild(group);
    });

    dom.ynabMappingCard.hidden = false;
    markStep('ynab-mapping-card', Object.keys(savedMap).length > 0 ? 'done' : 'active');
}

function markStep(id, state) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('is-active', 'is-done');
    if (state === 'active') el.classList.add('is-active');
    else if (state === 'done') el.classList.add('is-done');
}

/* ───────── Toast ───────── */
function showToast(message, kind = 'success') {
    if (toastTimer) clearTimeout(toastTimer);
    dom.toastMsg.textContent = message;
    dom.toast.classList.remove('is-danger', 'is-warn');
    if (kind === 'danger') dom.toast.classList.add('is-danger');
    else if (kind === 'warn') dom.toast.classList.add('is-warn');
    dom.toast.hidden = false;
    toastTimer = setTimeout(() => { dom.toast.hidden = true; }, 3600);
}
