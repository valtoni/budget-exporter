/* global StorageManager, BankUtils */
// Orchestrator for the new sidebar. Reuses the global StorageManager and
// BankUtils loaded via classic <script> tags before this module runs.

const runtimeAPI = typeof browser !== 'undefined' ? browser.runtime : chrome.runtime;
const downloadsAPI = typeof browser !== 'undefined' ? browser.downloads : chrome.downloads;
const storageAPI = typeof browser !== 'undefined' ? browser.storage : chrome.storage;

const state = {
    review: null,
    filter: 'all',
    categories: [],
    ruleDraft: null,
    cutoffDate: '',
    ynabConfig: null,
    ynabAccountId: null
};

const dom = {};
let cutoffPicker = null;
let categoryTomSelect = null;
let toastTimer = null;

document.addEventListener('DOMContentLoaded', init);

async function init() {
    cacheDom();
    initializeDefaultCutoff();
    bindEvents();
    await StorageManager.init();
    await loadCategories();
    await refreshYnabConfig();

    setupCutoffPicker();

    const current = await getActiveReview();
    // Race guard: background may have broadcast ACTIVE_REVIEW_UPDATED while we
    // were awaiting (the listener registered in bindEvents fires immediately).
    // If state.review already exists, the broadcast won — don't clobber it
    // with the older stored copy.
    if (state.review) return;
    if (current) {
        applyReview(current);
    } else {
        await refreshReview();
    }
}

function cacheDom() {
    dom.shell = document.querySelector('.app-shell');
    dom.accountName = document.getElementById('ex-account-name');
    dom.cutoffTrigger = document.getElementById('ex-cutoff-trigger');
    dom.cutoffLabel = document.getElementById('ex-cutoff-label');
    dom.cutoffInput = document.getElementById('ex-cutoff-input');
    dom.filters = document.getElementById('ex-filters');
    dom.grid = document.getElementById('ex-grid');
    dom.error = document.getElementById('ex-error');
    dom.categoryOptions = document.getElementById('category-options');
    dom.selectedCount = document.getElementById('ex-selected-count');
    dom.refreshBtn = document.getElementById('ex-refresh');
    dom.menu = document.getElementById('ex-menu');
    dom.menuExport = document.getElementById('menu-export');
    dom.menuChangeDest = document.getElementById('menu-change-dest');
    dom.menuManage = document.getElementById('menu-manage');
    dom.primary = document.getElementById('ex-primary');
    dom.primaryLabel = document.getElementById('ex-primary-label');
    dom.secondary = document.getElementById('ex-secondary');
    dom.secondaryLabel = document.getElementById('ex-secondary-label');

    dom.ruleDialog = document.getElementById('rule-dialog');
    dom.ruleForm = document.getElementById('rule-form');
    dom.ruleContext = document.getElementById('rule-context');
    dom.ruleAccountName = document.getElementById('rule-account-name');
    dom.rulePattern = document.getElementById('rule-pattern');
    dom.ruleReplacement = document.getElementById('rule-replacement');
    dom.ruleCategory = document.getElementById('rule-category');
    dom.ruleMemo = document.getElementById('rule-memo');
    dom.ruleRegex = document.getElementById('rule-regex');
    dom.ruleMessage = document.getElementById('rule-message');
    dom.ruleSubmit = document.getElementById('rule-submit');
    dom.ruleCancel = document.getElementById('rule-cancel');

    dom.destDialog = document.getElementById('dest-dialog');
    dom.destSelect = document.getElementById('dest-select');
    dom.destConfirm = document.getElementById('dest-confirm');

    dom.toast = document.getElementById('ex-toast');
    dom.toastMsg = document.getElementById('ex-toast-msg');
}

function bindEvents() {
    dom.filters.addEventListener('click', onFilterClick);

    dom.grid.addEventListener('tx-change', onTxChange);
    dom.grid.addEventListener('tx-amount-change', onTxAmountChange);
    dom.grid.addEventListener('tx-toggle-selected', onTxToggleSelected);
    dom.grid.addEventListener('tx-toggle-direction', onTxToggleDirection);
    dom.grid.addEventListener('tx-toggle-splits', onTxToggleSplits);
    dom.grid.addEventListener('tx-create-rule', onTxCreateRule);
    dom.grid.addEventListener('tx-split-change', onSplitChange);
    dom.grid.addEventListener('tx-split-add', onSplitAdd);
    dom.grid.addEventListener('tx-split-remove', onSplitRemove);
    dom.grid.addEventListener('tx-split-restore', onSplitRestore);
    dom.grid.addEventListener('tx-select-all', onSelectAll);

    dom.refreshBtn.addEventListener('click', onRefreshClick);
    dom.menuExport.addEventListener('click', () => { closeMenu(); exportSelected(); });
    dom.menuChangeDest.addEventListener('click', () => { closeMenu(); openDestinationDialog(); });
    dom.menuManage.addEventListener('click', () => { closeMenu(); openManagePage(); });
    dom.primary.addEventListener('click', onPrimaryAction);
    dom.secondary.addEventListener('click', onSecondaryAction);

    dom.ruleSubmit.addEventListener('click', saveRule);
    dom.ruleCancel.addEventListener('click', () => closeDialog(dom.ruleDialog));
    dom.ruleForm.addEventListener('submit', (e) => { e.preventDefault(); saveRule(); });

    dom.destConfirm.addEventListener('click', () => {
        state.ynabAccountId = dom.destSelect.value;
        persistYnabPreference();
        closeDialog(dom.destDialog);
        showToast('Destino YNAB atualizado.', 'success');
    });

    runtimeAPI.onMessage.addListener((message) => {
        if (message.type === 'ACTIVE_REVIEW_UPDATED' && message.review) {
            applyReview(message.review);
        }
    });

    // Detect YNAB config changes made in manage.html (or anywhere else): the
    // sidebar lives in a separate page context, so without this listener it
    // would only learn about a fresh connection on the next sidebar reload.
    if (storageAPI?.onChanged?.addListener) {
        storageAPI.onChanged.addListener((changes, area) => {
            if (area !== 'local') return;
            if (changes.ynab_config) refreshYnabConfig();
        });
    }
}

function closeMenu() {
    if (!dom.menu) return;
    dom.menu.open = false;
}

function closeDialog(dialog) {
    if (!dialog) return;
    dialog.open = false;
}

function openDialog(dialog) {
    if (!dialog) return;
    dialog.open = true;
}

/* ───────── Cutoff date trigger ───────── */
function initializeDefaultCutoff() {
    const now = new Date();
    const fallback = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    state.cutoffDate = toIsoDate(fallback);
    renderCutoffLabel();
}

function setupCutoffPicker() {
    const { flatpickr, Portuguese } = window.__sidebarDeps || {};
    if (!flatpickr) return;

    cutoffPicker = flatpickr(dom.cutoffInput, {
        defaultDate: state.cutoffDate || undefined,
        locale: Portuguese,
        dateFormat: 'Y-m-d',
        positionElement: dom.cutoffTrigger,
        appendTo: document.body,
        onChange: (selected) => {
            if (!selected.length) return;
            state.cutoffDate = toIsoDate(selected[0]);
            applyCutoffAndRender();
        },
        onClose: () => {
            // optional: nothing
        }
    });

    dom.cutoffTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        cutoffPicker.toggle();
    });
}

function renderCutoffLabel() {
    if (!dom.cutoffLabel) return;
    dom.cutoffLabel.textContent = state.cutoffDate || 'sem corte';
}

/* ───────── Review lifecycle ───────── */
async function refreshReview() {
    hideError();
    const result = await runtimeAPI.sendMessage({ type: 'REFRESH_ACTIVE_TAB_REVIEW' });
    if (result?.review) {
        applyReview(result.review);
        return;
    }
    const current = await getActiveReview();
    if (current) applyReview(current);
}

async function getActiveReview() {
    const result = await runtimeAPI.sendMessage({ type: 'GET_ACTIVE_REVIEW' });
    return result?.review || null;
}

function applyReview(review) {
    const wasEmpty = !state.review;
    const priorById = wasEmpty
        ? new Map()
        : new Map(state.review.transactions.map((tx) => [tx.id, tx]));

    state.review = JSON.parse(JSON.stringify(review));
    normalizeReviewShape();

    const newIds = new Set();
    if (!wasEmpty) {
        // Merge user mutations by tx.id so auto-refresh (background broadcasts)
        // never wipes out manual selections, edits, or splits. Field-by-field:
        // preserve `old` only when the user explicitly edited it (tracked via
        // _edited flags). Otherwise let the fresh capture win — that way newly
        // created rules propagate to existing rows.
        state.review.transactions = state.review.transactions.map((tx) => {
            const old = priorById.get(tx.id);
            if (!old) {
                newIds.add(tx.id);
                return tx;
            }
            const edited = old._edited || {};
            const pick = (field) => (edited[field] ? old[field] : tx[field]);
            return {
                ...tx,
                // Always preserved (no concept of "fresh capture" overrides them):
                selected: old.selected,
                splits: old.splits,
                ynabSentAt: old.ynabSentAt,
                _edited: old._edited,
                // Preserved only if the user touched the field:
                payeeFinal: pick('payeeFinal'),
                categoryFinal: pick('categoryFinal'),
                memoFinal: pick('memoFinal'),
                dateIso: pick('dateIso'),
                inflow: pick('inflow'),
                outflow: pick('outflow')
            };
        });
    }

    // First load → apply cutoff to everything. Subsequent applies preserve user
    // selections for matched-by-id items, but still apply cutoff to genuinely
    // new items (transition cases where ids changed between captures).
    applyCutoffToReview({
        deselectExcluded: wasEmpty,
        newIds: wasEmpty ? null : newIds
    });
    recalculateSummary();
    syncAccountHeader();
    renderFilters();
    renderGrid();
    refreshYnabButtonState();
}

function normalizeReviewShape() {
    if (!state.review?.transactions) return;
    state.review.transactions.forEach((tx) => {
        if (!Array.isArray(tx.splits)) tx.splits = null;
        if (typeof tx.ynabSentAt !== 'string') tx.ynabSentAt = null;
    });
}

function syncAccountHeader() {
    const name = state.review?.account?.displayName || 'Sem conta detectada';
    dom.accountName.textContent = name;
    if (state.ruleDraft && state.review?.account) {
        dom.ruleAccountName.value = state.review.account.displayName;
    }
}

function applyCutoffAndRender() {
    // User actively changed the cutoff date → enforce the new selection.
    applyCutoffToReview({ deselectExcluded: true });
    recalculateSummary();
    renderCutoffLabel();
    renderFilters();
    renderGrid();
}

function applyCutoffToReview({ deselectExcluded = false, newIds = null } = {}) {
    if (!state.review?.transactions) return;
    // Map (not forEach) so each tx is a fresh object reference. Lit compares
    // by reference on `.tx=${tx}` and would otherwise skip the row re-render.
    state.review.transactions = state.review.transactions.map((tx) => {
        const isNew = newIds ? newIds.has(tx.id) : false;
        const shouldEnforce = deselectExcluded || isNew;
        if (!state.cutoffDate) {
            const next = { ...tx, cutoffExcluded: false };
            if (shouldEnforce && tx.cutoffExcluded) next.selected = true;
            return next;
        }
        const comparable = normalizeComparableDate(tx.dateIso || tx.dateRaw || '');
        const excluded = comparable ? comparable < state.cutoffDate : false;
        const next = { ...tx, cutoffExcluded: excluded };
        if (shouldEnforce && excluded) next.selected = false;
        return next;
    });
}

function normalizeComparableDate(value) {
    return /^\d{4}-\d{2}-\d{2}$/.test(String(value || '')) ? value : '';
}

function recalculateSummary() {
    if (!state.review) return;
    state.review.summary = state.review.transactions.reduce((acc, tx) => {
        acc.total += 1;
        acc.selected += tx.selected === false ? 0 : 1;
        if (!acc[tx.matchStatus]) acc[tx.matchStatus] = 0;
        acc[tx.matchStatus] += 1;
        return acc;
    }, { total: 0, selected: 0, matched: 0, suggested: 0, unmatched: 0 });
}

/* ───────── Render: filters + grid + footer ───────── */
function renderFilters() {
    const summary = state.review?.summary || { total: 0, matched: 0, suggested: 0, unmatched: 0 };
    // "Sem regra" = qualquer tx que ainda não tem regra aplicada (sugestões +
    // verdadeiramente novas). A distinção interna fica preservada pro draft do
    // ⚡ "Criar regra", mas a UI agrupa.
    const unmatchedTotal = (summary.unmatched || 0) + (summary.suggested || 0);
    const counts = {
        all: summary.total || 0,
        matched: summary.matched || 0,
        unmatched: unmatchedTotal
    };
    dom.filters.querySelectorAll('[data-filter]').forEach((btn) => {
        const f = btn.dataset.filter;
        btn.classList.toggle('is-active', state.filter === f);
        const count = btn.querySelector('[data-count]');
        if (count) count.textContent = String(counts[f] ?? 0);
    });

    renderSelectedCount();
}

function renderSelectedCount() {
    const n = state.review?.summary?.selected ?? 0;
    dom.selectedCount.textContent = String(n);
}

function renderGrid() {
    const items = (state.review?.transactions || []).filter((tx) => {
        if (state.filter === 'all') return true;
        if (state.filter === 'matched') return tx.matchStatus === 'matched';
        // 'unmatched' groups both suggested and truly unmatched.
        return tx.matchStatus !== 'matched';
    });
    dom.grid.transactions = items;
    dom.grid.expandedSplits = new Set(
        items.filter((tx) => Array.isArray(tx.splits) && tx.splits.length > 0).map((tx) => tx.id)
    );
    dom.grid.requestUpdate();
}

function onFilterClick(event) {
    const btn = event.target.closest('[data-filter]');
    if (!btn) return;
    state.filter = btn.dataset.filter;
    renderFilters();
    renderGrid();
}

/* ───────── Grid event handlers ───────── */
function txById(id) {
    return state.review?.transactions.find((tx) => tx.id === id) || null;
}

// Replaces the transaction with a shallow clone so Lit detects the prop change
// and re-renders the row. Mutating in place keeps the same object reference,
// which Lit (correctly) treats as no-change and skips.
function mutateTx(id, mutator) {
    const arr = state.review?.transactions;
    if (!arr) return null;
    const idx = arr.findIndex((tx) => tx.id === id);
    if (idx === -1) return null;
    const next = { ...arr[idx] };
    mutator(next);
    arr[idx] = next;
    return next;
}

function onTxChange(event) {
    const { id, field, value } = event.detail;
    mutateTx(id, (tx) => {
        tx[field] = value;
        markEdited(tx, field);
    });
    persistReview();
}

function onTxAmountChange(event) {
    const { id, value } = event.detail;
    const parsed = parseFloat(String(value).replace(',', '.'));
    const v = Number.isFinite(parsed) && parsed >= 0 ? parsed.toFixed(2) : '';
    mutateTx(id, (tx) => {
        const dir = getTxDirection(tx);
        if (dir === 'in') { tx.inflow = v; tx.outflow = ''; }
        else { tx.outflow = v; tx.inflow = ''; }
        markEdited(tx, 'inflow');
        markEdited(tx, 'outflow');
    });
    persistReview();
}

function markEdited(tx, field) {
    if (!tx._edited) tx._edited = {};
    tx._edited[field] = true;
}

function onTxToggleSelected(event) {
    const { id, selected } = event.detail;
    const tx = mutateTx(id, (t) => { t.selected = selected; });
    if (!tx) return;
    recalculateSummary();
    renderFilters();
    renderGrid();
    persistReview();
}

function onTxToggleDirection(event) {
    mutateTx(event.detail.id, (tx) => {
        const dir = getTxDirection(tx);
        if (dir === 'out') { tx.inflow = tx.outflow || ''; tx.outflow = ''; }
        else { tx.outflow = tx.inflow || ''; tx.inflow = ''; }
        markEdited(tx, 'inflow');
        markEdited(tx, 'outflow');
    });
    renderGrid();
    persistReview();
}

function onTxToggleSplits(event) {
    mutateTx(event.detail.id, (tx) => {
        if (Array.isArray(tx.splits) && tx.splits.length > 0) {
            tx.splits = null;
        } else {
            const total = parseFloat(getTxAbsAmount(tx)) || 0;
            tx.splits = [{
                id: `split-${Date.now()}-0`,
                amount: total > 0 ? total.toFixed(2) : '',
                category: '',
                memo: ''
            }];
        }
    });
    renderGrid();
    persistReview();
}

function onTxCreateRule(event) {
    const tx = txById(event.detail.id);
    if (!tx) return;
    const draft = tx.suggestedRuleDraft || {
        accountId: tx.accountId,
        bankAccountId: tx.bankAccountId,
        accountName: tx.accountName,
        pattern: tx.payeeNormalized || tx.payeeRaw,
        replacement: tx.payeeFinal || tx.payeeRaw,
        category: tx.categoryFinal || '',
        categoryId: '',
        memoTemplate: tx.memoFinal || '',
        isRegex: false
    };
    openDialog(dom.ruleDialog);
    // Initialize Tom Select after dialog is visible (animation frame).
    requestAnimationFrame(() => {
        ensureCategoryTomSelect();
        syncTomSelectOptions();
        fillRuleForm(draft, `Baseado em: ${tx.payeeRaw}`);
    });
}

function onSplitChange(event) {
    const { id, splitId, field, value } = event.detail;
    mutateTx(id, (tx) => {
        const splits = Array.isArray(tx.splits) ? [...tx.splits] : [];
        const sIdx = splits.findIndex((s) => s.id === splitId);
        if (sIdx === -1) return;
        splits[sIdx] = { ...splits[sIdx], [field]: value };
        tx.splits = splits;
    });
    persistReview();
}

function onSplitAdd(event) {
    mutateTx(event.detail.id, (tx) => {
        const splits = Array.isArray(tx.splits) ? [...tx.splits] : [];
        const total = parseFloat(getTxAbsAmount(tx)) || 0;
        const used = splits.reduce((sum, s) => sum + (parseFloat(s.amount) || 0), 0);
        const suggested = Math.max(0, round2(total - used));
        splits.push({
            id: `split-${Date.now()}-${splits.length}`,
            amount: suggested > 0 ? suggested.toFixed(2) : '',
            category: '',
            memo: ''
        });
        tx.splits = splits;
    });
    renderGrid();
    persistReview();
}

function onSplitRemove(event) {
    mutateTx(event.detail.id, (tx) => {
        if (!Array.isArray(tx.splits)) return;
        const next = tx.splits.filter((s) => s.id !== event.detail.splitId);
        tx.splits = next.length === 0 ? null : next;
    });
    renderGrid();
    persistReview();
}

function onSplitRestore(event) {
    mutateTx(event.detail.id, (tx) => { tx.splits = null; });
    renderGrid();
    persistReview();
}

function onSelectAll(event) {
    if (!state.review?.transactions) return;
    const desired = !!event.detail.selected;
    state.review.transactions = state.review.transactions.map((tx) =>
        tx.cutoffExcluded ? tx : { ...tx, selected: desired }
    );
    recalculateSummary();
    renderFilters();
    renderGrid();
    persistReview();
}

/* ───────── Categories ───────── */
async function loadCategories() {
    state.categories = await StorageManager.getCategories();
    renderCategoryDatalist();
    rebuildCategorySelectOptions();
    if (categoryTomSelect) syncTomSelectOptions();
}

function renderCategoryDatalist() {
    dom.categoryOptions.innerHTML = '';
    state.categories.forEach((cat) => {
        const opt = document.createElement('option');
        opt.value = cat.name;
        dom.categoryOptions.appendChild(opt);
    });
}

function rebuildCategorySelectOptions() {
    dom.ruleCategory.innerHTML = '<option value="">Opcional</option>';
    state.categories.forEach((cat) => {
        const opt = document.createElement('option');
        opt.value = cat.name;
        opt.textContent = cat.name;
        dom.ruleCategory.appendChild(opt);
    });
}

function ensureCategoryTomSelect() {
    if (categoryTomSelect) return categoryTomSelect;
    const { TomSelect } = window.__sidebarDeps || {};
    if (!TomSelect) return null;

    categoryTomSelect = new TomSelect(dom.ruleCategory, {
        create: true,
        createOnBlur: true,
        persist: false,
        maxItems: 1,
        sortField: { field: 'text', direction: 'asc' },
        onItemAdd: async (value) => {
            const name = String(value || '').trim();
            if (!name) return;
            if (state.categories.some((c) => c.name.toLowerCase() === name.toLowerCase())) return;
            state.categories = state.categories.concat([{ name }]);
            try {
                await StorageManager.setCategories(state.categories);
                const opt = document.createElement('option');
                opt.value = name;
                dom.categoryOptions.appendChild(opt);
                showToast(`Categoria "${name}" adicionada.`, 'success');
            } catch (err) {
                showToast(`Falha ao salvar categoria: ${err.message || err}`, 'error');
            }
        }
    });
    return categoryTomSelect;
}

function syncTomSelectOptions() {
    if (!categoryTomSelect) return;
    categoryTomSelect.clearOptions();
    state.categories.forEach((cat) => {
        categoryTomSelect.addOption({ value: cat.name, text: cat.name });
    });
    categoryTomSelect.refreshOptions(false);
}

/* ───────── Rule dialog ───────── */
function fillRuleForm(draft, contextLabel) {
    state.ruleDraft = { ...draft };
    dom.ruleContext.textContent = contextLabel || 'Rascunho pronto';
    dom.ruleAccountName.value = draft.accountName || '';
    dom.rulePattern.value = draft.pattern || '';
    dom.ruleReplacement.value = draft.replacement || '';
    dom.ruleMemo.value = draft.memoTemplate || '';
    dom.ruleRegex.checked = !!draft.isRegex;
    setRuleMessage('', '');

    if (categoryTomSelect) {
        if (draft.category) {
            if (!categoryTomSelect.options[draft.category]) {
                categoryTomSelect.addOption({ value: draft.category, text: draft.category });
            }
            categoryTomSelect.setValue(draft.category, true);
        } else {
            categoryTomSelect.clear(true);
        }
    } else {
        dom.ruleCategory.value = draft.category || '';
    }
}

function clearRuleForm() {
    state.ruleDraft = null;
    dom.ruleContext.textContent = 'Baseado em uma transação';
    dom.ruleAccountName.value = '';
    dom.rulePattern.value = '';
    dom.ruleReplacement.value = '';
    dom.ruleMemo.value = '';
    dom.ruleRegex.checked = false;
    if (categoryTomSelect) categoryTomSelect.clear(true);
    setRuleMessage('', '');
}

function setRuleMessage(text, tone) {
    if (!text) {
        dom.ruleMessage.hidden = true;
        dom.ruleMessage.textContent = '';
        dom.ruleMessage.className = 'rule-message';
        return;
    }
    dom.ruleMessage.hidden = false;
    dom.ruleMessage.textContent = text;
    dom.ruleMessage.className = `rule-message ${tone}`;
}

async function saveRule() {
    if (!state.ruleDraft) {
        setRuleMessage('Escolha uma transação ou sugestão antes de salvar.', 'error');
        return;
    }

    const pattern = dom.rulePattern.value.trim();
    if (!pattern) {
        setRuleMessage('Padrão obrigatório.', 'error');
        return;
    }

    if (dom.ruleRegex.checked) {
        try { new RegExp(pattern); }
        catch { setRuleMessage('Regex inválida.', 'error'); return; }
    }

    const categoryName = categoryTomSelect
        ? (categoryTomSelect.getValue() || '').trim()
        : dom.ruleCategory.value.trim();
    const category = state.categories.find((c) => c.name.toLowerCase() === categoryName.toLowerCase());

    await StorageManager.addPayeeRule({
        accountId: state.ruleDraft.accountId,
        pattern,
        replacement: dom.ruleReplacement.value.trim(),
        category: categoryName,
        categoryId: category?.id || '',
        isRegex: dom.ruleRegex.checked,
        memoTemplate: dom.ruleMemo.value.trim()
    });

    closeDialog(dom.ruleDialog);
    showToast('Regra salva. Atualizando…', 'success');
    clearRuleForm();
    await refreshReview();
}

/* ───────── YNAB integration ───────── */
async function refreshYnabConfig() {
    try {
        const response = await runtimeAPI.sendMessage({ type: 'YNAB_GET_CONFIG' });
        state.ynabConfig = response?.config || null;
    } catch {
        state.ynabConfig = null;
    }
    refreshYnabButtonState();
}

function refreshYnabButtonState() {
    const cfg = state.ynabConfig;
    const bankAccountId = state.review?.account?.accountId;
    const destinations = bankAccountId && cfg?.accountMap ? (cfg.accountMap[bankAccountId] || []) : [];
    const ready = !!cfg?.connected && !!cfg?.budgetId && destinations.length > 0;

    if (ready) {
        // YNAB pronto: primário envia, secundário escondido, CSV vai no menu.
        dom.primaryLabel.textContent = 'Enviar YNAB';
        dom.primary.dataset.action = 'ynab';
        dom.primary.setAttribute('variant', 'brand');
        dom.secondary.hidden = true;
        dom.menuExport.hidden = false;
        dom.menuChangeDest.hidden = destinations.length <= 1;

        const lastUsedId = cfg?.lastUsedYnabAccount?.[bankAccountId];
        if (lastUsedId && destinations.some((d) => d.id === lastUsedId)) {
            state.ynabAccountId = lastUsedId;
        } else if (!state.ynabAccountId || !destinations.some((d) => d.id === state.ynabAccountId)) {
            state.ynabAccountId = destinations[0].id;
        }
    } else {
        // YNAB não pronto: primário exporta CSV, secundário leva à configuração.
        dom.primaryLabel.textContent = 'Exportar CSV';
        dom.primary.dataset.action = 'csv';
        dom.primary.setAttribute('variant', 'brand');
        dom.secondaryLabel.textContent = 'Configurar YNAB';
        dom.secondary.dataset.action = 'configure-ynab';
        dom.secondary.hidden = false;
        dom.menuExport.hidden = true;
        dom.menuChangeDest.hidden = true;
        state.ynabAccountId = null;
    }
}

function openDestinationDialog() {
    const cfg = state.ynabConfig;
    const bankAccountId = state.review?.account?.accountId;
    const destinations = bankAccountId && cfg?.accountMap ? (cfg.accountMap[bankAccountId] || []) : [];
    if (destinations.length <= 1) return;

    dom.destSelect.innerHTML = '';
    destinations.forEach((d) => {
        const opt = document.createElement('option');
        opt.value = d.id;
        opt.textContent = d.name || d.id;
        dom.destSelect.appendChild(opt);
    });
    if (state.ynabAccountId) dom.destSelect.value = state.ynabAccountId;
    openDialog(dom.destDialog);
}

function persistYnabPreference() {
    // No backend persist call — config is owned by background; preference will
    // be persisted server-side when the send happens (background sets lastUsedYnabAccount).
}

function onPrimaryAction() {
    if (dom.primary.dataset.action === 'ynab') sendToYnab();
    else exportSelected();
}

function onSecondaryAction() {
    if (dom.secondary.dataset.action === 'configure-ynab') openManagePage('#tab-ynab');
}

async function onRefreshClick() {
    if (dom.refreshBtn.classList.contains('is-spinning')) return;
    dom.refreshBtn.classList.add('is-spinning');
    try {
        await refreshReview();
    } finally {
        setTimeout(() => dom.refreshBtn.classList.remove('is-spinning'), 400);
    }
}

/* ───────── Export / Send ───────── */
async function exportSelected() {
    if (!state.review || !state.review.transactions?.length) return;
    hideError();

    const selected = state.review.transactions.filter((tx) => tx.selected !== false);
    if (selected.length === 0) {
        showError('Selecione ao menos uma transação para exportar.');
        return;
    }

    const validationError = validateForExport(selected);
    if (validationError) { showError(validationError); return; }

    const csv = BankUtils.transactionsToCsv(state.review.transactions);
    const filename = `${state.review.account?.accountId || 'budget-export'}-${new Date().toISOString().slice(0, 10)}.csv`;
    try {
        await downloadCsv(csv, filename);
        showToast('Exportação iniciada.', 'success');
    } catch (error) {
        showError(`Falha ao exportar: ${error.message || error}`);
    }
}

async function sendToYnab() {
    if (!state.review || !state.review.transactions?.length) return;
    hideError();

    const selected = state.review.transactions.filter((tx) => tx.selected !== false);
    if (selected.length === 0) {
        showError('Selecione ao menos uma transação para enviar.');
        return;
    }

    const validationError = validateForExport(selected);
    if (validationError) { showError(validationError); return; }

    showSyncOverlay();
    const minDelay = new Promise((r) => setTimeout(r, 600));

    let response;
    try {
        [response] = await Promise.all([
            runtimeAPI.sendMessage({
                type: 'YNAB_SEND_TRANSACTIONS',
                transactions: selected,
                ynabAccountId: state.ynabAccountId || null
            }),
            minDelay
        ]);
    } catch (error) {
        hideSyncOverlay();
        showError(error?.message || 'Erro de rede ao enviar ao YNAB.');
        return;
    }

    if (!response?.ok) {
        hideSyncOverlay();
        showError(response?.error || 'Falha ao enviar ao YNAB.');
        return;
    }

    const { created = [], duplicates = [], skipped = [], sentIds = [] } = response.result || {};
    const now = new Date().toISOString();
    const sentSet = new Set(sentIds);
    state.review.transactions.forEach((tx) => {
        if (sentSet.has(tx.id)) tx.ynabSentAt = now;
    });

    recalculateSelectionsAfterSend();
    await persistReview();
    recalculateSummary();
    renderFilters();
    renderGrid();
    hideSyncOverlay();

    const parts = [`${created.length} criadas`];
    if (duplicates.length) parts.push(`${duplicates.length} duplicadas (ignoradas pelo YNAB)`);
    if (skipped.length) parts.push(`${skipped.length} puladas (sem mapeamento)`);
    showToast(`YNAB: ${parts.join(' · ')}`, 'success');
}

function recalculateSelectionsAfterSend() {
    if (!state.review?.transactions) return;
    const today = new Date().toISOString().slice(0, 10);
    state.review.transactions.forEach((tx) => {
        if (tx.ynabSentAt) { tx.selected = false; return; }
        tx.selected = (tx.dateIso || '') >= today;
    });
}

function validateForExport(transactions) {
    for (const tx of transactions) {
        const hasAmount = (tx.outflow && String(tx.outflow).trim() !== '') ||
                          (tx.inflow && String(tx.inflow).trim() !== '');
        if (!hasAmount) {
            return `Transação "${tx.payeeRaw || tx.id}" sem valor (entrada ou saída).`;
        }
        if (Array.isArray(tx.splits) && tx.splits.length > 0) {
            const total = parseFloat(getTxAbsAmount(tx)) || 0;
            const partial = tx.splits.reduce((sum, s) => sum + (parseFloat(s.amount) || 0), 0);
            if (Math.abs(round2(total - partial)) >= 0.005) {
                return `Splits de "${tx.payeeRaw || tx.id}" somam ${partial.toFixed(2)}, total é ${total.toFixed(2)}.`;
            }
            const missing = tx.splits.find((s) => !s.category || !String(s.category).trim());
            if (missing) {
                return `Splits de "${tx.payeeRaw || tx.id}" têm linha sem categoria.`;
            }
        }
    }
    return null;
}

async function persistReview() {
    if (!state.review) return;
    try {
        await runtimeAPI.sendMessage({ type: 'STORE_ACTIVE_REVIEW', review: state.review });
    } catch { /* non-fatal */ }
}

async function openManagePage(hash = '') {
    await runtimeAPI.sendMessage({ type: 'OPEN_MANAGE_PAGE', hash });
}

/* ───────── Utilities ───────── */
function getTxDirection(tx) {
    if (tx.outflow && !tx.inflow) return 'out';
    if (tx.inflow && !tx.outflow) return 'in';
    return tx.outflow ? 'out' : 'in';
}

function getTxAbsAmount(tx) {
    const raw = tx.outflow || tx.inflow || '';
    const parsed = parseFloat(String(raw).replace(',', '.'));
    return Number.isFinite(parsed) ? String(parsed) : '';
}

function round2(value) {
    return Math.round(value * 100) / 100;
}

function toIsoDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

/* ───────── UI feedback ───────── */
function showError(message) {
    dom.error.textContent = message;
    dom.error.hidden = false;
}
function hideError() {
    dom.error.textContent = '';
    dom.error.hidden = true;
}

function showToast(message, tone = 'success') {
    if (toastTimer) clearTimeout(toastTimer);
    dom.toastMsg.textContent = message;
    dom.toast.setAttribute('variant', tone === 'error' ? 'danger' : 'success');
    dom.toast.hidden = false;
    toastTimer = setTimeout(() => { dom.toast.hidden = true; }, 3600);
}

function showSyncOverlay() {
    const overlay = document.getElementById('sync-overlay');
    if (overlay) overlay.hidden = false;
}
function hideSyncOverlay() {
    const overlay = document.getElementById('sync-overlay');
    if (overlay) overlay.hidden = true;
}

async function downloadCsv(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    try {
        if (typeof browser !== 'undefined') {
            return await downloadsAPI.download({ url, filename, saveAs: true, conflictAction: 'uniquify' });
        }
        return await new Promise((resolve, reject) => {
            downloadsAPI.download({ url, filename, saveAs: true, conflictAction: 'uniquify' }, (downloadId) => {
                const err = chrome.runtime?.lastError;
                if (err) reject(new Error(err.message || String(err)));
                else resolve(downloadId);
            });
        });
    } finally {
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
}
