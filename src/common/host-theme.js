// Descobre em qual navegador esta tela está rodando e qual tema o sistema pede,
// e escreve os dois no <html>. src/common/tokens.css lê ambos.
//
// Importado pelos DOIS entrypoints (sidebar e manage) para que as duas
// superfícies da extensão tenham a mesma identidade — antes cada uma tinha o
// próprio :root e elas já haviam divergido.
//
// Deve rodar no topo do módulo, antes do DOMContentLoaded do controller, para
// que os atributos já estejam no <html> quando o CSS resolver as variáveis.

// Detecção pela API de extensão, não pelo user agent: o global `browser` só
// existe no Firefox, e é o mesmo sinal que storage-manager.js e background.js
// já usam para decidir entre promise e callback.
export function applyHostTheme() {
    document.documentElement.dataset.ua =
        (typeof browser !== 'undefined' && browser.runtime) ? 'firefox' : 'chromium';

    // O Web Awesome escolhe o tema por CLASSE (.wa-light / .wa-dark), não por
    // prefers-color-scheme. Sem esta ponte, os diálogos e botões dele ficariam
    // brancos dentro de uma tela escura — exatamente o contraste que denuncia
    // componente de terceiro colado numa UI de navegador.
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = (isDark) => {
        const root = document.documentElement.classList;
        root.toggle('wa-dark', isDark);
        root.toggle('wa-light', !isDark);
    };
    sync(darkQuery.matches);
    // O usuário pode trocar o tema com a tela aberta — ela acompanha.
    darkQuery.addEventListener('change', (event) => sync(event.matches));
}

applyHostTheme();
