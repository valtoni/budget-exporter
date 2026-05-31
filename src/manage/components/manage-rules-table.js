import { LitElement, html, nothing } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

const COLUMNS = [
    { id: 'account', label: 'Conta', sortable: true },
    { id: 'pattern', label: 'Padrão', sortable: true },
    { id: 'replacement', label: 'Substituição', sortable: true },
    { id: 'category', label: 'Categoria', sortable: true },
    { id: 'memo', label: 'Memo', sortable: true },
    { id: 'actions', label: 'Ações', sortable: false }
];

export class ManageRulesTable extends LitElement {
    static properties = {
        rules: { type: Array },
        accounts: { type: Array },
        sortCol: { type: String },
        sortDir: { type: String },
        page: { type: Number },
        pageSize: { type: Number }
    };

    createRenderRoot() {
        return this;
    }

    constructor() {
        super();
        this.rules = [];
        this.accounts = [];
        this.sortCol = 'pattern';
        this.sortDir = 'asc';
        this.page = 1;
        this.pageSize = 20;
    }

    emit(name, detail = {}) {
        this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
    }

    accountName(id) {
        const a = this.accounts.find((x) => x.id === id);
        if (!a) return '';
        if (a.id === 0) return 'Todas';
        return a.name.charAt(0).toUpperCase() + a.name.slice(1);
    }

    get sorted() {
        const arr = [...this.rules];
        arr.sort((a, b) => {
            const va = String(this._valueFor(a, this.sortCol)).toLowerCase();
            const vb = String(this._valueFor(b, this.sortCol)).toLowerCase();
            if (va < vb) return this.sortDir === 'asc' ? -1 : 1;
            if (va > vb) return this.sortDir === 'asc' ? 1 : -1;
            return 0;
        });
        return arr;
    }

    _valueFor(rule, col) {
        switch (col) {
            case 'account': return this.accountName(rule.accountId);
            case 'pattern': return rule.pattern || '';
            case 'replacement': return rule.replacement || '';
            case 'category': return rule._categoryName || '';
            case 'memo': return rule.memoTemplate || '';
            default: return '';
        }
    }

    get paginated() {
        const sorted = this.sorted;
        const start = (this.page - 1) * this.pageSize;
        return sorted.slice(start, start + this.pageSize);
    }

    get totalPages() {
        return Math.max(1, Math.ceil(this.rules.length / this.pageSize));
    }

    onSort(col) {
        if (!col.sortable) return;
        if (this.sortCol === col.id) {
            this.emit('sort-change', { col: col.id, dir: this.sortDir === 'asc' ? 'desc' : 'asc' });
        } else {
            this.emit('sort-change', { col: col.id, dir: 'asc' });
        }
    }

    onPageClick(p) {
        if (p < 1 || p > this.totalPages || p === this.page) return;
        this.emit('page-change', { page: p });
    }

    sortIcon(colId) {
        if (this.sortCol !== colId) return '↕';
        return this.sortDir === 'asc' ? '↑' : '↓';
    }

    renderPagination() {
        const total = this.totalPages;
        if (total <= 1) return nothing;
        const p = this.page;
        const maxVisible = 5;
        let start = Math.max(1, p - Math.floor(maxVisible / 2));
        let end = Math.min(total, start + maxVisible - 1);
        if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);

        const pageBtns = [];
        if (start > 1) {
            pageBtns.push(1);
            if (start > 2) pageBtns.push('…');
        }
        for (let i = start; i <= end; i++) pageBtns.push(i);
        if (end < total) {
            if (end < total - 1) pageBtns.push('…');
            pageBtns.push(total);
        }

        return html`
            <nav class="mr-pagination" aria-label="Paginação">
                <button class="mr-page-btn" ?disabled=${p === 1} @click=${() => this.onPageClick(p - 1)}>‹</button>
                ${pageBtns.map((b) =>
                    b === '…'
                        ? html`<span class="mr-page-ellipsis">…</span>`
                        : html`<button class="mr-page-btn ${b === p ? 'is-active' : ''}" @click=${() => this.onPageClick(b)}>${b}</button>`
                )}
                <button class="mr-page-btn" ?disabled=${p === total} @click=${() => this.onPageClick(p + 1)}>›</button>
            </nav>
        `;
    }

    render() {
        if (this.rules.length === 0) {
            return html`<div class="mr-empty">Nenhuma regra para mostrar.</div>`;
        }

        const items = this.paginated;
        return html`
            <div class="mr-table-wrap">
                <table class="mr-table">
                    <thead>
                        <tr>
                            ${COLUMNS.map((col) => html`
                                <th class="mr-th mr-th-${col.id} ${col.sortable ? 'is-sortable' : ''} ${this.sortCol === col.id ? 'is-active' : ''}"
                                    @click=${() => this.onSort(col)}>
                                    <span>${col.label}</span>
                                    ${col.sortable ? html`<span class="mr-sort">${this.sortIcon(col.id)}</span>` : nothing}
                                </th>
                            `)}
                        </tr>
                    </thead>
                    <tbody>
                        ${repeat(items, (r) => r.id, (rule) => html`
                            <tr class="mr-row ${rule.enabled === false ? 'is-disabled' : ''}">
                                <td class="mr-cell mr-cell-account">${this.accountName(rule.accountId) || html`<span class="mr-muted">—</span>`}</td>
                                <td class="mr-cell mr-cell-pattern">
                                    <code class="mr-code">${rule.pattern}</code>
                                    ${rule.isRegex ? html`<span class="mr-regex-badge">REGEX</span>` : nothing}
                                </td>
                                <td class="mr-cell mr-cell-replacement">${rule.replacement || html`<span class="mr-muted">—</span>`}</td>
                                <td class="mr-cell mr-cell-category">${rule._categoryName || html`<span class="mr-muted">—</span>`}</td>
                                <td class="mr-cell mr-cell-memo">${rule.memoTemplate || html`<span class="mr-muted">—</span>`}</td>
                                <td class="mr-cell mr-cell-actions">
                                    <button class="mr-action" title="Editar" @click=${() => this.emit('rule-edit', { rule })}>
                                        <svg viewBox="0 0 16 16" width="13" height="13"><path d="M11.5 1.5l3 3-9 9H2.5v-3l9-9z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
                                    </button>
                                    <button class="mr-action" title=${rule.enabled === false ? 'Ativar' : 'Desativar'}
                                            @click=${() => this.emit('rule-toggle', { id: rule.id })}>
                                        ${rule.enabled === false
                                            ? html`<svg viewBox="0 0 16 16" width="13" height="13"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`
                                            : html`<svg viewBox="0 0 16 16" width="13" height="13"><circle cx="8" cy="8" r="6" fill="currentColor"/></svg>`}
                                    </button>
                                    <button class="mr-action mr-action-danger" title="Remover" @click=${() => this.emit('rule-remove', { id: rule.id })}>
                                        <svg viewBox="0 0 16 16" width="13" height="13"><path d="M3 4h10M6 4v-1.5h4V4M5 4l.5 9h5L11 4M7 7v4M9 7v4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                    </button>
                                </td>
                            </tr>
                        `)}
                    </tbody>
                </table>
            </div>
            ${this.renderPagination()}
        `;
    }
}

customElements.define('manage-rules-table', ManageRulesTable);
