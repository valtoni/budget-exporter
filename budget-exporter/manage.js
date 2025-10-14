// Script para página de gerenciamento

// Estado do formulário
let editingRuleId = null;

// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
    await StorageManager.init();
    await loadBanks();
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

    // Form de adicionar banco
    document.getElementById('add-bank-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await addBank();
    });

    // Toggle campo de memo quando regex é marcado
    document.getElementById('rule-regex').addEventListener('change', (e) => {
        const memoField = document.getElementById('memo-field');
        memoField.style.display = e.target.checked ? 'block' : 'none';
    });

    // Botão de cancelar edição
    document.getElementById('cancel-btn').addEventListener('click', () => {
        cancelEdit();
    });
}

// Troca de tabs
function switchTab(tabName) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`tab-${tabName}`).classList.add('active');
}

// Carrega bancos no select e na lista
async function loadBanks() {
    const banks = await StorageManager.getBanks();

    // Popula select de bancos
    const select = document.getElementById('rule-bank');
    select.innerHTML = '<option value="">Selecione um banco</option>';
    banks.forEach(bank => {
        const option = document.createElement('option');
        option.value = bank.id;
        // Formata nome: 'all' vira 'Todos os bancos', outros são capitalizados
        if (bank.id === 0) {
            option.textContent = 'Todos os bancos';
        } else {
            option.textContent = bank.name.charAt(0).toUpperCase() + bank.name.slice(1);
        }
        select.appendChild(option);
    });

    // Popula lista de bancos
    const list = document.getElementById('banks-list');
    list.innerHTML = '';

    if (banks.length === 0) {
        list.innerHTML = '<div class="empty-state">Nenhum banco cadastrado</div>';
        return;
    }

    banks.forEach(bank => {
        const item = document.createElement('div');
        item.className = 'category-item';

        const span = document.createElement('span');
        // Formata nome: 'all' vira 'Todos os bancos'
        if (bank.id === 0) {
            span.textContent = 'Todos os bancos (coringa)';
            span.style.fontWeight = 'bold';
        } else {
            span.textContent = bank.name;
        }

        const button = document.createElement('button');
        button.className = 'btn btn-danger';
        button.textContent = 'Remover';
        button.onclick = () => removeBank(bank.id);
        // Não permite remover o banco coringa (id: 0)
        if (bank.id === 0) {
            button.disabled = true;
            button.style.opacity = '0.5';
            button.style.cursor = 'not-allowed';
        }

        item.appendChild(span);
        item.appendChild(button);
        list.appendChild(item);
    });
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

// Adiciona banco
async function addBank() {
    const input = document.getElementById('bank-name');
    const name = input.value.trim().toLowerCase();

    if (!name) return;

    const banks = await StorageManager.getBanks();

    if (banks.find(b => b.name === name)) {
        alert('Banco já existe!');
        return;
    }

    await StorageManager.addBank({ name });

    input.value = '';
    await loadBanks();
}

// Remove banco
async function removeBank(bankId) {
    const banks = await StorageManager.getBanks();
    const bank = banks.find(b => b.id === bankId);

    if (!confirm(`Remover banco "${bank.name}"?`)) return;

    await StorageManager.removeBank(bankId);
    await loadBanks();
}

// Carrega regras
async function loadRules() {
    const rules = await StorageManager.getPayeeRules();
    const banks = await StorageManager.getBanks();
    const list = document.getElementById('rules-list');

    list.innerHTML = '';

    if (rules.length === 0) {
        list.innerHTML = '<div class="empty-state">Nenhuma regra cadastrada</div>';
        return;
    }

    // Cria tabela
    const table = document.createElement('table');
    table.className = 'rules-table';

    // Cabeçalho
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th class="col-bank">Banco</th>
            <th class="col-pattern">Padrão</th>
            <th class="col-replacement">Substituição</th>
            <th class="col-category">Categoria</th>
            <th class="col-memo">Memo</th>
            <th class="col-actions">Ações</th>
        </tr>
    `;
    table.appendChild(thead);

    // Corpo
    const tbody = document.createElement('tbody');

    rules.forEach(rule => {
        const row = document.createElement('tr');
        if (!rule.enabled) {
            row.className = 'disabled';
        }

        // Coluna Banco
        const bankCell = document.createElement('td');
        const bank = banks.find(b => b.id === rule.bankId);
        if (bank) {
            if (bank.id === 0) {
                bankCell.textContent = 'Todos';
            } else {
                bankCell.textContent = bank.name.charAt(0).toUpperCase() + bank.name.slice(1);
            }
        } else {
            bankCell.innerHTML = '<span class="text-muted">-</span>';
        }
        row.appendChild(bankCell);

        // Coluna Padrão
        const patternCell = document.createElement('td');
        patternCell.textContent = rule.pattern;
        if (rule.isRegex) {
            const badge = document.createElement('span');
            badge.className = 'badge badge-regex';
            badge.textContent = 'REGEX';
            patternCell.appendChild(badge);
        }
        row.appendChild(patternCell);

        // Coluna Substituição
        const replacementCell = document.createElement('td');
        replacementCell.textContent = rule.replacement || '-';
        if (!rule.replacement) {
            replacementCell.innerHTML = '<span class="text-muted">-</span>';
        }
        row.appendChild(replacementCell);

        // Coluna Categoria
        const categoryCell = document.createElement('td');
        categoryCell.textContent = rule.category || '-';
        if (!rule.category) {
            categoryCell.innerHTML = '<span class="text-muted">-</span>';
        }
        row.appendChild(categoryCell);

        // Coluna Memo
        const memoCell = document.createElement('td');
        memoCell.textContent = rule.memoTemplate || '-';
        if (!rule.memoTemplate) {
            memoCell.innerHTML = '<span class="text-muted">-</span>';
        }
        row.appendChild(memoCell);

        // Coluna Ações
        const actionsCell = document.createElement('td');
        actionsCell.className = 'rule-actions';

        const editBtn = document.createElement('button');
        editBtn.className = 'btn btn-primary';
        editBtn.textContent = 'Alterar';
        editBtn.onclick = () => editRule(rule);

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'btn btn-secondary';
        toggleBtn.textContent = rule.enabled ? 'Desativar' : 'Ativar';
        toggleBtn.onclick = () => toggleRule(rule.id);

        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn btn-danger';
        removeBtn.textContent = 'Remover';
        removeBtn.onclick = () => removeRule(rule.id);

        actionsCell.appendChild(editBtn);
        actionsCell.appendChild(toggleBtn);
        actionsCell.appendChild(removeBtn);

        row.appendChild(actionsCell);
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    list.appendChild(table);
}

// Adiciona ou modifica regra
async function addRule() {
    const bankId = parseInt(document.getElementById('rule-bank').value);
    const pattern = document.getElementById('rule-pattern').value.trim();
    const replacement = document.getElementById('rule-replacement').value.trim();
    const category = document.getElementById('rule-category').value;
    const isRegex = document.getElementById('rule-regex').checked;
    const memoTemplate = document.getElementById('rule-memo').value.trim();

    if (!bankId) {
        alert('Banco é obrigatório!');
        return;
    }

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

    if (editingRuleId) {
        // Modo edição
        const rules = await StorageManager.getPayeeRules();
        const ruleIndex = rules.findIndex(r => r.id === editingRuleId);

        if (ruleIndex !== -1) {
            rules[ruleIndex] = {
                ...rules[ruleIndex],
                bankId,
                pattern,
                replacement,
                category,
                isRegex,
                memoTemplate: isRegex ? memoTemplate : ''
            };
            await StorageManager.setPayeeRules(rules);
        }
    } else {
        // Modo adicionar
        await StorageManager.addPayeeRule({
            bankId,
            pattern,
            replacement,
            category,
            isRegex,
            memoTemplate: isRegex ? memoTemplate : ''
        });
    }

    cancelEdit();
    await loadRules();
}

// Editar regra
function editRule(rule) {
    editingRuleId = rule.id;

    // Preenche os campos
    document.getElementById('rule-bank').value = rule.bankId || '';
    document.getElementById('rule-pattern').value = rule.pattern || '';
    document.getElementById('rule-replacement').value = rule.replacement || '';
    document.getElementById('rule-category').value = rule.category || '';
    document.getElementById('rule-regex').checked = rule.isRegex || false;
    document.getElementById('rule-memo').value = rule.memoTemplate || '';

    // Mostra campo de memo se for regex
    const memoField = document.getElementById('memo-field');
    memoField.style.display = rule.isRegex ? 'block' : 'none';

    // Atualiza UI
    document.getElementById('form-title').textContent = 'Editar Regra';
    document.getElementById('submit-btn').textContent = 'Modificar Regra';
    document.getElementById('cancel-btn').style.display = 'inline-block';

    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Cancela edição
function cancelEdit() {
    editingRuleId = null;

    // Limpa form
    document.getElementById('rule-bank').value = '';
    document.getElementById('rule-pattern').value = '';
    document.getElementById('rule-replacement').value = '';
    document.getElementById('rule-category').value = '';
    document.getElementById('rule-regex').checked = false;
    document.getElementById('rule-memo').value = '';
    document.getElementById('memo-field').style.display = 'none';

    // Restaura UI
    document.getElementById('form-title').textContent = 'Nova Regra';
    document.getElementById('submit-btn').textContent = 'Adicionar Regra';
    document.getElementById('cancel-btn').style.display = 'none';
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
