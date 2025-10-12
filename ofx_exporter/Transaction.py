from __future__ import annotations
from dataclasses import dataclass
from datetime import datetime, date
from decimal import Decimal
from hashlib import md5


# --------- Core domain ---------
@dataclass(frozen=True)
class Transaction:
    bankid: str
    acctid: str
    accttype: str        # "CHECKING", "SAVINGS", "CREDITLINE", etc.
    currency: str        # "CAD", "USD", ...
    posted: date
    amount: Decimal      # +credit / -debit
    payee: str = ""
    memo: str = ""
    ext_id: str | None = None  # id nativo do banco se existir

    @property
    def fitid(self) -> str:
        if self.ext_id:  # preserve o id do banco se vier
            return self.ext_id
        base = f"{self.bankid}|{self.acctid}|{self.posted.isoformat()}|{self.amount:.2f}|{self.payee}|{self.memo}"
        return md5(base.lower().encode()).hexdigest()[:16]

    @property
    def trntype(self) -> str:
        return "CREDIT" if self.amount > 0 else "DEBIT"

    @staticmethod
    def _to_date(s: str, fmt: str | None = None) -> date:
        # aceita "YYYY-MM-DD" direto; senão, use fmt p/ bancos específicos
        return datetime.strptime(s, fmt).date() if fmt else date.fromisoformat(s)

    @classmethod
    def from_csv(cls, row: dict, *, map: dict, const: dict) -> "Transaction":
        """
        map: mapeia colunas do CSV -> chaves: date, amount, payee?, memo?, ext_id?
        const: bankid, acctid, accttype, currency (+ date_fmt? amount_replace?)
        """
        raw_date = row[map["date"]].strip()
        date_fmt = const.get("date_fmt")  # ex: "%d/%m/%Y"
        posted = cls._to_date(raw_date, date_fmt)

        raw_amt = row[map["amount"]].strip()
        # normaliza 1 234,56 -> 1234.56 se necessário
        for old, new in const.get("amount_replace", [(",", "."), (" ", "")]):
            raw_amt = raw_amt.replace(old, new)
        amount = Decimal(raw_amt)

        payee = row.get(map.get("payee", ""), "") if map.get("payee") else ""
        memo  = row.get(map.get("memo",  ""), "") if map.get("memo")  else ""
        ext_id = row.get(map.get("ext_id",""), None) if map.get("ext_id") else None

        return cls(
            bankid=const["bankid"],
            acctid=const["acctid"],
            accttype=const.get("accttype", "CHECKING"),
            currency=const.get("currency", "CAD"),
            posted=posted,
            amount=amount,
            payee=payee[:80],
            memo=memo[:255],
            ext_id=ext_id or None
        )

