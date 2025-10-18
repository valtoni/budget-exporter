// Filtro de conta
bindFilter('rule-account',  'account-dropdown');
// Filtro de categoria
bindFilter('rule-category', 'category-dropdown');

/**
 * Liga input + dropdown (+ botão opcional) resolvendo por ID.
 * @param {string} inputId    - ID do input (sem #)
 * @param {string} dropdownId - ID do dropdown (sem #)
 * @param {string} [buttonId] - ID do botão (opcional). Se ausente, usa nextElementSibling do input.
 */
function bindFilter(inputId, dropdownId, buttonId) {
    const $input = document.getElementById(inputId);
    const $drop  = document.getElementById(dropdownId);
    const $btn   = buttonId
        ? document.getElementById(buttonId)
        : ($input ? $input.nextElementSibling : null);

    if (!$input || !$drop) {
        console.warn('bindFilter: elemento não encontrado', { inputId, dropdownId, buttonId });
        return;
    }

    const run = () => filterDropdown($input.value, $drop);

    // Impede fechar dropdown ao clicar no input
    $input.addEventListener('click', (e) => e.stopPropagation());
    // Filtra enquanto digita
    $input.addEventListener('input', run);
    // Ao focar, aplica o filtro atual
    $input.addEventListener('focus', run);
    // Botão (se existir) faz a mesma ação e não propaga
    if ($btn) {
        $btn.addEventListener('click', (e) => {
            e.stopPropagation();
            run();
        });
    }
}

function filterDropdown(searchTerm, dropdown) {
    const items = dropdown.querySelectorAll('.dropdown-item');
    const q = (searchTerm || '').toLowerCase();
    items.forEach(item => {
        const li = item.closest('li') || item; // fallback se não tiver <li>
        li.style.display = item.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
}

// Debounce p/ não filtrar a cada keypress loucamente
function debounce(fn, ms = 120) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), ms);
    };
}