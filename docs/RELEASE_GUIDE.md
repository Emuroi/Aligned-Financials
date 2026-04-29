# Release Guide

## What Changed

- The packaged app no longer bundles a live `.env` file.
- Supabase desktop config is now read from an external `.env`.
- The installed desktop app checks GitHub Releases for updates on launch.

## External Supabase Config

For cloud sync on an installed machine, create an `.env` in one of these places:

1. Next to the installed app executable
2. The Electron user-data folder for the app

The Settings screen now shows the exact path the app loaded, or the paths it checked.

Use:

```env
SUPABASE_URL=your-project-url
SUPABASE_ANON_KEY=your-anon-key
```

## Private Legacy Secrets

Legacy credential backfill no longer ships inside the tracked renderer source.

Use a local-only file at:

```text
.secrets/legacy-company-secrets.json
```

Start from:

```text
.secrets/legacy-company-secrets.example.json
```

That file is ignored by git and is only loaded locally after sign-in.

Self-employed sensitive fields use the same pattern:

```text
.secrets/self-employed-secrets.json
```

Start from:

```text
.secrets/self-employed-secrets.example.json
```

## Release Flow

1. Prepare a release:

```powershell
npm run release:prepare:patch
```

This bumps the version and regenerates release notes together.

2. Build and test the Windows installer:

```powershell
npm run release:test
```

3. Publish to GitHub Releases when ready:

```powershell
$env:GH_TOKEN="your_github_token"
npm run release:ship
```

4. Install the new build on the second machine and confirm:

- Sign in succeeds
- Auto-update status appears in Settings
- Sync still works
- One backup export and restore test completes

## Windows Build Fix

If the build fails with a symbolic-link or `A required privilege is not held by the client` error:

1. Turn on Windows Developer Mode
2. Re-open PowerShell
3. Clear the `winCodeSign` cache folder under `%LOCALAPPDATA%\electron-builder\Cache`
4. Retry the build

The wrapper script `scripts/build-windows.js` prints this guidance again when that failure happens.
