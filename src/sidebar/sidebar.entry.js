// Web Awesome theme + selected components
import '@awesome.me/webawesome/dist/styles/themes/default.css';
import '@awesome.me/webawesome/dist/styles/webawesome.css';

import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/dialog/dialog.js';
import '@awesome.me/webawesome/dist/components/dropdown/dropdown.js';
import '@awesome.me/webawesome/dist/components/dropdown-item/dropdown-item.js';
import '@awesome.me/webawesome/dist/components/divider/divider.js';
import '@awesome.me/webawesome/dist/components/option/option.js';
import '@awesome.me/webawesome/dist/components/popover/popover.js';
import '@awesome.me/webawesome/dist/components/select/select.js';
import '@awesome.me/webawesome/dist/components/tab/tab.js';
import '@awesome.me/webawesome/dist/components/tab-group/tab-group.js';
import '@awesome.me/webawesome/dist/components/callout/callout.js';
import '@awesome.me/webawesome/dist/components/input/input.js';
import '@awesome.me/webawesome/dist/components/checkbox/checkbox.js';
import '@awesome.me/webawesome/dist/components/tooltip/tooltip.js';

// flatpickr (cutoff date trigger)
import flatpickr from 'flatpickr';
import { Portuguese } from 'flatpickr/dist/esm/l10n/pt.js';
import 'flatpickr/dist/flatpickr.min.css';

// Tom Select (rule dialog category combo with create:true)
import TomSelect from 'tom-select/dist/js/tom-select.complete.js';
import 'tom-select/dist/css/tom-select.css';

// Project components (Lit)
import './components/extract-grid.js';

// Local sidebar styles
import './sidebar.styles.css';

// Controller (orchestrator)
import './sidebar.controller.js';

// Expose for controller
window.__sidebarDeps = { flatpickr, Portuguese, TomSelect };
