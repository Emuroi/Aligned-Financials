# Supabase Setup Guide

This project now has a first synced desktop implementation using Supabase.

The target shape is:

- Electron desktop app stays the installed client on each machine
- Supabase Auth handles sign-in for the same Aligned Financials user across machines
- Supabase Postgres stores the shared workspace data
- Row Level Security protects each user's records
- the encrypted local desktop cache stays in place as the offline fallback

## 1. Create the Supabase project

1. Go to [Supabase](https://supabase.com/) and create an account.
2. Create a new project.
3. Choose the region closest to you and the users who will run the app.
4. Wait for the database to finish provisioning.

You will need these two values from `Project Settings` -> `API`:

- `Project URL`
- `anon` key

Put them into a local `.env` file based on [.env.example](</C:/Users/softb/OneDrive/Documents/GitHub/Alligned-Financials/.env.example>).

Important:

- `.env` is ignored by git and should stay local to each machine
- `.env.example` should only contain placeholders, never live project values
- Installed desktop builds read an external `.env` instead of bundling secrets into the app package

## 2. Turn on email and password sign-in

1. Open `Authentication` in the Supabase dashboard.
2. Confirm `Email` auth is enabled.
3. Decide whether users must verify their email before first sign-in.
4. If you want production-grade email delivery, add your SMTP provider later.

For this desktop app, email/password is the cleanest first step.

## 3. Set redirect URLs

If you keep email confirmation enabled, add the URLs you want Supabase to allow for redirect-based auth actions.

For early desktop development, use a temporary web callback page or a custom protocol later when we wire deep-link handling into Electron.

If you want the simplest first rollout, turn off email confirmation until the desktop callback flow is in place. That avoids first-run confusion in the desktop app while the confirmation callback flow is still basic.

## 4. Create the database schema

Run the SQL in [supabase/schema.sql](</C:/Users/softb/OneDrive/Documents/GitHub/Alligned-Financials/supabase/schema.sql>) in the Supabase SQL Editor.

This schema creates:

- `public.profiles`
- `public.workspaces`
- `public.workspace_snapshots`

The design is intentionally simple:

- one authenticated user gets one workspace
- the app saves the current full workspace payload as JSONB
- RLS ensures users only read and write their own workspace

That is the safest way to move this desktop app online first without rebuilding every screen into table-by-table CRUD immediately.

## 5. Install project dependencies

In the repo root:

```powershell
npm install
```

This installs Electron, the Windows packaging tools, and the Supabase JavaScript client.

## 6. Build the desktop app for installation

For a real Windows installer:

```powershell
npm run dist:installer
```

That produces an `Aligned-Financials-Setup-<version>.exe` in `dist/`.

For a portable build:

```powershell
npm run dist:portable
```

For both:

```powershell
npm run dist:win
```

Once the installer exists, you do not open the app with a terminal command anymore. You install it like normal Windows software.

## 7. Current implementation status

The desktop code already includes:

- sign-up with Supabase Auth
- sign-in with Supabase Auth
- encrypted local cache fallback
- remote workspace load on sign-in
- remote workspace save after edits
- basic conflict detection when another machine saved first

## 8. What to test next

Use this order:

1. Sign up a fresh test account.
2. Sign in on machine A and create or edit records.
3. Confirm those changes appear after sign-in on machine B.
4. Disconnect the network and confirm the local encrypted cache still opens.
5. Reconnect and confirm sync resumes cleanly.
6. Test the conflict path by editing the same workspace on two machines before both save.

## 9. What to build next in code

The next improvements after the current sync alpha are:

1. Better sync status in the UI
2. Clear conflict recovery controls
3. More structured accounting workflow fields
4. Normalized Supabase tables for bank imports and workflow tasks later

See [docs/SUPABASE_ROADMAP.md](/C:/Users/softb/OneDrive/Documents/GitHub/Alligned-Financials/docs/SUPABASE_ROADMAP.md) for the staged database direction.

## 10. Important notes

- Netlify is not the storage solution here
- never expose the Supabase `service_role` key in the desktop renderer
- use the `anon` key in the app and rely on RLS
- the desktop app now supports Supabase sync, but the encrypted local cache is still retained as a safety layer
- if more than one staff member will use this later, we should add proper roles and per-client permissions

## 11. Best first production choice

For this app, the best first hosted setup is:

- Supabase Auth
- Supabase Postgres
- this Electron desktop app as the installed client

That gives you:

- one shared user across machines
- one cloud data source
- a proper Windows installer
- room to add backups, audit logging, and permissions later
