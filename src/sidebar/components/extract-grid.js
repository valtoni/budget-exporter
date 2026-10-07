import { LitElement, html, nothing } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import './extract-row.js';
import './extract-splits.js';

export class ExtractGrid extends LitElement {
    static properties = {
        transactions: { type: Array },
        expandedRowId: { state: true },
        expandedSplits: { type: Object }
    };

    createRenderRoot() {
        return this;
    }

    constructor() {
        super();
        this.transactions = [];
        this.expandedRowId = null;
        this.expandedSplits = new Set();
    }

    onSelectAll(event) {
        this.dispatchEvent(new CustomEvent('tx-select-all', {
            detail: { selected: event.target.checked },
            bubbles: true,
            composed: true
        }));
    }

    onRowToggleExpand(event) {
        const { id, expanded } = event.detail;
        this.expandedRowId = expanded ? id : null;
        this.requestUpdate();
    }

    // Linhas fora da data de corte não são selecionáveis (onSelectAll as pula),
    // então elas não podem contar para o estado do checkbox mestre — senão ele
    // nunca chegava a "marcado" e voltava para indeterminado logo após o clique.
    get selectable() {
        return (this.transactions || []).filter((tx) => !tx.cutoffExcluded);
    }

    get allSelected() {
        const items = this.selectable;
        if (!items.length) return false;
        return items.every((tx) => tx.selected !== false);
    }

    get someSelected() {
        return this.selectable.some((tx) => tx.selected !== false);
    }

    updated() {
        const headerCheck = this.querySelector('#grid-select-all');
        if (headerCheck) {
            headerCheck.indeterminate = !this.allSelected && this.someSelected;
        }
    }

    render() {
        const items = this.transactions || [];

        return html`
            <div class="tx-grid-host">
                <div class="tx-grid-header">
                    <div class="th-date">Data</div>
                    <div class="th-body">Payee · Categoria</div>
                    <div class="th-amount">Valor</div>
                    <div class="th-check">
                        <input id="grid-select-all"
                               type="checkbox"
                               .checked=${this.allSelected}
                               @change=${this.onSelectAll}
                               title="Selecionar tudo">
                    </div>
                </div>

                <div class="tx-grid-body"
                     @tx-toggle-expand=${this.onRowToggleExpand}>
                    ${items.length === 0
                        ? html`<div class="tx-empty">Nenhuma transação para o filtro atual.</div>`
                        : repeat(items, (tx) => tx.id, (tx) => html`
                            <extract-row
                                .tx=${tx}
                                .expanded=${this.expandedRowId === tx.id}></extract-row>
                            ${this.expandedSplits.has(tx.id) || (Array.isArray(tx.splits) && tx.splits.length > 0)
                                ? html`<extract-splits .tx=${tx}></extract-splits>`
                                : nothing}
                        `)}
                </div>
            </div>
        `;
    }
}

customElements.define('extract-grid', ExtractGrid);
