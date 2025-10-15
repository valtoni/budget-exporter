// Koho - Seletores DOM e conversão CSV

// Seletores para extrair transações do DOM
// Koho usa divs com classes Tailwind específicas
export const selectors = {
    container: 'div.flex.flex-col.p-0.md\\:px-24.md\\:pb-24',
    row: 'div.flex.items-center.justify-between.border-b.border-grey-200.py-8'
};

// Converte data em inglês para formato ISO (YYYY-MM-DD)
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

    // Formato: "October 11, 2025 • 8:22 PM • Entertainment"
    // Extrai apenas a parte da data
    const datePart = dateStr.split('•')[0].trim();

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
export async function toCsv(rows = []) {
    const header = ["Date", "Payee", "Category", "Memo", "Outflow", "Inflow"];

    // Pré-carrega regras UMA VEZ (async) antes do loop
    const hasStorage = typeof window !== 'undefined' && window.StorageManager;
    let rules = [];

    if (hasStorage) {
        try {
            // Obtém regras do banco 'koho' + regras do banco coringa (id: 0)
            rules = await window.StorageManager.getRulesForBank('koho');
        } catch (e) {
            console.warn('Erro ao carregar regras:', e);
        }
    }

    // Agora o map é SÍNCRONO (sem async/await)
    const body = rows.map((r) => {
        // Parse da data inglesa para ISO
        let date = r.date;
        try {
            date = enDateToISO(r.date);
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

        // Processa o valor: remove espaços, $, +, e mantém sinal
        const amountRaw = r.amount || '';
        const isInflow = amountRaw.includes('+');

        // Remove + e $, mantém números e ponto decimal
        const amount = amountRaw
            .replace(/\s/g, '')
            .replace(/\+/g, '')
            .replace(/\$/g, '');

        const inflow = isInflow ? amount : '';
        const outflow = !isInflow ? amount : '';

        return [date, payee, category, memo, outflow, inflow]
            .map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",");
    });

    return [header.join(","), ...body].join("\n");
}

// Função customizada para extrair transações do DOM do Koho
export function extractTransactions() {
    const transactions = [];

    // Seleciona todas as linhas de transação
    const rows = document.querySelectorAll('div.flex.items-center.justify-between.border-b.border-grey-200.py-8');

    rows.forEach(row => {
        // Extrai payee (descrição) - primeiro <p> dentro do segundo div
        const payeeElement = row.querySelector('div.ml-16.flex.flex-col p.font-basel-grotesk.text-base');
        const payee = payeeElement ? payeeElement.innerText.trim() : '';

        // Extrai data e categoria - segundo <p>
        const dateElement = row.querySelector('div.ml-16.flex.flex-col p.m-0.p-0.font-basel-grotesk.text-sm');
        const dateText = dateElement ? dateElement.innerText.trim() : '';

        // Extrai valor - último <span> da linha
        const amountElement = row.querySelector('span.font-basel-grotesk.text-base\\/\\[18px\\].font-semibold');
        const amount = amountElement ? amountElement.innerText.trim() : '';

        if (payee && dateText && amount) {
            transactions.push({
                date: dateText,
                payee: payee,
                amount: amount
            });
        }
    });

    return transactions;
}

export default { selectors, toCsv, extractTransactions };
