# Aligned Accounting Data

Accounting-focused GitHub project built around the `aligned-financials-data-export_20260304.zip` export.

## What is included

- `data/raw/aligned-financials-data-export_20260304.zip`: the original export archive
- `scripts/analyze_export.py`: inventories the archive and summarizes transaction CSV activity
- `reports/generated/summary.json`: machine-readable overview
- `reports/generated/summary.md`: human-readable accounting summary

## Export contents

The export was produced on 4 March 2026 from MainRD Practice Management Software and contains:

- 3 PostgreSQL dump files
- transaction CSVs grouped by company number
- branding and uploaded files

The archive includes at least one Windows-incompatible filename containing a colon (`CRN:...`), so this project analyzes the ZIP directly instead of assuming a full filesystem extract will succeed on every machine.

## Quick start

Use the bundled Python runtime or any Python 3.11+ install:

```powershell
python scripts/analyze_export.py
```

The script reads the ZIP in `data/raw/` and regenerates the reports in `reports/generated/`.

## Suggested accounting workflow

1. Review `reports/generated/summary.md` for the portfolio-level picture.
2. Restore one of the PostgreSQL dumps if you need practice-management metadata.
3. Use the company numbers from the summary to target detailed CSV review.
4. Add downstream reconciliation, VAT, or management-account scripts alongside `analyze_export.py`.

## Database restore example

```powershell
Expand-Archive data/raw/aligned-financials-data-export_20260304.zip -DestinationPath .\tmp-export
createdb my_database
pg_restore --dbname=my_database .\tmp-export\dumps\emerald-bs_20260304.dump
```

If a full extract fails on Windows because of the `CRN:...` path, unpack just the selected dump file with a ZIP tool that lets you choose individual entries.
