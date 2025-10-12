// TD (Toronto-Dominion) CSV converter
export function toCsv(rows = []) {
  const header = ["date", "payee", "amount"];
  const sanitize = (v) => String(v ?? "").replace(/\r|\n/g, " ").trim();

  const body = rows.map((r) => {
    const date = sanitize(r.date);
    const payee = sanitize(r.payee);
    const amount = sanitize(r.amount).replace(/,/g, "");
    return [date, payee, amount].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",");
  });

  return [header.join(","), ...body].join("\n");
}

export default toCsv;
