// Popup script for Budget Exporter
const out = document.getElementById('out');
const btn = document.getElementById('ping');

function log(obj) {
  out.textContent = typeof obj === 'string' ? obj : JSON.stringify(obj, null, 2);
}

btn.addEventListener('click', async () => {
  try {
    const response = await chrome.runtime.sendMessage({ type: 'PING', from: 'popup' });
    log(response);
  } catch (e) {
    log({ error: e?.message || String(e) });
  }
});
