// Gerenciador de storage para regras de Payee e categorias
// Usado por todos os módulos da extensão
const storageAPI = (typeof browser !== 'undefined' ? browser.storage : chrome.storage);
const isFirefox = (typeof browser !== 'undefined');

const StorageManager = {
    // Chaves do storage
    KEYS: {
        PAYEE_RULES: 'payee_rules',      // Array de regras de correspondência de payee
        CATEGORIES: 'categories',         // Array de categorias disponíveis
        BANKS: 'banks'                    // Array de bancos disponíveis
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

        if (!data.banks) {
            // Bancos pré-configurados com IDs fixos para evitar duplicações
            // ID 0 é reservado para o banco coringa (aplicável a todos os bancos)
            await this.setBanks([
                { id: 0, name: 'all' }, // Banco coringa
                { id: 1, name: 'desjardins' },
                { id: 2, name: 'rbc' },
                { id: 3, name: 'td' },
                { id: 4, name: 'scotiabank' },
                { id: 5, name: 'bmo' },
                { id: 6, name: 'cibc' },
                { id: 7, name: 'nbc' },
                { id: 8, name: 'hsbc' },
                { id: 9, name: 'tangerine' },
                { id: 10, name: 'simplii' },
                { id: 11, name: 'eqbank' },
                { id: 12, name: 'koho' }
            ]);
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
     *   - bankId: Number - ID do banco ao qual a regra se aplica
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
     * @param {Object} rule { bankId, pattern, replacement, category, isRegex, memoTemplate }
     */
    async addPayeeRule(rule) {
        const rules = await this.getPayeeRules();
        rules.push({
            id: Date.now(),
            bankId: rule.bankId || null,
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
     * Obtém bancos
     * @returns {Promise<Array>} Array de objetos { id: Number, name: String }
     */
    async getBanks() {
        if (isFirefox) {
            const items = await storageAPI.sync.get(this.KEYS.BANKS);
            return items[this.KEYS.BANKS] || [];
        } else {
            return new Promise((resolve) => {
                storageAPI.sync.get(this.KEYS.BANKS, (items) => {
                    resolve(items[this.KEYS.BANKS] || []);
                });
            });
        }
    },

    /**
     * Salva bancos
     * @param {Array} banks Array de objetos { id, name }
     */
    async setBanks(banks) {
        if (isFirefox) {
            await storageAPI.sync.set({ [this.KEYS.BANKS]: banks });
        } else {
            return new Promise((resolve) => {
                storageAPI.sync.set({ [this.KEYS.BANKS]: banks }, resolve);
            });
        }
    },

    /**
     * Adiciona um novo banco
     * @param {Object} bank { name }
     */
    async addBank(bank) {
        const banks = await this.getBanks();
        const maxId = banks.length > 0 ? Math.max(...banks.map(b => b.id)) : 0;
        banks.push({
            id: maxId + 1,
            name: bank.name
        });
        await this.setBanks(banks);
    },

    /**
     * Remove um banco
     * @param {number} bankId ID do banco
     */
    async removeBank(bankId) {
        const banks = await this.getBanks();
        const filtered = banks.filter(b => b.id !== bankId);
        await this.setBanks(filtered);
    },

    /**
     * Atualiza um banco
     * @param {number} bankId ID do banco
     * @param {Object} updates Campos a atualizar
     */
    async updateBank(bankId, updates) {
        const banks = await this.getBanks();
        const index = banks.findIndex(b => b.id === bankId);
        if (index >= 0) {
            banks[index] = { ...banks[index], ...updates };
            await this.setBanks(banks);
        }
    },

    /**
     * Obtém banco por nome
     * @param {string} name Nome do banco
     * @returns {Promise<Object|null>} Objeto banco ou null
     */
    async getBankByName(name) {
        const banks = await this.getBanks();
        return banks.find(b => b.name === name) || null;
    },

    /**
     * Obtém regras aplicáveis a um banco específico
     * Inclui regras do banco alvo + regras do banco coringa (id: 0)
     * @param {string} bankName Nome do banco
     * @returns {Promise<Array>} Array de regras aplicáveis
     */
    async getRulesForBank(bankName) {
        const allRules = await this.getPayeeRules();
        const bank = await this.getBankByName(bankName);

        if (!bank) return [];

        // Retorna regras do banco específico + regras do banco coringa (id: 0)
        return allRules.filter(r => r.bankId === bank.id || r.bankId === 0);
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
