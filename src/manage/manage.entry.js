// Web Awesome theme + selected components
import '@awesome.me/webawesome/dist/styles/themes/default.css';
import '@awesome.me/webawesome/dist/styles/webawesome.css';

import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/select/select.js';
import '@awesome.me/webawesome/dist/components/option/option.js';
import '@awesome.me/webawesome/dist/components/dialog/dialog.js';
import '@awesome.me/webawesome/dist/components/divider/divider.js';
import '@awesome.me/webawesome/dist/components/callout/callout.js';
import '@awesome.me/webawesome/dist/components/input/input.js';
import '@awesome.me/webawesome/dist/components/checkbox/checkbox.js';
import '@awesome.me/webawesome/dist/components/tooltip/tooltip.js';

// Tom Select for searchable comboboxes (account + category in rule form)
import TomSelect from 'tom-select/dist/js/tom-select.complete.js';
import 'tom-select/dist/css/tom-select.css';

// Lit components
import './components/manage-rules-table.js';
import './components/chip-list.js';

// Local styles
import './manage.styles.css';

// Controller
import './manage.controller.js';

// Expose for controller
window.__manageDeps = { TomSelect };
