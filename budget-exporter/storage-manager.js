// Gerenciador de storage para regras de Payee e categorias
// Usado por todos os módulos da extensão
const storageAPI = (typeof browser !== 'undefined' ? browser.storage : chrome.storage);

const StorageManager = {
    // Chaves do storage
    KEYS: {
        PAYEE_RULES: 'payee_rules',      // Array de regras de correspondência de payee
        CATEGORIES: 'categories'          // Array de categorias disponíveis
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
    },

    /**
     * Obtém todos os dados do storage
     */
    async getAll() {
        return new Promise((resolve) => {
            storageAPI.sync.get(null, (items) => {
                resolve(items || {});
            });
        });
    },

    /**
     * Obtém regras de payee
     * @returns {Promise<Array>} Array de regras { pattern, replacement, category, isRegex }
     */
    async getPayeeRules() {
        return new Promise((resolve) => {
            storageAPI.sync.get(this.KEYS.PAYEE_RULES, (items) => {
                resolve(items[this.KEYS.PAYEE_RULES] || []);
            });
        });
    },

    /**
     * Salva regras de payee
     * @param {Array} rules Array de regras
     */
    async setPayeeRules(rules) {
        return new Promise((resolve) => {
            storageAPI.sync.set({ [this.KEYS.PAYEE_RULES]: rules }, resolve);
        });
    },

    /**
     * Adiciona uma nova regra de payee
     * @param {Object} rule { pattern, replacement, category, isRegex }
     */
    async addPayeeRule(rule) {
        const rules = await this.getPayeeRules();
        rules.push({
            id: Date.now(),
            pattern: rule.pattern,
            replacement: rule.replacement,
            category: rule.category || '',
            isRegex: rule.isRegex || false,
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
        return new Promise((resolve) => {
            storageAPI.sync.get(this.KEYS.CATEGORIES, (items) => {
                resolve(items[this.KEYS.CATEGORIES] || []);
            });
        });
    },

    /**
     * Salva categorias
     * @param {Array} categories Array de strings
     */
    async setCategories(categories) {
        return new Promise((resolve) => {
            storageAPI.sync.set({ [this.KEYS.CATEGORIES]: categories }, resolve);
        });
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
