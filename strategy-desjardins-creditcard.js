// Desjardins — Cartão de Crédito — Extração via API JSON
//
// Esta strategy lê transações a partir das respostas JSON capturadas por
// transaction-capture.js, e não mais do DOM. Para configurar:
//
//   1. Logar no AccèsD e abrir a página /sommaire-perso/sommaire/sommaire-spa/CC/...
//   2. No console, ativar o modo descoberta:
//        localStorage.setItem('BUDGET_EXPORTER_DEBUG', '1')
//   3. Recarregar a página (F5).
//   4. No console, identificar a linha [budget-exporter] cuja URL retorna
//      a lista de transações do cartão (provavelmente um endpoint distinto
//      do extrato corrente — pode haver "card" ou "credit" na URL).
//   5. Preencher abaixo:
//        - apiMatchers[].urlPattern com regex casando essa URL
//        - extractFromCaptures(captures) mapeando para { date, payee, amount,
//          inferredYear }. Diferença vs conta corrente: o valor "cobrado" no
//          cartão geralmente vem como positivo; verifique a convenção de sinal
//          do JSON para preencher inflow/outflow corretamente em parseDesjardinsAmount.

export const apiMatchers = [
    // TODO: substituir pelo regex real do endpoint do extrato de cartão Desjardins.
];

export function extractFromCaptures(_captures) {
    throw new Error(
        'Desjardins (cartao de credito): extractFromCaptures ainda nao implementado. '
        + 'Veja instrucoes em strategy-desjardins-creditcard.js.'
    );
}

export async function toCsv(rows = []) {
    return window.BankUtils.toCsv(
        rows,
        'desjardins-creditcard',
        window.BankUtils.frDateToISO,
        window.BankUtils.parseDesjardinsAmount
    );
}

export default { apiMatchers, extractFromCaptures, toCsv };
