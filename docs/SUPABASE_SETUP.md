# Supabase Setup Guide

This project is moving from single-machine encrypted storage to a synced desktop model using Supabase.

The target shape is:

- Electron desktop app stays the installed client on each machine
- Supabase Auth handles sign-in for the same Aligned Financials user across machines
- Supabase Postgres stores the shared workspace data
- Row Level Security protects each user's records

## 1. Create the Supabase project

1. Go to [Supabase](https://supabase.com/) and create an account.
2. Create a new project.
3. Choose the region closest to you and the users who will run the app.
4. Wait for the database to finish provisioning.

You will need these two values from `Project Settings` -> `API`:

- `Project URL`
- `anon` key

Put them into a local `.env` file based on [.env.example](</C:/Users/softb/OneDrive/Documents/GitHub/Alligned-Financials/.env.example>).

## 2. Turn on email and password sign-in

1. Open `Authentication` in the Supabase dashboard.
2. Confirm `Email` auth is enabled.
3. Decide whether users must verify their email before first sign-in.
4. If you want production-grade email delivery, add your SMTP provider later.

For this desktop app, email/password is the cleanest first step.

## 3. Set redirect URLs

If you keep email confirmation enabled, add the URLs you want Supabase to allow for redirect-based auth actions.

For early desktop development, use a temporary web callback page or a custom protocol later when we wire deep-link handling into Electron.

If you want the simplest first rollout, turn off email confirmation until the desktop callback flow is in place.

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

## 7. Recommended implementation path

Use this order:

1. Replace local username/password auth with Supabase Auth
2. Keep the current encrypted local cache only as an offline fallback
3. Save the workspace JSON snapshot to Supabase after each meaningful edit
4. On app startup, load the latest remote snapshot for the signed-in user
5. Add basic conflict handling if two machines edit at the same time

## 8. What to build next in code

The next coding step should be:

1. Add a Supabase client layer in the Electron app
2. Create login and signup flows with `signUp()` and `signInWithPassword()`
3. Replace `data:load` and `data:save` local-only calls with remote sync calls
4. Keep the current encrypted desktop file as backup/offline recovery

## 9. Important notes

- Netlify is not the storage solution here
- never expose the Supabase `service_role` key in the desktop renderer
- use the `anon` key in the app and rely on RLS
- the current app is still local-first until the Supabase integration code is added
- if more than one staff member will use this later, we should add proper roles and per-client permissions

## 10. Best first production choice

For this app, the best first hosted setup is:

- Supabase Auth
- Supabase Postgres
- this Electron desktop app as the installed client

That gives you:

- one shared user across machines
- one cloud data source
- a proper Windows installer
- room to add backups, audit logging, and permissions later
