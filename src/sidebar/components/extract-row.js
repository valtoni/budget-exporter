import { LitElement, html, nothing } from 'lit';

export class ExtractRow extends LitElement {
    static properties = {
        tx: { type: Object },
        expanded: { type: Boolean, reflect: true }
    };

    createRenderRoot() {
        return this;
    }

    constructor() {
        super();
        this.tx = null;
        this.expanded = false;
        this._datePicker = null;
    }

    disconnectedCallback() {
        this._destroyDatePicker();
        super.disconnectedCallback();
    }

    updated(changed) {
        if (changed.has('expanded')) {
            if (this.expanded) this._mountDatePicker();
            else this._destroyDatePicker();
        }
    }

    _mountDatePicker() {
        const deps = window.__sidebarDeps;
        if (!deps?.flatpickr) return;
        const input = this.querySelector('input[data-field="dateIso"]');
        if (!input) return;
        this._destroyDatePicker();
        this._datePicker = deps.flatpickr(input, {
            locale: deps.Portuguese,
            dateFormat: 'Y-m-d',
            defaultDate: this.tx?.dateIso || undefined,
            allowInput: true,
            onChange: (_dates, dateStr) => {
                this.emit('tx-change', { field: 'dateIso', value: dateStr });
            }
        });
    }

    _destroyDatePicker() {
        if (this._datePicker) {
            this._datePicker.destroy();
            this._datePicker = null;
        }
    }

    get direction() {
        const tx = this.tx;
        if (tx?.outflow && !tx?.inflow) return 'out';
        if (tx?.inflow && !tx?.outflow) return 'in';
        return tx?.outflow ? 'out' : 'in';
    }

    get absAmount() {
        const tx = this.tx;
        const raw = tx?.outflow || tx?.inflow || '';
        const parsed = parseFloat(String(raw).replace(',', '.'));
        return Number.isFinite(parsed) ? Math.abs(parsed) : 0;
    }

    formatAmount() {
        const sign = this.direction === 'in' ? '+' : '−';
        return `${sign}${this.absAmount.toFixed(2)}`;
    }

    splitDateParts() {
        const iso = this.tx?.dateIso || this.tx?.dateRaw || '';
        if (/^\d{4}-\d{2}-\d{2}/.test(iso)) {
            return { day: iso.slice(5, 10), year: iso.slice(0, 4) };
        }
        return { day: iso || '—', year: '' };
    }

    categoryDisplay() {
        const tx = this.tx;
        if (Array.isArray(tx.splits) && tx.splits.length > 0) {
            return `Split em ${tx.splits.length}`;
        }
        return tx.categoryFinal || '—';
    }

    payeeDisplay() {
        return this.tx?.payeeFinal || this.tx?.payeeRaw || 'Sem descrição';
    }

    statusLabel(status) {
        if (status === 'matched') return 'Com regra';
        if (status === 'suggested') return 'Sugestão';
        return 'Sem regra';
    }

    emit(name, detail = {}) {
        this.dispatchEvent(new CustomEvent(name, {
            detail: { id: this.tx?.id, ...detail },
            bubbles: true,
            composed: true
        }));
    }

    onFieldInput(event) {
        const target = event.target;
        const field = target.dataset.field;
        if (!field) return;
        this.emit('tx-change', { field, value: target.value });
    }

    onSelectToggle(event) {
        this.emit('tx-toggle-selected', { selected: event.target.checked });
    }

    onRowClick(event) {
        if (event.target.closest('input, button, label, select, .tx-row-edit')) return;
        this.emit('tx-toggle-expand', { expanded: !this.expanded });
    }

    onAmountInput(event) {
        this.emit('tx-amount-change', { value: event.target.value });
    }

    onDirectionToggle() {
        this.emit('tx-toggle-direction');
    }

    onCreateRule() {
        this.emit('tx-create-rule');
    }

    onToggleSplits() {
        this.emit('tx-toggle-splits');
    }

    onCollapse() {
        this.emit('tx-toggle-expand', { expanded: false });
    }

    renderRead() {
        const tx = this.tx;
        const amountClass = `tx-amount ${this.direction === 'in' ? 'is-in' : 'is-out'}`;
        const { day, year } = this.splitDateParts();
        return html`
            <div class="tx-row-read" @click=${this.onRowClick}>
                <div class="tx-date">
                    <span class="tx-date-day">${day}</span>
                    ${year ? html`<span class="tx-date-year">${year}</span>` : nothing}
                </div>
                <div class="tx-body">
                    <div class="tx-payee" title=${tx.payeeRaw || ''}>${this.payeeDisplay()}</div>
                    <div class="tx-category">${this.categoryDisplay()}</div>
                </div>
                <div class=${amountClass}>${this.formatAmount()}</div>
                <label class="tx-check" @click=${(e) => e.stopPropagation()}>
                    <input type="checkbox"
                           .checked=${tx.selected !== false}
                           @change=${this.onSelectToggle}>
                </label>
            </div>
        `;
    }

    renderEdit() {
        const tx = this.tx;
        const hasSplits = Array.isArray(tx.splits) && tx.splits.length > 0;
        const dirClass = `dir-btn ${this.direction === 'in' ? 'in' : 'out'}`;
        const dirLabel = this.direction === 'in' ? '+' : '−';
        return html`
            <div class="tx-row-edit" @input=${this.onFieldInput}>
                <div class="tx-edit-meta">
                    <span class="tx-edit-raw" title=${tx.payeeRaw || ''}>${tx.payeeRaw || ''}</span>
                    ${tx.matchReason ? html`<span class="tx-edit-reason">${tx.matchReason}</span>` : nothing}
                </div>

                <div class="tx-edit-grid">
                    <label class="field field-date">
                        <span>Data</span>
                        <input type="text"
                               data-field="dateIso"
                               placeholder="2026-04-30"
                               inputmode="numeric"
                               autocomplete="off"
                               .value=${tx.dateIso || ''}>
                    </label>

                    <label class="field field-amount">
                        <span>Valor</span>
                        <div class="amount-row">
                            <button type="button"
                                    class=${dirClass}
                                    title=${this.direction === 'in' ? 'Entrada' : 'Saída'}
                                    @click=${this.onDirectionToggle}>${dirLabel}</button>
                            <input type="number"
                                   step="0.01" min="0"
                                   inputmode="decimal"
                                   .value=${String(this.absAmount || '')}
                                   @input=${this.onAmountInput}>
                        </div>
                    </label>

                    <label class="field field-payee">
                        <span>Payee</span>
                        <input type="text" data-field="payeeFinal" .value=${tx.payeeFinal || ''}>
                    </label>

                    <label class="field field-category">
                        <span>Categoria</span>
                        <input type="text"
                               list="category-options"
                               data-field="categoryFinal"
                               .value=${hasSplits ? `Split em ${tx.splits.length}` : (tx.categoryFinal || '')}
                               ?disabled=${hasSplits}>
                    </label>

                    <label class="field field-memo">
                        <span>Memo</span>
                        <input type="text" data-field="memoFinal"
                               .value=${hasSplits ? '' : (tx.memoFinal || '')}
                               ?disabled=${hasSplits}>
                    </label>
                </div>

                <div class="tx-edit-actions">
                    <button type="button" class="ghost-btn" @click=${this.onCreateRule}>
                        <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
                            <path d="M9.5 1L3 9h4l-1 6 6.5-8H8.5l1-6z" fill="currentColor"/>
                        </svg>
                        Criar regra
                    </button>
                    <button type="button" class="ghost-btn ${hasSplits ? 'active' : ''}" @click=${this.onToggleSplits}>
                        <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
                            <path d="M8 2v3.5M8 5.5L4 9.5M8 5.5l4 4M4 9.5V14M12 9.5V14" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="8" cy="2" r="1.3" fill="currentColor"/>
                            <circle cx="4" cy="14" r="1.3" fill="currentColor"/>
                            <circle cx="12" cy="14" r="1.3" fill="currentColor"/>
                        </svg>
                        ${hasSplits ? 'Splits' : 'Dividir'}
                    </button>
                    <button type="button" class="ghost-btn ml-auto" @click=${this.onCollapse}>Fechar</button>
                </div>
            </div>
        `;
    }

    render() {
        if (!this.tx) return nothing;
        const sent = !!this.tx.ynabSentAt;
        const cutoff = !!this.tx.cutoffExcluded;
        const selected = this.tx.selected !== false;
        const status = this.tx.matchStatus || 'unmatched';
        const klass = [
            'tx-row',
            `status-${status}`,
            this.expanded ? 'is-expanded' : '',
            sent ? 'is-sent' : '',
            cutoff ? 'is-cutoff' : '',
            selected ? 'is-selected' : ''
        ].filter(Boolean).join(' ');

        return html`
            <div class=${klass}
                 title=${this.statusLabel(status)}
                 data-id=${this.tx.id}>
                ${this.renderRead()}
                ${this.expanded ? this.renderEdit() : nothing}
            </div>
        `;
    }
}

customElements.define('extract-row', ExtractRow);
