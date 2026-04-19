from __future__ import annotations

import csv
import json
from collections import Counter, defaultdict
from dataclasses import asdict, dataclass
from datetime import UTC, datetime
from io import TextIOWrapper
from pathlib import Path
from zipfile import ZipFile


ROOT = Path(__file__).resolve().parents[1]
ZIP_PATH = ROOT / "data" / "raw" / "aligned-financials-data-export_20260304.zip"
REPORTS_DIR = ROOT / "reports" / "generated"


@dataclass
class CsvFileSummary:
    path: str
    source_bucket: str
    company_number: str
    year: str
    month: str
    row_count: int
    amount_total: float
    paid_in_total: float
    paid_out_total: float
    first_date: str | None
    last_date: str | None
    column_names: list[str]


def extract_company_number(path: str) -> str:
    parts = path.split("/")
    for index, part in enumerate(parts):
        if part == "transactions" and index > 0:
            return parts[index - 1]
    return "unknown"


def extract_year(path: str) -> str:
    parts = path.split("/")
    for index, part in enumerate(parts):
        if part == "transactions" and index + 1 < len(parts):
            return parts[index + 1]
    return "unknown"


def extract_month(path: str) -> str:
    parts = path.split("/")
    for index, part in enumerate(parts):
        if part == "transactions" and index + 2 < len(parts):
            return parts[index + 2]
    return "unknown"


def extract_source_bucket(path: str) -> str:
    parts = path.split("/")
    if len(parts) > 2 and parts[0] == "dumps" and parts[1] == "s3":
        return parts[2]
    return "unknown"


def normalize_number(value: str | None) -> str:
    if not value:
        return ""
    return (
        value.replace("£", "")
        .replace("Ł", "")
        .replace("Â£", "")
        .replace("Â", "")
        .replace(",", "")
        .strip()
    )


def parse_date(value: str | None) -> datetime | None:
    if not value:
        return None
    text = value.strip()
    if not text:
        return None
    for fmt in ("%d/%m/%Y", "%Y-%m-%d", "%d-%m-%Y"):
        try:
            return datetime.strptime(text, fmt)
        except ValueError:
            continue
    return None


def summarize_csv(zip_file: ZipFile, path: str) -> CsvFileSummary:
    row_count = 0
    amount_total = 0.0
    paid_in_total = 0.0
    paid_out_total = 0.0
    first_date: datetime | None = None
    last_date: datetime | None = None
    column_names: list[str] = []

    with zip_file.open(path) as handle:
        text_handle = TextIOWrapper(handle, encoding="utf-8-sig", errors="replace", newline="")
        reader = csv.DictReader(text_handle)
        column_names = [name for name in (reader.fieldnames or []) if name]
        for row in reader:
            row_count += 1

            amount = normalize_number(row.get("Amount"))
            paid_in = normalize_number(row.get("Paid In"))
            paid_out = normalize_number(row.get("Paid Out"))

            if amount:
                try:
                    amount_total += float(amount)
                except ValueError:
                    pass
            else:
                if paid_in:
                    try:
                        value = float(paid_in)
                        paid_in_total += value
                        amount_total += value
                    except ValueError:
                        pass
                if paid_out:
                    try:
                        value = float(paid_out)
                        paid_out_total += value
                        amount_total -= value
                    except ValueError:
                        pass

            parsed_date = parse_date(row.get("Date"))
            if parsed_date:
                if first_date is None or parsed_date < first_date:
                    first_date = parsed_date
                if last_date is None or parsed_date > last_date:
                    last_date = parsed_date

    return CsvFileSummary(
        path=path,
        source_bucket=extract_source_bucket(path),
        company_number=extract_company_number(path),
        year=extract_year(path),
        month=extract_month(path),
        row_count=row_count,
        amount_total=round(amount_total, 2),
        paid_in_total=round(paid_in_total, 2),
        paid_out_total=round(paid_out_total, 2),
        first_date=first_date.strftime("%Y-%m-%d") if first_date else None,
        last_date=last_date.strftime("%Y-%m-%d") if last_date else None,
        column_names=column_names,
    )


def build_summary() -> tuple[dict, dict]:
    csv_summaries: list[CsvFileSummary] = []
    dump_files: list[dict] = []
    company_counter: Counter[str] = Counter()
    year_counter: Counter[str] = Counter()
    rows_by_company: defaultdict[str, int] = defaultdict(int)
    amount_by_company: defaultdict[str, float] = defaultdict(float)
    paid_in_by_company: defaultdict[str, float] = defaultdict(float)
    paid_out_by_company: defaultdict[str, float] = defaultdict(float)
    company_years: defaultdict[str, Counter[str]] = defaultdict(Counter)

    with ZipFile(ZIP_PATH) as zip_file:
        for entry in zip_file.infolist():
            path = entry.filename
            if path.endswith("/"):
                continue
            if path.endswith(".dump"):
                dump_files.append({"path": path, "size_bytes": entry.file_size})
            if path.endswith(".csv") and "/transactions/" in path:
                summary = summarize_csv(zip_file, path)
                csv_summaries.append(summary)
                company_counter[summary.company_number] += 1
                year_counter[summary.year] += 1
                rows_by_company[summary.company_number] += summary.row_count
                amount_by_company[summary.company_number] += summary.amount_total
                paid_in_by_company[summary.company_number] += summary.paid_in_total
                paid_out_by_company[summary.company_number] += summary.paid_out_total
                company_years[summary.company_number][summary.year] += 1

    csv_summaries.sort(key=lambda item: item.row_count, reverse=True)
    top_csvs = [asdict(item) for item in csv_summaries[:10]]
    top_companies = [
        {
            "company_number": company_number,
            "csv_files": file_count,
            "rows": rows_by_company[company_number],
            "net_amount": round(amount_by_company[company_number], 2),
        }
        for company_number, file_count in company_counter.most_common(10)
    ]

    company_cards = []
    for company_number, file_count in company_counter.most_common():
        files = [item for item in csv_summaries if item.company_number == company_number]
        files.sort(key=lambda item: (item.year, item.month, item.path))
        company_cards.append(
            {
                "company_number": company_number,
                "csv_file_count": file_count,
                "row_count": rows_by_company[company_number],
                "net_amount": round(amount_by_company[company_number], 2),
                "paid_in_total": round(paid_in_by_company[company_number], 2),
                "paid_out_total": round(paid_out_by_company[company_number], 2),
                "years_present": sorted(company_years[company_number].keys()),
                "files": [asdict(item) for item in files],
            }
        )

    summary = {
        "zip_path": ZIP_PATH.relative_to(ROOT).as_posix(),
        "dump_files": dump_files,
        "transaction_csv_file_count": len(csv_summaries),
        "distinct_company_numbers": len(company_counter),
        "years_present": dict(sorted(year_counter.items())),
        "top_companies_by_csv_count": top_companies,
        "largest_transaction_csvs": top_csvs,
    }

    dashboard_data = {
        "generated_at": datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "summary": summary,
        "companies": company_cards,
    }
    return summary, dashboard_data


def render_markdown(summary: dict) -> str:
    lines = [
        "# Export Summary",
        "",
        f"- Source archive: `{summary['zip_path']}`",
        f"- Database dump files: {len(summary['dump_files'])}",
        f"- Transaction CSV files: {summary['transaction_csv_file_count']}",
        f"- Distinct company numbers: {summary['distinct_company_numbers']}",
        "",
        "## Years Present",
        "",
    ]
    for year, count in summary["years_present"].items():
        lines.append(f"- {year}: {count} CSV files")

    lines.extend(["", "## Top Companies By CSV File Count", ""])
    for item in summary["top_companies_by_csv_count"]:
        lines.append(
            f"- {item['company_number']}: {item['csv_files']} CSV files, "
            f"{item['rows']} rows, net {item['net_amount']:.2f}"
        )

    lines.extend(["", "## Largest Transaction CSVs", ""])
    for item in summary["largest_transaction_csvs"]:
        lines.append(
            "- "
            f"{item['company_number']} / {item['year']}: {item['row_count']} rows "
            f"(net {item['amount_total']:.2f}, in {item['paid_in_total']:.2f}, "
            f"out {item['paid_out_total']:.2f}) "
            f"`{item['path']}`"
        )

    lines.extend(["", "## Database Dumps", ""])
    for dump in summary["dump_files"]:
        size_mb = dump["size_bytes"] / (1024 * 1024)
        lines.append(f"- `{dump['path']}`: {size_mb:.2f} MB")

    return "\n".join(lines) + "\n"


def main() -> None:
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    summary, dashboard_data = build_summary()
    (REPORTS_DIR / "summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    (REPORTS_DIR / "summary.md").write_text(render_markdown(summary), encoding="utf-8")
    (REPORTS_DIR / "dashboard-data.json").write_text(
        json.dumps(dashboard_data, indent=2), encoding="utf-8"
    )
    app_dir = ROOT / "app"
    app_dir.mkdir(parents=True, exist_ok=True)
    (app_dir / "dashboard-data.js").write_text(
        "window.APP_DATA = " + json.dumps(dashboard_data, indent=2) + ";\n",
        encoding="utf-8",
    )
    print(f"Wrote reports to {REPORTS_DIR}")


if __name__ == "__main__":
    main()
