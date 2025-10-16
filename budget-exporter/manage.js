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
    // Navegação manual entre tabs (navbar não usa data-bs-toggle)
    document.getElementById('rules-nav').addEventListener('click', (e) => {
        e.preventDefault();
        showTab('tab-rules', 'rules-nav');
    });

    document.getElementById('categories-nav').addEventListener('click', (e) => {
        e.preventDefault();
        showTab('tab-categories', 'categories-nav');
    });

    document.getElementById('banks-nav').addEventListener('click', (e) => {
        e.preventDefault();
        showTab('tab-banks', 'banks-nav');
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
        memoField.classList.toggle('d-none', !e.target.checked);
    });

    // Botão de cancelar edição
    document.getElementById('cancel-btn').addEventListener('click', () => {
        cancelEdit();
    });

    // Search functionality
    const searchButton = document.querySelector('.DocSearch-Button');
    const searchInput = document.getElementById('search-input');

    searchButton.addEventListener('click', () => {
        toggleSearch(searchButton, searchInput);
    });

    // Ctrl+F shortcut
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            toggleSearch(searchButton, searchInput);
        }
    });

    // Search input event
    searchInput.addEventListener('input', (e) => {
        currentSearchTerm = e.target.value.toLowerCase();
        const length = currentSearchTerm.length;

        // Validação visual
        if (length === 0 || length >= 3) {
            searchInput.classList.remove('search-invalid');
        } else {
            searchInput.classList.add('search-invalid');
        }

        // Filtrar apenas se tiver 3+ caracteres
        if (length >= 3) {
            filterRules(currentSearchTerm);
        } else if (length === 0) {
            filterRules(''); // Mostrar tudo
        }
    });

    searchInput.addEventListener('blur', () => {
        if (!currentSearchTerm) {
            setTimeout(() => {
                toggleSearch(searchButton, searchInput);
            }, 200);
        }
    });

    // Filtro de banco
    const bankInput = document.getElementById('rule-bank');
    const bankDropdown = document.getElementById('bank-dropdown');
    const bankButton = bankInput.nextElementSibling;

    bankInput.addEventListener('input', (e) => {
        filterDropdown(bankInput.value, bankDropdown);
    });

    bankInput.addEventListener('focus', () => {
        filterDropdown(bankInput.value, bankDropdown);
    });

    bankButton.addEventListener('click', (e) => {
        e.stopPropagation();
        filterDropdown(bankInput.value, bankDropdown);
    });

    // Previne fechar dropdown ao clicar no input
    bankInput.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Filtro de categoria
    const categoryInput = document.getElementById('rule-category');
    const categoryDropdown = document.getElementById('category-dropdown');
    const categoryButton = categoryInput.nextElementSibling;

    categoryInput.addEventListener('input', (e) => {
        filterDropdown(categoryInput.value, categoryDropdown);
    });

    categoryInput.addEventListener('focus', () => {
        filterDropdown(categoryInput.value, categoryDropdown);
    });

    categoryButton.addEventListener('click', (e) => {
        e.stopPropagation();
        filterDropdown(categoryInput.value, categoryDropdown);
    });

    // Previne fechar dropdown ao clicar no input
    categoryInput.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Função para trocar de tab manualmente
function showTab(tabId, navId) {
    // Remove active de todas as tabs
    document.querySelectorAll('.tab-pane').forEach(tab => {
        tab.classList.remove('show', 'active');
    });

    // Remove active de todos os links do navbar
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Ativa a tab e o link selecionados
    document.getElementById(tabId).classList.add('show', 'active');
    document.getElementById(navId).classList.add('active');
}

// Carrega bancos no dropdown e na lista
async function loadBanks() {
    const banks = await StorageManager.getBanks();

    // Popula dropdown de bancos
    const dropdown = document.getElementById('bank-dropdown');
    dropdown.innerHTML = '';
    banks.forEach(bank => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.className = 'dropdown-item';
        a.href = '#';

        // Formata nome: 'all' vira 'Todos os bancos', outros são capitalizados
        if (bank.id === 0) {
            a.textContent = 'Todos os bancos';
            a.setAttribute('data-bank-name', 'Todos os bancos');
        } else {
            const displayName = bank.name.charAt(0).toUpperCase() + bank.name.slice(1);
            a.textContent = displayName;
            a.setAttribute('data-bank-name', displayName);
        }

        a.setAttribute('data-bank-id', bank.id);
        a.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('rule-bank').value = a.getAttribute('data-bank-name');
        });

        li.appendChild(a);
        dropdown.appendChild(li);
    });

    // Popula lista de bancos
    const list = document.getElementById('banks-list');
    list.innerHTML = '';

    if (banks.length === 0) {
        list.innerHTML = '<div class="col-12 text-center text-muted py-4">Nenhum banco cadastrado</div>';
        return;
    }

    banks.forEach(bank => {
        const col = document.createElement('div');
        col.className = 'col-md-4 col-sm-6';

        const card = document.createElement('div');
        card.className = 'card';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body d-flex justify-content-between align-items-center p-2';

        const span = document.createElement('span');
        if (bank.id === 0) {
            span.textContent = 'Todos os bancos (coringa)';
            span.className = 'fw-bold';
        } else {
            span.textContent = bank.name;
        }

        const button = document.createElement('button');
        button.className = 'btn btn-sm btn-danger';
        button.textContent = 'Remover';
        button.onclick = () => removeBank(bank.id);
        if (bank.id === 0) {
            button.disabled = true;
        }

        cardBody.appendChild(span);
        cardBody.appendChild(button);
        card.appendChild(cardBody);
        col.appendChild(card);
        list.appendChild(col);
    });
}

// Carrega categorias no dropdown e na lista
async function loadCategories() {
    const categories = await StorageManager.getCategories();

    // Popula dropdown de categorias
    const dropdown = document.getElementById('category-dropdown');
    dropdown.innerHTML = '';
    categories.forEach(cat => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.className = 'dropdown-item';
        a.href = '#';
        a.textContent = cat;

        a.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('rule-category').value = cat;
        });

        li.appendChild(a);
        dropdown.appendChild(li);
    });

    // Popula lista de categorias
    const list = document.getElementById('categories-list');
    list.innerHTML = '';

    if (categories.length === 0) {
        list.innerHTML = '<div class="col-12 text-center text-muted py-4">Nenhuma categoria cadastrada</div>';
        return;
    }

    categories.forEach(cat => {
        const col = document.createElement('div');
        col.className = 'col-md-4 col-sm-6';

        const card = document.createElement('div');
        card.className = 'card';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body d-flex justify-content-between align-items-center p-2';

        const span = document.createElement('span');
        span.textContent = cat;

        const button = document.createElement('button');
        button.className = 'btn btn-sm btn-danger';
        button.textContent = 'Remover';
        button.onclick = () => removeCategory(cat);

        cardBody.appendChild(span);
        cardBody.appendChild(button);
        card.appendChild(cardBody);
        col.appendChild(card);
        list.appendChild(col);
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
    allRulesData = { rules, banks };

    renderRulesPage(currentPage);
}

// Renderiza página de regras
function renderRulesPage(page) {
    const { rules, banks } = allRulesData;
    const list = document.getElementById('rules-list');

    list.innerHTML = '';

    if (rules.length === 0) {
        list.innerHTML = '<div class="text-center text-muted py-5">Nenhuma regra cadastrada</div>';
        return;
    }

    // Calcula índices para paginação
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedRules = rules.slice(startIndex, endIndex);
    const totalPages = Math.ceil(rules.length / itemsPerPage);

    // Cria tabela Bootstrap
    const table = document.createElement('table');
    table.className = 'table table-hover table-striped';

    // Cabeçalho
    const thead = document.createElement('thead');
    thead.className = 'table-light';
    thead.innerHTML = `
        <tr>
            <th class="col-width-bank">Banco</th>
            <th class="col-width-pattern">Padrão</th>
            <th class="col-width-replacement">Substituição</th>
            <th class="col-width-category">Categoria</th>
            <th class="col-width-memo">Memo</th>
            <th class="col-width-actions text-end">Ações</th>
        </tr>
    `;
    table.appendChild(thead);

    // Corpo
    const tbody = document.createElement('tbody');

    paginatedRules.forEach(rule => {
        const row = document.createElement('tr');
        if (!rule.enabled) {
            row.className = 'table-secondary opacity-50';
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
            bankCell.innerHTML = '<span class="text-muted fst-italic">-</span>';
        }
        row.appendChild(bankCell);

        // Coluna Padrão
        const patternCell = document.createElement('td');
        patternCell.textContent = rule.pattern;
        if (rule.isRegex) {
            const badge = document.createElement('span');
            badge.className = 'badge bg-primary ms-2';
            badge.textContent = 'REGEX';
            patternCell.appendChild(badge);
        }
        row.appendChild(patternCell);

        // Coluna Substituição
        const replacementCell = document.createElement('td');
        if (rule.replacement) {
            replacementCell.textContent = rule.replacement;
        } else {
            replacementCell.innerHTML = '<span class="text-muted fst-italic">-</span>';
        }
        row.appendChild(replacementCell);

        // Coluna Categoria
        const categoryCell = document.createElement('td');
        if (rule.category) {
            categoryCell.textContent = rule.category;
        } else {
            categoryCell.innerHTML = '<span class="text-muted fst-italic">-</span>';
        }
        row.appendChild(categoryCell);

        // Coluna Memo
        const memoCell = document.createElement('td');
        if (rule.memoTemplate) {
            memoCell.textContent = rule.memoTemplate;
        } else {
            memoCell.innerHTML = '<span class="text-muted fst-italic">-</span>';
        }
        row.appendChild(memoCell);

        // Coluna Ações
        const actionsCell = document.createElement('td');
        actionsCell.className = 'text-end';

        const btnGroup = document.createElement('div');
        btnGroup.className = 'btn-group btn-group-sm';

        const editBtn = document.createElement('button');
        editBtn.className = 'btn btn-action-edit';
        editBtn.innerHTML = '<i class="bi bi-pencil"></i>';
        editBtn.title = 'Alterar';
        editBtn.onclick = () => editRule(rule);

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'btn btn-action-toggle';
        toggleBtn.innerHTML = rule.enabled ? '<i class="bi bi-toggle-on"></i>' : '<i class="bi bi-toggle-off"></i>';
        toggleBtn.title = rule.enabled ? 'Desativar' : 'Ativar';
        toggleBtn.onclick = () => toggleRule(rule.id);

        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn btn-action-remove';
        removeBtn.innerHTML = '<i class="bi bi-trash"></i>';
        removeBtn.title = 'Remover';
        removeBtn.onclick = () => removeRule(rule.id);

        btnGroup.appendChild(editBtn);
        btnGroup.appendChild(toggleBtn);
        btnGroup.appendChild(removeBtn);

        actionsCell.appendChild(btnGroup);
        row.appendChild(actionsCell);
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    list.appendChild(table);

    // Adiciona paginação
    if (totalPages > 1) {
        const paginationContainer = document.createElement('nav');
        paginationContainer.setAttribute('aria-label', 'Navegação de página');
        paginationContainer.className = 'mt-3';

        const pagination = document.createElement('ul');
        pagination.className = 'pagination justify-content-center';

        // Botão Anterior
        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${page === 1 ? 'disabled' : ''}`;
        const prevLink = document.createElement('a');
        prevLink.className = 'page-link';
        prevLink.href = '#';
        prevLink.textContent = 'Anterior';
        prevLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (page > 1) {
                currentPage = page - 1;
                renderRulesPage(currentPage);
            }
        });
        prevLi.appendChild(prevLink);
        pagination.appendChild(prevLi);

        // Páginas numeradas
        for (let i = 1; i <= totalPages; i++) {
            const pageLi = document.createElement('li');
            pageLi.className = `page-item ${i === page ? 'active' : ''}`;
            const pageLink = document.createElement('a');
            pageLink.className = 'page-link';
            pageLink.href = '#';
            pageLink.textContent = i;
            pageLink.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                renderRulesPage(currentPage);
            });
            pageLi.appendChild(pageLink);
            pagination.appendChild(pageLi);
        }

        // Botão Próximo
        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${page === totalPages ? 'disabled' : ''}`;
        const nextLink = document.createElement('a');
        nextLink.className = 'page-link';
        nextLink.href = '#';
        nextLink.textContent = 'Próximo';
        nextLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (page < totalPages) {
                currentPage = page + 1;
                renderRulesPage(currentPage);
            }
        });
        nextLi.appendChild(nextLink);
        pagination.appendChild(nextLi);

        paginationContainer.appendChild(pagination);
        list.appendChild(paginationContainer);
    }
}

// Adiciona ou modifica regra
async function addRule() {
    const bankInput = document.getElementById('rule-bank').value.trim();
    const pattern = document.getElementById('rule-pattern').value.trim();
    const replacement = document.getElementById('rule-replacement').value.trim();
    const category = document.getElementById('rule-category').value.trim();
    const isRegex = document.getElementById('rule-regex').checked;
    const memoTemplate = document.getElementById('rule-memo').value.trim();

    // Valida se um banco foi selecionado
    if (!bankInput) {
        alert('Banco é obrigatório!');
        return;
    }

    // Busca o ID do banco pelo nome
    const banks = await StorageManager.getBanks();
    let bankId;

    if (bankInput === 'Todos os bancos') {
        bankId = 0;
    } else {
        const bank = banks.find(b => b.name.toLowerCase() === bankInput.toLowerCase());
        if (!bank) {
            alert('Banco não encontrado!');
            return;
        }
        bankId = bank.id;
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
    currentPage = 1; // Volta para primeira página
    await loadRules();
}

// Editar regra
async function editRule(rule) {
    editingRuleId = rule.id;

    // Busca o nome do banco pelo ID
    const banks = await StorageManager.getBanks();
    const bank = banks.find(b => b.id === rule.bankId);
    let bankName = '';
    if (bank) {
        if (bank.id === 0) {
            bankName = 'Todos os bancos';
        } else {
            bankName = bank.name.charAt(0).toUpperCase() + bank.name.slice(1);
        }
    }

    // Preenche os campos
    document.getElementById('rule-bank').value = bankName;
    document.getElementById('rule-pattern').value = rule.pattern || '';
    document.getElementById('rule-replacement').value = rule.replacement || '';
    document.getElementById('rule-category').value = rule.category || '';
    document.getElementById('rule-regex').checked = rule.isRegex || false;
    document.getElementById('rule-memo').value = rule.memoTemplate || '';

    // Mostra campo de memo se for regex
    const memoField = document.getElementById('memo-field');
    memoField.classList.toggle('d-none', !rule.isRegex);

    // Atualiza UI
    document.getElementById('form-title').textContent = 'Editar Regra';
    document.getElementById('submit-btn').textContent = 'Modificar Regra';
    document.getElementById('cancel-btn').classList.remove('d-none');

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
    document.getElementById('memo-field').classList.add('d-none');

    // Restaura UI
    document.getElementById('form-title').textContent = 'Nova Regra';
    document.getElementById('submit-btn').textContent = 'Adicionar Regra';
    document.getElementById('cancel-btn').classList.add('d-none');
}

// Remove regra
async function removeRule(ruleId) {
    if (!confirm('Remover esta regra?')) return;

    await StorageManager.removePayeeRule(ruleId);

    // Ajusta página se necessário
    const rules = await StorageManager.getPayeeRules();
    const totalPages = Math.ceil(rules.length / itemsPerPage);
    if (currentPage > totalPages && currentPage > 1) {
        currentPage = totalPages;
    }

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

// Search functionality
let currentSearchTerm = '';

// Pagination
let currentPage = 1;
let itemsPerPage = 10;
let allRulesData = [];

function toggleSearch(button, input) {
    if (input.classList.contains('d-none')) {
        button.classList.add('d-none');
        input.classList.remove('d-none');
        input.focus();
    } else {
        button.classList.remove('d-none');
        input.classList.add('d-none');
        currentSearchTerm = '';
        input.value = '';
        input.classList.remove('search-invalid');
        filterRules('');
    }
}

function filterRules(searchTerm) {
    const rows = document.querySelectorAll('#rules-list tbody tr');

    if (!searchTerm) {
        rows.forEach(row => row.style.display = '');
        return;
    }

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const text = Array.from(cells).map(cell => cell.textContent.toLowerCase()).join(' ');

        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function filterDropdown(searchTerm, dropdown) {
    const items = dropdown.querySelectorAll('.dropdown-item');
    const lowerSearch = searchTerm.toLowerCase();

    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        const li = item.parentElement;

        if (text.includes(lowerSearch)) {
            li.style.display = '';
        } else {
            li.style.display = 'none';
        }
    });
}
