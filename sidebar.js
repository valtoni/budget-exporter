const runtimeAPI = typeof browser !== 'undefined' ? browser.runtime : chrome.runtime;
const downloadsAPI = typeof browser !== 'undefined' ? browser.downloads : chrome.downloads;

const state = {
    review: null,
    filter: 'all',
    mode: 'review',
    categories: [],
    ruleDraft: null,
    cutoffDate: ''
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
    dom.suggestionsList = document.getElementById('suggestions-list');
    dom.transactionsList = document.getElementById('transactions-list');
    dom.suggestionsCount = document.getElementById('suggestions-count');
    dom.transactionsCount = document.getElementById('transactions-count');
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
    dom.categoryOptions = document.getElementById('category-options');
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
        renderTransactions();
    });

    dom.transactionsList.addEventListener('input', onTransactionInput);
    dom.transactionsList.addEventListener('change', onTransactionChange);
    dom.transactionsList.addEventListener('click', onTransactionClick);
    dom.suggestionsList.addEventListener('click', onSuggestionClick);
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
    applyCutoffToReview();
    recalculateSummary();
    updateFilterLabels();
    renderCutoffStatus();
    renderSummary();
    renderSuggestions();
    renderTransactions();
    if (state.ruleDraft && state.review?.account) {
        dom.ruleAccountName.value = state.review.account.displayName;
    }
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

function renderSuggestions() {
    const review = state.review;
    dom.suggestionsList.innerHTML = '';
    const suggestions = review?.suggestions || [];
    dom.suggestionsCount.textContent = String(suggestions.length);

    if (suggestions.length === 0) {
        dom.suggestionsList.innerHTML = '<div class="small">Nenhuma sugestao nova nesta pagina.</div>';
        return;
    }

    suggestions.forEach((suggestion) => {
        const card = document.createElement('article');
        card.className = 'suggestion-card';
        card.innerHTML = `
            <div class="card-head">
                <strong>${escapeHtml(suggestion.draftReplacement || suggestion.canonicalPattern)}</strong>
                <span class="pill">${suggestion.occurrenceCount} ocorrencias</span>
            </div>
            <p class="small">Exemplo: ${escapeHtml(suggestion.samplePayee)}</p>
            <p class="small">Padrao sugerido: ${escapeHtml(suggestion.canonicalPattern)}</p>
            <p class="small">${escapeHtml(suggestion.evidenceLabel || '')}</p>
            ${suggestion.draftCategory ? `<p class="small">Categoria sugerida: ${escapeHtml(suggestion.draftCategory)}</p>` : ''}
            <div class="card-actions">
                <button class="button primary" type="button" data-action="use-suggestion" data-key="${escapeHtml(suggestion.suggestionKey)}">Criar regra</button>
            </div>
        `;
        dom.suggestionsList.appendChild(card);
    });
}

function renderTransactions() {
    const review = state.review;
    dom.transactionsList.innerHTML = '';

    if (!review) {
        dom.transactionsCount.textContent = '0';
        dom.transactionsList.innerHTML = '<div class="small">Nenhuma revisao carregada.</div>';
        return;
    }

    const items = review.transactions.filter((tx) => state.filter === 'all' || tx.matchStatus === state.filter);
    dom.transactionsCount.textContent = String(items.length);

    if (items.length === 0) {
        dom.transactionsList.innerHTML = '<div class="small">Nenhuma transacao para o filtro atual.</div>';
        return;
    }

    items.forEach((tx) => {
        const card = document.createElement('article');
        card.className = `transaction-card ${tx.matchStatus !== 'matched' ? 'needs-attention' : ''}`;
        card.innerHTML = `
            <div class="card-head">
                <div>
                    <strong>${escapeHtml(tx.payeeRaw || 'Sem descricao')}</strong>
                    <div class="transaction-meta">${escapeHtml(tx.dateIso || tx.dateRaw || '')} · ${escapeHtml(formatAmount(tx))}</div>
                </div>
                <span class="status-badge ${tx.matchStatus}">${escapeHtml(statusLabel(tx.matchStatus))}</span>
            </div>
            <div class="selection-row">
                <input type="checkbox" data-action="toggle-selected" data-id="${escapeHtml(tx.id)}" ${tx.selected === false ? '' : 'checked'}>
                <span>${tx.selected === false ? 'Nao sera exportada' : 'Sera exportada'}</span>
            </div>
            ${tx.cutoffExcluded ? `<p class="small">Excluida pelo corte em ${escapeHtml(state.cutoffDate)}</p>` : ''}
            ${tx.matchReason ? `<p class="small">${escapeHtml(tx.matchReason)}</p>` : ''}
            ${tx.payeeFinal && tx.payeeFinal !== tx.payeeRaw ? `<p class="small">Payee sugerido: ${escapeHtml(tx.payeeFinal)}</p>` : ''}
            <div class="transaction-edit editor-grid">
                <label>
                    Payee final
                    <input type="text" data-field="payeeFinal" data-id="${escapeHtml(tx.id)}" value="${escapeAttribute(tx.payeeFinal || '')}">
                </label>
                <label>
                    Categoria final
                    <input type="text" list="category-options" data-field="categoryFinal" data-id="${escapeHtml(tx.id)}" value="${escapeAttribute(tx.categoryFinal || '')}">
                </label>
                <label>
                    Memo final
                    <input type="text" data-field="memoFinal" data-id="${escapeHtml(tx.id)}" value="${escapeAttribute(tx.memoFinal || '')}">
                </label>
            </div>
            <div class="card-actions">
                <button class="button ghost" type="button" data-action="prefill-from-transaction" data-id="${escapeHtml(tx.id)}">Criar regra</button>
            </div>
        `;
        dom.transactionsList.appendChild(card);
    });
}

function onTransactionInput(event) {
    const input = event.target.closest('[data-field]');
    if (!input || !state.review) return;
    const transaction = state.review.transactions.find((tx) => tx.id === input.dataset.id);
    if (!transaction) return;
    transaction[input.dataset.field] = input.value;
}

function onTransactionChange(event) {
    const checkbox = event.target.closest('[data-action="toggle-selected"]');
    if (!checkbox || !state.review) return;
    const transaction = state.review.transactions.find((tx) => tx.id === checkbox.dataset.id);
    if (!transaction) return;
    transaction.selected = checkbox.checked;
    recalculateSummary();
    renderSummary();
    renderTransactions();
}

function onTransactionClick(event) {
    const button = event.target.closest('[data-action="prefill-from-transaction"]');
    if (!button || !state.review) return;
    const transaction = state.review.transactions.find((tx) => tx.id === button.dataset.id);
    if (!transaction) return;

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
}

function onSuggestionClick(event) {
    const button = event.target.closest('[data-action="use-suggestion"]');
    if (!button || !state.review) return;
    const suggestion = state.review.suggestions.find((item) => item.suggestionKey === button.dataset.key);
    if (!suggestion) return;
    fillRuleForm(suggestion.draft, `Sugestao local (${suggestion.occurrenceCount} ocorrencias)`);
}

function fillRuleForm(draft, contextLabel) {
    state.ruleDraft = { ...draft };
    dom.ruleContext.textContent = contextLabel || 'Rascunho pronto';
    dom.ruleAccountName.value = draft.accountName || '';
    dom.rulePattern.value = draft.pattern || '';
    dom.ruleReplacement.value = draft.replacement || '';
    dom.ruleCategory.value = draft.category || '';
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
    dom.ruleCategory.value = '';
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
    dom.categoryOptions.innerHTML = '';
    dom.categoriesList.innerHTML = '';

    state.categories.forEach((category) => {
        const option = document.createElement('option');
        option.value = category.name;
        dom.categoryOptions.appendChild(option);

        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = category.name;
        dom.categoriesList.appendChild(tag);
    });
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
