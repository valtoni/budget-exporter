function toCsv(bankName, rows) {
    const header = ["date","payee","amount"];
    const body = rows.map(r => [r.date, r.payee, r.amount]
        .map(v => `"${(v||"").replace(/"/g,'""')}"`).join(","));
    return [header.join(","), ...body].join("\n");
}

// Lê o manifest.json
const manifest = chrome.runtime.getManifest();
// Fixa os sites suportados
const supportedPatterns = getSupportedSites();

// Extrai os padrões de URLs suportadas dos content_scripts
function getSupportedSites() {
    if (!manifest.content_scripts) {
        return [];
    }
    
    const sites = [];
    for (const script of manifest.content_scripts) {
        if (script.matches) {
            sites.push(...script.matches);
        }
    }
    return sites;
}

// Converte padrão de match para regex
function matchPatternToRegex(pattern) {
    // Escape de caracteres especiais, exceto * e ?
    let regex = pattern
        .replace(/[.+^${}()|[\]\\]/g, '\\$&')  // Escapa caracteres especiais
        .replace(/\*/g, '.*')                    // * vira .*
        .replace(/\?/g, '.');                    // ? vira .
    
    return new RegExp('^' + regex + '$', 'i');
}

// Verifica se a URL está nos sites suportados
function isSiteSupported(url) {
    for (const pattern of supportedPatterns) {
        const regex = matchPatternToRegex(pattern);
        if (regex.test(url)) {
            return true;
        }
    }
    return false;
}

// Extrai o nome do banco da URL
function getBankName(url) {
    try {
        const hostname = new URL(url).hostname.replace('www.', '');
        // Pega a primeira parte do domínio (ex: desjardins.com -> desjardins)
        return hostname.split('.')[0];
    } catch (e) {
        return null;
    }
}

// Carrega dinamicamente o conversor CSV do banco (estratégias + import dinâmico)
async function loadBankConverter(bankName) {
    if (!bankName) {
        throw new Error('Banco não informado.');
    }

    const normalize = (s) => String(s).toLowerCase().replace(/^www\./, '').replace(/[^a-z0-9]/g, '');
    const name = normalize(bankName);

    // Estratégias locais (por enquanto usam um conversor genérico padrão)
    // Caso você crie um arquivo específico por banco que exporte "toCsv",
    // o bloco de import dinâmico abaixo tentará carregá-lo primeiro.
    const aliases = {
        // Canadá
        desjardins: 'desjardins', dj: 'desjardins', desj: 'desjardins', desjardin: 'desjardins',
        koho: 'koho',
        bmo: 'bmo', bankofmontreal: 'bmo',
        rbc: 'rbc', royalbank: 'rbc', royalbankofcanada: 'rbc',
        td: 'td', tdbank: 'td', torontodominion: 'td',
        scotia: 'scotiabank', scotiabank: 'scotiabank',
        tangerine: 'tangerine',
        cibc: 'cibc',
        nbc: 'nbc', nationalbank: 'nbc', bnc: 'nbc',
        hsbc: 'hsbc',
        simplii: 'simplii',
        eqbank: 'eqbank', eq: 'eqbank',
    };

    const canonical = aliases[name] || name;

    // 1) Tenta carregar um módulo específico do banco se existir
    // Suporte a dois padrões de arquivo: tocsv-<bank>.js e tocsv<Bank>.js
    const camel = canonical.charAt(0).toUpperCase() + canonical.slice(1);
    const candidatePaths = [
        `./tocsv-${canonical}.js`,       // ex.: tocsv-desjardins.js
        `./tocsv${camel}.js`,           // ex.: tocsvDesjardins.js
        `./converters/tocsv-${canonical}.js`,
        `./converters/tocsv${camel}.js`,
    ];

    for (const p of candidatePaths) {
        try {
            const mod = await import(p);
            if (typeof mod?.toCsv === 'function') {
                return mod.toCsv;
            }
            if (typeof mod?.default === 'function') {
                return mod.default;
            }
            console.warn(`Módulo encontrado mas sem export toCsv: ${p}`);
        } catch (e) {
            // segue para próximo candidato
        }
    }

    // 2) Estratégias locais (fallback)
    const strategies = {
        desjardins: (rows) => toCsv('desjardins', rows),
        koho: (rows) => toCsv('koho', rows),
        bmo: (rows) => toCsv('bmo', rows),
        rbc: (rows) => toCsv('rbc', rows),
        td: (rows) => toCsv('td', rows),
        scotiabank: (rows) => toCsv('scotiabank', rows),
        tangerine: (rows) => toCsv('tangerine', rows),
        cibc: (rows) => toCsv('cibc', rows),
        nbc: (rows) => toCsv('nbc', rows),
        hsbc: (rows) => toCsv('hsbc', rows),
        simplii: (rows) => toCsv('simplii', rows),
        eqbank: (rows) => toCsv('eqbank', rows),
    };

    if (strategies[canonical]) {
        return strategies[canonical];
    }

    // 3) Último fallback: conversor genérico
    console.warn(`Conversor específico para '${bankName}' não encontrado. Usando conversor genérico.`);
    return (rows) => toCsv('generic', rows);
}

// Listener para habilitar o ícone na barra de endereços
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'ENABLE_PAGE_ACTION' && sender.tab) {
        chrome.pageAction.show(sender.tab.id);
        return;
    }

    if (msg.type === "EXPORT_ROWS" && Array.isArray(msg.rows)) {
        (async () => {
            const siteUrl = sender.url || sender.tab?.url || '';
            
            // Verifica se o site é suportado
            if (!isSiteSupported(siteUrl)) {
                const supportedSites = getSupportedSites();
                console.warn('Site não suportado:', siteUrl);
                sendResponse({ 
                    ok: false, 
                    error: `Este site não é suportado pela extensão.\n\nSites suportados:\n${supportedSites.join('\n')}`
                });
                return;
            }
            
            const bankName = getBankName(siteUrl);
            if (!bankName) {
                sendResponse({ ok: false, error: 'Não foi possível identificar o banco.' });
                return;
            }
            
            try {
                // Carrega o conversor específico do banco
                const toCsv = await loadBankConverter(bankName);
                const csv = toCsv(msg.rows);
                
                const blob = new Blob([csv], { type: "text/csv" });
                const url = URL.createObjectURL(blob);
                
                const downloadId = await chrome.downloads.download({
                    url,
                    filename: `${bankName.toUpperCase()}-EXPORT-${new Date().toISOString().slice(0,10)}.csv`,
                    saveAs: true
                });
                
                URL.revokeObjectURL(url);
                console.log('Download iniciado com ID:', downloadId);
                sendResponse({ ok: true, downloadId });
            } catch (error) {
                console.error('Erro ao processar exportação:', error);
                sendResponse({ ok: false, error: error.message });
            }
        })();
        
        return true;
    }
});

// Listener para quando usuário clicar no ícone na barra de endereços
chrome.pageAction.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, { type: 'EXTRACT_AND_EXPORT' });
});
