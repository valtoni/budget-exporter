import { LitElement, html, nothing } from 'lit';

export class ExtractSplits extends LitElement {
    static properties = {
        tx: { type: Object }
    };

    createRenderRoot() {
        return this;
    }

    constructor() {
        super();
        this.tx = null;
    }

    get totalAbs() {
        const tx = this.tx;
        const raw = tx?.outflow || tx?.inflow || '';
        const parsed = parseFloat(String(raw).replace(',', '.'));
        return Number.isFinite(parsed) ? Math.abs(parsed) : 0;
    }

    get partial() {
        const splits = this.tx?.splits || [];
        return splits.reduce((sum, s) => sum + (parseFloat(s.amount) || 0), 0);
    }

    get diff() {
        return Math.round((this.totalAbs - this.partial) * 100) / 100;
    }

    emit(name, detail = {}) {
        this.dispatchEvent(new CustomEvent(name, {
            detail: { id: this.tx?.id, ...detail },
            bubbles: true,
            composed: true
        }));
    }

    onSplitInput(event) {
        const target = event.target;
        const field = target.dataset.field;
        if (!field?.startsWith('split.')) return;
        const splitField = field.slice('split.'.length);
        this.emit('tx-split-change', {
            splitId: target.dataset.splitId,
            field: splitField,
            value: target.value
        });
    }

    onAddSplit() {
        this.emit('tx-split-add');
    }

    onRemoveSplit(splitId) {
        this.emit('tx-split-remove', { splitId });
    }

    onRestoreSingle() {
        this.emit('tx-split-restore');
    }

    render() {
        if (!this.tx) return nothing;
        const splits = Array.isArray(this.tx.splits) ? this.tx.splits : [];
        const diff = this.diff;
        const ok = Math.abs(diff) < 0.005 && splits.length > 0;

        return html`
            <div class="splits-drawer ${ok ? 'is-ok' : 'is-diff'}"
                 @input=${this.onSplitInput}>
                <div class="splits-head">
                    <strong>Splits</strong>
                    <div class="splits-summary">
                        <span>Total ${this.totalAbs.toFixed(2)}</span>
                        <span>Parcial ${this.partial.toFixed(2)}</span>
                        <span class=${ok ? 'splits-status-ok' : 'splits-status-diff'}>
                            ${ok ? 'OK' : `Δ ${diff.toFixed(2)}`}
                        </span>
                    </div>
                </div>

                ${splits.length === 0
                    ? html`<p class="splits-empty">Adicione a primeira linha abaixo.</p>`
                    : html`
                        <div class="splits-list">
                            ${splits.map((split, index) => html`
                                <div class="split-line" data-split-id=${split.id}>
                                    <span class="split-index">${index + 1}</span>
                                    <input type="number" step="0.01" min="0" inputmode="decimal"
                                           class="split-amount"
                                           data-field="split.amount"
                                           data-split-id=${split.id}
                                           .value=${split.amount || ''}
                                           placeholder="0,00">
                                    <input type="text" list="category-options"
                                           class="split-category"
                                           data-field="split.category"
                                           data-split-id=${split.id}
                                           .value=${split.category || ''}
                                           placeholder="Categoria">
                                    <input type="text"
                                           class="split-memo"
                                           data-field="split.memo"
                                           data-split-id=${split.id}
                                           .value=${split.memo || ''}
                                           placeholder="Memo">
                                    <button type="button"
                                            class="split-remove"
                                            title="Remover"
                                            @click=${() => this.onRemoveSplit(split.id)}>×</button>
                                </div>
                            `)}
                        </div>
                    `}

                <div class="splits-actions">
                    <button type="button" class="ghost-btn" @click=${this.onAddSplit}>+ Linha</button>
                    ${splits.length > 0
                        ? html`<button type="button" class="ghost-btn" @click=${this.onRestoreSingle}>Voltar a single</button>`
                        : nothing}
                </div>
            </div>
        `;
    }
}

customElements.define('extract-splits', ExtractSplits);
