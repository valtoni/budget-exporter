import { LitElement, html, nothing } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

export class ChipList extends LitElement {
    static properties = {
        items: { type: Array },
        emptyText: { type: String }
    };

    createRenderRoot() {
        return this;
    }

    constructor() {
        super();
        this.items = [];
        this.emptyText = 'Nada cadastrado.';
    }

    emit(name, detail = {}) {
        this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
    }

    render() {
        if (!this.items.length) {
            return html`<div class="chip-empty">${this.emptyText}</div>`;
        }
        return html`
            <div class="chip-grid">
                ${repeat(this.items, (item) => item.key, (item) => html`
                    <div class="chip ${item.locked ? 'is-locked' : ''}" title=${item.tooltip || ''}>
                        <span class="chip-label">${item.label}</span>
                        ${item.locked
                            ? html`<span class="chip-lock" title="Pré-definido">●</span>`
                            : html`<button class="chip-remove"
                                           title="Remover"
                                           @click=${() => this.emit('chip-remove', { key: item.key })}>×</button>`}
                    </div>
                `)}
            </div>
        `;
    }
}

customElements.define('chip-list', ChipList);
