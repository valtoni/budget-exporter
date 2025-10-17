// Gerenciador de storage para regras de Payee e categorias
// Usado por todos os módulos da extensão
const storageAPI = (typeof browser !== 'undefined' ? browser.storage : chrome.storage);
const isFirefox = (typeof browser !== 'undefined');

const StorageManager = {
    // Chaves do storage
    KEYS: {
        PAYEE_RULES: 'payee_rules',      // Array de regras de correspondência de payee
        CATEGORIES: 'categories',         // Array de categorias disponíveis
        ACCOUNTS: 'accounts'              // Array de contas disponíveis
    },

    /**
     * Inicializa o storage com dados padrão se vazio
     */
    async init() {
        const data = await this.getAll();

        if (!data.payee_rules) {
            await this.setPayeeRules([]);
        }

        if (!data.categories) {
            await this.setCategories([
                'Alimentação',
                'Transporte',
                'Moradia',
                'Saúde',
                'Educação',
                'Lazer',
                'Compras',
                'Serviços',
                'Outros'
            ]);
        }

        if (!data.accounts) {
            // Contas pré-configuradas a partir de BankUtils.ACCOUNTS
            const defaultAccounts = Object.values(window.BankUtils.ACCOUNTS).map(acc => ({
                id: acc.id,
                name: acc.name
            }));
            await this.setAccounts(defaultAccounts);
        }
    },

    /**
     * Obtém todos os dados do storage
     */
    async getAll() {
        if (isFirefox) {
            return await storageAPI.sync.get(null) || {};
        } else {
            return new Promise((resolve) => {
                storageAPI.sync.get(null, (items) => {
                    resolve(items || {});
                });
            });
        }
    },

    /**
     * Obtém regras de payee
     * @returns {Promise<Array>} Array de regras com os seguintes campos:
     *   - id: Number - Identificador único gerado com Date.now()
     *   - accountId: Number - ID da conta à qual a regra se aplica
     *   - pattern: String - Padrão de busca (texto ou regex)
     *   - replacement: String - Texto para substituir o payee original
     *   - category: String - Categoria a ser atribuída (pode ser vazia)
     *   - isRegex: Boolean - Indica se o pattern é uma expressão regular
     *   - memoTemplate: String - Template de memo com grupos de captura (\1, \2, etc.)
     *   - enabled: Boolean - Indica se a regra está ativa
     */
    async getPayeeRules() {
        if (isFirefox) {
            const items = await storageAPI.sync.get(this.KEYS.PAYEE_RULES);
            return items[this.KEYS.PAYEE_RULES] || [];
        } else {
            return new Promise((resolve) => {
                storageAPI.sync.get(this.KEYS.PAYEE_RULES, (items) => {
                    resolve(items[this.KEYS.PAYEE_RULES] || []);
                });
            });
        }
    },

    /**
     * Salva regras de payee
     * @param {Array} rules Array de regras
     */
    async setPayeeRules(rules) {
        if (isFirefox) {
            await storageAPI.sync.set({ [this.KEYS.PAYEE_RULES]: rules });
        } else {
            return new Promise((resolve) => {
                storageAPI.sync.set({ [this.KEYS.PAYEE_RULES]: rules }, resolve);
            });
        }
    },

    /**
     * Adiciona uma nova regra de payee
     * @param {Object} rule { accountId, pattern, replacement, category, isRegex, memoTemplate }
     */
    async addPayeeRule(rule) {
        const rules = await this.getPayeeRules();
        rules.push({
            id: Date.now(),
            accountId: rule.accountId || null,
            pattern: rule.pattern,
            replacement: rule.replacement,
            category: rule.category || '',
            isRegex: rule.isRegex || false,
            memoTemplate: rule.memoTemplate || '',
            enabled: true
        });
        await this.setPayeeRules(rules);
    },

    /**
     * Remove uma regra de payee
     * @param {number} ruleId ID da regra
     */
    async removePayeeRule(ruleId) {
        const rules = await this.getPayeeRules();
        const filtered = rules.filter(r => r.id !== ruleId);
        await this.setPayeeRules(filtered);
    },

    /**
     * Atualiza uma regra de payee
     * @param {number} ruleId ID da regra
     * @param {Object} updates Campos a atualizar
     */
    async updatePayeeRule(ruleId, updates) {
        const rules = await this.getPayeeRules();
        const index = rules.findIndex(r => r.id === ruleId);
        if (index >= 0) {
            rules[index] = { ...rules[index], ...updates };
            await this.setPayeeRules(rules);
        }
    },

    /**
     * Obtém categorias
     * @returns {Promise<Array>} Array de strings
     */
    async getCategories() {
        if (isFirefox) {
            const items = await storageAPI.sync.get(this.KEYS.CATEGORIES);
            return items[this.KEYS.CATEGORIES] || [];
        } else {
            return new Promise((resolve) => {
                storageAPI.sync.get(this.KEYS.CATEGORIES, (items) => {
                    resolve(items[this.KEYS.CATEGORIES] || []);
                });
            });
        }
    },

    /**
     * Salva categorias
     * @param {Array} categories Array de strings
     */
    async setCategories(categories) {
        if (isFirefox) {
            await storageAPI.sync.set({ [this.KEYS.CATEGORIES]: categories });
        } else {
            return new Promise((resolve) => {
                storageAPI.sync.set({ [this.KEYS.CATEGORIES]: categories }, resolve);
            });
        }
    },

    /**
     * Obtém contas
     * @returns {Promise<Array>} Array de objetos { id: Number, name: String }
     */
    async getAccounts() {
        if (isFirefox) {
            const items = await storageAPI.sync.get(this.KEYS.ACCOUNTS);
            return items[this.KEYS.ACCOUNTS] || [];
        } else {
            return new Promise((resolve) => {
                storageAPI.sync.get(this.KEYS.ACCOUNTS, (items) => {
                    resolve(items[this.KEYS.ACCOUNTS] || []);
                });
            });
        }
    },

    /**
     * Salva contas
     * @param {Array} accounts Array de objetos { id, name }
     */
    async setAccounts(accounts) {
        if (isFirefox) {
            await storageAPI.sync.set({ [this.KEYS.ACCOUNTS]: accounts });
        } else {
            return new Promise((resolve) => {
                storageAPI.sync.set({ [this.KEYS.ACCOUNTS]: accounts }, resolve);
            });
        }
    },

    /**
     * Adiciona uma nova conta
     * @param {Object} account { name }
     */
    async addAccount(account) {
        const accounts = await this.getAccounts();
        const maxId = accounts.length > 0 ? Math.max(...accounts.map(a => a.id)) : 0;
        accounts.push({
            id: maxId + 1,
            name: account.name
        });
        await this.setAccounts(accounts);
    },

    /**
     * Remove uma conta
     * @param {number} accountId ID da conta
     */
    async removeAccount(accountId) {
        const accounts = await this.getAccounts();
        const filtered = accounts.filter(a => a.id !== accountId);
        await this.setAccounts(filtered);
    },

    /**
     * Atualiza uma conta
     * @param {number} accountId ID da conta
     * @param {Object} updates Campos a atualizar
     */
    async updateAccount(accountId, updates) {
        const accounts = await this.getAccounts();
        const index = accounts.findIndex(a => a.id === accountId);
        if (index >= 0) {
            accounts[index] = { ...accounts[index], ...updates };
            await this.setAccounts(accounts);
        }
    },

    /**
     * Obtém conta por nome
     * @param {string} name Nome da conta
     * @returns {Promise<Object|null>} Objeto conta ou null
     */
    async getAccountByName(name) {
        const accounts = await this.getAccounts();
        return accounts.find(a => a.name === name) || null;
    },

    /**
     * Obtém conta por ID
     * @param {number} id ID da conta
     * @returns {Promise<Object|null>} Objeto conta ou null
     */
    async getAccountById(id) {
        const accounts = await this.getAccounts();
        return accounts.find(a => a.id === id) || null;
    },

    /**
     * Obtém regras aplicáveis a uma conta específica (por nome)
     * Inclui regras da conta alvo + regras da conta coringa (id: 0)
     * @param {string} accountName Nome da conta
     * @returns {Promise<Array>} Array de regras aplicáveis
     */
    async getRulesForAccount(accountName) {
        const allRules = await this.getPayeeRules();
        const account = await this.getAccountByName(accountName);

        if (!account) {
            console.warn('getRulesForAccount: Conta não encontrada:', accountName);
            return [];
        }

        // Retorna regras da conta específica + regras da conta coringa (id: 0)
        return allRules.filter(r => r.accountId === account.id || r.accountId === 0);
    },

    /**
     * Obtém regras aplicáveis a uma conta específica (por ID numérico)
     * Inclui regras da conta alvo + regras da conta coringa (id: 0)
     * @param {number} accountId ID numérico da conta
     * @returns {Promise<Array>} Array de regras aplicáveis
     */
    async getRulesForAccountId(accountId) {
        const allRules = await this.getPayeeRules();

        // Retorna regras da conta específica + regras da conta coringa (id: 0)
        return allRules.filter(r => r.accountId === accountId || r.accountId === 0);
    },

    /**
     * Aplica regras de matching em um payee
     * @param {string} originalPayee Payee original
     * @returns {Promise<Object>} { payee, category, matched }
     */
    async applyRules(originalPayee) {
        const rules = await this.getPayeeRules();

        for (const rule of rules) {
            if (!rule.enabled) continue;

            let matched = false;

            if (rule.isRegex) {
                try {
                    const regex = new RegExp(rule.pattern, 'i');
                    matched = regex.test(originalPayee);
                } catch (e) {
                    console.warn('Regex inválida:', rule.pattern, e);
                }
            } else {
                matched = originalPayee.toLowerCase().includes(rule.pattern.toLowerCase());
            }

            if (matched) {
                return {
                    payee: rule.replacement || originalPayee,
                    category: rule.category || '',
                    matched: true,
                    ruleId: rule.id
                };
            }
        }

        return {
            payee: originalPayee,
            category: '',
            matched: false
        };
    }
};

// Exporta para o escopo global
if (typeof window !== 'undefined') {
    window.StorageManager = StorageManager;
}
