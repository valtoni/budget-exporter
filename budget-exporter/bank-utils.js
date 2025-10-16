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

// Exporta para o escopo global (disponível para background.js e content.js)
window.BankUtils = { detectBank, loadBankModule };
