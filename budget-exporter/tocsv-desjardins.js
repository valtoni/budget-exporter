// Desjardins CSV converter
// Exporta uma função `toCsv(rows)` usada pelo background.js

export function toCsv(rows = []) {
  const header = ["date", "payee", "amount"];

  const sanitize = (v) => String(v ?? "").replace(/[\r\n]/g, " ").trim();

  const body = rows.map((r) => {
    const date = sanitize(r.date);
    const payee = sanitize(r.payee);
    // Desjardins costuma usar vírgula para decimais no FR; normalize para ponto
    const amount = sanitize(r.amount).replace(/\./g, "").replace(",", ".");
    return [date, payee, amount].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",");
  });

  return [header.join(","), ...body].join("\n");
}

export default toCsv;
