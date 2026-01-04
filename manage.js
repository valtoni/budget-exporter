// Script para página de gerenciamento

// Estado do formulário
let editingRuleId = null;

// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
    await StorageManager.init();
    displayVersion();
    await loadAccounts();
    await loadCategories();
    await loadRules();
    setupEventListeners();
});

// Exibe a versão do plugin vinda do manifesto
function displayVersion() {
    try {
        const manifest = chrome.runtime.getManifest();
        const versionElement = document.querySelector('.nav-link.version');
        if (versionElement && manifest.version) {
            versionElement.textContent = `v${manifest.version}`;
        }
    } catch (e) {
        console.warn('Não foi possível carregar a versão do manifesto:', e);
    }
}

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

    document.getElementById('accounts-nav').addEventListener('click', (e) => {
        e.preventDefault();
        showTab('tab-accounts', 'accounts-nav');
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

    // Form de adicionar conta
    document.getElementById('add-account-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await addAccount();
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

    // Exportar
    const btnExport = document.getElementById('btn-export');
    if (btnExport) {
        btnExport.addEventListener('click', async () => {
            try {
                await StorageManager.exportData();
            } catch (e) {
                console.error('Falha ao exportar:', e);
                alert('Falha ao exportar dados: ' + (e.message || e));
            }
        });
    }

    // Importar
    const btnImport = document.getElementById('btn-import');
    const importInput = document.getElementById('import-file');
    if (btnImport && importInput) {
        btnImport.addEventListener('click', () => importInput.click());
        importInput.addEventListener('change', async (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            if (!confirm('Importar substituirá regras, categorias e contas atuais. Deseja continuar?')) {
                e.target.value = '';
                return;
            }
            try {
                await StorageManager.importData(file);
                alert('Importação concluída com sucesso.');
                await loadAccounts();
                await loadCategories();
                await loadRules();
            } catch (err) {
                console.error('Falha ao importar:', err);
                alert('Falha ao importar dados: ' + (err.message || err));
            } finally {
                e.target.value = '';
            }
        });
    }

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

        // Chamar filterRules em qualquer caso (a função lidará com < 3 caracteres)
        filterRules(currentSearchTerm);
    });

    searchInput.addEventListener('blur', () => {
        if (!currentSearchTerm) {
            setTimeout(() => {
                toggleSearch(searchButton, searchInput);
            }, 200);
        }
    });

    // Filtro de conta
    const accountInput = document.getElementById('rule-account');
    const accountDropdown = document.getElementById('account-dropdown');
    const accountButton = accountInput.nextElementSibling;

    accountInput.addEventListener('input', (e) => {
        filterDropdown(accountInput.value, accountDropdown);
    });

    accountInput.addEventListener('focus', () => {
        filterDropdown(accountInput.value, accountDropdown);
    });

    accountButton.addEventListener('click', (e) => {
        e.stopPropagation();
        filterDropdown(accountInput.value, accountDropdown);
    });

    // Previne fechar dropdown ao clicar no input
    accountInput.addEventListener('click', (e) => {
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

// Carrega contas no dropdown e na lista
async function loadAccounts() {
    const accounts = await StorageManager.getAccounts();

    // Popula dropdown de contas
    const dropdown = document.getElementById('account-dropdown');
    dropdown.innerHTML = '';
    accounts.forEach(account => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.className = 'dropdown-item';
        a.href = '#';

        // Formata nome: 'all' vira 'Todas as contas', outros mantém formato
        if (account.id === 0) {
            a.textContent = 'Todas as contas';
            a.setAttribute('data-account-name', 'Todas as contas');
        } else {
            a.textContent = account.name;
            a.setAttribute('data-account-name', account.name);
        }

        a.setAttribute('data-account-id', account.id);
        a.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('rule-account').value = a.getAttribute('data-account-name');
        });

        li.appendChild(a);
        dropdown.appendChild(li);
    });

    // Popula lista de contas
    const list = document.getElementById('accounts-list');
    list.innerHTML = '';

    if (accounts.length === 0) {
        list.innerHTML = '<div class="col-12 text-center text-muted py-4">Nenhuma conta cadastrada</div>';
        return;
    }

    accounts.forEach(account => {
        const col = document.createElement('div');
        col.className = 'col-md-4 col-sm-6';

        const card = document.createElement('div');
        card.className = 'card';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body d-flex justify-content-between align-items-center p-2';

        const span = document.createElement('span');
        if (account.id === 0) {
            span.textContent = 'Todas as contas (coringa)';
            span.className = 'fw-bold';
        } else {
            span.textContent = account.name;
        }

        const button = document.createElement('button');
        button.className = 'btn btn-sm btn-danger';
        button.textContent = 'Remover';
        button.onclick = () => removeAccount(account.id);
        // Desabilita remoção das 4 contas pré-definidas (IDs 0, 1, 2, 3)
        if (account.id >= 0 && account.id <= 3) {
            button.disabled = true;
            button.title = 'Conta pré-definida não pode ser removida';
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
        a.textContent = cat.name;

        a.addEventListener('click', (e) => {
            e.preventDefault();
            const input = document.getElementById('rule-category');
            input.value = cat.name;
            input.dataset.categoryId = cat.id;
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
        span.textContent = cat.name;

        const button = document.createElement('button');
        button.className = 'btn btn-sm btn-danger';
        button.textContent = 'Remover';
        button.onclick = () => removeCategory(cat.name);

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

    if (categories.find(c => c.name.toLowerCase() === name.toLowerCase())) {
        alert('Categoria já existe!');
        return;
    }

    const updated = categories.concat([{ name }]);
    await StorageManager.setCategories(updated);

    input.value = '';
    await loadCategories();
}

// Remove categoria
async function removeCategory(name) {
    if (!confirm(`Remover categoria "${name}"?`)) return;

    const categories = await StorageManager.getCategories();
    const filtered = categories.filter(c => c.name !== name);

    await StorageManager.setCategories(filtered);
    await loadCategories();
}

// Adiciona conta
async function addAccount() {
    const input = document.getElementById('account-name');
    const name = input.value.trim();

    if (!name) return;

    const accounts = await StorageManager.getAccounts();

    if (accounts.find(a => a.name.toLowerCase() === name.toLowerCase())) {
        alert('Conta já existe!');
        return;
    }

    await StorageManager.addAccount({ name });

    input.value = '';
    await loadAccounts();
}

// Remove conta
async function removeAccount(accountId) {
    const accounts = await StorageManager.getAccounts();
    const account = accounts.find(a => a.id === accountId);

    if (!confirm(`Remover conta "${account.name}"?`)) return;

    await StorageManager.removeAccount(accountId);
    await loadAccounts();
}

// Carrega regras
async function loadRules() {
    const [rules, accounts, categories] = await Promise.all([
        StorageManager.getPayeeRules(),
        StorageManager.getAccounts(),
        StorageManager.getCategories()
    ]);
    const idToName = new Map(categories.map(c => [c.id, c.name]));
    const rulesWithNames = rules.map(r => ({
        ...r,
        _categoryName: r.categoryId ? (idToName.get(r.categoryId) || '') : (r.category || '')
    }));
    allRulesData = { rules: rulesWithNames, accounts };

    // Se houver um termo de pesquisa ativo, reaplica o filtro
    if (currentSearchTerm && currentSearchTerm.length >= 3) {
        filterRules(currentSearchTerm);
    } else {
        renderRulesPage(currentPage);
    }
}

// Renderiza página de regras
function renderRulesPage(page, filteredRules = null) {
    const { rules: allRules, accounts } = allRulesData;
    let rules = filteredRules || allRules;
    const list = document.getElementById('rules-list');

    list.innerHTML = '';

    if (rules.length === 0) {
        list.innerHTML = `<div class="text-center text-muted py-5">${filteredRules ? 'Nenhuma regra encontrada para a pesquisa' : 'Nenhuma regra cadastrada'}</div>`;
        return;
    }

    // Ordenação
    rules.sort((a, b) => {
        let valA, valB;
        
        switch (currentSortCol) {
            case 'account':
                const accA = accounts.find(acc => acc.id === a.accountId);
                const accB = accounts.find(acc => acc.id === b.accountId);
                valA = accA ? (accA.id === 0 ? 'Todas' : accA.name) : '';
                valB = accB ? (accB.id === 0 ? 'Todas' : accB.name) : '';
                break;
            case 'pattern':
                valA = a.pattern || '';
                valB = b.pattern || '';
                break;
            case 'replacement':
                valA = a.replacement || '';
                valB = b.replacement || '';
                break;
            case 'category':
                valA = a._categoryName || '';
                valB = b._categoryName || '';
                break;
            case 'memo':
                valA = a.memoTemplate || '';
                valB = b.memoTemplate || '';
                break;
            default:
                valA = '';
                valB = '';
        }

        valA = valA.toLowerCase();
        valB = valB.toLowerCase();

        if (valA < valB) return currentSortDir === 'asc' ? -1 : 1;
        if (valA > valB) return currentSortDir === 'asc' ? 1 : -1;
        return 0;
    });

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
    
    const tr = document.createElement('tr');
    const cols = [
        { id: 'account', label: 'Conta', class: 'col-width-account' },
        { id: 'pattern', label: 'Padrão', class: 'col-width-pattern' },
        { id: 'replacement', label: 'Substituição', class: 'col-width-replacement' },
        { id: 'category', label: 'Categoria', class: 'col-width-category' },
        { id: 'memo', label: 'Memo', class: 'col-width-memo' },
        { id: 'actions', label: 'Ações', class: 'col-width-actions text-end', sortable: false }
    ];

    cols.forEach(col => {
        const th = document.createElement('th');
        th.className = col.class;
        if (col.sortable !== false) {
            th.style.cursor = 'pointer';
            th.classList.add('sortable-header');
            
            let icon = 'bi-arrow-down-up';
            if (currentSortCol === col.id) {
                icon = currentSortDir === 'asc' ? 'bi-sort-alpha-down' : 'bi-sort-alpha-up-alt';
                th.classList.add('table-active');
            }
            
            th.innerHTML = `${col.label} <i class="bi ${icon} ms-1 small text-muted"></i>`;
            th.onclick = () => {
                if (currentSortCol === col.id) {
                    currentSortDir = currentSortDir === 'asc' ? 'desc' : 'asc';
                } else {
                    currentSortCol = col.id;
                    currentSortDir = 'asc';
                }
                renderRulesPage(currentPage, filteredRules);
            };
        } else {
            th.textContent = col.label;
        }
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);

    // Corpo
    const tbody = document.createElement('tbody');

    paginatedRules.forEach(rule => {
        const row = document.createElement('tr');
        if (!rule.enabled) {
            row.className = 'table-secondary opacity-50';
        }

        // Coluna Conta
        const accountCell = document.createElement('td');
        const account = accounts.find(a => a.id === rule.accountId);
        if (account) {
            if (account.id === 0) {
                accountCell.textContent = 'Todas';
            } else {
                accountCell.textContent = account.name.charAt(0).toUpperCase() + account.name.slice(1);
            }
        } else {
            accountCell.innerHTML = '<span class="text-muted fst-italic">-</span>';
        }
        row.appendChild(accountCell);

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
        if (rule._categoryName) {
            categoryCell.textContent = rule._categoryName;
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
                renderRulesPage(currentPage, filteredRules);
            }
        });
        prevLi.appendChild(prevLink);
        pagination.appendChild(prevLi);

        // Páginas numeradas
        const maxVisible = 5;
        let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        const addPageLink = (i) => {
            const pageLi = document.createElement('li');
            pageLi.className = `page-item ${i === page ? 'active' : ''}`;
            const pageLink = document.createElement('a');
            pageLink.className = 'page-link';
            pageLink.href = '#';
            pageLink.textContent = i;
            pageLink.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                renderRulesPage(currentPage, filteredRules);
            });
            pageLi.appendChild(pageLink);
            pagination.appendChild(pageLi);
        };

        const addEllipsis = () => {
            const li = document.createElement('li');
            li.className = 'page-item disabled';
            const span = document.createElement('span');
            span.className = 'page-link';
            span.textContent = '...';
            li.appendChild(span);
            pagination.appendChild(li);
        };

        if (startPage > 1) {
            addPageLink(1);
            if (startPage > 2) addEllipsis();
        }

        for (let i = startPage; i <= endPage; i++) {
            addPageLink(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) addEllipsis();
            addPageLink(totalPages);
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
                renderRulesPage(currentPage, filteredRules);
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
    const accountInput = document.getElementById('rule-account').value.trim();
    const pattern = document.getElementById('rule-pattern').value.trim();
    const replacement = document.getElementById('rule-replacement').value.trim();
    const categoryInputEl = document.getElementById('rule-category');
    const categoryName = categoryInputEl.value.trim();
    const selectedCategoryId = categoryInputEl.dataset.categoryId ? String(categoryInputEl.dataset.categoryId) : '';
    const isRegex = document.getElementById('rule-regex').checked;
    const memoTemplate = document.getElementById('rule-memo').value.trim();

    // Valida se uma conta foi selecionada
    if (!accountInput) {
        alert('Conta é obrigatória!');
        return;
    }

    // Busca o ID da conta pelo nome
    const accounts = await StorageManager.getAccounts();
    let accountId;

    if (accountInput === 'Todas as contas') {
        accountId = 0;
    } else {
        const account = accounts.find(a => a.name.toLowerCase() === accountInput.toLowerCase());
        if (!account) {
            alert('Conta não encontrada!');
            return;
        }
        accountId = account.id;
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

    // Resolve categoryId
    let categoryId = selectedCategoryId;
    if (!categoryId && categoryName) {
        const cats = await StorageManager.getCategories();
        const found = cats.find(c => c.name.toLowerCase() === categoryName.toLowerCase());
        categoryId = found ? found.id : '';
    }

    if (editingRuleId) {
        // Modo edição
        const rules = await StorageManager.getPayeeRules();
        const ruleIndex = rules.findIndex(r => r.id === editingRuleId);

        if (ruleIndex !== -1) {
            rules[ruleIndex] = {
                ...rules[ruleIndex],
                accountId,
                pattern,
                replacement,
                categoryId,
                category: categoryName,
                isRegex,
                memoTemplate: isRegex ? memoTemplate : ''
            };
            await StorageManager.setPayeeRules(rules);
        }
    } else {
        // Modo adicionar
        await StorageManager.addPayeeRule({
            accountId,
            pattern,
            replacement,
            categoryId,
            category: categoryName,
            isRegex,
            memoTemplate: isRegex ? memoTemplate : ''
        });
    }

    // Limpa seleção de categoria
    categoryInputEl.dataset.categoryId = '';
    cancelEdit();
    currentPage = 1; // Volta para primeira página
    await loadRules();
}

// Editar regra
async function editRule(rule) {
    editingRuleId = rule.id;

    // Busca o nome da conta pelo ID
    const accounts = await StorageManager.getAccounts();
    const account = accounts.find(a => a.id === rule.accountId);
    let accountName = '';
    if (account) {
        if (account.id === 0) {
            accountName = 'Todas as contas';
        } else {
            accountName = account.name.charAt(0).toUpperCase() + account.name.slice(1);
        }
    }

    // Preenche os campos
    document.getElementById('rule-account').value = accountName;
    document.getElementById('rule-pattern').value = rule.pattern || '';
    document.getElementById('rule-replacement').value = rule.replacement || '';
    const catInput = document.getElementById('rule-category');
    catInput.value = rule._categoryName || '';
    catInput.dataset.categoryId = rule.categoryId ? String(rule.categoryId) : '';
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
    document.getElementById('rule-account').value = '';
    document.getElementById('rule-pattern').value = '';
    document.getElementById('rule-replacement').value = '';
    const catInput = document.getElementById('rule-category');
    catInput.value = '';
    catInput.dataset.categoryId = '';
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
let allRulesData = { rules: [], accounts: [] };

// Sorting
let currentSortCol = 'pattern'; // Default sort
let currentSortDir = 'asc';

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
    const { rules, accounts } = allRulesData;
    let filteredRules = rules;

    if (searchTerm && searchTerm.length >= 3) {
        const lowerSearch = searchTerm.toLowerCase();
        filteredRules = rules.filter(rule => {
            // Busca em: Conta
            const account = accounts.find(a => a.id === rule.accountId);
            const accountName = account ? (account.id === 0 ? 'Todas' : account.name) : '';
            
            // Busca em: Padrão, Substituição, Categoria, Memo
            const searchableText = [
                accountName,
                rule.pattern,
                rule.replacement,
                rule._categoryName,
                rule.memoTemplate
            ].map(t => (t || '').toLowerCase()).join(' ');

            return searchableText.includes(lowerSearch);
        });
    }

    currentPage = 1;
    renderRulesPage(currentPage, filteredRules);
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
