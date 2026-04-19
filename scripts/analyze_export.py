from __future__ import annotations

import csv
import json
from collections import Counter, defaultdict
from dataclasses import asdict, dataclass
from io import TextIOWrapper
from pathlib import Path
from zipfile import ZipFile


ROOT = Path(__file__).resolve().parents[1]
ZIP_PATH = ROOT / "data" / "raw" / "aligned-financials-data-export_20260304.zip"
REPORTS_DIR = ROOT / "reports" / "generated"


@dataclass
class CsvFileSummary:
    path: str
    company_number: str
    year: str
    row_count: int
    amount_total: float


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


def summarize_csv(zip_file: ZipFile, path: str) -> CsvFileSummary:
    row_count = 0
    amount_total = 0.0
    with zip_file.open(path) as handle:
        text_handle = TextIOWrapper(handle, encoding="utf-8-sig", errors="replace", newline="")
        reader = csv.DictReader(text_handle)
        for row in reader:
            row_count += 1
            amount_text = parse_amount(row)
            try:
                amount_total += float(amount_text)
            except ValueError:
                continue
    return CsvFileSummary(
        path=path,
        company_number=extract_company_number(path),
        year=extract_year(path),
        row_count=row_count,
        amount_total=round(amount_total, 2),
    )


def parse_amount(row: dict[str, str | None]) -> str:
    amount = normalize_number(row.get("Amount"))
    if amount:
        return amount

    paid_in = normalize_number(row.get("Paid In"))
    paid_out = normalize_number(row.get("Paid Out"))
    if paid_in:
        return paid_in
    if paid_out:
        return f"-{paid_out}"
    return ""


def normalize_number(value: str | None) -> str:
    if not value:
        return ""
    return (
        value.replace("Ł", "")
        .replace("£", "")
        .replace(",", "")
        .strip()
    )


def build_summary() -> dict:
    csv_summaries: list[CsvFileSummary] = []
    dump_files: list[dict] = []
    company_counter: Counter[str] = Counter()
    year_counter: Counter[str] = Counter()
    rows_by_company: defaultdict[str, int] = defaultdict(int)

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

    csv_summaries.sort(key=lambda item: item.row_count, reverse=True)
    top_csvs = [asdict(item) for item in csv_summaries[:10]]
    top_companies = [
        {
            "company_number": company_number,
            "csv_files": file_count,
            "rows": rows_by_company[company_number],
        }
        for company_number, file_count in company_counter.most_common(10)
    ]

    return {
        "zip_path": ZIP_PATH.relative_to(ROOT).as_posix(),
        "dump_files": dump_files,
        "transaction_csv_file_count": len(csv_summaries),
        "distinct_company_numbers": len(company_counter),
        "years_present": dict(sorted(year_counter.items())),
        "top_companies_by_csv_count": top_companies,
        "largest_transaction_csvs": top_csvs,
    }


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
            f"- {item['company_number']}: {item['csv_files']} CSV files, {item['rows']} rows"
        )

    lines.extend(["", "## Largest Transaction CSVs", ""])
    for item in summary["largest_transaction_csvs"]:
        lines.append(
            "- "
            f"{item['company_number']} / {item['year']}: {item['row_count']} rows "
            f"({item['amount_total']:.2f} total amount) "
            f"`{item['path']}`"
        )

    lines.extend(["", "## Database Dumps", ""])
    for dump in summary["dump_files"]:
        size_mb = dump["size_bytes"] / (1024 * 1024)
        lines.append(f"- `{dump['path']}`: {size_mb:.2f} MB")

    return "\n".join(lines) + "\n"


def main() -> None:
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    summary = build_summary()
    (REPORTS_DIR / "summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    (REPORTS_DIR / "summary.md").write_text(render_markdown(summary), encoding="utf-8")
    print(f"Wrote reports to {REPORTS_DIR}")


if __name__ == "__main__":
    main()
