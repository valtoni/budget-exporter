(() => {
    function toCSV(rows) {
        return rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    }

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
        const year = new Date().getFullYear(); // usa o ano atual

        if (month === '??') throw new Error(`Mois inconnu: ${rawMonth}`);

        return `${year}-${month}-${day}`;
    }

    const tables = Array.from(document.querySelectorAll('dsd-table.dsd-table.hydrated'));
    const transactions = [];

    tables.forEach(dsdTable => {
        const tbody = dsdTable.querySelector('tbody');
        if (!tbody) return;

        const rows = Array.from(tbody.querySelectorAll('tr'));

        rows.forEach(row => {
            const tds = row.querySelectorAll('td');
            if (tds.length < 3) return;

            const date = frDateToISO(tds[0].querySelector('.dsd-sr-only')?.innerText.trim()) || '';
            let description = '';

            // 1. descrição moderna (usada em faturas recentes)
            const spanDesc = tds[1]?.querySelector('.descriptionTransaction');
            if (spanDesc) {
                description = spanDesc.innerText.trim();
                // 2. fallback: td simples com class "description"
            } else if (tds[1]?.classList.contains('description')) {
                let tdDescription = tds[1];
                let divIconCol = tdDescription.querySelector('.iconCol');
                if (divIconCol == null) {
                    description = tds[1].innerText.trim();
                } else {
                    // Tenta pegar todos os spans dentro do <p>
                    const p = divIconCol.querySelector('p');
                    const spans = p?.querySelectorAll('span');
                    if (spans?.length >= 2) {
                        description = spans[1].innerText.trim(); // segundo span
                    } else {
                        description = p?.innerText.trim() || '';
                    }
                }
                // 3. último fallback: pegar o primeiro <span> não vazio dentro do td
            } else {
                const fallbackSpan = tds[1]?.querySelector('span');
                if (fallbackSpan && fallbackSpan.innerText.trim()) {
                    description = fallbackSpan.innerText.trim();
                }
            }

            const cellNumTds = [...tds].filter(td => td.classList.contains('dsd-cell-num'));
            const penultimateTd = cellNumTds.length >= 2 ? cellNumTds[cellNumTds.length - 2] : null;

            const amountRaw = penultimateTd?.innerText.trim() || '';


            const amount = amountRaw.replace(/\s/g, '').replace('$', '').replace(/\./g, '').replace(',', '.');
            const isInflow = amount.startsWith('+');
            const inflow = isInflow ? amount.replace(/[^\d.]/g, '') : '';
            const outflow = !isInflow ? amount.replace(/[^\d.]/g, '') : '';

            transactions.push([date, description, '', outflow, inflow]);
        });
    });

    if (transactions.length === 0) {
        console.warn('⚠️ Nenhuma transação encontrada!');
        return;
    }

    const csvContent = [['Date', 'Payee', 'Memo', 'Outflow', 'Inflow'], ...transactions];

    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    const filename = `cc-${timestamp}.csv`;

    const blob = new Blob([toCSV(csvContent)], { type: 'text/csv;charset=utf-8;' });
    // Disparo direto do download, sem precisar clicar em nada
    const link = URL.createObjectURL(blob);
    window.open(link);

    /*
        const now = new Date();
        const pad = n => String(n).padStart(2, '0');
        const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
        const filename = `cc-${timestamp}.csv`;

        const blob = new Blob([toCSV(csvContent)], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
    */

    /*const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extrato_ynab.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);*/
})();
