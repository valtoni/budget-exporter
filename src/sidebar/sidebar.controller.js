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
    ynabCategoriesCache: null,
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
        // No cached review — full fetch from the page. Show the load overlay
        // so the user knows the empty grid is loading, not stuck.
        showLoadOverlay();
        try {
            await refreshReview();
        } finally {
            hideLoadOverlay();
        }
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
    dom.menuManage = document.getElementById('menu-manage');
    dom.destDropdown = document.getElementById('ex-dest-dropdown');
    dom.destTrigger = document.getElementById('ex-dest-trigger');
    dom.destLabel = document.getElementById('ex-dest-label');
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

    dom.cutoffClear = document.getElementById('ex-cutoff-clear');
    dom.menuBatches = document.getElementById('menu-batches');

    dom.confirmDialog = document.getElementById('confirm-dialog');
    dom.confirmCount = document.getElementById('confirm-count');
    dom.confirmPeriod = document.getElementById('confirm-period');
    dom.confirmDest = document.getElementById('confirm-dest');
    dom.confirmSubmit = document.getElementById('confirm-submit');
    dom.confirmCancel = document.getElementById('confirm-cancel');

    dom.batchesDialog = document.getElementById('batches-dialog');
    dom.batchesBody = document.getElementById('batches-body');
    dom.batchesClose = document.getElementById('batches-close');

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
    dom.grid.addEventListener('tx-open-batch', (e) => openBatchesDialog(e.detail?.seq ?? null));

    dom.refreshBtn.addEventListener('click', onRefreshClick);
    dom.menuExport.addEventListener('click', () => { closeMenu(); exportSelected(); });
    dom.menuBatches.addEventListener('click', () => { closeMenu(); openBatchesDialog(); });
    dom.menuManage.addEventListener('click', () => { closeMenu(); openManagePage(); });
    dom.batchesClose.addEventListener('click', () => closeDialog(dom.batchesDialog));
    dom.cutoffClear.addEventListener('click', clearCutoff);
    dom.primary.addEventListener('click', onPrimaryAction);
    dom.secondary.addEventListener('click', onSecondaryAction);

    dom.ruleSubmit.addEventListener('click', saveRule);
    dom.ruleCancel.addEventListener('click', () => closeDialog(dom.ruleDialog));
    dom.ruleForm.addEventListener('submit', (e) => { e.preventDefault(); saveRule(); });

    dom.destDropdown.addEventListener('wa-select', (e) => {
        const id = e.detail?.item?.dataset?.id;
        if (!id || id === state.ynabAccountId) return;
        state.ynabAccountId = id;
        renderDestLabel();
        persistYnabPreference();
        showToast('Destino YNAB atualizado.', 'success');
    });

    runtimeAPI.onMessage.addListener((message) => {
        if (message.type === 'ACTIVE_REVIEW_UPDATED' && message.review) {
            hideLoadOverlay();
            applyReview(message.review);
        } else if (message.type === 'ACTIVE_REVIEW_LOADING') {
            if (message.isLoading) showLoadOverlay();
            else hideLoadOverlay();
        }
    });

    // Detect YNAB config changes made in manage.html (or anywhere else): the
    // sidebar lives in a separate page context, so without this listener it
    // would only learn about a fresh connection on the next sidebar reload.
    if (storageAPI?.onChanged?.addListener) {
        storageAPI.onChanged.addListener((changes, area) => {
            if (area !== 'local') return;
            if (changes.ynab_config) refreshYnabConfig();
            if (changes.ynab_categories) {
                // Cache was refreshed by background sync; rebuild the combos so
                // the next rule-dialog opens with the up-to-date list.
                loadCategories();
                renderGrid();
            }
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
    dom.cutoffLabel.textContent = state.cutoffDate || 'todas as datas';
    // O botão de limpar só faz sentido quando existe corte para limpar.
    if (dom.cutoffClear) dom.cutoffClear.hidden = !state.cutoffDate;
}

// Volta ao estado "sem corte". Antes não havia caminho de volta: o corte nascia
// em "um mês atrás" e o flatpickr não oferece limpar, então uma vez escolhida a
// data o usuário nunca mais via o extrato inteiro.
function clearCutoff() {
    state.cutoffDate = '';
    if (cutoffPicker) cutoffPicker.clear();
    applyCutoffAndRender();
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
                ynabBatchSeq: old.ynabBatchSeq,
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
    // Uma captura que falhou (API nao capturada, formato mudou, pagina
    // inacessivel) chega como review vazio + error. Sem isto a grade fica
    // vazia em silencio e o usuario nao sabe se e filtro ou falha.
    if (review.error) showError(review.error);
    else hideError();
}

function normalizeReviewShape() {
    if (!state.review?.transactions) return;
    state.review.transactions.forEach((tx) => {
        if (!Array.isArray(tx.splits)) tx.splits = null;
        if (typeof tx.ynabSentAt !== 'string') tx.ynabSentAt = null;
        if (typeof tx.ynabBatchSeq !== 'number') tx.ynabBatchSeq = null;
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
        // A data de corte DEFINE a seleção nos dois sentidos: o que fica antes dela
        // sai, o que fica a partir dela entra — mesmo que o item já estivesse
        // marcado ou desmarcado. Antes o corte só desmarcava, então mover a data
        // para trás não trazia de volta as transações que passaram a caber nela.
        // Única exceção: o que já foi enviado ao YNAB nunca é remarcado.
        if (!state.cutoffDate) {
            const next = { ...tx, cutoffExcluded: false };
            if (shouldEnforce) next.selected = !tx.ynabSentAt;
            return next;
        }
        const comparable = normalizeComparableDate(tx.dateIso || tx.dateRaw || '');
        const excluded = comparable ? comparable < state.cutoffDate : false;
        const next = { ...tx, cutoffExcluded: excluded };
        if (shouldEnforce) next.selected = !excluded && !tx.ynabSentAt;
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
    // "Sugestão" ganhou aba própria: é o estado que pede ação do usuário
    // (virar regra) e antes ficava diluído dentro de "Sem regra", sem contagem
    // e sem cor distinta — invisível justamente no fluxo que ele existe para servir.
    const counts = {
        all: summary.total || 0,
        matched: summary.matched || 0,
        suggested: summary.suggested || 0,
        unmatched: summary.unmatched || 0
    };
    dom.filters.querySelectorAll('[data-filter]').forEach((btn) => {
        const f = btn.dataset.filter;
        const active = state.filter === f;
        btn.classList.toggle('is-active', active);
        // role="tab" sem aria-selected não diz nada a um leitor de tela: o
        // estado ativo existia só como classe CSS.
        btn.setAttribute('aria-selected', active ? 'true' : 'false');
        const count = btn.querySelector('[data-count]');
        if (count) count.textContent = String(counts[f] ?? 0);
    });

    renderSelectedCount();
}

function renderSelectedCount() {
    const n = state.review?.summary?.selected ?? 0;
    dom.selectedCount.textContent = String(n);
}

function visibleTransactions() {
    return (state.review?.transactions || []).filter((tx) => {
        if (state.filter === 'all') return true;
        const status = tx.matchStatus || 'unmatched';
        return status === state.filter;
    });
}

function renderGrid() {
    const items = visibleTransactions();
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
    // Age apenas sobre o que está na tela. O checkbox do cabeçalho reflete o
    // conjunto FILTRADO, então aplicá-lo ao conjunto inteiro mudava, sem aviso,
    // linhas que o usuário nem estava vendo.
    const visibleIds = new Set(visibleTransactions().map((tx) => tx.id));
    state.review.transactions = state.review.transactions.map((tx) =>
        (tx.cutoffExcluded || !visibleIds.has(tx.id)) ? tx : { ...tx, selected: desired }
    );
    recalculateSummary();
    renderFilters();
    renderGrid();
    persistReview();
}

/* ───────── Categories ─────────
 * Source of truth depends on YNAB connection:
 *   - Connected + cache present  → YNAB category list (read-only, grouped).
 *   - Otherwise                  → local categories (with create-on-blur).
 */
async function loadCategories() {
    state.categories = await StorageManager.getCategories();
    try {
        state.ynabCategoriesCache = await StorageManager.getYnabCategoriesCache();
    } catch (_) {
        state.ynabCategoriesCache = null;
    }
    renderCategoryDatalist();
    rebuildCategorySelectOptions();
    if (categoryTomSelect) {
        // Re-create when source switches, otherwise just refresh options.
        const wantsYnab = isYnabCategorySourceReady();
        if (!!categoryTomSelect._fromYnab !== wantsYnab) {
            categoryTomSelect.destroy();
            categoryTomSelect = null;
        } else {
            syncTomSelectOptions();
        }
    }
}

function isYnabCategorySourceReady() {
    return !!(state.ynabCategoriesCache && state.ynabCategoriesCache.byId
        && Object.keys(state.ynabCategoriesCache.byId).length > 0);
}

function ynabCategoryList() {
    const cache = state.ynabCategoriesCache;
    if (!cache) return [];
    const out = [];
    for (const group of (cache.categoryGroups || [])) {
        if (group.hidden) continue;
        for (const cat of group.categories) {
            if (cat.hidden) continue;
            out.push({ name: cat.name, group: group.name });
        }
    }
    return out;
}

function renderCategoryDatalist() {
    dom.categoryOptions.innerHTML = '';
    const list = isYnabCategorySourceReady()
        ? ynabCategoryList().map((c) => c.name)
        : state.categories.map((c) => c.name);
    // Dedupe so YNAB-name and any leftover local same-name don't show twice.
    const seen = new Set();
    for (const name of list) {
        if (!name || seen.has(name)) continue;
        seen.add(name);
        const opt = document.createElement('option');
        opt.value = name;
        dom.categoryOptions.appendChild(opt);
    }
}

function rebuildCategorySelectOptions() {
    dom.ruleCategory.innerHTML = '<option value="">Opcional</option>';
    if (isYnabCategorySourceReady()) {
        const cache = state.ynabCategoriesCache;
        for (const group of (cache.categoryGroups || [])) {
            if (group.hidden) continue;
            const optgroup = document.createElement('optgroup');
            optgroup.label = group.name;
            for (const cat of group.categories) {
                if (cat.hidden) continue;
                const opt = document.createElement('option');
                opt.value = cat.name;
                opt.textContent = cat.name;
                optgroup.appendChild(opt);
            }
            dom.ruleCategory.appendChild(optgroup);
        }
    } else {
        state.categories.forEach((cat) => {
            const opt = document.createElement('option');
            opt.value = cat.name;
            opt.textContent = cat.name;
            dom.ruleCategory.appendChild(opt);
        });
    }
}

function ensureCategoryTomSelect() {
    if (categoryTomSelect) return categoryTomSelect;
    const { TomSelect } = window.__sidebarDeps || {};
    if (!TomSelect) return null;

    const ynabReady = isYnabCategorySourceReady();
    categoryTomSelect = new TomSelect(dom.ruleCategory, {
        create: !ynabReady,           // só pode criar nova quando NÃO está espelhando YNAB
        createOnBlur: !ynabReady,
        persist: false,
        maxItems: 1,
        optgroupField: 'optgroup',
        sortField: { field: 'text', direction: 'asc' },
        onItemAdd: async (value) => {
            if (ynabReady) return;
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
    categoryTomSelect._fromYnab = ynabReady;
    return categoryTomSelect;
}

function syncTomSelectOptions() {
    if (!categoryTomSelect) return;
    categoryTomSelect.clearOptions();
    if (isYnabCategorySourceReady()) {
        for (const group of (state.ynabCategoriesCache.categoryGroups || [])) {
            if (group.hidden) continue;
            for (const cat of group.categories) {
                if (cat.hidden) continue;
                categoryTomSelect.addOption({ value: cat.name, text: cat.name });
            }
        }
    } else {
        state.categories.forEach((cat) => {
            categoryTomSelect.addOption({ value: cat.name, text: cat.name });
        });
    }
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
        state.ynabAccountId = null;
    }

    syncDestinationDropdown(destinations);
}

function syncDestinationDropdown(destinations) {
    if (!dom.destDropdown) return;

    if (!destinations || destinations.length === 0) {
        dom.destDropdown.hidden = true;
        return;
    }

    // Rebuild items so the list stays in sync with the YNAB config.
    // Children outside the `slot="trigger"` button are dropdown items.
    Array.from(dom.destDropdown.children).forEach((child) => {
        if (child.getAttribute && child.getAttribute('slot') === 'trigger') return;
        dom.destDropdown.removeChild(child);
    });

    destinations.forEach((d) => {
        const item = document.createElement('wa-dropdown-item');
        item.dataset.id = d.id;
        item.textContent = d.name || d.id;
        if (d.id === state.ynabAccountId) {
            // Visual hint that this is the active destination.
            item.setAttribute('checked', '');
        }
        dom.destDropdown.appendChild(item);
    });

    // Single-destination: keep visible (so the user sees where it goes) but
    // disable the dropdown to make the read-only nature obvious.
    if (destinations.length === 1) {
        dom.destTrigger.setAttribute('disabled', '');
        dom.destTrigger.classList.add('is-locked');
    } else {
        dom.destTrigger.removeAttribute('disabled');
        dom.destTrigger.classList.remove('is-locked');
    }

    dom.destDropdown.hidden = false;
    renderDestLabel();
}

function renderDestLabel() {
    if (!dom.destLabel) return;
    const cfg = state.ynabConfig;
    const bankAccountId = state.review?.account?.accountId;
    const destinations = bankAccountId && cfg?.accountMap ? (cfg.accountMap[bankAccountId] || []) : [];
    const current = destinations.find((d) => d.id === state.ynabAccountId);
    dom.destLabel.textContent = current?.name || current?.id || 'Conta YNAB';
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
    showLoadOverlay();
    try {
        await refreshReview();
    } finally {
        hideLoadOverlay();
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

    // Enviar cria lançamentos no orçamento real e não tem desfazer — e o botão
    // primário é o MESMO que exporta CSV quando o YNAB não está configurado.
    // Sem esta confirmação, memória muscular basta para enviar sem querer.
    const confirmed = await confirmSend(selected);
    if (!confirmed) return;

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

    const { created = [], duplicates = [], skipped = [], sentIds = [], batch = null } = response.result || {};
    const now = batch?.sentAt || new Date().toISOString();
    const sentSet = new Set(sentIds);
    state.review.transactions.forEach((tx) => {
        if (!sentSet.has(tx.id)) return;
        tx.ynabSentAt = now;
        // Lado "transação → lote" da via dupla. O outro lado (lote → transações)
        // fica no registro gravado pelo background.
        tx.ynabBatchSeq = batch?.seq ?? null;
    });

    recalculateSelectionsAfterSend();
    await persistReview();
    recalculateSummary();
    renderFilters();
    renderGrid();
    hideSyncOverlay();

    const parts = [`${created.length} criadas`];
    if (duplicates.length) parts.push(`${duplicates.length} duplicadas (ignoradas pelo YNAB)`);
    showToast(`Envio #${batch?.seq ?? '—'}: ${parts.join(' · ')}`, 'success');

    // Puladas são acionáveis (falta mapear a conta) — não podem sumir com o
    // toast. Ficam na faixa de aviso até o usuário resolver ou recarregar.
    if (skipped.length) {
        showError(
            `${skipped.length} transação(ões) não foram enviadas por falta de mapeamento da conta. `
            + 'Abra "Gerenciar → YNAB" e vincule a conta do banco a uma conta do orçamento.'
        );
    }
}

// Resumo antes de um envio irreversível: quantas, qual período, qual destino.
function confirmSend(selected) {
    const dates = selected.map((tx) => tx.dateIso || tx.dateRaw || '').filter(Boolean).sort();
    const destinations = destinationsForCurrentAccount();
    const destination = destinations.find((d) => d.id === state.ynabAccountId);
    const period = dates.length
        ? (dates[0] === dates[dates.length - 1] ? dates[0] : `${dates[0]} a ${dates[dates.length - 1]}`)
        : 'sem data';

    dom.confirmCount.textContent = String(selected.length);
    dom.confirmPeriod.textContent = period;
    dom.confirmDest.textContent = destination?.name || destination?.id || 'conta YNAB padrão';

    openDialog(dom.confirmDialog);

    return new Promise((resolve) => {
        // `settled` + a escuta do fechamento do diálogo são obrigatórios: sem
        // eles, fechar no Esc/X deixava a promise pendente com os listeners
        // ainda ligados, e a confirmação do envio SEGUINTE resolvia também a
        // chamada abandonada — enviando duas vezes.
        let settled = false;
        const finish = (value) => {
            if (settled) return;
            settled = true;
            dom.confirmSubmit.removeEventListener('click', onOk);
            dom.confirmCancel.removeEventListener('click', onCancel);
            dom.confirmDialog.removeEventListener('wa-hide', onDismiss);
            dom.confirmDialog.removeEventListener('wa-after-hide', onDismiss);
            closeDialog(dom.confirmDialog);
            resolve(value);
        };
        const onOk = () => finish(true);
        const onCancel = () => finish(false);
        const onDismiss = () => finish(false);
        dom.confirmSubmit.addEventListener('click', onOk);
        dom.confirmCancel.addEventListener('click', onCancel);
        dom.confirmDialog.addEventListener('wa-hide', onDismiss);
        dom.confirmDialog.addEventListener('wa-after-hide', onDismiss);
    });
}

/* ───────── Histórico de envios ─────────
 * Lado "lote → transações" da via dupla: cada envio numerado abre mostrando
 * exatamente o que foi mandado, com o import_id que o YNAB usou para deduplicar.
 */
async function openBatchesDialog(focusSeq = null) {
    openDialog(dom.batchesDialog);
    dom.batchesBody.innerHTML = '<p class="batches-empty">Carregando…</p>';

    let batches = [];
    try {
        const response = await runtimeAPI.sendMessage({ type: 'YNAB_GET_SEND_BATCHES' });
        batches = response?.batches || [];
    } catch (error) {
        dom.batchesBody.innerHTML = '<p class="batches-empty">Não foi possível ler o histórico.</p>';
        return;
    }

    if (batches.length === 0) {
        dom.batchesBody.innerHTML = '<p class="batches-empty">Nenhum envio registrado ainda.</p>';
        return;
    }

    dom.batchesBody.innerHTML = '';
    for (const batch of batches) {
        dom.batchesBody.appendChild(renderBatchEntry(batch, focusSeq));
    }

    if (focusSeq != null) {
        const target = dom.batchesBody.querySelector(`[data-seq="${focusSeq}"]`);
        if (target) target.scrollIntoView({ block: 'center' });
    }
}

function renderBatchEntry(batch, focusSeq) {
    const details = document.createElement('details');
    details.className = 'batch-entry';
    details.dataset.seq = String(batch.seq);
    if (Number(focusSeq) === Number(batch.seq)) {
        details.open = true;
        details.classList.add('is-focused');
    }

    const summary = document.createElement('summary');
    summary.className = 'batch-summary';

    const seqEl = document.createElement('span');
    seqEl.className = 'batch-seq';
    seqEl.textContent = `#${batch.seq}`;

    const metaEl = document.createElement('span');
    metaEl.className = 'batch-meta';
    const destination = batch.ynabAccountName || batch.ynabAccountId || 'conta YNAB';
    metaEl.textContent = `${formatDateTime(batch.sentAt)} · ${batch.count} transação(ões) · ${batch.accountName || batch.bankAccountId} → ${destination}`;

    summary.append(seqEl, metaEl);
    details.appendChild(summary);

    if (batch.duplicates || batch.skipped) {
        const notes = document.createElement('p');
        notes.className = 'batch-notes';
        const parts = [];
        if (batch.duplicates) parts.push(`${batch.duplicates} duplicada(s) ignorada(s) pelo YNAB`);
        if (batch.skipped) parts.push(`${batch.skipped} pulada(s) por falta de mapeamento`);
        notes.textContent = parts.join(' · ');
        details.appendChild(notes);
    }

    const list = document.createElement('ul');
    list.className = 'batch-tx-list';
    for (const entry of batch.transactions || []) {
        const item = document.createElement('li');
        item.className = 'batch-tx';

        const date = document.createElement('span');
        date.className = 'batch-tx-date';
        date.textContent = entry.dateIso || '—';

        const payee = document.createElement('span');
        payee.className = 'batch-tx-payee';
        payee.textContent = entry.payee || 'Sem descrição';
        payee.title = entry.importId ? `import_id: ${entry.importId}` : '';

        const amount = document.createElement('span');
        const milli = Number(entry.amountMilli || 0);
        amount.className = `batch-tx-amount ${milli < 0 ? 'is-out' : 'is-in'}`;
        amount.textContent = `${milli < 0 ? '−' : '+'}${(Math.abs(milli) / 1000).toFixed(2)}`;

        const ident = document.createElement('span');
        ident.className = 'batch-tx-id';
        ident.textContent = entry.importId || entry.id || '';

        item.append(date, payee, amount, ident);
        list.appendChild(item);
    }
    details.appendChild(list);

    return details;
}

function formatDateTime(iso) {
    const parsed = new Date(iso);
    if (Number.isNaN(parsed.getTime())) return String(iso || '—');
    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(parsed.getDate())}/${pad(parsed.getMonth() + 1)}/${parsed.getFullYear()} ${pad(parsed.getHours())}:${pad(parsed.getMinutes())}`;
}

function destinationsForCurrentAccount() {
    const cfg = state.ynabConfig;
    const bankAccountId = state.review?.account?.accountId;
    return bankAccountId && cfg?.accountMap ? (cfg.accountMap[bankAccountId] || []) : [];
}

// After a send, the only thing that changes is that what was just sent should no
// longer be selected. Everything else keeps the selection the user made — items
// skipped for missing mapping, and items they had deliberately left unchecked.
function recalculateSelectionsAfterSend() {
    if (!state.review?.transactions) return;
    state.review.transactions.forEach((tx) => {
        if (tx.ynabSentAt) tx.selected = false;
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

function showLoadOverlay() {
    const overlay = document.getElementById('load-overlay');
    if (overlay) overlay.hidden = false;
}
function hideLoadOverlay() {
    const overlay = document.getElementById('load-overlay');
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
