import { LitElement, html, nothing } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

const HIDDEN_GROUP_KEY = '__hidden__';
const UNGROUPED_LOCAL_KEY = '__local_ungrouped__';

// Local category names follow the convention "Group: Category". Split that into
// a logical group + leaf name so the offline tree mirrors YNAB's hierarchy
// without needing a schema migration.
function splitLocalName(fullName) {
    const raw = String(fullName || '').trim();
    if (!raw) return { group: '', leaf: '', original: raw };
    const idx = raw.indexOf(':');
    if (idx === -1) return { group: '', leaf: raw, original: raw };
    return {
        group: raw.slice(0, idx).trim(),
        leaf: raw.slice(idx + 1).trim() || raw,
        original: raw
    };
}

export class CategoryTree extends LitElement {
    static properties = {
        cache: { type: Object },          // ynab_categories payload (or null)
        localCategories: { type: Array }, // [{id, name}] from chrome.storage.local.categories
        rulesByCategoryId: { type: Object }, // { id|name: count }
        connected: { type: Boolean },
        budgetId: { type: String },
        syncing: { type: Boolean, reflect: true },
        collapsed: { type: Object, state: true }, // { groupId: true|false }
        editing: { type: Object, state: true }    // { kind: 'cat'|'group'|'add', key, value }
    };

    createRenderRoot() {
        return this;
    }

    constructor() {
        super();
        this.cache = null;
        this.localCategories = [];
        this.rulesByCategoryId = {};
        this.connected = false;
        this.budgetId = '';
        this.syncing = false;
        this.collapsed = {};
        this.editing = null;
    }

    // ───────── Inline editing helpers ─────────
    beginEditCategory(category) {
        // Edit only the leaf portion; group prefix is preserved on commit.
        this.editing = { kind: 'cat', key: category.original, value: category.name };
        this.updateComplete.then(() => this.focusEditInput());
    }

    beginEditGroup(groupName) {
        if (!groupName) return;
        this.editing = { kind: 'group', key: groupName, value: groupName };
        this.updateComplete.then(() => this.focusEditInput());
    }

    beginAddInGroup(groupName) {
        this.editing = { kind: 'add', key: groupName, value: '' };
        this.updateComplete.then(() => {
            this.focusEditInput();
            // Close on outside click.
            this._outsideClickHandler = (e) => {
                const pop = this.querySelector('.ct-popover');
                const trigger = this.querySelector(`.ct-group-add-btn[data-group="${CSS.escape(groupName)}"]`);
                if (pop && !pop.contains(e.target) && trigger !== e.target && !trigger?.contains(e.target)) {
                    this.commitEdit(false);
                }
            };
            setTimeout(() => document.addEventListener('mousedown', this._outsideClickHandler), 0);
        });
    }

    focusEditInput() {
        const input = this.querySelector('.ct-edit-input, .ct-popover-input');
        if (input) { input.focus(); input.select(); }
    }

    onEditInput(e) {
        if (!this.editing) return;
        this.editing = { ...this.editing, value: e.target.value };
    }

    onEditKey(e) {
        if (e.key === 'Enter') { e.preventDefault(); this.commitEdit(true); }
        else if (e.key === 'Escape') { e.preventDefault(); this.commitEdit(false); }
    }

    commitEdit(commit) {
        const editing = this.editing;
        this.editing = null;
        if (this._outsideClickHandler) {
            document.removeEventListener('mousedown', this._outsideClickHandler);
            this._outsideClickHandler = null;
        }
        if (!commit || !editing) return;
        const value = String(editing.value || '').trim();
        if (!value) return;

        if (editing.kind === 'cat') {
            const split = splitLocalName(editing.key);
            const newFull = split.group ? `${split.group}: ${value}` : value;
            if (newFull.toLowerCase() === editing.key.toLowerCase()) return;
            this.emit('category-rename', { oldName: editing.key, newName: newFull });
        } else if (editing.kind === 'group') {
            if (value.toLowerCase() === editing.key.toLowerCase()) return;
            this.emit('group-rename', { oldGroup: editing.key, newGroup: value });
        } else if (editing.kind === 'add') {
            const fullName = `${editing.key}: ${value}`;
            this.emit('category-add', { fullName });
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._outsideClickHandler) {
            document.removeEventListener('mousedown', this._outsideClickHandler);
            this._outsideClickHandler = null;
        }
    }

    emit(name, detail = {}) {
        this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
    }

    onSync() {
        if (this.syncing) return;
        this.emit('category-sync');
    }

    onToggleGroup(key) {
        this.collapsed = { ...this.collapsed, [key]: !this.collapsed[key] };
    }

    formatRelativeTime(ts) {
        if (!ts) return 'nunca';
        const diff = Date.now() - ts;
        if (diff < 60_000) return 'agora há pouco';
        const mins = Math.floor(diff / 60_000);
        if (mins < 60) return `${mins} min atrás`;
        const hours = Math.floor(mins / 60);
        if (hours < 24) return `${hours} h atrás`;
        const days = Math.floor(hours / 24);
        return `${days} dia${days === 1 ? '' : 's'} atrás`;
    }

    renderStatusBar() {
        // `connected` here means "ready to sync" (has token + budget)
        if (!this.connected && !this.budgetId) {
            return html`
                <div class="ct-status ct-status-offline">
                    <span>Conecte-se ao YNAB e escolha um orçamento na aba <a href="#tab-ynab">YNAB</a> pra sincronizar as categorias.</span>
                </div>
            `;
        }
        if (!this.connected && this.budgetId) {
            // Token expirou. Mantém budgetId, mas precisa reconectar.
            return html`
                <div class="ct-status ct-status-offline">
                    <span>Sessão YNAB expirou. Reconecte na aba <a href="#tab-ynab">YNAB</a>.</span>
                </div>
            `;
        }
        if (!this.cache) {
            return html`
                <div class="ct-status ct-status-onboard">
                    <span>YNAB conectado mas nunca sincronizou.</span>
                    <wa-button variant="brand" size="small" @click=${this.onSync} ?loading=${this.syncing}>
                        Sincronizar pela primeira vez
                    </wa-button>
                </div>
            `;
        }
        const total = Object.keys(this.cache.byId || {}).length;
        return html`
            <div class="ct-status ct-status-synced">
                <div class="ct-status-text">
                    <strong>Sincronizado com YNAB</strong> · ${total} categoria${total === 1 ? '' : 's'}
                    <span class="ct-status-meta">Última sync ${this.formatRelativeTime(this.cache.syncedAt)}</span>
                </div>
                <wa-button appearance="outlined" size="small" @click=${this.onSync} ?loading=${this.syncing}>
                    Sincronizar agora
                </wa-button>
            </div>
        `;
    }

    onRemoveLocal(removeKey, displayName) {
        if (!confirm(`Remover a categoria "${displayName}"?`)) return;
        this.emit('chip-remove', { key: removeKey });
    }

    renderCategoryRow(category, opts = {}) {
        const lookupKey = opts.rulesKeyByOriginal ? (category.original || category.name) : category.id;
        const count = this.rulesByCategoryId[lookupKey]
            || this.rulesByCategoryId[category.name]
            || 0;
        const isOrphan = !!opts.orphan;
        const removable = !!opts.removable;
        const removeKey = category.original || category.name;
        const isEditingThis = removable
            && this.editing?.kind === 'cat'
            && this.editing.key === removeKey;
        const title = removable
            ? 'Duplo-clique para renomear · "×" para remover'
            : 'Para renomear, edite no YNAB e sincronize.';
        return html`
            <div class="ct-category ${isOrphan ? 'is-orphan' : ''}" title=${title}>
                ${isEditingThis
                    ? html`<input class="ct-edit-input ct-edit-input-leaf"
                                  .value=${this.editing.value}
                                  @input=${this.onEditInput}
                                  @keydown=${this.onEditKey}
                                  @blur=${() => this.commitEdit(true)}>`
                    : html`<span class="ct-category-name"
                                 @dblclick=${removable
                                     ? (e) => { e.stopPropagation(); this.beginEditCategory(category); }
                                     : null}>${category.name}</span>`}
                ${opts.badge ? html`<span class="ct-category-badge">${opts.badge}</span>` : nothing}
                ${count > 0
                    ? html`<span class="ct-category-count">${count} regra${count === 1 ? '' : 's'}</span>`
                    : nothing}
                ${removable && !isEditingThis
                    ? html`<button type="button" class="ct-category-remove" title="Remover"
                                   @click=${() => this.onRemoveLocal(removeKey, removeKey)}>×</button>`
                    : nothing}
            </div>
        `;
    }

    renderGroup(key, label, categories, opts = {}) {
        const isCollapsed = !!this.collapsed[key];
        const arrow = isCollapsed ? '▸' : '▾';
        const count = categories.length;
        const isLocal = opts.tone === 'is-local';
        const editable = !!opts.removable; // local groups are editable
        const groupNameForEdit = isLocal ? label : null;
        const isEditingThisGroup = editable
            && this.editing?.kind === 'group'
            && this.editing.key === groupNameForEdit;
        const isAddingHere = editable
            && this.editing?.kind === 'add'
            && this.editing.key === groupNameForEdit;

        return html`
            <div class="ct-group ${opts.tone || ''}">
                <div class="ct-group-head-row"
                     role="button"
                     tabindex="0"
                     @click=${() => this.onToggleGroup(key)}
                     @keydown=${(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.onToggleGroup(key); } }}>
                    <span class="ct-group-arrow">${arrow}</span>
                    <span class="ct-group-label">
                        ${isEditingThisGroup
                            ? html`<input class="ct-edit-input"
                                          .value=${this.editing.value}
                                          @click=${(e) => e.stopPropagation()}
                                          @input=${this.onEditInput}
                                          @keydown=${this.onEditKey}
                                          @blur=${() => this.commitEdit(true)}>`
                            : html`<span class="ct-group-label-text"
                                         @dblclick=${editable
                                             ? (e) => { e.stopPropagation(); this.beginEditGroup(groupNameForEdit); }
                                             : null}
                                         title=${editable ? 'Duplo-clique para renomear o grupo' : ''}>${label}</span>`}
                        ${isLocal ? html`<span class="ct-group-label-tag">local</span>` : nothing}
                        ${editable && !isEditingThisGroup
                            ? html`<span class="ct-group-add-wrap">
                                    <button type="button" class="ct-group-add-btn"
                                            data-group=${groupNameForEdit}
                                            title="Adicionar categoria neste grupo"
                                            @click=${(e) => { e.stopPropagation(); this.beginAddInGroup(groupNameForEdit); }}>
                                        <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
                                            <path d="M6 1.5v9M1.5 6h9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                        </svg>
                                    </button>
                                    ${isAddingHere ? this.renderAddPopover(label) : nothing}
                                </span>`
                            : nothing}
                    </span>
                    <span class="ct-group-count">${count}</span>
                </div>
                ${isCollapsed ? nothing : html`
                    <div class="ct-group-body">
                        ${repeat(categories, (c) => c.id, (c) =>
                            this.renderCategoryRow(c, opts))}
                    </div>
                `}
            </div>
        `;
    }

    renderAddPopover(_groupLabel) {
        return html`
            <div class="ct-popover" role="dialog" @click=${(e) => e.stopPropagation()}>
                <div class="ct-popover-arrow"></div>
                <input class="ct-popover-input"
                       type="text"
                       placeholder="Nova categoria"
                       .value=${this.editing.value}
                       @input=${this.onEditInput}
                       @keydown=${this.onEditKey}>
                <div class="ct-popover-actions">
                    <button type="button"
                            class="ct-popover-btn ct-popover-btn-cancel"
                            @click=${() => this.commitEdit(false)}>Cancelar</button>
                    <button type="button"
                            class="ct-popover-btn ct-popover-btn-ok"
                            @click=${() => this.commitEdit(true)}>OK</button>
                </div>
            </div>
        `;
    }

    render() {
        const groups = this.cache?.categoryGroups || [];
        const byId = this.cache?.byId || {};

        // Filter visible vs hidden YNAB categories
        const visibleGroups = [];
        const hiddenCategories = [];
        for (const g of groups) {
            const visibles = g.categories.filter((c) => !c.hidden && !g.hidden);
            const hiddens = g.categories.filter((c) => c.hidden || g.hidden);
            if (visibles.length > 0) visibleGroups.push({ id: g.id, name: g.name, categories: visibles });
            hiddenCategories.push(...hiddens);
        }

        // Local categories that don't already map to a YNAB UUID. We compare
        // by FULL name (case-insensitive) — if a local category's name equals
        // a YNAB category name, it's effectively the same thing visually.
        const ynabNameSet = new Set();
        for (const id in byId) ynabNameSet.add(String(byId[id].name).toLowerCase());
        const localPool = (this.localCategories || []).filter((cat) => {
            if (byId[cat.id]) return false; // already migrated to UUID
            return !ynabNameSet.has(String(cat.name).toLowerCase());
        });

        // Group locals by the "Group: Category" convention. The original full
        // name is preserved on each leaf so remove events still work.
        const localGroupsMap = new Map(); // groupName → [{id, name (leaf), original}]
        for (const cat of localPool) {
            const split = splitLocalName(cat.name);
            const key = split.group || UNGROUPED_LOCAL_KEY;
            if (!localGroupsMap.has(key)) localGroupsMap.set(key, []);
            localGroupsMap.get(key).push({
                id: cat.id,
                name: split.leaf,
                original: split.original
            });
        }
        const localGroups = Array.from(localGroupsMap.entries())
            .sort((a, b) => {
                if (a[0] === UNGROUPED_LOCAL_KEY) return 1;
                if (b[0] === UNGROUPED_LOCAL_KEY) return -1;
                return a[0].localeCompare(b[0]);
            });
        const hasLocals = localGroups.length > 0;
        const hasYnabContent = visibleGroups.length > 0 || hiddenCategories.length > 0;

        return html`
            <div class="ct-host">
                ${this.renderStatusBar()}
                <div class="ct-groups">
                    ${repeat(visibleGroups, (g) => g.id, (g) =>
                        this.renderGroup(g.id, g.name, g.categories))}
                    ${hiddenCategories.length > 0
                        ? this.renderGroup(HIDDEN_GROUP_KEY, 'Ocultas no YNAB', hiddenCategories, { tone: 'is-muted' })
                        : nothing}
                    ${hasLocals
                        ? repeat(localGroups, ([key]) => `local-${key}`, ([groupName, items]) => {
                            const label = groupName === UNGROUPED_LOCAL_KEY ? 'Sem grupo' : groupName;
                            return this.renderGroup(`local-${groupName}`, label, items, {
                                tone: 'is-local',
                                removable: true,
                                rulesKeyByOriginal: true
                            });
                        })
                        : nothing}
                    ${!hasYnabContent && !hasLocals
                        ? html`<div class="ct-empty">Nada por aqui ainda. Adicione uma categoria pelo formulário acima ou sincronize com o YNAB.</div>`
                        : nothing}
                </div>
            </div>
        `;
    }
}

customElements.define('category-tree', CategoryTree);
