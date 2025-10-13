// Script para página de gerenciamento

// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
    await StorageManager.init();
    await loadCategories();
    await loadRules();
    setupEventListeners();
});

// Setup de event listeners
function setupEventListeners() {
    // Tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    // Form de adicionar regra
    document.getElementById('add-rule-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await addRule();
    });

    // Form de adicionar categoria
    document.getElementById('add-category-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await addCategory();
    });
}

// Troca de tabs
function switchTab(tabName) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`tab-${tabName}`).classList.add('active');
}

// Carrega categorias no select e na lista
async function loadCategories() {
    const categories = await StorageManager.getCategories();

    // Popula select
    const select = document.getElementById('rule-category');
    select.innerHTML = '<option value="">Nenhuma</option>';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
    });

    // Popula lista de categorias
    const list = document.getElementById('categories-list');
    list.innerHTML = '';

    if (categories.length === 0) {
        list.innerHTML = '<div class="empty-state">Nenhuma categoria cadastrada</div>';
        return;
    }

    categories.forEach(cat => {
        const item = document.createElement('div');
        item.className = 'category-item';
        item.innerHTML = `
            <span>${cat}</span>
            <button class="btn btn-danger" onclick="removeCategory('${cat}')">Remover</button>
        `;
        list.appendChild(item);
    });
}

// Adiciona categoria
async function addCategory() {
    const input = document.getElementById('category-name');
    const name = input.value.trim();

    if (!name) return;

    const categories = await StorageManager.getCategories();

    if (categories.includes(name)) {
        alert('Categoria já existe!');
        return;
    }

    categories.push(name);
    await StorageManager.setCategories(categories);

    input.value = '';
    await loadCategories();
}

// Remove categoria
window.removeCategory = async function(name) {
    if (!confirm(`Remover categoria "${name}"?`)) return;

    const categories = await StorageManager.getCategories();
    const filtered = categories.filter(c => c !== name);

    await StorageManager.setCategories(filtered);
    await loadCategories();
};

// Carrega regras
async function loadRules() {
    const rules = await StorageManager.getPayeeRules();
    const list = document.getElementById('rules-list');

    list.innerHTML = '';

    if (rules.length === 0) {
        list.innerHTML = '<div class="empty-state">Nenhuma regra cadastrada</div>';
        return;
    }

    rules.forEach(rule => {
        const item = document.createElement('div');
        item.className = 'rule-item';

        const badges = [];
        if (rule.isRegex) badges.push('<span class="badge badge-regex">REGEX</span>');
        if (rule.category) badges.push(`<span class="badge badge-category">${rule.category}</span>`);

        item.innerHTML = `
            <div class="rule-info">
                <div class="rule-pattern">${escapeHtml(rule.pattern)}</div>
                <div class="rule-details">
                    ${badges.join(' ')}
                    ${rule.replacement ? `→ ${escapeHtml(rule.replacement)}` : ''}
                </div>
            </div>
            <div class="rule-actions">
                <button class="btn btn-secondary" onclick="toggleRule(${rule.id})">
                    ${rule.enabled ? 'Desativar' : 'Ativar'}
                </button>
                <button class="btn btn-danger" onclick="removeRule(${rule.id})">Remover</button>
            </div>
        `;

        if (!rule.enabled) {
            item.style.opacity = '0.5';
        }

        list.appendChild(item);
    });
}

// Adiciona regra
async function addRule() {
    const pattern = document.getElementById('rule-pattern').value.trim();
    const replacement = document.getElementById('rule-replacement').value.trim();
    const category = document.getElementById('rule-category').value;
    const isRegex = document.getElementById('rule-regex').checked;

    if (!pattern) {
        alert('Padrão de busca é obrigatório!');
        return;
    }

    // Valida regex se for o caso
    if (isRegex) {
        try {
            new RegExp(pattern);
        } catch (e) {
            alert('Expressão regular inválida!');
            return;
        }
    }

    await StorageManager.addPayeeRule({
        pattern,
        replacement,
        category,
        isRegex
    });

    // Limpa form
    document.getElementById('rule-pattern').value = '';
    document.getElementById('rule-replacement').value = '';
    document.getElementById('rule-category').value = '';
    document.getElementById('rule-regex').checked = false;

    await loadRules();
}

// Remove regra
window.removeRule = async function(ruleId) {
    if (!confirm('Remover esta regra?')) return;

    await StorageManager.removePayeeRule(ruleId);
    await loadRules();
};

// Toggle regra (ativar/desativar)
window.toggleRule = async function(ruleId) {
    const rules = await StorageManager.getPayeeRules();
    const rule = rules.find(r => r.id === ruleId);

    if (rule) {
        await StorageManager.updatePayeeRule(ruleId, { enabled: !rule.enabled });
        await loadRules();
    }
};

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
