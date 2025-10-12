(function () {
    const table = document.querySelector("#transactionsTable");
    if (!table) return;

    const rows = [...table.querySelectorAll("tbody tr")].map(tr => {
        const tds = tr.querySelectorAll("td");
        return {
            date: tds[0]?.textContent.trim(),
            payee: tds[1]?.textContent.trim(),
            amount: tds[2]?.textContent.trim()
        };
    });

    // Envia pro background gerar/salvar CSV
    chrome.runtime.sendMessage({ type: "EXPORT_ROWS", rows });
})();
