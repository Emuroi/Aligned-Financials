# Windows Installer Guide

Yes, this software can install on a machine like normal software.

The project already uses `electron-builder` with an NSIS installer target.

## Build the installer

From the project root:

```powershell
npm install
npm run dist:installer
```

After that, check the `dist/` folder for:

- `Aligned-Financials-Setup-<version>.exe`

You can send that installer to another Windows machine and install it normally.

## Portable build

If you want a non-installed version:

```powershell
npm run dist:portable
```

That creates a portable executable.

## Recommended user flow

For day-to-day use:

1. Build the installer once
2. Install the app on each machine using the `.exe`
3. Open it from the Start menu or desktop shortcut
4. Stop using `npm start` except for development

## Important note

Installer builds package the app itself, not shared data.

If you want the same user and same records on multiple machines, the installer should point to shared cloud storage such as Supabase rather than storing everything only in a local desktop file.
