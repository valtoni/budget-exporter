// Shared bank/account helpers and deterministic normalization logic.
var BudgetExporterRoot = typeof globalThis !== 'undefined' ? globalThis : self;

const BANK_ALIASES = {
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
    eq: 'eqbank'
};

const ACCOUNTS = {
    WILDCARD: { id: 0, accountId: 'all', name: 'all', displayName: 'Todas as contas' },
    DESJARDINS_CREDITCARD: { id: 1, accountId: 'desjardins-creditcard', name: 'Desjardins - Credit Card', displayName: 'Desjardins - Credit Card' },
    DESJARDINS_BANKACCOUNT: { id: 2, accountId: 'desjardins-bankaccount', name: 'Desjardins - Bank Account', displayName: 'Desjardins - Bank Account' },
    KOHO_BANKACCOUNT: { id: 3, accountId: 'koho-bankaccount', name: 'Koho - Prepaid Card', displayName: 'Koho - Prepaid Card' }
};

const ACCOUNT_PROCESSING = {
    'desjardins-bankaccount': { dateParser: frDateToISO, amountParser: parseDesjardinsAmount },
    'desjardins-creditcard': { dateParser: frDateToISO, amountParser: parseDesjardinsAmount },
    'koho-bankaccount': { dateParser: enDateToISO, amountParser: parseKohoAmount }
};

const SUGGESTION_NOISE_WORDS = new Set([
    'ACH', 'AUTH', 'AUTORISATION', 'CARD', 'CARTE', 'CREDIT', 'DEBIT', 'DESJARDINS',
    'INTERAC', 'ONLINE', 'PAYMENT', 'PAIEMENT', 'POS', 'PREAUTH', 'PREAUTORISATION',
    'PURCHASE', 'REF', 'REFERENCE', 'TRANSIT', 'VISA'
]);
const MIN_SUGGESTION_SIGNATURE_LENGTH = 4;

function getAccountByAccountId(accountId) {
    return Object.values(ACCOUNTS).find((acc) => acc.accountId === accountId) || null;
}

function getAccountById(id) {
    return Object.values(ACCOUNTS).find((acc) => acc.id === id) || null;
}

function getAccountByName(name) {
    return Object.values(ACCOUNTS).find((acc) => acc.name === name) || null;
}

function getAllAccounts() {
    return Object.values(ACCOUNTS).filter((acc) => acc.id !== 0);
}

function extractDomainName(parts) {
    let domainName;
    if (parts.length >= 3 && (parts[parts.length - 2] === 'co' || parts[parts.length - 2] === 'com')) {
        domainName = parts[parts.length - 3];
    } else if (parts.length >= 2) {
        domainName = parts[parts.length - 2];
    } else {
        domainName = parts[0];
    }

    return domainName.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function detectBank(url) {
    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.replace('www.', '');
        const pathname = urlObj.pathname;
        const normalized = extractDomainName(hostname.split('.'));
        const bankName = BANK_ALIASES[normalized];

        if (!bankName) return null;

        if (bankName === 'desjardins') {
            if (pathname.includes('/comptes/courant/')) return 'desjardins-bankaccount';
            if (pathname.includes('/sommaire-perso/sommaire/sommaire-spa/CC/')) return 'desjardins-creditcard';
            return 'desjardins-bankaccount';
        }

        if (bankName === 'koho') return 'koho-bankaccount';
        return bankName;
    } catch (e) {
        const normalized = extractDomainName(String(url).replace('www.', '').split('.'));
        return BANK_ALIASES[normalized] || null;
    }
}

async function loadBankModule(accountName) {
    if (!accountName) {
        throw new Error('Nome da conta nao informado');
    }

    const runtime = BudgetExporterRoot.browser?.runtime || BudgetExporterRoot.chrome?.runtime;
    if (!runtime?.getURL) {
        throw new Error('runtime.getURL indisponivel');
    }

    return import(runtime.getURL(`strategy-${accountName}.js`));
}

function frDateToISO(frenchDateStr, row = null) {
    const months = {
        janvier: '01', janv: '01', jan: '01',
        fevrier: '02', fev: '02',
        mars: '03',
        avril: '04', avr: '04',
        mai: '05',
        juin: '06', jun: '06',
        juillet: '07', juil: '07', jul: '07',
        aout: '08',
        septembre: '09', sept: '09', sep: '09',
        octobre: '10', oct: '10',
        novembre: '11', nov: '11',
        decembre: '12', dec: '12'
    };

    const normalized = stripDiacritics(String(frenchDateStr || '').trim().toLowerCase());
    const [dayStr, rawMonth, explicitYear] = normalized.split(/\s+/);
    const day = String(dayStr || '').padStart(2, '0');
    const month = months[rawMonth] || '??';
    const inferredYear = String(row?.inferredYear || '').trim();
    const year = /^\d{4}$/.test(explicitYear || '')
        ? explicitYear
        : (/^\d{4}$/.test(inferredYear) ? inferredYear : String(new Date().getFullYear()));

    if (month === '??') return frenchDateStr;
    return `${year}-${month}-${day}`;
}

function enDateToISO(dateStr) {
    const months = {
        january: '01', jan: '01', february: '02', feb: '02', march: '03', mar: '03',
        april: '04', apr: '04', may: '05', june: '06', jun: '06', july: '07', jul: '07',
        august: '08', aug: '08', september: '09', sep: '09', sept: '09', october: '10',
        oct: '10', november: '11', nov: '11', december: '12', dec: '12'
    };

    const datePart = String(dateStr || '').split(/[•·]/)[0].trim();
    const parts = datePart.split(/[\s,]+/).filter(Boolean);
    if (parts.length !== 3) return dateStr;

    const [monthStr, dayStr, yearStr] = parts;
    const month = months[String(monthStr).toLowerCase()] || '??';
    const day = String(dayStr).padStart(2, '0');
    if (month === '??') return dateStr;

    return `${yearStr}-${month}-${day}`;
}

function parseDesjardinsAmount(amountRaw) {
    const amount = String(amountRaw || '')
        .replace(/\s/g, '')
        .replace('$', '')
        .replace(/\./g, '')
        .replace(',', '.');

    const isInflow = amount.startsWith('+');
    return {
        inflow: isInflow ? amount.replace(/[^\d.]/g, '') : '',
        outflow: !isInflow ? amount.replace(/[^\d.]/g, '') : ''
    };
}

function parseKohoAmount(amountRaw) {
    const isInflow = String(amountRaw || '').includes('+');
    const amount = String(amountRaw || '')
        .replace(/\s/g, '')
        .replace(/\+/g, '')
        .replace(/\$/g, '')
        .replace(/,/g, '');

    return {
        inflow: isInflow ? amount : '',
        outflow: !isInflow ? amount : ''
    };
}

function applyRulesSync(payee, rules, categoryIdToName = null) {
    for (const rule of rules) {
        if (!rule?.enabled) continue;

        let matched = false;
        let capturedGroups = null;

        if (rule.isRegex) {
            try {
                const regex = new RegExp(rule.pattern, 'i');
                const match = String(payee || '').match(regex);
                if (match) {
                    matched = true;
                    capturedGroups = match;
                }
            } catch (e) {
                console.warn('Regex invalida:', rule.pattern, e);
            }
        } else {
            matched = String(payee || '').toLowerCase().includes(String(rule.pattern || '').toLowerCase());
        }

        if (!matched) continue;

        let memo = '';
        if (rule.memoTemplate && capturedGroups) {
            memo = rule.memoTemplate;
            for (let i = 1; i < capturedGroups.length; i += 1) {
                memo = memo.replace(new RegExp(`\\\\${i}`, 'g'), capturedGroups[i] || '');
            }
        }

        let category = '';
        if (rule.categoryId && categoryIdToName) {
            category = categoryIdToName.get(rule.categoryId) || '';
        }
        if (!category && rule.category) {
            category = rule.category;
        }

        return {
            payee: rule.replacement || payee,
            category,
            memo,
            matched: true,
            ruleId: rule.id,
            matchedPattern: rule.pattern || '',
            isRegex: !!rule.isRegex
        };
    }

    return {
        payee,
        category: '',
        memo: '',
        matched: false,
        ruleId: null,
        matchedPattern: '',
        isRegex: false
    };
}

function stripDiacritics(value) {
    return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function normalizeSuggestionText(payee) {
    const cleaned = stripDiacritics(payee)
        .toUpperCase()
        .replace(/\b\d{4,}\b/g, ' ')
        .replace(/\b\d+\b/g, ' ')
        .replace(/[\*#/:._-]+/g, ' ')
        .replace(/[^A-Z\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    return cleaned
        .split(' ')
        .filter((token) => token && !SUGGESTION_NOISE_WORDS.has(token))
        .join(' ')
        .trim();
}

function normalizeRulePattern(pattern, isRegex) {
    if (!pattern) return '';
    if (isRegex) {
        return '';
    }
    return normalizeSuggestionText(pattern);
}

function isSuggestionCandidateSignature(signature) {
    if (!signature || signature.length < MIN_SUGGESTION_SIGNATURE_LENGTH) {
        return false;
    }

    const tokens = signature.split(' ').filter(Boolean);
    if (tokens.length === 0) {
        return false;
    }

    return tokens.some((token) => token.length >= 3);
}

function toTitleCase(value) {
    return String(value || '')
        .toLowerCase()
        .split(' ')
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}

function buildSuggestedReplacement(signature, samplePayee) {
    const sampleClean = stripDiacritics(samplePayee)
        .replace(/\b\d{4,}\b/g, ' ')
        .replace(/[\*#/:._-]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    if (sampleClean.length >= 3 && sampleClean.length <= 32) {
        return toTitleCase(sampleClean);
    }

    return toTitleCase(signature);
}

function buildSuggestionHistoryKey(accountId, signature) {
    return `${accountId}::${signature}`;
}

function findSuggestedCategory(signature, rules, categoryIdToName) {
    for (const rule of rules) {
        if (!rule?.enabled) continue;
        const normalizedPattern = normalizeRulePattern(rule.pattern, rule.isRegex);
        if (!normalizedPattern) continue;

        if (normalizedPattern === signature || normalizedPattern.includes(signature) || signature.includes(normalizedPattern)) {
            if (rule.categoryId && categoryIdToName?.has(rule.categoryId)) {
                return {
                    category: categoryIdToName.get(rule.categoryId) || '',
                    categoryId: rule.categoryId || ''
                };
            }

            if (rule.category) {
                return {
                    category: rule.category,
                    categoryId: rule.categoryId || ''
                };
            }
        }
    }

    return { category: '', categoryId: '' };
}

function getProcessingConfig(accountId) {
    return ACCOUNT_PROCESSING[accountId] || null;
}

async function buildReviewState(accountId, rows = []) {
    const account = getAccountByAccountId(accountId);
    const processing = getProcessingConfig(accountId);
    if (!account || !processing) {
        throw new Error('Conta sem configuracao de processamento');
    }
    if (!BudgetExporterRoot.BudgetStorage) {
        throw new Error('StorageManager indisponivel');
    }

    const [rules, categories] = await Promise.all([
        BudgetExporterRoot.BudgetStorage.getRulesForAccountId(account.id),
        BudgetExporterRoot.BudgetStorage.getCategories()
    ]);
    const categoryIdToName = new Map(categories.map((category) => [category.id, category.name]));
    const suggestionHistory = await BudgetExporterRoot.BudgetStorage.getSuggestionHistory();
    const normalizedRulePatterns = new Set(
        rules
            .map((rule) => normalizeRulePattern(rule?.pattern, rule?.isRegex))
            .filter(Boolean)
    );
    const groupedUnmatched = new Map();

    const transactions = rows.map((row, index) => {
        const parsedDate = processing.dateParser(row.date || '', row);
        const parsedAmount = processing.amountParser(row.amount || '');
        const ruleResult = applyRulesSync(row.payee || '', rules, categoryIdToName);
        const canonicalPayee = normalizeSuggestionText(row.payee || '');
        const transaction = {
            id: `tx-${Date.now()}-${index}`,
            rawIndex: index,
            accountId: account.id,
            accountName: account.displayName,
            bankAccountId: account.accountId,
            dateRaw: row.date || '',
            dateIso: parsedDate,
            amountRaw: row.amount || '',
            inflow: parsedAmount.inflow || '',
            outflow: parsedAmount.outflow || '',
            payeeRaw: row.payee || '',
            payeeNormalized: canonicalPayee,
            payeeFinal: ruleResult.payee || row.payee || '',
            categorySuggested: ruleResult.category || '',
            categoryFinal: ruleResult.category || '',
            memoSuggested: ruleResult.memo || '',
            memoFinal: ruleResult.memo || '',
            matchedRuleId: ruleResult.ruleId,
            matchReason: ruleResult.matched ? `${ruleResult.isRegex ? 'Regex' : 'Texto'}: ${ruleResult.matchedPattern}` : '',
            matchStatus: ruleResult.matched ? 'matched' : 'unmatched',
            suggestionKey: canonicalPayee || '',
            suggestedRuleDraft: null,
            selected: true
        };

        if (!ruleResult.matched && isSuggestionCandidateSignature(canonicalPayee)) {
            if (!groupedUnmatched.has(canonicalPayee)) {
                groupedUnmatched.set(canonicalPayee, []);
            }
            groupedUnmatched.get(canonicalPayee).push(transaction);
        }

        return transaction;
    });

    const observations = [];
    groupedUnmatched.forEach((items, suggestionKey) => {
        observations.push({
            key: buildSuggestionHistoryKey(account.accountId, suggestionKey),
            accountId: account.accountId,
            count: items.length,
            samplePayee: items[0]?.payeeRaw || ''
        });
    });
    const updatedHistory = observations.length > 0
        ? await BudgetExporterRoot.BudgetStorage.recordSuggestionObservations(observations)
        : suggestionHistory;

    const suggestions = [];
    groupedUnmatched.forEach((items, suggestionKey) => {
        if (normalizedRulePatterns.has(suggestionKey)) {
            return;
        }

        const historyKey = buildSuggestionHistoryKey(account.accountId, suggestionKey);
        const historyEntry = updatedHistory[historyKey] || suggestionHistory[historyKey] || null;
        const historicalCount = Number(historyEntry?.count || 0);
        const currentCount = items.length;
        const shouldSuggest = currentCount >= 2 || historicalCount >= 3;

        if (!shouldSuggest) {
            return;
        }

        const sample = items[0];
        const suggestedCategory = findSuggestedCategory(suggestionKey, rules, categoryIdToName);
        const draft = {
            accountId: sample.accountId,
            bankAccountId: sample.bankAccountId,
            accountName: sample.accountName,
            pattern: suggestionKey,
            replacement: buildSuggestedReplacement(suggestionKey, sample.payeeRaw),
            category: suggestedCategory.category,
            categoryId: suggestedCategory.categoryId,
            memoTemplate: '',
            isRegex: false
        };

        suggestions.push({
            suggestionKey,
            accountId: sample.accountId,
            accountName: sample.accountName,
            canonicalPattern: suggestionKey,
            samplePayee: sample.payeeRaw,
            occurrenceCount: currentCount,
            historicalCount,
            draftReplacement: draft.replacement,
            draftCategory: draft.category,
            sourceTransactionIds: items.map((item) => item.id),
            evidenceLabel: currentCount >= 2
                ? `${currentCount} ocorrencias nesta pagina`
                : `${historicalCount} ocorrencias acumuladas`,
            draft
        });

        for (const item of items) {
            item.matchStatus = 'suggested';
            item.suggestedRuleDraft = { ...draft };
            item.matchReason = currentCount >= 2
                ? `${currentCount} ocorrencias sem regra na pagina`
                : `${historicalCount} ocorrencias sem regra no historico local`;
        }
    });

    suggestions.sort((left, right) => {
        const scoreLeft = Math.max(left.occurrenceCount, left.historicalCount || 0);
        const scoreRight = Math.max(right.occurrenceCount, right.historicalCount || 0);
        return scoreRight - scoreLeft;
    });

    const summary = transactions.reduce((acc, tx) => {
        acc.total += 1;
        acc.selected += tx.selected ? 1 : 0;
        acc[tx.matchStatus] += 1;
        return acc;
    }, { total: 0, selected: 0, matched: 0, suggested: 0, unmatched: 0 });

    return {
        generatedAt: new Date().toISOString(),
        account: {
            id: account.id,
            accountId: account.accountId,
            name: account.name,
            displayName: account.displayName
        },
        rowsCount: rows.length,
        transactions,
        suggestions,
        summary
    };
}

function transactionsToCsv(transactions = []) {
    const header = ['Date', 'Payee', 'Category', 'Memo', 'Outflow', 'Inflow'];
    const body = transactions
        .filter((tx) => tx && tx.selected !== false)
        .map((tx) => [
            tx.dateIso || tx.dateRaw || '',
            tx.payeeFinal || tx.payeeRaw || '',
            tx.categoryFinal || '',
            tx.memoFinal || '',
            tx.outflow || '',
            tx.inflow || ''
        ].map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','));

    return [header.join(','), ...body].join('\n');
}

async function toCsv(rows = [], accountId, dateParser, amountParser) {
    const account = getAccountByAccountId(accountId);
    if (!account) {
        throw new Error(`Conta nao encontrada para ${accountId}`);
    }

    const rules = BudgetExporterRoot.BudgetStorage ? await BudgetExporterRoot.BudgetStorage.getRulesForAccountId(account.id) : [];
    const categories = BudgetExporterRoot.BudgetStorage ? await BudgetExporterRoot.BudgetStorage.getCategories() : [];
    const categoryIdToName = new Map(categories.map((category) => [category.id, category.name]));

    const transactions = rows.map((row) => {
        const parsedDate = dateParser(row.date || '', row);
        const parsedAmount = amountParser(row.amount || '');
        const ruleResult = applyRulesSync(row.payee || '', rules, categoryIdToName);

        return {
            dateIso: parsedDate,
            payeeFinal: ruleResult.payee || row.payee || '',
            categoryFinal: ruleResult.category || '',
            memoFinal: ruleResult.memo || (ruleResult.matched ? `Original: ${row.payee || ''}` : ''),
            outflow: parsedAmount.outflow || '',
            inflow: parsedAmount.inflow || '',
            selected: true
        };
    });

    return transactionsToCsv(transactions);
}

BudgetExporterRoot.BankUtils = {
    ACCOUNTS,
    getAccountByAccountId,
    getAccountById,
    getAccountByName,
    getAllAccounts,
    detectBank,
    loadBankModule,
    applyRulesSync,
    buildReviewState,
    transactionsToCsv,
    normalizeSuggestionText,
    buildSuggestedReplacement,
    frDateToISO,
    enDateToISO,
    toCsv,
    parseDesjardinsAmount,
    parseKohoAmount
};
