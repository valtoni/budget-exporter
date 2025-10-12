import Transaction
from datetime import datetime
from xml.etree.ElementTree import Element, SubElement, tostring
import csv

# --------- OFX exporter ---------
class OFXExporter:
    @staticmethod
    def _ofx_root() -> Element:
        ofx = Element("OFX")
        signon = SubElement(ofx, "SIGNONMSGSRSV1")
        sonrs = SubElement(signon, "SONRS")
        st = SubElement(sonrs, "STATUS")
        SubElement(st, "CODE").text = "0"
        SubElement(st, "SEVERITY").text = "INFO"
        SubElement(sonrs, "DTSERVER").text = datetime.utcnow().strftime("%Y%m%d%H%M%S")
        SubElement(sonrs, "LANGUAGE").text = "ENG"
        SubElement(sonrs, "FI")
        return ofx

    @staticmethod
    def _add_statement(parent: Element, *, bankid, acctid, accttype, currency, txns: list[Transaction]):
        trnrs = SubElement(parent, "STMTTRNRS")
        stmtrs = SubElement(trnrs, "STMTRS")
        SubElement(stmtrs, "CURDEF").text = currency
        acct = SubElement(stmtrs, "BANKACCTFROM")
        SubElement(acct, "BANKID").text = bankid
        SubElement(acct, "ACCTID").text = acctid
        SubElement(acct, "ACCTTYPE").text = accttype
        blist = SubElement(stmtrs, "BANKTRANLIST")

        for t in sorted(txns, key=lambda x: x.posted):
            node = SubElement(blist, "STMTTRN")
            SubElement(node, "TRNTYPE").text = t.trntype
            SubElement(node, "DTPOSTED").text = t.posted.strftime("%Y%m%d")
            SubElement(node, "TRNAMT").text = f"{t.amount:.2f}"
            SubElement(node, "FITID").text = t.fitid
            SubElement(node, "NAME").text = t.payee
            SubElement(node, "MEMO").text = t.memo

    @classmethod
    def to_ofx(cls, txns: list[Transaction]) -> str:
        """
        Gera UM OFX contendo múltiplos extratos (um por par bankid+acctid+accttype+currency).
        """
        ofx = cls._ofx_root()
        bank_msgs = SubElement(ofx, "BANKMSGSRSV1")

        # agrupa por conta
        groups: dict[tuple, list[Transaction]] = {}
        for t in txns:
            key = (t.bankid, t.acctid, t.accttype, t.currency)
            groups.setdefault(key, []).append(t)

        for (bankid, acctid, accttype, currency), gtx in groups.items():
            cls._add_statement(bank_msgs, bankid=bankid, acctid=acctid,
                               accttype=accttype, currency=currency, txns=gtx)

        xml = tostring(ofx, encoding="utf-8", xml_declaration=True)
        return xml.decode("utf-8")

# --------- CSV loader utilitário (opcional) ---------
def load_transactions(csv_path: str, *, map: dict, const: dict) -> list[Transaction]:
    tx = []
    with open(csv_path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            tx.append(Transaction.from_csv(row, map=map, const=const))
    return tx
