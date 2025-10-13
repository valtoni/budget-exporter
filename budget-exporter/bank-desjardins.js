// Desjardins - Seletores DOM e conversão CSV

// Seletores para extrair transações do DOM
// Desjardins usa <dsd-table> como componente web customizado
export const selectors = {
    table: 'dsd-table.dsd-table.hydrated',
    row: 'tbody tr',
    cells: {
        date: 0,      // coluna com data (dentro de .dsd-sr-only)
        payee: 1,     // coluna com descrição
        amount: -2    // penúltima célula com classe dsd-cell-num (valor negativo indica contagem reversa)
    }
};

// Converte data francesa para formato ISO (YYYY-MM-DD)
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

// Extrai descrição de diferentes formatos do DOM do Desjardins
function extractDescription(td) {
    if (!td) return '';

    // 1. Descrição moderna (usada em faturas recentes)
    const spanDesc = td.querySelector('.descriptionTransaction');
    if (spanDesc) {
        return spanDesc.innerText.trim();
    }

    // 2. Fallback: td simples com class "description"
    if (td.classList.contains('description')) {
        const divIconCol = td.querySelector('.iconCol');
        if (!divIconCol) {
            return td.innerText.trim();
        }

        // Tenta pegar todos os spans dentro do <p>
        const p = divIconCol.querySelector('p');
        const spans = p?.querySelectorAll('span');
        if (spans?.length >= 2) {
            return spans[1].innerText.trim(); // segundo span
        }
        return p?.innerText.trim() || '';
    }

    // 3. Último fallback: pegar o primeiro <span> não vazio dentro do td
    const fallbackSpan = td.querySelector('span');
    if (fallbackSpan && fallbackSpan.innerText.trim()) {
        return fallbackSpan.innerText.trim();
    }

    return td.innerText.trim();
}

// Função auxiliar síncrona para aplicar regras pré-carregadas
function applyRulesSync(payee, rules) {
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
                    capturedGroups = match; // Guarda os grupos capturados
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
                // Substitui \1, \2, \3, etc. pelos grupos capturados
                for (let i = 1; i < capturedGroups.length; i++) {
                    memo = memo.replace(new RegExp(`\\\\${i}`, 'g'), capturedGroups[i] || '');
                }
            }

            return {
                payee: rule.replacement || payee,
                category: rule.category || '',
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

// Função de conversão para CSV no formato YNAB
// Aplica regras de matching automaticamente
export async function toCsv(rows = []) {
    const header = ["Date", "Payee", "Category", "Memo", "Outflow", "Inflow"];

    // Pré-carrega regras UMA VEZ (async) antes do loop
    const hasStorage = typeof window !== 'undefined' && window.StorageManager;
    let rules = [];

    if (hasStorage) {
        try {
            rules = await window.StorageManager.getPayeeRules();
        } catch (e) {
            console.warn('Erro ao carregar regras:', e);
        }
    }

    // Agora o map é SÍNCRONO (sem async/await)
    const body = rows.map((r) => {
        // Parse da data francesa para ISO
        let date = r.date;
        try {
            date = frDateToISO(r.date);
        } catch (e) {
            console.warn('Erro ao converter data:', r.date, e);
        }

        let payee = r.payee || '';
        let category = '';
        let memo = '';

        // Aplica regras síncronas (já carregadas)
        if (rules.length > 0) {
            const result = applyRulesSync(payee, rules);
            if (result.matched) {
                payee = result.payee;
                category = result.category;
                memo = result.memo || `Original: ${r.payee}`;
            }
        }

        // Processa o valor: remove espaços, $, e normaliza decimais
        const amountRaw = r.amount || '';
        const amount = amountRaw
            .replace(/\s/g, '')
            .replace('$', '')
            .replace(/\./g, '')
            .replace(',', '.');

        const isInflow = amount.startsWith('+');
        const inflow = isInflow ? amount.replace(/[^\d.]/g, '') : '';
        const outflow = !isInflow ? amount.replace(/[^\d.]/g, '') : '';

        return [date, payee, category, memo, outflow, inflow]
            .map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",");
    });

    return [header.join(","), ...body].join("\n");
}

// Função customizada para extrair transações do DOM do Desjardins
export function extractTransactions() {
    const tables = Array.from(document.querySelectorAll('dsd-table-v3-1-0.dsd-mb-md.hydrated.dsd-table-host-v3-1-0.dsd-component'));
    const transactions = [];

    tables.forEach(dsdTable => {
        const tbody = dsdTable.querySelector('tbody');
        if (!tbody) return;

        const rows = Array.from(tbody.querySelectorAll('tr'));

        rows.forEach(row => {
            const tds = row.querySelectorAll('td');
            if (tds.length < 3) return;

            // Extrai data
            const dateText = tds[0].querySelector('.dsd-sr-only')?.innerText.trim() || tds[0].innerText.trim();

            // Extrai descrição usando função especializada
            const description = extractDescription(tds[1]);

            // Extrai valor da penúltima célula com classe dsd-cell-num
            const cellNumTds = [...tds].filter(td => td.classList.contains('dsd-cell-num'));
            const penultimateTd = cellNumTds.length >= 2 ? cellNumTds[cellNumTds.length - 2] : null;
            const amountRaw = penultimateTd?.innerText.trim() || '';

            if (dateText && description) {
                transactions.push({
                    date: dateText,
                    payee: description,
                    amount: amountRaw
                });
            }
        });
    });

    return transactions;
}

export default { selectors, toCsv, extractTransactions };
