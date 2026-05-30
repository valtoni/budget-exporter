// Desjardins — Conta Corrente — Extração via API JSON
//
// Esta strategy lê transações a partir das respostas JSON capturadas por
// transaction-capture.js, e não mais do DOM. Para configurar:
//
//   1. Logar no AccèsD e abrir a página /comptes/courant/...
//   2. No console, ativar o modo descoberta:
//        localStorage.setItem('BUDGET_EXPORTER_DEBUG', '1')
//   3. Recarregar a página (F5).
//   4. No console, identificar a linha [budget-exporter] cuja URL retorna
//      a lista de transações do extrato (provavelmente algum endpoint em
//      desjardins.com/services/... ou similar).
//   5. Preencher abaixo:
//        - apiMatchers[].urlPattern com regex casando essa URL
//        - extractFromCaptures(captures) mapeando para { date, payee, amount,
//          inferredYear }. O campo inferredYear pode ser derivado direto
//          dos campos de data da API (não precisa mais de regex do mês francês).

export const apiMatchers = [
    // TODO: substituir pelo regex real do endpoint do extrato corrente Desjardins.
];

export function extractFromCaptures(_captures) {
    throw new Error(
        'Desjardins (conta corrente): extractFromCaptures ainda nao implementado. '
        + 'Veja instrucoes em strategy-desjardins-bankaccount.js.'
    );
}

export async function toCsv(rows = []) {
    return window.BankUtils.toCsv(
        rows,
        'desjardins-bankaccount',
        window.BankUtils.frDateToISO,
        window.BankUtils.parseDesjardinsAmount
    );
}

export default { apiMatchers, extractFromCaptures, toCsv };
