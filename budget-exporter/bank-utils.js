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
 * Detecta o banco a partir de uma URL
 * @param {string} url - URL completa ou hostname
 * @returns {string|null} - Nome canônico do banco ou null
 */
function detectBank(url) {
    try {
        const hostname = new URL(url).hostname.replace('www.', '');
        // Extrai o domínio principal (ex: desjardins.com, koho.ca, rbc.co.uk)
        // Estratégia: pega as últimas 2 partes para .com/.ca ou últimas 3 para .co.uk/.com.br
        const parts = hostname.split('.');
        let normalized = extractDomainName(parts);
        return BANK_ALIASES[normalized] || null;
    } catch (e) {
        // Se não for URL completa, tenta extrair do hostname direto
        const parts = String(url).replace('www.', '').split('.');
        let normalized = extractDomainName(parts);
        return BANK_ALIASES[normalized] || null;
    }
}

/**
 * Carrega dinamicamente o módulo do banco
 * @param {string} bankName - Nome canônico do banco
 * @returns {Promise<Object>} - Módulo do banco com selectors e toCsv
 */
async function loadBankModule(bankName) {
    if (!bankName) {
        throw new Error('Nome do banco não informado');
    }

    const modulePath = chrome.runtime.getURL(`bank-${bankName}.js`);

    try {
        const module = await import(modulePath);
        return module;
    } catch (error) {
        throw new Error(`Módulo do banco '${bankName}' não encontrado: ${modulePath}`);
    }
}

// Exporta para o escopo global (disponível para background.js e content.js)
window.BankUtils = { detectBank, loadBankModule };
