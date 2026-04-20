# Supabase Roadmap

This project already has a first synced desktop implementation:

- Electron handles sign-up and sign-in with Supabase Auth
- workspace data can load from Supabase and save back to Supabase
- the local encrypted desktop cache stays in place as the offline fallback
- conflict detection exists when another machine updates the workspace first

The current cloud shape is intentionally simple:

- one user owns one workspace
- the full workspace is stored as one JSON snapshot in `public.workspace_snapshots`

That is the right first production-safe step. It keeps the migration risk low while the desktop workflow is still changing quickly.

## Stage 1: Stabilize the synced desktop

Keep the current snapshot model while you:

- verify sign-up, sign-in, remote load, remote save, and offline fallback across real devices
- make sync status visible in the UI
- add clear conflict recovery paths
- decide which data belongs in the app long term

## Stage 2: Normalize the highest-value tables

Once the synced desktop flow is stable, move the most operational parts into dedicated tables first:

- `client_records`
- `client_deadlines`
- `bank_statement_imports`
- `bank_statement_entries`
- `workflow_tasks`

Recommended rule:

- keep `workspace_snapshots` as a recovery/export layer during the transition
- move reads and writes for one feature area at a time
- do not rewrite the whole app into table CRUD in one jump

## Suggested table order

1. `client_records`
   Move company and sole trader core profile fields out of freeform JSON first.

2. `client_deadlines`
   Store VAT, accounts, corporation tax, payroll, and confirmation dates as queryable records.

3. `bank_statement_imports`
   Store one row per uploaded bank statement with metadata such as import time, account label, and note.

4. `bank_statement_entries`
   Store normalized statement lines so review queues, categorization, and reporting can be queried directly.

5. `workflow_tasks`
   Store per-client bookkeeping status, next action, priority, and completion state.

## Practical migration shape

For each new table:

1. Add the table and RLS policies in Supabase.
2. Backfill rows from the JSON snapshot for existing users.
3. Update the Electron sync layer so that feature writes go to the new table.
4. Keep a snapshot write for backup until the feature proves stable.
5. Remove the old snapshot dependency only after the UI and sync behavior are proven.

## What not to do yet

- Do not expose the `service_role` key in the desktop app.
- Do not remove the encrypted local cache yet.
- Do not split everything into many tables before the workflow stabilizes.
- Do not build multi-user staff permissions until single-user multi-machine sync is working cleanly.
