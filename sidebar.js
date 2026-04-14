const runtimeAPI = typeof browser !== 'undefined' ? browser.runtime : chrome.runtime;
const downloadsAPI = typeof browser !== 'undefined' ? browser.downloads : chrome.downloads;

const state = {
    review: null,
    filter: 'all',
    mode: 'review',
    categories: [],
    ruleDraft: null,
    cutoffDate: '',
    expandedSplits: new Set()
};

const dom = {};

document.addEventListener('DOMContentLoaded', async () => {
    cacheDom();
    initializeDefaultCutoff();
    bindEvents();
    await StorageManager.init();
    await loadCategories();

    const current = await getActiveReview();
    if (current) {
        applyReview(current);
    } else {
        await refreshReview();
    }
});

function initializeDefaultCutoff() {
    const now = new Date();
    const fallback = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    state.cutoffDate = toIsoDate(fallback);
    if (dom.cutoffDate) {
        dom.cutoffDate.value = state.cutoffDate;
    }
}

function cacheDom() {
    dom.summaryAccount = document.getElementById('summary-account');
    dom.summaryPage = document.getElementById('summary-page');
    dom.summaryGrid = document.getElementById('summary-grid');
    dom.summaryError = document.getElementById('summary-error');
    dom.reviewGrid = document.getElementById('review-grid');
    dom.gridCount = document.getElementById('grid-count');
    dom.categoryOptions = document.getElementById('category-options');
    dom.reviewPanel = document.getElementById('review-panel');
    dom.managePanel = document.getElementById('manage-panel');
    dom.modeReview = document.getElementById('mode-review');
    dom.modeManage = document.getElementById('mode-manage');
    dom.ruleForm = document.getElementById('rule-form');
    dom.ruleContext = document.getElementById('rule-context');
    dom.ruleAccountName = document.getElementById('rule-account-name');
    dom.rulePattern = document.getElementById('rule-pattern');
    dom.ruleReplacement = document.getElementById('rule-replacement');
    dom.ruleCategory = document.getElementById('rule-category');
    dom.ruleMemo = document.getElementById('rule-memo');
    dom.ruleRegex = document.getElementById('rule-regex');
    dom.ruleMessage = document.getElementById('rule-message');
    dom.categoryForm = document.getElementById('category-form');
    dom.newCategoryName = document.getElementById('new-category-name');
    dom.categoryMessage = document.getElementById('category-message');
    dom.categoriesList = document.getElementById('categories-list');
    dom.filterRow = document.getElementById('filter-row');
    dom.cutoffDate = document.getElementById('cutoff-date');
    dom.cutoffStatus = document.getElementById('cutoff-status');
}

function bindEvents() {
    document.getElementById('refresh-review').addEventListener('click', refreshReview);
    document.getElementById('export-selected').addEventListener('click', exportSelected);
    document.getElementById('open-manage-page').addEventListener('click', openManagePage);
    document.getElementById('manage-open-page').addEventListener('click', openManagePage);
    document.getElementById('clear-rule-form').addEventListener('click', clearRuleForm);
    document.getElementById('apply-cutoff').addEventListener('click', applyCutoff);
    document.getElementById('clear-cutoff').addEventListener('click', clearCutoff);

    dom.modeReview.addEventListener('click', () => setMode('review'));
    dom.modeManage.addEventListener('click', () => setMode('manage'));

    dom.filterRow.addEventListener('click', (event) => {
        const button = event.target.closest('[data-filter]');
        if (!button) return;
        state.filter = button.dataset.filter;
        dom.filterRow.querySelectorAll('[data-filter]').forEach((item) => {
            item.classList.toggle('active', item === button);
        });
        renderGrid();
    });

    dom.reviewGrid.addEventListener('input', onTransactionInput);
    dom.reviewGrid.addEventListener('change', onTransactionChange);
    dom.reviewGrid.addEventListener('click', onTransactionClick);
    dom.ruleForm.addEventListener('submit', saveRule);
    dom.categoryForm.addEventListener('submit', addQuickCategory);
    runtimeAPI.onMessage.addListener((message) => {
        if (message.type === 'ACTIVE_REVIEW_UPDATED' && message.review) {
            applyReview(message.review);
        }
    });
}

async function refreshReview() {
    setInlineMessage(dom.ruleMessage, '', '');
    const result = await runtimeAPI.sendMessage({ type: 'REFRESH_ACTIVE_TAB_REVIEW' });
    if (result?.review) {
        applyReview(result.review);
        return;
    }

    const current = await getActiveReview();
    if (current) {
        applyReview(current);
    }
}

async function getActiveReview() {
    const result = await runtimeAPI.sendMessage({ type: 'GET_ACTIVE_REVIEW' });
    return result?.review || null;
}

function applyReview(review) {
    state.review = JSON.parse(JSON.stringify(review));
    normalizeReviewShape();
    applyCutoffToReview();
    recalculateSummary();
    updateFilterLabels();
    renderCutoffStatus();
    renderSummary();
    renderGrid();
    if (state.ruleDraft && state.review?.account) {
        dom.ruleAccountName.value = state.review.account.displayName;
    }
}

function normalizeReviewShape() {
    if (!state.review?.transactions) return;
    state.review.transactions.forEach((tx) => {
        if (!Array.isArray(tx.splits)) {
            tx.splits = null;
        }
    });
}

function renderCutoffStatus() {
    if (!dom.cutoffStatus) return;
    dom.cutoffStatus.textContent = state.cutoffDate ? `Desde ${state.cutoffDate}` : 'Sem corte';
}

function updateFilterLabels() {
    const summary = state.review?.summary || { total: 0, matched: 0, suggested: 0, unmatched: 0 };
    const labels = {
        all: `Todos (${summary.total || 0})`,
        matched: `Com regra (${summary.matched || 0})`,
        suggested: `Sugestoes (${summary.suggested || 0})`,
        unmatched: `Sem regra (${summary.unmatched || 0})`
    };

    dom.filterRow.querySelectorAll('[data-filter]').forEach((button) => {
        button.textContent = labels[button.dataset.filter] || button.textContent;
    });
}

function recalculateSummary() {
    if (!state.review) return;
    state.review.summary = state.review.transactions.reduce((acc, tx) => {
        acc.total += 1;
        acc.selected += tx.selected === false ? 0 : 1;
        if (!acc[tx.matchStatus]) {
            acc[tx.matchStatus] = 0;
        }
        acc[tx.matchStatus] += 1;
        return acc;
    }, { total: 0, selected: 0, matched: 0, suggested: 0, unmatched: 0 });
}

function applyCutoff() {
    state.cutoffDate = dom.cutoffDate?.value || '';
    applyCutoffToReview();
    recalculateSummary();
    updateFilterLabels();
    renderCutoffStatus();
    renderSummary();
    renderTransactions();
}

function clearCutoff() {
    state.cutoffDate = '';
    if (dom.cutoffDate) {
        dom.cutoffDate.value = '';
    }
    applyCutoffToReview();
    recalculateSummary();
    updateFilterLabels();
    renderCutoffStatus();
    renderSummary();
    renderTransactions();
}

function applyCutoffToReview() {
    if (!state.review?.transactions) return;

    state.review.transactions.forEach((tx) => {
        if (!state.cutoffDate) {
            if (tx.cutoffExcluded) {
                tx.selected = true;
            }
            tx.cutoffExcluded = false;
            return;
        }

        const comparableDate = normalizeComparableDate(tx.dateIso || tx.dateRaw || '');
        const excluded = comparableDate ? comparableDate < state.cutoffDate : false;
        tx.cutoffExcluded = excluded;
        if (excluded) {
            tx.selected = false;
        }
    });
}

function normalizeComparableDate(value) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(String(value || ''))) {
        return value;
    }
    return '';
}

function toIsoDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function renderSummary() {
    const review = state.review;
    dom.summaryGrid.innerHTML = '';
    dom.summaryError.classList.add('hidden');
    dom.summaryError.textContent = '';

    if (!review) {
        dom.summaryAccount.textContent = 'Nenhuma';
        dom.summaryPage.textContent = 'Sem dados';
        return;
    }

    dom.summaryAccount.textContent = review.account?.displayName || 'Conta nao detectada';
    dom.summaryPage.textContent = review.pageTitle || review.pageUrl || 'Sem titulo';

    const metrics = [
        `Total ${review.summary.total || 0}`,
        `Selecionadas ${review.summary.selected || 0}`,
        `Com regra ${review.summary.matched || 0}`,
        `Sugestoes ${review.summary.suggested || 0}`,
        `Sem regra ${review.summary.unmatched || 0}`
    ];

    metrics.forEach((label) => {
        const badge = document.createElement('span');
        badge.className = 'summary-metric';
        badge.textContent = label;
        dom.summaryGrid.appendChild(badge);
    });

    if (review.error) {
        dom.summaryError.textContent = review.error;
        dom.summaryError.classList.remove('hidden');
        dom.summaryError.classList.add('error');
    }
}

function renderGrid() {
    const review = state.review;
    dom.reviewGrid.innerHTML = '';

    if (!review) {
        dom.gridCount.textContent = '0';
        dom.reviewGrid.innerHTML = '<div class="small empty-state">Nenhuma revisao carregada.</div>';
        return;
    }

    const items = review.transactions.filter((tx) => state.filter === 'all' || tx.matchStatus === state.filter);
    dom.gridCount.textContent = String(items.length);

    if (items.length === 0) {
        dom.reviewGrid.innerHTML = '<div class="small empty-state">Nenhuma transacao para o filtro atual.</div>';
        return;
    }

    items.forEach((tx) => {
        const hasSplits = Array.isArray(tx.splits) && tx.splits.length > 0;
        const isExpanded = state.expandedSplits.has(tx.id) || hasSplits;
        const row = document.createElement('div');
        row.className = `grid-row status-${tx.matchStatus}${tx.cutoffExcluded ? ' cutoff' : ''}`;
        row.dataset.id = tx.id;

        const direction = getTxDirection(tx);
        const absAmount = getTxAbsAmount(tx);
        const disableMainCatMemo = hasSplits;
        const categoryDisplay = hasSplits ? `Split em ${tx.splits.length} categorias` : (tx.categoryFinal || '');
        const memoDisplay = hasSplits ? '' : (tx.memoFinal || '');

        row.innerHTML = `
            <div class="cell-de">
                <div class="small de-date">${escapeHtml(tx.dateIso || tx.dateRaw || '')}</div>
                <strong class="de-payee" title="${escapeAttribute(tx.payeeRaw || '')}">${escapeHtml(tx.payeeRaw || 'Sem descricao')}</strong>
                <div class="small de-amount">${escapeHtml(tx.amountRaw || formatAmount(tx))}</div>
                ${tx.matchReason ? `<div class="small de-reason">${escapeHtml(tx.matchReason)}</div>` : ''}
            </div>
            <div class="cell-para">
                <input type="date" data-field="dateIso" data-id="${escapeHtml(tx.id)}" value="${escapeAttribute(tx.dateIso || '')}" title="Data">
                <input type="text" data-field="payeeFinal" data-id="${escapeHtml(tx.id)}" value="${escapeAttribute(tx.payeeFinal || '')}" placeholder="Payee final" title="Payee final">
                <input type="text" list="category-options" data-field="categoryFinal" data-id="${escapeHtml(tx.id)}" value="${escapeAttribute(categoryDisplay)}" placeholder="Categoria" title="Categoria" ${disableMainCatMemo ? 'disabled' : ''}>
                <input type="text" data-field="memoFinal" data-id="${escapeHtml(tx.id)}" value="${escapeAttribute(memoDisplay)}" placeholder="Memo" title="Memo" ${disableMainCatMemo ? 'disabled' : ''}>
                <div class="amount-editor">
                    <input type="number" step="0.01" min="0" data-field="amountAbs" data-id="${escapeHtml(tx.id)}" value="${escapeAttribute(absAmount)}" placeholder="0.00">
                    <button type="button" class="direction-toggle ${direction}" data-action="toggle-direction" data-id="${escapeHtml(tx.id)}" title="${direction === 'out' ? 'Saida (clique para alternar)' : 'Entrada (clique para alternar)'}">${direction === 'out' ? '&minus;' : '&plus;'}</button>
                </div>
            </div>
            <div class="cell-action">
                <span class="status-dot ${tx.matchStatus}" title="${escapeAttribute(statusLabel(tx.matchStatus))}"></span>
                <button type="button" class="icon-btn" data-action="prefill-from-transaction" data-id="${escapeHtml(tx.id)}" title="Criar regra">&#9889;</button>
                <button type="button" class="icon-btn ${isExpanded ? 'active' : ''}" data-action="toggle-splits" data-id="${escapeHtml(tx.id)}" title="Dividir em categorias (split)">&#9783;</button>
            </div>
            <div class="cell-check">
                <input type="checkbox" data-action="toggle-selected" data-id="${escapeHtml(tx.id)}" ${tx.selected === false ? '' : 'checked'}>
            </div>
        `;
        dom.reviewGrid.appendChild(row);

        if (isExpanded) {
            dom.reviewGrid.appendChild(buildSplitsRow(tx));
        }
    });
}

function buildSplitsRow(tx) {
    const splits = Array.isArray(tx.splits) ? tx.splits : [];
    const total = parseFloat(getTxAbsAmount(tx)) || 0;
    const partial = splits.reduce((sum, s) => sum + (parseFloat(s.amount) || 0), 0);
    const diff = round2(total - partial);
    const ok = Math.abs(diff) < 0.005 && splits.length > 0;

    const wrap = document.createElement('div');
    wrap.className = `splits-row ${ok ? 'ok' : 'diff'}`;
    wrap.dataset.id = tx.id;

    const lines = splits.map((split, index) => `
        <div class="split-line" data-split-id="${escapeAttribute(split.id)}">
            <span class="split-index">${index + 1}</span>
            <input type="number" step="0.01" min="0" data-field="split.amount" data-id="${escapeAttribute(tx.id)}" data-split-id="${escapeAttribute(split.id)}" value="${escapeAttribute(split.amount || '')}" placeholder="0.00">
            <input type="text" list="category-options" data-field="split.category" data-id="${escapeAttribute(tx.id)}" data-split-id="${escapeAttribute(split.id)}" value="${escapeAttribute(split.category || '')}" placeholder="Categoria">
            <input type="text" data-field="split.memo" data-id="${escapeAttribute(tx.id)}" data-split-id="${escapeAttribute(split.id)}" value="${escapeAttribute(split.memo || '')}" placeholder="Memo">
            <button type="button" class="icon-btn" data-action="remove-split" data-id="${escapeAttribute(tx.id)}" data-split-id="${escapeAttribute(split.id)}" title="Remover split">&times;</button>
        </div>
    `).join('');

    wrap.innerHTML = `
        <div class="splits-head">
            <strong>Splits</strong>
            <button type="button" class="button ghost small-btn" data-action="add-split" data-id="${escapeAttribute(tx.id)}">+ linha</button>
            ${splits.length > 0 ? `<button type="button" class="button ghost small-btn" data-action="restore-single" data-id="${escapeAttribute(tx.id)}">Restaurar single</button>` : ''}
        </div>
        ${lines || '<p class="small">Clique <strong>+ linha</strong> para adicionar o primeiro split.</p>'}
        <div class="splits-summary">
            <span>Total: ${total.toFixed(2)}</span>
            <span>Parcial: ${partial.toFixed(2)}</span>
            <span class="status-indicator ${ok ? 'ok' : 'diff'}">${ok ? 'OK' : `Diff ${diff.toFixed(2)}`}</span>
        </div>
    `;
    return wrap;
}

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

function onTransactionInput(event) {
    const input = event.target.closest('[data-field]');
    if (!input || !state.review) return;
    const transaction = state.review.transactions.find((tx) => tx.id === input.dataset.id);
    if (!transaction) return;

    const field = input.dataset.field;

    if (field === 'amountAbs') {
        applyAmountEdit(transaction, input.value);
        return;
    }

    if (field.startsWith('split.')) {
        const splitField = field.slice('split.'.length);
        const split = (transaction.splits || []).find((s) => s.id === input.dataset.splitId);
        if (!split) return;
        split[splitField] = input.value;
        refreshSplitsSummary(transaction);
        return;
    }

    transaction[field] = input.value;
}

function applyAmountEdit(transaction, rawValue) {
    const parsed = parseFloat(String(rawValue).replace(',', '.'));
    const value = Number.isFinite(parsed) && parsed >= 0 ? parsed.toFixed(2) : '';
    const direction = getTxDirection(transaction);
    if (direction === 'in') {
        transaction.inflow = value;
        transaction.outflow = '';
    } else {
        transaction.outflow = value;
        transaction.inflow = '';
    }
    refreshSplitsSummary(transaction);
}

function refreshSplitsSummary(transaction) {
    if (!Array.isArray(transaction.splits) || transaction.splits.length === 0) return;
    const existing = dom.reviewGrid.querySelector(`.splits-row[data-id="${cssEscape(transaction.id)}"]`);
    if (!existing) return;
    const updated = buildSplitsRow(transaction);
    existing.replaceWith(updated);
}

function cssEscape(value) {
    if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') {
        return CSS.escape(value);
    }
    return String(value).replace(/["\\\]]/g, '\\$&');
}

function onTransactionChange(event) {
    const checkbox = event.target.closest('[data-action="toggle-selected"]');
    if (!checkbox || !state.review) return;
    const transaction = state.review.transactions.find((tx) => tx.id === checkbox.dataset.id);
    if (!transaction) return;
    transaction.selected = checkbox.checked;
    recalculateSummary();
    renderSummary();
    renderGrid();
}

function onTransactionClick(event) {
    const target = event.target.closest('[data-action]');
    if (!target || !state.review) return;
    const transaction = state.review.transactions.find((tx) => tx.id === target.dataset.id);
    if (!transaction) return;

    switch (target.dataset.action) {
        case 'prefill-from-transaction': {
            const draft = transaction.suggestedRuleDraft || {
                accountId: transaction.accountId,
                bankAccountId: transaction.bankAccountId,
                accountName: transaction.accountName,
                pattern: transaction.payeeNormalized || transaction.payeeRaw,
                replacement: transaction.payeeFinal || transaction.payeeRaw,
                category: transaction.categoryFinal || '',
                categoryId: '',
                memoTemplate: transaction.memoFinal || '',
                isRegex: false
            };
            fillRuleForm(draft, `Baseado em: ${transaction.payeeRaw}`);
            return;
        }
        case 'toggle-direction': {
            const direction = getTxDirection(transaction);
            if (direction === 'out') {
                transaction.inflow = transaction.outflow || '';
                transaction.outflow = '';
            } else {
                transaction.outflow = transaction.inflow || '';
                transaction.inflow = '';
            }
            renderGrid();
            return;
        }
        case 'toggle-splits': {
            if (state.expandedSplits.has(transaction.id)) {
                state.expandedSplits.delete(transaction.id);
            } else {
                state.expandedSplits.add(transaction.id);
            }
            renderGrid();
            return;
        }
        case 'add-split': {
            if (!Array.isArray(transaction.splits)) {
                transaction.splits = [];
            }
            const total = parseFloat(getTxAbsAmount(transaction)) || 0;
            const used = transaction.splits.reduce((sum, s) => sum + (parseFloat(s.amount) || 0), 0);
            const suggested = Math.max(0, round2(total - used));
            transaction.splits.push({
                id: `split-${Date.now()}-${transaction.splits.length}`,
                amount: suggested > 0 ? suggested.toFixed(2) : '',
                category: '',
                memo: ''
            });
            state.expandedSplits.add(transaction.id);
            renderGrid();
            return;
        }
        case 'remove-split': {
            if (!Array.isArray(transaction.splits)) return;
            transaction.splits = transaction.splits.filter((s) => s.id !== target.dataset.splitId);
            if (transaction.splits.length === 0) {
                transaction.splits = null;
            }
            renderGrid();
            return;
        }
        case 'restore-single': {
            transaction.splits = null;
            renderGrid();
            return;
        }
    }
}

function fillRuleForm(draft, contextLabel) {
    state.ruleDraft = { ...draft };
    dom.ruleContext.textContent = contextLabel || 'Rascunho pronto';
    dom.ruleAccountName.value = draft.accountName || '';
    dom.rulePattern.value = draft.pattern || '';
    dom.ruleReplacement.value = draft.replacement || '';
    setRuleCategoryValue(draft.category || '');
    dom.ruleMemo.value = draft.memoTemplate || '';
    dom.ruleRegex.checked = !!draft.isRegex;
    setMode('manage');
    setInlineMessage(dom.ruleMessage, '', '');
}

function clearRuleForm() {
    state.ruleDraft = null;
    dom.ruleContext.textContent = 'Selecione uma transacao ou sugestao';
    dom.ruleAccountName.value = '';
    dom.rulePattern.value = '';
    dom.ruleReplacement.value = '';
    setRuleCategoryValue('');
    dom.ruleMemo.value = '';
    dom.ruleRegex.checked = false;
    setInlineMessage(dom.ruleMessage, '', '');
}

async function saveRule(event) {
    event.preventDefault();
    if (!state.ruleDraft) {
        setInlineMessage(dom.ruleMessage, 'Escolha uma transacao ou sugestao antes de salvar.', 'error');
        return;
    }

    const pattern = dom.rulePattern.value.trim();
    if (!pattern) {
        setInlineMessage(dom.ruleMessage, 'Padrao obrigatorio.', 'error');
        return;
    }

    if (dom.ruleRegex.checked) {
        try {
            new RegExp(pattern);
        } catch (error) {
            setInlineMessage(dom.ruleMessage, 'Regex invalida.', 'error');
            return;
        }
    }

    const categoryName = dom.ruleCategory.value.trim();
    const category = state.categories.find((item) => item.name.toLowerCase() === categoryName.toLowerCase());

    await StorageManager.addPayeeRule({
        accountId: state.ruleDraft.accountId,
        pattern,
        replacement: dom.ruleReplacement.value.trim(),
        category: categoryName,
        categoryId: category?.id || '',
        isRegex: dom.ruleRegex.checked,
        memoTemplate: dom.ruleMemo.value.trim()
    });

    setInlineMessage(dom.ruleMessage, 'Regra salva. Atualizando a revisao...', 'success');
    await refreshReview();
    clearRuleForm();
    setMode('review');
}

async function addQuickCategory(event) {
    event.preventDefault();
    const name = dom.newCategoryName.value.trim();
    if (!name) return;

    if (state.categories.some((category) => category.name.toLowerCase() === name.toLowerCase())) {
        setInlineMessage(dom.categoryMessage, 'Categoria ja existe.', 'error');
        return;
    }

    await StorageManager.setCategories(state.categories.concat([{ name }]));
    dom.newCategoryName.value = '';
    await loadCategories();
    setInlineMessage(dom.categoryMessage, 'Categoria adicionada.', 'success');
}

async function loadCategories() {
    state.categories = await StorageManager.getCategories();
    dom.categoriesList.innerHTML = '';
    dom.ruleCategory.innerHTML = '<option value="">Opcional</option>';
    if (dom.categoryOptions) {
        dom.categoryOptions.innerHTML = '';
    }

    state.categories.forEach((category) => {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        dom.ruleCategory.appendChild(option);

        if (dom.categoryOptions) {
            const datalistOption = document.createElement('option');
            datalistOption.value = category.name;
            dom.categoryOptions.appendChild(datalistOption);
        }

        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = category.name;
        dom.categoriesList.appendChild(tag);
    });

    setRuleCategoryValue(state.ruleDraft?.category || '');
}

function setRuleCategoryValue(categoryName) {
    const normalized = String(categoryName || '').trim();
    Array.from(dom.ruleCategory.options)
        .filter((option) => option.dataset.dynamic === 'true')
        .forEach((option) => option.remove());
    const hasOption = Array.from(dom.ruleCategory.options).some((option) => option.value === normalized);

    if (!normalized || hasOption) {
        dom.ruleCategory.value = normalized;
        return;
    }

    const extraOption = document.createElement('option');
    extraOption.value = normalized;
    extraOption.textContent = `${normalized} (atual)`;
    extraOption.dataset.dynamic = 'true';
    dom.ruleCategory.appendChild(extraOption);
    dom.ruleCategory.value = normalized;
}

async function exportSelected() {
    if (!state.review || !state.review.transactions?.length) {
        return;
    }

    dom.summaryError.textContent = '';
    dom.summaryError.classList.add('hidden');

    const selected = state.review.transactions.filter((tx) => tx.selected !== false);
    if (selected.length === 0) {
        dom.summaryError.textContent = 'Selecione ao menos uma transacao para exportar.';
        dom.summaryError.classList.remove('hidden');
        dom.summaryError.classList.add('error');
        return;
    }

    const validationError = validateForExport(selected);
    if (validationError) {
        dom.summaryError.textContent = validationError;
        dom.summaryError.classList.remove('hidden');
        dom.summaryError.classList.add('error');
        return;
    }

    const csv = BankUtils.transactionsToCsv(state.review.transactions);
    const filename = `${state.review.account?.accountId || 'budget-export'}-${new Date().toISOString().slice(0, 10)}.csv`;
    try {
        await downloadCsv(csv, filename);
        setInlineMessage(dom.ruleMessage, 'Exportacao iniciada.', 'success');
    } catch (error) {
        dom.summaryError.textContent = `Falha ao exportar: ${error.message || error}`;
        dom.summaryError.classList.remove('hidden');
        dom.summaryError.classList.add('error');
    }
}

function validateForExport(transactions) {
    for (const tx of transactions) {
        const hasAmount = (tx.outflow && String(tx.outflow).trim() !== '') || (tx.inflow && String(tx.inflow).trim() !== '');
        if (!hasAmount) {
            return `Transacao "${tx.payeeRaw || tx.id}" sem valor (entrada ou saida).`;
        }
        if (Array.isArray(tx.splits) && tx.splits.length > 0) {
            const total = parseFloat(getTxAbsAmount(tx)) || 0;
            const partial = tx.splits.reduce((sum, s) => sum + (parseFloat(s.amount) || 0), 0);
            if (Math.abs(round2(total - partial)) >= 0.005) {
                return `Splits de "${tx.payeeRaw || tx.id}" somam ${partial.toFixed(2)}, total e ${total.toFixed(2)}.`;
            }
            const missingCategory = tx.splits.find((s) => !s.category || !String(s.category).trim());
            if (missingCategory) {
                return `Splits de "${tx.payeeRaw || tx.id}" tem linha sem categoria.`;
            }
        }
    }
    return null;
}

async function openManagePage() {
    await runtimeAPI.sendMessage({ type: 'OPEN_MANAGE_PAGE' });
}

function setMode(mode) {
    state.mode = mode;
    const reviewMode = mode === 'review';
    dom.reviewPanel.classList.toggle('active', reviewMode);
    dom.managePanel.classList.toggle('active', !reviewMode);
    dom.modeReview.classList.toggle('active', reviewMode);
    dom.modeManage.classList.toggle('active', !reviewMode);
}

function setInlineMessage(element, text, tone) {
    if (!text) {
        element.textContent = '';
        element.className = 'message hidden';
        return;
    }

    element.textContent = text;
    element.className = `message ${tone}`;
}

function statusLabel(status) {
    if (status === 'matched') return 'Com regra';
    if (status === 'suggested') return 'Sugestao';
    return 'Sem regra';
}

function formatAmount(transaction) {
    if (transaction.outflow) return `Saida ${transaction.outflow}`;
    if (transaction.inflow) return `Entrada ${transaction.inflow}`;
    return transaction.amountRaw || 'Sem valor';
}

function escapeHtml(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function escapeAttribute(value) {
    return escapeHtml(value).replace(/`/g, '&#96;');
}

async function downloadCsv(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    try {
        if (typeof browser !== 'undefined') {
            return await downloadsAPI.download({
                url,
                filename,
                saveAs: true,
                conflictAction: 'uniquify'
            });
        }

        return await new Promise((resolve, reject) => {
            downloadsAPI.download({
                url,
                filename,
                saveAs: true,
                conflictAction: 'uniquify'
            }, (downloadId) => {
                const err = chrome.runtime?.lastError;
                if (err) {
                    reject(new Error(err.message || String(err)));
                    return;
                }
                resolve(downloadId);
            });
        });
    } finally {
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
}
