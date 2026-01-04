// Utilitário compartilhado para detecção de banco
// Usado tanto pelo content.js quanto pelo background.js
// Este arquivo é carregado primeiro no manifest.json e cria variáveis globais

// Mapeamento de hostnames para nomes canônicos de banco
const BANK_ALIASES = {
    // Canadá
    desjardins: 'desjardins',
    dj: 'desjardins',
    desj: 'desjardins',
    desjardin: 'desjardins',

    koho: 'koho',

    bmo: 'bmo',
    bankofmontreal: 'bmo',

    rbc: 'rbc',
    royalbank: 'rbc',
    rbcroyalbank: 'rbc',
    royalbankofcanada: 'rbc',

    td: 'td',
    tdbank: 'td',
    torontodominion: 'td',

    scotia: 'scotiabank',
    scotiabank: 'scotiabank',

    tangerine: 'tangerine',

    cibc: 'cibc',

    nbc: 'nbc',
    nationalbank: 'nbc',
    bnc: 'nbc',

    hsbc: 'hsbc',

    simplii: 'simplii',

    eqbank: 'eqbank',
    eq: 'eqbank',
};

// Configuração centralizada de contas
// Esta é a única fonte de verdade para IDs, nomes e identificadores de contas
const ACCOUNTS = {
    WILDCARD: {
        id: 0,
        accountId: 'all',
        name: 'all',
        displayName: 'Todas as contas'
    },
    DESJARDINS_CREDITCARD: {
        id: 1,
        accountId: 'desjardins-creditcard',
        name: 'Desjardins - Credit Card',
        displayName: 'Desjardins - Credit Card'
    },
    DESJARDINS_BANKACCOUNT: {
        id: 2,
        accountId: 'desjardins-bankaccount',
        name: 'Desjardins - Bank Account',
        displayName: 'Desjardins - Bank Account'
    },
    KOHO_BANKACCOUNT: {
        id: 3,
        accountId: 'koho-bankaccount',
        name: 'Koho - Prepaid Card',
        displayName: 'Koho - Prepaid Card'
    }
};

// Helper: Converte accountId (string) para configuração completa
function getAccountByAccountId(accountId) {
    return Object.values(ACCOUNTS).find(acc => acc.accountId === accountId) || null;
}

// Helper: Converte ID numérico para configuração completa
function getAccountById(id) {
    return Object.values(ACCOUNTS).find(acc => acc.id === id) || null;
}

// Helper: Converte nome para configuração completa
function getAccountByName(name) {
    return Object.values(ACCOUNTS).find(acc => acc.name === name) || null;
}

// Helper: Retorna array de todas as contas (exceto wildcard)
function getAllAccounts() {
    return Object.values(ACCOUNTS).filter(acc => acc.id !== 0);
}


function extractDomainName(parts) {
    let domainName;
    if (parts.length >= 3 && (parts[parts.length - 2] === 'co' || parts[parts.length - 2] === 'com')) {
        // Ex: rbc.co.uk -> pega "rbc"
        domainName = parts[parts.length - 3];
    } else if (parts.length >= 2) {
        // Ex: accesdc.mouv.desjardins.com -> pega "desjardins"
        domainName = parts[parts.length - 2];
    } else {
        // Fallback: usa o primeiro segmento
        domainName = parts[0];
    }

    // Normalized domain
    return domainName.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Detecta a conta (banco + tipo) a partir de uma URL
 * @param {string} url - URL completa ou hostname
 * @returns {string|null} - Nome da conta (ex: 'desjardins-bankaccount') ou null
 */
function detectBank(url) {
    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.replace('www.', '');
        const pathname = urlObj.pathname;

        // Extrai o domínio principal
        const parts = hostname.split('.');
        let normalized = extractDomainName(parts);
        const bankName = BANK_ALIASES[normalized];

        if (!bankName) return null;

        // Detecção específica por banco e URL
        if (bankName === 'desjardins') {
            if (pathname.includes('/comptes/courant/')) {
                return 'desjardins-bankaccount';
            }
            if (pathname.includes('/sommaire-perso/sommaire/sommaire-spa/CC/')) {
                return 'desjardins-creditcard';
            }
            // Fallback para desjardins genérico
            return 'desjardins-bankaccount';
        }

        // Para KOHO, detecta o tipo de conta
        if (bankName === 'koho') {
            if (pathname.includes('/transactions')) {
                return 'koho-bankaccount';
            }
            return 'koho-bankaccount';
        }

        // Para outros bancos, mantém o nome original
        return bankName;
    } catch (e) {
        // Se não for URL completa, tenta extrair do hostname direto
        const parts = String(url).replace('www.', '').split('.');
        let normalized = extractDomainName(parts);
        return BANK_ALIASES[normalized] || null;
    }
}

/**
 * Carrega dinamicamente o módulo da conta
 * @param {string} accountName - Nome da conta (ex: 'desjardins-bankaccount', 'koho')
 * @returns {Promise<Object>} - Módulo da conta com selectors e toCsv
 */
async function loadBankModule(accountName) {
    if (!accountName) {
        throw new Error('Nome da conta não informado');
    }

    // Tenta carregar com o nome específico primeiro (ex: strategy-desjardins-bankaccount.js)
    let modulePath = chrome.runtime.getURL(`strategy-${accountName}.js`);

    try {
        const module = await import(modulePath);
        return module;
    } catch (error) {
        throw new Error(`Módulo da conta '${accountName}' não encontrado`);
    }
}

/**
 * Converte data francesa para formato ISO (YYYY-MM-DD)
 * @param {string} frenchDateStr - Data em francês (ex: "15 janvier")
 * @returns {string} - Data no formato ISO (YYYY-MM-DD)
 */
function frDateToISO(frenchDateStr) {
    const mois = {
        'janvier': '01', 'janv': '01', 'jan': '01',
        'février': '02', 'fév': '02', 'fev': '02',
        'mars': '03',
        'avril': '04', 'avr': '04',
        'mai': '05',
        'juin': '06', 'jun': '06',
        'juillet': '07', 'juil': '07', 'jul': '07',
        'août': '08', 'aout': '08',
        'septembre': '09', 'sept': '09', 'sep': '09',
        'octobre': '10', 'oct': '10',
        'novembre': '11', 'nov': '11',
        'décembre': '12', 'déc': '12', 'dec': '12',
    };

    const [dayStr, rawMonth] = frenchDateStr.trim().toLowerCase().split(/\s+/);
    const day = dayStr.padStart(2, '0');
    const month = mois[rawMonth] || '??';
    const year = new Date().getFullYear();

    if (month === '??') {
        console.warn(`Mois inconnu: ${rawMonth}`);
        return frenchDateStr; // retorna original se não conseguir converter
    }

    return `${year}-${month}-${day}`;
}

/**
 * Converte data inglesa para formato ISO (YYYY-MM-DD)
 * @param {string} dateStr - Data em inglês (ex: "October 11, 2025 • 8:22 PM • Entertainment")
 * @returns {string} - Data no formato ISO (YYYY-MM-DD)
 */
function enDateToISO(dateStr) {
    const months = {
        'january': '01', 'jan': '01',
        'february': '02', 'feb': '02',
        'march': '03', 'mar': '03',
        'april': '04', 'apr': '04',
        'may': '05',
        'june': '06', 'jun': '06',
        'july': '07', 'jul': '07',
        'august': '08', 'aug': '08',
        'september': '09', 'sep': '09', 'sept': '09',
        'october': '10', 'oct': '10',
        'november': '11', 'nov': '11',
        'december': '12', 'dec': '12'
    };

    // Formato: "October 11, 2025 • 8:22 PM • Entertainment" ou "January 2, 2026 · 3:42 AM · Bills and Services"
    // Extrai apenas a parte da data, aceitando diferentes tipos de pontos separadores
    const datePart = dateStr.split(/[•·]/)[0].trim();

    // Parse: "October 11, 2025"
    const parts = datePart.split(/[\s,]+/).filter(p => p);
    if (parts.length !== 3) {
        console.warn('Formato de data inesperado:', dateStr);
        return dateStr;
    }

    const [monthStr, dayStr, yearStr] = parts;
    const month = months[monthStr.toLowerCase()] || '??';
    const day = dayStr.padStart(2, '0');
    const year = yearStr;

    if (month === '??') {
        console.warn('Mês desconhecido:', monthStr);
        return dateStr;
    }

    return `${year}-${month}-${day}`;
}

/**
 * Aplica regras de matching síncronas (já pré-carregadas)
 * @param {string} payee - Descrição original da transação
 * @param {Array} rules - Array de regras pré-carregadas
 * @param {Map} categoryIdToName - Map de categoryId para nome da categoria
 * @returns {Object} - { payee, category, memo, matched }
 */
function applyRulesSync(payee, rules, categoryIdToName = null) {
    for (const rule of rules) {
        if (!rule.enabled) continue;

        let matched = false;
        let capturedGroups = null;

        if (rule.isRegex) {
            try {
                const regex = new RegExp(rule.pattern, 'i');
                const match = payee.match(regex);
                if (match) {
                    matched = true;
                    capturedGroups = match;
                }
            } catch (e) {
                console.warn('Regex inválida:', rule.pattern, e);
            }
        } else {
            matched = payee.toLowerCase().includes(rule.pattern.toLowerCase());
        }

        if (matched) {
            let memo = '';

            // Se tiver memoTemplate e grupos capturados, substitui \1, \2, etc.
            if (rule.memoTemplate && capturedGroups) {
                memo = rule.memoTemplate;
                for (let i = 1; i < capturedGroups.length; i++) {
                    memo = memo.replace(new RegExp(`\\\\${i}`, 'g'), capturedGroups[i] || '');
                }
            }

            // Resolve categoryId para nome da categoria
            let category = '';
            if (rule.categoryId && categoryIdToName) {
                category = categoryIdToName.get(rule.categoryId) || '';
            }
            // Fallback para rule.category (compatibilidade com regras antigas)
            if (!category && rule.category) {
                category = rule.category;
            }

            return {
                payee: rule.replacement || payee,
                category: category,
                memo: memo,
                matched: true
            };
        }
    }

    return {
        payee: payee,
        category: '',
        memo: '',
        matched: false
    };
}

/**
 * Função genérica de conversão para CSV no formato YNAB
 * @param {Array} rows - Array de transações { date, payee, amount }
 * @param {string} accountId - ID da conta (ex: 'desjardins-bankaccount', 'koho-bankaccount')
 * @param {Function} dateParser - Função para converter data (ex: frDateToISO, enDateToISO)
 * @param {Function} amountParser - Função para processar o valor
 * @returns {Promise<string>} - CSV formatado
 */
async function toCsv(rows = [], accountId, dateParser, amountParser) {
    const header = ["Date", "Payee", "Category", "Memo", "Outflow", "Inflow"];

    // Pré-carrega regras e categorias UMA VEZ (async) antes do loop
    const hasStorage = typeof window !== 'undefined' && window.BudgetStorage;
    let rules = [];
    let categoryIdToName = null;

    if (hasStorage) {
        try {
            // Converte accountId para ID numérico da conta
            const account = getAccountByAccountId(accountId);
            if (!account) {
                console.warn('toCsv: Conta não encontrada para accountId:', accountId);
                return [header.join(",")].join("\n");
            }

            console.log('toCsv: accountId =', accountId, '-> account.id =', account.id, ', name =', account.name);
            rules = await window.BudgetStorage.getRulesForAccountId(account.id);
            console.log('toCsv: regras carregadas (incluindo globais) =', rules.length);

            // Carrega categorias e cria Map de categoryId -> nome
            const categories = await window.BudgetStorage.getCategories();
            categoryIdToName = new Map(categories.map(c => [c.id, c.name]));
            console.log('toCsv: categorias carregadas =', categories.length);
        } catch (e) {
            console.warn('Erro ao carregar regras:', e);
        }
    }

    // Agora o map é SÍNCRONO (sem async/await)
    const body = rows.map((r) => {
        // Parse da data usando função fornecida
        let date = r.date;
        try {
            date = dateParser(r.date);
        } catch (e) {
            console.warn('Erro ao converter data:', r.date, e);
        }

        let payee = r.payee || '';
        let category = '';
        let memo = '';

        // Aplica regras síncronas (já carregadas)
        if (rules.length > 0 && window.BankUtils?.applyRulesSync) {
            const result = window.BankUtils.applyRulesSync(payee, rules, categoryIdToName);
            if (result.matched) {
                payee = result.payee;
                category = result.category;
                memo = result.memo || `Original: ${r.payee}`;
            }
        }

        // Parse do valor usando função fornecida
        const { inflow, outflow } = amountParser(r.amount || '');

        return [date, payee, category, memo, outflow, inflow]
            .map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",");
    });

    return [header.join(","), ...body].join("\n");
}

/**
 * Parser de valor para formato Desjardins
 * Remove espaços, $, normaliza decimais (vírgula -> ponto)
 */
function parseDesjardinsAmount(amountRaw) {
    const amount = amountRaw
        .replace(/\s/g, '')
        .replace('$', '')
        .replace(/\./g, '')
        .replace(',', '.');

    const isInflow = amount.startsWith('+');
    const inflow = isInflow ? amount.replace(/[^\d.]/g, '') : '';
    const outflow = !isInflow ? amount.replace(/[^\d.]/g, '') : '';

    return { inflow, outflow };
}

/**
 * Parser de valor para formato Koho
 * Remove espaços, $, +
 */
function parseKohoAmount(amountRaw) {
    const isInflow = amountRaw.includes('+');

    const amount = amountRaw
        .replace(/\s/g, '')
        .replace(/\+/g, '')
        .replace(/\$/g, '')
        .replace(/,/g, '');

    const inflow = isInflow ? amount : '';
    const outflow = !isInflow ? amount : '';

    return { inflow, outflow };
}

// Exporta para o escopo global (disponível para background.js e content.js)
window.BankUtils = {
    // Configuração de contas
    ACCOUNTS,
    getAccountByAccountId,
    getAccountById,
    getAccountByName,
    getAllAccounts,

    // Funções principais
    detectBank,
    loadBankModule,
    applyRulesSync,
    frDateToISO,
    enDateToISO,
    toCsv,
    parseDesjardinsAmount,
    parseKohoAmount
};
