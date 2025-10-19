// Gerenciador de storage para regras de Payee e categorias
// Usado por todos os módulos da extensão
const storageAPI = (typeof browser !== 'undefined' ? browser.storage : chrome.storage);
const isFirefox = (typeof browser !== 'undefined');

// Pequena implementação de MD5 em JS (compacta)
// Fonte adaptada de implementações públicas simplificadas
function md5(str) {
    function toUTF8(s) { return unescape(encodeURIComponent(s)); }
    function rhex(n) {
        let s = "", j;
        for (j = 0; j < 4; j++) s += ("0" + ((n >> (j * 8)) & 255).toString(16)).slice(-2);
        return s;
    }
    function add(x, y) { return (((x & 0xffff) + (y & 0xffff)) + ((((x >> 16) + (y >> 16)) & 0xffff) << 16)) >>> 0; }
    function rol(num, cnt) { return ((num << cnt) | (num >>> (32 - cnt))) >>> 0; }
    function cmn(q, a, b, x, s, t) { return add(rol(add(add(a, q), add(x, t)), s), b); }
    function ff(a, b, c, d, x, s, t) { return cmn((b & c) | ((~b) & d), a, b, x, s, t); }
    function gg(a, b, c, d, x, s, t) { return cmn((b & d) | (c & (~d)), a, b, x, s, t); }
    function hh(a, b, c, d, x, s, t) { return cmn(b ^ c ^ d, a, b, x, s, t); }
    function ii(a, b, c, d, x, s, t) { return cmn(c ^ (b | (~d)), a, b, x, s, t); }
    function str2blks_MD5(s) {
        const nblk = (((s.length + 8) >> 6) + 1) * 16;
        const blks = new Array(nblk).fill(0);
        for (let i = 0; i < s.length; i++) blks[i >> 2] |= s.charCodeAt(i) << ((i % 4) * 8);
        blks[s.length >> 2] |= 0x80 << ((s.length % 4) * 8);
        blks[nblk - 2] = (s.length * 8) >>> 0;
        return blks;
    }
    const x = str2blks_MD5(toUTF8(str));
    let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
    for (let i = 0; i < x.length; i += 16) {
        const olda = a, oldb = b, oldc = c, oldd = d;
        a = ff(a, b, c, d, x[i+0], 7 , -680876936);  d = ff(d, a, b, c, x[i+1], 12, -389564586);
        c = ff(c, d, a, b, x[i+2], 17,  606105819);  b = ff(b, c, d, a, x[i+3], 22, -1044525330);
        a = ff(a, b, c, d, x[i+4], 7 , -176418897);  d = ff(d, a, b, c, x[i+5], 12,  1200080426);
        c = ff(c, d, a, b, x[i+6], 17, -1473231341); b = ff(b, c, d, a, x[i+7], 22, -45705983);
        a = ff(a, b, c, d, x[i+8], 7 ,  1770035416); d = ff(d, a, b, c, x[i+9], 12, -1958414417);
        c = ff(c, d, a, b, x[i+10],17, -42063);      b = ff(b, c, d, a, x[i+11],22, -1990404162);
        a = ff(a, b, c, d, x[i+12],7 ,  1804603682); d = ff(d, a, b, c, x[i+13],12, -40341101);
        c = ff(c, d, a, b, x[i+14],17, -1502002290); b = ff(b, c, d, a, x[i+15],22,  1236535329);

        a = gg(a, b, c, d, x[i+1], 5 , -165796510);  d = gg(d, a, b, c, x[i+6], 9 , -1069501632);
        c = gg(c, d, a, b, x[i+11],14,  643717713);  b = gg(b, c, d, a, x[i+0], 20, -373897302);
        a = gg(a, b, c, d, x[i+5], 5 , -701558691);  d = gg(d, a, b, c, x[i+10],9 ,  38016083);
        c = gg(c, d, a, b, x[i+15],14, -660478335);  b = gg(b, c, d, a, x[i+4], 20, -405537848);
        a = gg(a, b, c, d, x[i+9], 5 ,  568446438);  d = gg(d, a, b, c, x[i+14],9 , -1019803690);
        c = gg(c, d, a, b, x[i+3], 14, -187363961);  b = gg(b, c, d, a, x[i+8], 20,  1163531501);
        a = gg(a, b, c, d, x[i+13],5 , -1444681467); d = gg(d, a, b, c, x[i+2], 9 , -51403784);
        c = gg(c, d, a, b, x[i+7], 14,  1735328473); b = gg(b, c, d, a, x[i+12],20, -1926607734);

        a = hh(a, b, c, d, x[i+5], 4 , -378558);     d = hh(d, a, b, c, x[i+8], 11, -2022574463);
        c = hh(c, d, a, b, x[i+11],16,  1839030562); b = hh(b, c, d, a, x[i+14],23,  -35309556);
        a = hh(a, b, c, d, x[i+1], 4 , -1530992060); d = hh(d, a, b, c, x[i+4], 11,  1272893353);
        c = hh(c, d, a, b, x[i+7], 16, -155497632);  b = hh(b, c, d, a, x[i+10],23, -1094730640);
        a = hh(a, b, c, d, x[i+13],4 ,  681279174);  d = hh(d, a, b, c, x[i+0], 11, -358537222);
        c = hh(c, d, a, b, x[i+3], 16, -722521979);  b = hh(b, c, d, a, x[i+6], 23,   76029189);

        a = ii(a, b, c, d, x[i+0], 6 , -198630844);  d = ii(d, a, b, c, x[i+7], 10,  1126891415);
        c = ii(c, d, a, b, x[i+14],15, -1416354905); b = ii(b, c, d, a, x[i+5], 21,   -57434055);
        a = ii(a, b, c, d, x[i+12],6 ,  1700485571); d = ii(d, a, b, c, x[i+3], 10, -1894986606);
        c = ii(c, d, a, b, x[i+10],15,     -1051523); b = ii(b, c, d, a, x[i+1], 21, -2054922799);
        a = ii(a, b, c, d, x[i+8], 6 ,  1873313359); d = ii(d, a, b, c, x[i+15],10,   -30611744);
        c = ii(c, d, a, b, x[i+6], 15, -1560198380); b = ii(b, c, d, a, x[i+13],21,  1309151649);

        a = add(a, olda) >>> 0;
        b = add(b, oldb) >>> 0;
        c = add(c, oldc) >>> 0;
        d = add(d, oldd) >>> 0;
    }
    return (rhex(a) + rhex(b) + rhex(c) + rhex(d));
}

function normalizeCategoryInput(item) {
    if (!item) return null;
    if (typeof item === 'string') {
        const name = item;
        return { id: md5(name.toLowerCase()), name };
    }
    if (typeof item === 'object') {
        const name = String(item.name || '').trim();
        if (!name) return null;
        const id = item.id || md5(name.toLowerCase());
        return { id: String(id), name };
    }
    return null;
}

const BudgetStorage = {
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
        } else if (Array.isArray(data.categories)) {
            // Migração: se categorias estiverem como strings ou objetos sem id, normaliza para {id,name}
            const needsMigration = data.categories.some(c => (typeof c === 'string') || (typeof c === 'object' && c && !c.id));
            if (needsMigration) {
                await this.setCategories(data.categories);
            }
        }

        if (!data.accounts) {
            // Contas pré-configuradas a partir de BankUtils.ACCOUNTS
            const defaultAccounts = Object.values(window.BankUtils.ACCOUNTS).map(acc => ({
                id: acc.id,
                name: acc.name
            }));
            await this.setAccounts(defaultAccounts);
        }

        // Migração de regras: garantir categoryId baseado no nome (se existir)
        try {
            const rules = await this.getPayeeRules();
            const categories = await this.getCategories();
            const nameToId = new Map(categories.map(c => [c.name.toLowerCase(), c.id]));
            let changed = false;
            for (let i = 0; i < rules.length; i++) {
                const r = rules[i];
                if (r && !r.categoryId && typeof r.category === 'string' && r.category.trim()) {
                    const name = r.category.trim();
                    const id = nameToId.get(name.toLowerCase()) || md5(name.toLowerCase());
                    rules[i] = { ...r, categoryId: id };
                    // Se a categoria não existe ainda, adiciona-a para manter consistência
                    if (!nameToId.has(name.toLowerCase())) {
                        categories.push({ id, name });
                        nameToId.set(name.toLowerCase(), id);
                    }
                    changed = true;
                }
            }
            if (changed) {
                await this.setCategories(categories);
                await this.setPayeeRules(rules);
            }
        } catch (e) {
            console.warn('Migração de categoryId em regras falhou:', e);
        }
    },

    /**
     * Obtém todos os dados do storage
     */
    async getAll() {
        if (isFirefox) {
            return await storageAPI.local.get(null) || {};
        } else {
            return new Promise((resolve) => {
                storageAPI.local.get(null, (items) => {
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
        let rawRules;
        if (isFirefox) {
            const items = await storageAPI.local.get(this.KEYS.PAYEE_RULES);
            rawRules = items[this.KEYS.PAYEE_RULES] || [];
        } else {
            rawRules = await new Promise((resolve) => {
                storageAPI.local.get(this.KEYS.PAYEE_RULES, (items) => {
                    resolve(items[this.KEYS.PAYEE_RULES] || []);
                });
            });
        }
        // Normalize categoryId for legacy rules with only category name
        try {
            const categories = await this.getCategories();
            const map = new Map(categories.map(c => [c.name.toLowerCase(), c.id]));
            rawRules = rawRules.map(r => {
                if (!r) return r;
                if (!r.categoryId) {
                    const name = (typeof r.category === 'string') ? r.category.trim() : '';
                    const id = name ? (map.get(name.toLowerCase()) || md5(name.toLowerCase())) : '';
                    return { ...r, categoryId: id };
                }
                return r;
            });
        } catch (_) { /* ignore */ }
        return rawRules;
    },

    /**
     * Salva regras de payee
     * @param {Array} rules Array de regras
     */
    async setPayeeRules(rules) {
        if (isFirefox) {
            await storageAPI.local.set({ [this.KEYS.PAYEE_RULES]: rules });
        } else {
            return new Promise((resolve, reject) => {
                storageAPI.local.set({ [this.KEYS.PAYEE_RULES]: rules }, () => {
                    const err = (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.lastError) ? chrome.runtime.lastError : null;
                    if (err) {
                        reject(new Error(err.message || String(err)));
                    } else {
                        resolve();
                    }
                });
            });
        }
    },

    /**
     * Adiciona uma nova regra de payee
     * @param {Object} rule { accountId, pattern, replacement, category, isRegex, memoTemplate }
     */
    async addPayeeRule(rule) {
        const rules = await this.getPayeeRules();
        // Resolve categoryId from provided categoryId or category name
        let categoryId = '';
        if (rule.categoryId) {
            categoryId = String(rule.categoryId);
        } else if (rule.category) {
            const categories = await this.getCategories();
            const found = categories.find(c => c.name.toLowerCase() === String(rule.category).toLowerCase());
            categoryId = found ? found.id : '';
        }
        // Normaliza accountId: null/undefined/0 vira 0 (global), outros valores ficam como estão
        let accountId = (rule.accountId == null || rule.accountId === 0) ? 0 : rule.accountId;
        rules.push({
            id: Date.now(),
            accountId: accountId,
            pattern: rule.pattern,
            replacement: rule.replacement,
            categoryId: categoryId || '',
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
     * @returns {Promise<Array<{id: string, name: string}>>} Array de objetos de categoria
     */
    async getCategories() {
        const raw = await new Promise((resolve) => {
            if (isFirefox) {
                storageAPI.local.get(this.KEYS.CATEGORIES).then((items) => resolve(items[this.KEYS.CATEGORIES] || [])).catch(() => resolve([]));
            } else {
                storageAPI.local.get(this.KEYS.CATEGORIES, (items) => {
                    resolve((items && items[this.KEYS.CATEGORIES]) || []);
                });
            }
        });
        // Normaliza: aceita strings ou objetos
        const normalized = Array.isArray(raw)
            ? raw.map(normalizeCategoryInput).filter(Boolean)
            : [];
        return normalized;
    },

    /**
     * Salva categorias (aceita strings ou objetos {id,name}; normaliza para objetos)
     * @param {Array<string|{id?: string, name: string}>} categories
     */
    async setCategories(categories) {
        const normalized = (Array.isArray(categories) ? categories : [])
            .map(normalizeCategoryInput)
            .filter(Boolean);
        // Remove duplicados por id (ou nome)
        const seen = new Set();
        const unique = [];
        for (const c of normalized) {
            const key = (c.id || md5(c.name.toLowerCase()));
            if (!seen.has(key)) { seen.add(key); unique.push({ id: key, name: c.name }); }
        }
        if (isFirefox) {
            await storageAPI.local.set({ [this.KEYS.CATEGORIES]: unique });
        } else {
            return new Promise((resolve, reject) => {
                storageAPI.local.set({ [this.KEYS.CATEGORIES]: unique }, () => {
                    const err = (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.lastError) ? chrome.runtime.lastError : null;
                    if (err) {
                        reject(new Error(err.message || String(err)));
                    } else {
                        resolve();
                    }
                });
            });
        }
    },

    /**
     * Obtém contas
     * @returns {Promise<Array>} Array de objetos { id: Number, name: String }
     */
    async getAccounts() {
        if (isFirefox) {
            const items = await storageAPI.local.get(this.KEYS.ACCOUNTS);
            return items[this.KEYS.ACCOUNTS] || [];
        } else {
            return new Promise((resolve) => {
                storageAPI.local.get(this.KEYS.ACCOUNTS, (items) => {
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
            await storageAPI.local.set({ [this.KEYS.ACCOUNTS]: accounts });
        } else {
            return new Promise((resolve, reject) => {
                storageAPI.local.set({ [this.KEYS.ACCOUNTS]: accounts }, () => {
                    const err = (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.lastError) ? chrome.runtime.lastError : null;
                    if (err) {
                        reject(new Error(err.message || String(err)));
                    } else {
                        resolve();
                    }
                });
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
     * Inclui regras da conta alvo + regras da conta coringa (id: 0 ou null)
     * @param {number} accountId ID numérico da conta
     * @returns {Promise<Array>} Array de regras aplicáveis
     */
    async getRulesForAccountId(accountId) {
        const allRules = await this.getPayeeRules();

        // Se accountId é 0, retorna APENAS regras globais (0 ou null)
        if (accountId === 0) {
            return allRules.filter(r => r.accountId === 0 || r.accountId == null);
        }

        // Retorna regras da conta específica + regras da conta coringa (id: 0 ou null)
        return allRules.filter(r => r.accountId === accountId || r.accountId === 0 || r.accountId == null);
    },

    /**
     * Aplica regras de matching em um payee
     * @param {string} originalPayee Payee original
     * @returns {Promise<Object>} { payee, category, matched }
     */
    async applyRules(originalPayee) {
        const rules = await this.getPayeeRules();
        const categories = await this.getCategories();
        const idToName = new Map(categories.map(c => [c.id, c.name]));

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
                matched = originalPayee.toLowerCase().includes(String(rule.pattern || '').toLowerCase());
            }

            if (matched) {
                const nameFromId = rule.categoryId ? (idToName.get(rule.categoryId) || '') : '';
                const resolvedCategory = nameFromId || (rule.category || '');
                return {
                    payee: rule.replacement || originalPayee,
                    category: resolvedCategory,
                    matched: true,
                    ruleId: rule.id,
                    categoryId: rule.categoryId || ''
                };
            }
        }

        return {
            payee: originalPayee,
            category: '',
            matched: false
        };
    },

    /**
     * Exporta todos os dados do storage (local) para um arquivo JSON baixado no navegador
     * @param {string} [filename] Nome do arquivo (opcional)
     */
    async exportData(filename) {
        const all = await this.getAll();
        const normalizedCategories = await this.getCategories();
        const data = {
            meta: {
                app: 'budget-exporter',
                version: 3,
                exportedAt: new Date().toISOString()
            },
            data: {
                [this.KEYS.PAYEE_RULES]: await this.getPayeeRules(),
                [this.KEYS.CATEGORIES]: normalizedCategories,
                [this.KEYS.ACCOUNTS]: all[this.KEYS.ACCOUNTS] || []
            }
        };

        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const ts = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        const defaultName = filename || `budget-storage-backup-${ts.getFullYear()}${pad(ts.getMonth()+1)}${pad(ts.getDate())}-${pad(ts.getHours())}${pad(ts.getMinutes())}${pad(ts.getSeconds())}.json`;

        const a = document.createElement('a');
        a.href = url;
        a.download = defaultName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    /**
     * Importa dados do storage a partir de um File, string JSON ou objeto
     * Substitui completamente os dados atuais (replace)
     * @param {File|string|Object} input
     */
    async importData(input) {
        let obj;
        if (typeof File !== 'undefined' && input instanceof File) {
            obj = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    try { resolve(JSON.parse(reader.result)); } catch (e) { reject(e); }
                };
                reader.onerror = () => reject(reader.error);
                reader.readAsText(input);
            });
        } else if (typeof input === 'string') {
            obj = JSON.parse(input);
        } else if (typeof input === 'object' && input) {
            obj = input;
        } else {
            throw new Error('Formato de entrada inválido para importação');
        }

        const payload = obj.data ? obj.data : obj; // permite arquivo cru somente com chaves
        const rules = Array.isArray(payload[this.KEYS.PAYEE_RULES]) ? payload[this.KEYS.PAYEE_RULES] : [];
        const categories = Array.isArray(payload[this.KEYS.CATEGORIES]) ? payload[this.KEYS.CATEGORIES] : [];
        const accounts = Array.isArray(payload[this.KEYS.ACCOUNTS]) ? payload[this.KEYS.ACCOUNTS] : [];

        // Validações simples de tipos de campos esperados em regras/contas
        const categoriesNow = await this.getCategories();
        const nameToId = new Map(categoriesNow.map(c => [c.name.toLowerCase(), c.id]));
        const safeRules = rules.map((r) => {
            const catName = typeof r.category === 'string' ? r.category : '';
            let categoryId = typeof r.categoryId === 'string' ? r.categoryId : '';
            if (!categoryId && catName) {
                categoryId = nameToId.get(catName.toLowerCase()) || md5(catName.toLowerCase());
            }
            // Normaliza accountId: null ou undefined vira 0 (global)
            let accountId;
            if (typeof r.accountId === 'number') {
                accountId = r.accountId;
            } else if (r.accountId == null) {
                accountId = 0; // null ou undefined -> 0 (global)
            } else {
                accountId = Number(r.accountId) || 0;
            }
            return {
                id: typeof r.id === 'number' ? r.id : Date.now(),
                accountId: accountId,
                pattern: typeof r.pattern === 'string' ? r.pattern : '',
                replacement: typeof r.replacement === 'string' ? r.replacement : '',
                categoryId,
                category: catName,
                isRegex: !!r.isRegex,
                memoTemplate: typeof r.memoTemplate === 'string' ? r.memoTemplate : '',
                enabled: r.enabled !== false
            };
        });

        const safeCategories = (Array.isArray(categories) ? categories : [])
            .map(normalizeCategoryInput)
            .filter(Boolean);

        const safeAccounts = accounts
            .map(a => ({ id: Number(a.id) || 0, name: String(a.name || '') }))
            .filter(a => a.name);

        // Substitui completamente os dados
        await this.setPayeeRules(safeRules);
        await this.setCategories(safeCategories);
        await this.setAccounts(safeAccounts);
    }
};

// Exporta para o escopo global
if (typeof window !== 'undefined') {
    window.StorageManager = BudgetStorage;
    window.BudgetStorage = BudgetStorage; // Mantém compatibilidade
}
