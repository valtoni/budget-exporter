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
        return hostname.split('.')[0].toUpperCase();
    } catch (e) {
        return 'BANK';
    }
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "EXPORT_ROWS" && Array.isArray(msg.rows)) {
        const siteUrl = sender.url || sender.tab?.url || '';
        
        // Verifica se o site é suportado
        if (!isSiteSupported(siteUrl)) {
            const supportedSites = getSupportedSites();
            console.warn('Site não suportado:', siteUrl);
            sendResponse({ 
                ok: false, 
                error: `Este site não é suportado pela extensão.\n\nSites suportados:\n${supportedSites.join('\n')}`
            });
            return false;
        }
        
        const bankName = getBankName(siteUrl);
        const csv = toCsv(bankName, msg.rows);
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        
        chrome.downloads.download({
            url,
            filename: `${bankName}-EXPORT-${new Date().toISOString().slice(0,10)}.csv`,
            saveAs: true
        })
        .then((downloadId) => {
            console.log('Download iniciado com ID:', downloadId);
            sendResponse({ ok: true, downloadId });
        })
        .catch((error) => {
            console.error('Erro ao iniciar download:', error);
            sendResponse({ ok: false, error: error.message });
        })
        .finally(() => {
            URL.revokeObjectURL(url);
        });
        
        return true;
    }
});
