// ==== Search (DRY) ==========================================================
function initSearch({
                        buttonSel = '.DocSearch-Button',
                        inputSel  = '#search-input',
                        tableSel  = '#rules-list tbody',
                        minChars  = 3,
                        clsHidden = 'd-none',
                        clsInvalid = 'search-invalid',
                        blurHideDelay = 200
                    } = {}) {
    const $btn  = document.querySelector(buttonSel);
    const $in   = document.querySelector(inputSel);
    const $tbody= document.querySelector(tableSel);
    if (!$btn || !$in || !$tbody) return;

    let term = '';

    const rows = Array.from($tbody.querySelectorAll('tr'));
    // cache do texto de cada linha (evita recomputar a cada digitação)
    const rowText = new WeakMap();
    const getText = (tr) => {
        let t = rowText.get(tr);
        if (!t) {
            // pega o conteúdo dos <td> em minúsculas
            t = Array.from(tr.querySelectorAll('td')).map(td => td.textContent.toLowerCase()).join(' ');
            rowText.set(tr, t);
        }
        return t;
    };

    const showAll = () => rows.forEach(tr => tr.style.display = '');
    const applyFilter = (q) => {
        if (!q) { showAll(); return; }
        for (const tr of rows) {
            tr.style.display = getText(tr).includes(q) ? '' : 'none';
        }
    };

    // debounce simples
    const debounce = (fn, ms=120) => {
        let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
    };

    const openSearch = () => {
        $btn.classList.add(clsHidden);
        $in.classList.remove(clsHidden);
        $in.focus();
    };
    const closeSearch = () => {
        $btn.classList.remove(clsHidden);
        $in.classList.add(clsHidden);
        term = '';
        $in.value = '';
        $in.classList.remove(clsInvalid);
        showAll();
    };
    const toggleSearch = () => ($in.classList.contains(clsHidden) ? openSearch() : closeSearch());

    // eventos
    $btn.addEventListener('click', toggleSearch);

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            toggleSearch();
        }
    });

    const onInput = debounce(() => {
        term = ($in.value || '').toLowerCase();
        const len = term.length;

        // validação visual
        if (len === 0 || len >= minChars) $in.classList.remove(clsInvalid);
        else                               $in.classList.add(clsInvalid);

        // aplica regra
        if (len >= minChars) applyFilter(term);
        else if (len === 0)  showAll();
    }, 90);

    $in.addEventListener('input', onInput);

    $in.addEventListener('blur', () => {
        if (!term) setTimeout(closeSearch, blurHideDelay);
    });

    // retorna helpers se quiser usar fora
    return { openSearch, closeSearch, applyFilter };
}
// ==== /Search ===============================================================

// Uso (duas linhas e já era):
initSearch({
    buttonSel: '.DocSearch-Button',
    inputSel:  '#search-input',
    tableSel:  '#rules-list tbody',
    minChars:  3
});
// Ex.: search.openSearch();
