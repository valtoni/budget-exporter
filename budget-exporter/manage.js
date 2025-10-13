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

    // Toggle campo de memo quando regex é marcado
    document.getElementById('rule-regex').addEventListener('change', (e) => {
        const memoField = document.getElementById('memo-field');
        memoField.style.display = e.target.checked ? 'block' : 'none';
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

        const span = document.createElement('span');
        span.textContent = cat;

        const button = document.createElement('button');
        button.className = 'btn btn-danger';
        button.textContent = 'Remover';
        button.onclick = () => removeCategory(cat);

        item.appendChild(span);
        item.appendChild(button);
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
async function removeCategory(name) {
    if (!confirm(`Remover categoria "${name}"?`)) return;

    const categories = await StorageManager.getCategories();
    const filtered = categories.filter(c => c !== name);

    await StorageManager.setCategories(filtered);
    await loadCategories();
}

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

        // Info section
        const infoDiv = document.createElement('div');
        infoDiv.className = 'rule-info';

        const patternDiv = document.createElement('div');
        patternDiv.className = 'rule-pattern';
        patternDiv.textContent = rule.pattern;

        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'rule-details';

        if (rule.isRegex) {
            const badge = document.createElement('span');
            badge.className = 'badge badge-regex';
            badge.textContent = 'REGEX';
            detailsDiv.appendChild(badge);
        }

        if (rule.category) {
            const badge = document.createElement('span');
            badge.className = 'badge badge-category';
            badge.textContent = rule.category;
            detailsDiv.appendChild(badge);
        }

        if (rule.replacement) {
            const replacementText = document.createTextNode(` → ${rule.replacement}`);
            detailsDiv.appendChild(replacementText);
        }

        infoDiv.appendChild(patternDiv);
        infoDiv.appendChild(detailsDiv);

        // Actions section
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'rule-actions';

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'btn btn-secondary';
        toggleBtn.textContent = rule.enabled ? 'Desativar' : 'Ativar';
        toggleBtn.onclick = () => toggleRule(rule.id);

        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn btn-danger';
        removeBtn.textContent = 'Remover';
        removeBtn.onclick = () => removeRule(rule.id);

        actionsDiv.appendChild(toggleBtn);
        actionsDiv.appendChild(removeBtn);

        item.appendChild(infoDiv);
        item.appendChild(actionsDiv);

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
    const memoTemplate = document.getElementById('rule-memo').value.trim();

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
        isRegex,
        memoTemplate: isRegex ? memoTemplate : '' // Só salva se regex estiver marcado
    });

    // Limpa form
    document.getElementById('rule-pattern').value = '';
    document.getElementById('rule-replacement').value = '';
    document.getElementById('rule-category').value = '';
    document.getElementById('rule-regex').checked = false;
    document.getElementById('rule-memo').value = '';
    document.getElementById('memo-field').style.display = 'none';

    await loadRules();
}

// Remove regra
async function removeRule(ruleId) {
    if (!confirm('Remover esta regra?')) return;

    await StorageManager.removePayeeRule(ruleId);
    await loadRules();
}

// Toggle regra (ativar/desativar)
async function toggleRule(ruleId) {
    const rules = await StorageManager.getPayeeRules();
    const rule = rules.find(r => r.id === ruleId);

    if (rule) {
        await StorageManager.updatePayeeRule(ruleId, { enabled: !rule.enabled });
        await loadRules();
    }
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
