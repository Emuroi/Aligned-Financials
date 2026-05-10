const { app, BrowserWindow, shell, ipcMain, dialog, safeStorage } = require("electron");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const { autoUpdater } = require("electron-updater");

const AUTH_FILE = "aligned-auth.json";
const REMEMBER_FILE = "aligned-remember.json";
const DATA_FILE = "aligned-data.enc";
const ENV_FILE = ".env";
const LEGACY_SECRETS_FILE = "legacy-company-secrets.json";
const PERSON_SECRETS_FILE = "self-employed-secrets.json";
const BACKUP_FILE_EXTENSION = "afb";
const ENCRYPTED_STORE_FORMAT = "aligned-financials-secret-store-v1";
const DEFAULT_SUPABASE_CONFIG = Object.freeze({
  url: "https://kqhnddzsxqsiyoaejvhu.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxaG5kZHpzeHFzaXlvYWVqdmh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MDM1MjMsImV4cCI6MjA5MjI3OTUyM30.cBDvLVEZuPlZ_miYJcMWEunN9HxonIJT68FypE_uW1I",
  workspaceId: "b1ac0f5c-6b28-4eaa-8329-9ce844ec55b0",
});

let supabaseClient = null;
let onlineSession = {
  username: "",
  password: "",
  authenticated: false,
};
let updateCheckStarted = false;
const authAttemptState = new Map();
const AUTH_WINDOW_MS = 10 * 60 * 1000;
const AUTH_MAX_FAILURES = 5;
const AUTH_LOCK_MS = 15 * 60 * 1000;
let updateState = {
  currentVersion: app.getVersion(),
  availableVersion: "",
  downloadedVersion: "",
  status: "idle",
  message: "Updates check automatically when the installed desktop app opens.",
  percent: 0,
  checking: false,
  updateAvailable: false,
  updateDownloaded: false,
  lastCheckedAt: "",
};

function createWindow() {
  const window = new BrowserWindow({
    width: 1560,
    height: 980,
    minWidth: 1280,
    minHeight: 820,
    backgroundColor: "#09090b",
    autoHideMenuBar: true,
    title: "Aligned Financials",
    icon: path.join(__dirname, "build", "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
      navigateOnDragDrop: false,
      safeDialogs: true,
      safeDialogsMessage: "Only use this workspace with trusted local files.",
    },
  });

  window.loadFile(path.join(__dirname, "app", "index.html"));

  window.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  window.webContents.on("will-navigate", (event) => {
    event.preventDefault();
  });
}

function broadcastUpdateState() {
  BrowserWindow.getAllWindows().forEach((window) => {
    if (!window.isDestroyed()) {
      window.webContents.send("app:update-status", updateState);
    }
  });
}

app.on("web-contents-created", (_event, contents) => {
  contents.session.setPermissionRequestHandler((_webContents, _permission, callback) => {
    callback(false);
  });
});

function setUpdateState(patch) {
  updateState = {
    ...updateState,
    ...patch,
    currentVersion: app.getVersion(),
  };
  broadcastUpdateState();
}

function getEnvCandidatePaths() {
  const paths = [];

  if (!app.isPackaged) {
    paths.push(path.join(__dirname, ENV_FILE));
  }

  paths.push(path.join(path.dirname(process.execPath), ENV_FILE));
  paths.push(appFile(ENV_FILE));

  return [...new Set(paths)];
}

function getLegacySecretsCandidatePaths() {
  return [
    path.join(__dirname, ".secrets", LEGACY_SECRETS_FILE),
    path.join(path.dirname(process.execPath), ".secrets", LEGACY_SECRETS_FILE),
    path.join(path.dirname(process.execPath), LEGACY_SECRETS_FILE),
    appFile(LEGACY_SECRETS_FILE),
  ];
}

function getLegacySecretsWritePath() {
  const existing = getLegacySecretsCandidatePaths().find((candidate) => fs.existsSync(candidate));
  if (existing) return existing;
  if (!app.isPackaged) return path.join(__dirname, ".secrets", LEGACY_SECRETS_FILE);
  return appFile(LEGACY_SECRETS_FILE);
}

function getPersonSecretsCandidatePaths() {
  return [
    path.join(__dirname, ".secrets", PERSON_SECRETS_FILE),
    path.join(path.dirname(process.execPath), ".secrets", PERSON_SECRETS_FILE),
    path.join(path.dirname(process.execPath), PERSON_SECRETS_FILE),
    appFile(PERSON_SECRETS_FILE),
  ];
}

function getPersonSecretsWritePath() {
  const existing = getPersonSecretsCandidatePaths().find((candidate) => fs.existsSync(candidate));
  if (existing) return existing;
  if (!app.isPackaged) return path.join(__dirname, ".secrets", PERSON_SECRETS_FILE);
  return appFile(PERSON_SECRETS_FILE);
}

function authKeyFor(username) {
  return String(username || "").trim().toLowerCase();
}

function getAuthThrottle(username) {
  const key = authKeyFor(username);
  const now = Date.now();
  const current = authAttemptState.get(key) || {
    failures: [],
    blockedUntil: 0,
  };
  current.failures = current.failures.filter((timestamp) => now - timestamp < AUTH_WINDOW_MS);
  if (current.blockedUntil && current.blockedUntil <= now) {
    current.blockedUntil = 0;
  }
  authAttemptState.set(key, current);
  return current;
}

function consumeAuthFailure(username) {
  const key = authKeyFor(username);
  const current = getAuthThrottle(key);
  const now = Date.now();
  current.failures.push(now);
  if (current.failures.length >= AUTH_MAX_FAILURES) {
    current.blockedUntil = now + AUTH_LOCK_MS;
  }
  authAttemptState.set(key, current);
}

function clearAuthFailures(username) {
  authAttemptState.delete(authKeyFor(username));
}

function getAuthThrottleMessage(username) {
  const current = getAuthThrottle(username);
  const now = Date.now();
  if (current.blockedUntil && current.blockedUntil > now) {
    const minutes = Math.max(1, Math.ceil((current.blockedUntil - now) / 60000));
    return `Too many failed sign-in attempts. Try again in about ${minutes} minute${minutes === 1 ? "" : "s"}.`;
  }
  return "";
}

function shouldCheckForUpdates() {
  return app.isPackaged && !process.env.ELECTRON_SKIP_UPDATES;
}

function friendlyUpdateError(error) {
  const message = String(error?.message || "");
  if (message.includes("404")) {
    return "Update check could not find a published GitHub release for this version.";
  }
  if (/ENOTFOUND|ECONN|network|fetch failed|timed out/i.test(message)) {
    return "Update check could not reach GitHub. Check the internet connection and try again.";
  }
  return "Update check is unavailable right now.";
}

function runUpdateCheck(trigger = "automatic") {
  if (!shouldCheckForUpdates()) {
    setUpdateState({
      status: "disabled",
      message: "Updates are available after installing the packaged desktop app.",
      checking: false,
    });
    return Promise.resolve({ ok: false, message: "Updates are only available in the installed desktop app." });
  }

  setUpdateState({
    status: "checking",
    message: trigger === "manual" ? "Checking for updates now." : "Checking for updates.",
    checking: true,
    percent: 0,
    lastCheckedAt: new Date().toISOString(),
  });

  return autoUpdater.checkForUpdates()
    .then(() => ({ ok: true }))
    .catch((error) => {
      const message = friendlyUpdateError(error);
      setUpdateState({
        status: "error",
        message,
        checking: false,
      });
      return { ok: false, message };
    });
}

function setupAutoUpdates() {
  if (!shouldCheckForUpdates() || updateCheckStarted) return;
  updateCheckStarted = true;

  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.on("checking-for-update", () => {
    console.log("[updater] Checking for updates");
    setUpdateState({
      status: "checking",
      message: "Checking for updates.",
      checking: true,
      percent: 0,
      updateAvailable: false,
      updateDownloaded: false,
      downloadedVersion: "",
      lastCheckedAt: new Date().toISOString(),
    });
  });

  autoUpdater.on("update-available", (info) => {
    console.log(`[updater] Update available: ${info?.version || "unknown version"}`);
    setUpdateState({
      status: "downloading",
      message: `Downloading version ${info?.version || "latest"}.`,
      checking: false,
      updateAvailable: true,
      updateDownloaded: false,
      availableVersion: info?.version || "",
      downloadedVersion: "",
      percent: 0,
    });
  });

  autoUpdater.on("update-not-available", () => {
    console.log("[updater] No update available");
    setUpdateState({
      status: "up-to-date",
      message: `You're on the latest version (${app.getVersion()}).`,
      checking: false,
      updateAvailable: false,
      updateDownloaded: false,
      availableVersion: "",
      downloadedVersion: "",
      percent: 0,
      lastCheckedAt: new Date().toISOString(),
    });
  });

  autoUpdater.on("error", (error) => {
    console.error("[updater] Update error:", error?.message || error);
    setUpdateState({
      status: "error",
      message: friendlyUpdateError(error),
      checking: false,
    });
  });

  autoUpdater.on("download-progress", (progress) => {
    console.log(`[updater] Downloading update: ${Math.round(progress.percent || 0)}%`);
    setUpdateState({
      status: "downloading",
      message: `Downloading update: ${Math.round(progress.percent || 0)}%.`,
      checking: false,
      percent: Math.round(progress.percent || 0),
    });
  });

  autoUpdater.on("update-downloaded", async (info) => {
    console.log(`[updater] Update downloaded: ${info?.version || "unknown version"}`);
    setUpdateState({
      status: "downloaded",
      message: `Version ${info?.version || "latest"} is ready to install.`,
      checking: false,
      updateAvailable: true,
      updateDownloaded: true,
      downloadedVersion: info?.version || "",
      availableVersion: info?.version || "",
      percent: 100,
    });
    const focusedWindow = BrowserWindow.getFocusedWindow() || BrowserWindow.getAllWindows()[0] || null;
    const result = await dialog.showMessageBox(focusedWindow, {
      type: "info",
      buttons: ["Restart now", "Later"],
      defaultId: 0,
      cancelId: 1,
      title: "Update ready",
      message: "A new version of Aligned Financials has been downloaded.",
      detail: "Restart the app to install the update.",
      noLink: true,
    });

    if (result.response === 0) {
      autoUpdater.quitAndInstall();
    }
  });

  void runUpdateCheck("automatic");
}

function appFile(name) {
  return path.join(app.getPath("userData"), name);
}

function readJson(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2), "utf8");
}

function canUseSecureRememberedLogin() {
  try {
    return safeStorage.isEncryptionAvailable();
  } catch {
    return false;
  }
}

function readRememberedLogin() {
  const filePath = appFile(REMEMBER_FILE);
  if (!fs.existsSync(filePath)) return null;

  try {
    const parsed = readJson(filePath);
    if (!parsed || typeof parsed !== "object") return null;
    if (!parsed.username || !parsed.password) return null;
    if (!canUseSecureRememberedLogin()) return null;
    return {
      username: String(parsed.username || "").trim(),
      password: safeStorage.decryptString(Buffer.from(parsed.password, "base64")),
      updatedAt: String(parsed.updatedAt || ""),
    };
  } catch {
    return null;
  }
}

function writeRememberedLogin(username, password) {
  if (!canUseSecureRememberedLogin()) {
    return { ok: false, message: "Secure remembered login is unavailable on this machine." };
  }

  writeJson(appFile(REMEMBER_FILE), {
    username,
    password: safeStorage.encryptString(String(password || "")).toString("base64"),
    updatedAt: new Date().toISOString(),
  });
  return { ok: true };
}

function clearRememberedLogin() {
  const filePath = appFile(REMEMBER_FILE);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}

function deriveKey(password, salt) {
  return crypto.scryptSync(password, Buffer.from(salt, "hex"), 32);
}

function encryptPayload(payload, password, salt) {
  const iv = crypto.randomBytes(12);
  const key = deriveKey(password, salt);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(payload), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    iv: iv.toString("hex"),
    tag: tag.toString("hex"),
    content: encrypted.toString("hex"),
  };
}

function decryptPayload(payload, password, salt) {
  const key = deriveKey(password, salt);
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, Buffer.from(payload.iv, "hex"));
  decipher.setAuthTag(Buffer.from(payload.tag, "hex"));
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(payload.content, "hex")),
    decipher.final(),
  ]);
  return JSON.parse(decrypted.toString("utf8"));
}

function isEncryptedStore(value) {
  return Boolean(
    value
    && typeof value === "object"
    && value.format === ENCRYPTED_STORE_FORMAT
    && value.payload
    && typeof value.payload === "object"
    && value.payload.iv
    && value.payload.tag
    && value.payload.content,
  );
}

function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, Buffer.from(salt, "hex"), 150000, 32, "sha256").toString("hex");
}

function parseEnvFile(envPath) {
  if (!fs.existsSync(envPath)) return {};

  return fs.readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .reduce((env, line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) return env;
      const separatorIndex = trimmed.indexOf("=");
      const key = trimmed.slice(0, separatorIndex).trim();
      const rawValue = trimmed.slice(separatorIndex + 1).trim();
      env[key] = rawValue.replace(/^['"]|['"]$/g, "");
      return env;
    }, {});
}

function resolveExternalEnvConfig() {
  const envPath = getEnvCandidatePaths().find((candidate) => fs.existsSync(candidate)) || "";
  return {
    envPath,
    fileConfig: envPath ? parseEnvFile(envPath) : {},
    searchedPaths: getEnvCandidatePaths(),
  };
}

function readLegacyCompanySecrets() {
  return {};
}

function readPersonSecrets() {
  return {};
}

function writeLegacyCompanySecrets(value) {
  return value;
}

function writePersonSecrets(value) {
  return value;
}

function readSecureStore(filePath, password, salt) {
  if (!filePath || !fs.existsSync(filePath)) return {};
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (!parsed || typeof parsed !== "object") return {};
    if (isEncryptedStore(parsed)) {
      return decryptPayload(parsed.payload, password, salt);
    }
    return parsed;
  } catch {
    return {};
  }
}

function writeSecureStore(filePath, value, password, salt) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const serialized = {
    format: ENCRYPTED_STORE_FORMAT,
    updatedAt: new Date().toISOString(),
    payload: encryptPayload(value, password, salt),
  };
  fs.writeFileSync(filePath, `${JSON.stringify(serialized, null, 2)}\n`, "utf8");
  return filePath;
}

function verifyDesktopSession(username, password) {
  const normalizedUsername = String(username || "").trim();
  const normalizedPassword = String(password || "");
  if (!normalizedUsername || !normalizedPassword) {
    return { ok: false, message: "A signed-in desktop session is required." };
  }

  const verification = verifyCredentials(normalizedUsername, normalizedPassword);
  if (!verification.ok) {
    return verification;
  }

  return { ok: true, auth: verification.auth };
}

function readLegacyCompanySecretsForSession(username, password) {
  const verification = verifyDesktopSession(username, password);
  if (!verification.ok) return {};
  const filePath = getLegacySecretsCandidatePaths().find((candidate) => fs.existsSync(candidate)) || "";
  return readSecureStore(filePath, password, verification.auth.salt);
}

function writeLegacyCompanySecretsForSession(username, password, value) {
  const verification = verifyDesktopSession(username, password);
  if (!verification.ok) return "";
  return writeSecureStore(getLegacySecretsWritePath(), value, password, verification.auth.salt);
}

function readPersonSecretsForSession(username, password) {
  const verification = verifyDesktopSession(username, password);
  if (!verification.ok) return {};
  const filePath = getPersonSecretsCandidatePaths().find((candidate) => fs.existsSync(candidate)) || "";
  return readSecureStore(filePath, password, verification.auth.salt);
}

function writePersonSecretsForSession(username, password, value) {
  const verification = verifyDesktopSession(username, password);
  if (!verification.ok) return "";
  return writeSecureStore(getPersonSecretsWritePath(), value, password, verification.auth.salt);
}

function buildBackupPackage(username, password) {
  const verification = verifyDesktopSession(username, password);
  if (!verification.ok) {
    return verification;
  }

  const workspace = loadLocalWorkspace(username, password);
  if (!workspace.ok) {
    return workspace;
  }

  return {
    ok: true,
    payload: {
      format: "aligned-financials-backup-v1",
      appVersion: app.getVersion(),
      username,
      createdAt: new Date().toISOString(),
      workspace: workspace.data || {},
      companySecrets: readLegacyCompanySecretsForSession(username, password),
      personSecrets: readPersonSecretsForSession(username, password),
    },
    salt: verification.auth.salt,
  };
}

function migrateSecretsToNewPassword(username, currentPassword, newPassword, oldSalt, newSalt) {
  const companyFilePath = getLegacySecretsCandidatePaths().find((candidate) => fs.existsSync(candidate));
  if (companyFilePath) {
    const companySecrets = readSecureStore(companyFilePath, currentPassword, oldSalt);
    writeSecureStore(getLegacySecretsWritePath(), companySecrets, newPassword, newSalt);
  }

  const personFilePath = getPersonSecretsCandidatePaths().find((candidate) => fs.existsSync(candidate));
  if (personFilePath) {
    const personSecrets = readSecureStore(personFilePath, currentPassword, oldSalt);
    writeSecureStore(getPersonSecretsWritePath(), personSecrets, newPassword, newSalt);
  }
}

function getSupabaseConfig() {
  const { fileConfig } = resolveExternalEnvConfig();
  return {
    url: process.env.SUPABASE_URL || fileConfig.SUPABASE_URL || DEFAULT_SUPABASE_CONFIG.url,
    anonKey: process.env.SUPABASE_ANON_KEY || fileConfig.SUPABASE_ANON_KEY || DEFAULT_SUPABASE_CONFIG.anonKey,
    workspaceId: process.env.SUPABASE_WORKSPACE_ID || fileConfig.SUPABASE_WORKSPACE_ID || DEFAULT_SUPABASE_CONFIG.workspaceId,
  };
}

function getSupabaseConfigInfo() {
  const resolved = resolveExternalEnvConfig();
  const config = getSupabaseConfig();
  return {
    configured: Boolean(config.url && config.anonKey),
    envPath: resolved.envPath,
    searchedPaths: resolved.searchedPaths,
    workspaceId: config.workspaceId,
    usingBundledConfig: !resolved.envPath && Boolean(config.url && config.anonKey),
  };
}

function hasSupabaseConfig() {
  const config = getSupabaseConfig();
  return Boolean(config.url && config.anonKey);
}

function getSupabaseClient() {
  if (!hasSupabaseConfig()) return null;
  if (supabaseClient) return supabaseClient;

  const { createClient } = require("@supabase/supabase-js");
  const config = getSupabaseConfig();
  supabaseClient = createClient(config.url, config.anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
  return supabaseClient;
}

function getAuth() {
  return readJson(appFile(AUTH_FILE));
}

function storeLocalAccess(username, password, previousAuth = null) {
  const salt = crypto.randomBytes(16).toString("hex");
  const auth = {
    username,
    salt,
    passwordHash: hashPassword(password, salt),
    createdAt: previousAuth?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  writeJson(appFile(AUTH_FILE), auth);

  if (!fs.existsSync(appFile(DATA_FILE))) {
    writeJson(appFile(DATA_FILE), encryptPayload({}, password, salt));
  }

  return auth;
}

function verifyCredentials(username, password) {
  const auth = getAuth();
  if (!auth) {
    return { ok: false, message: "No encrypted local cache is available yet." };
  }

  if (auth.username !== username) {
    return { ok: false, message: "Username not recognized in the local cache." };
  }

  const candidateHash = hashPassword(password, auth.salt);
  if (candidateHash !== auth.passwordHash) {
    return { ok: false, message: "Incorrect password." };
  }

  return { ok: true, auth };
}

function isLikelyNetworkError(message = "") {
  const text = String(message).toLowerCase();
  return [
    "fetch failed",
    "network",
    "timed out",
    "offline",
    "enotfound",
    "failed to fetch",
    "socket",
    "dns",
  ].some((pattern) => text.includes(pattern));
}

function isConfirmationError(message = "") {
  const text = String(message).toLowerCase();
  return [
    "email not confirmed",
    "email address not authorized",
    "confirm your email",
    "signup is disabled",
  ].some((pattern) => text.includes(pattern));
}

async function signInOnline(username, password) {
  const client = getSupabaseClient();
  if (!client) {
    return { ok: false, message: "Supabase is not configured yet. Add SUPABASE_URL and SUPABASE_ANON_KEY." };
  }

  const { data, error } = await client.auth.signInWithPassword({
    email: username,
    password,
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  onlineSession = {
    username,
    password,
    authenticated: true,
  };

  return {
    ok: true,
    username,
    user: data.user,
    session: data.session,
  };
}

async function ensureOnlineSession(username, password) {
  if (!hasSupabaseConfig()) {
    return {
      ok: false,
      authenticated: false,
      message: "Supabase is not configured yet.",
    };
  }

  if (onlineSession.authenticated && onlineSession.username === username) {
    return { ok: true, authenticated: true };
  }

  const online = await signInOnline(username, password);
  if (online.ok) {
    return { ok: true, authenticated: true };
  }

  return {
    ok: false,
    authenticated: false,
    message: online.message || "Cloud sync is unavailable right now.",
    network: isLikelyNetworkError(online.message),
    confirmation: isConfirmationError(online.message),
  };
}

async function performDesktopLogin(username, password) {
  if (!hasSupabaseConfig()) {
    const verification = verifyCredentials(username, password);
    if (!verification.ok) {
      consumeAuthFailure(username);
      return verification;
    }
    onlineSession = {
      username,
      password,
      authenticated: false,
    };
    clearAuthFailures(username);
    return { ok: true, username, password, offline: true, message: "Logged in successfully." };
  }

  const online = await signInOnline(username, password);
  if (online.ok) {
    clearAuthFailures(username);
    return { ok: true, username, password, offline: false, message: "Logged in successfully." };
  }

  consumeAuthFailure(username);
  return online;
}

async function signUpOnline(username, password) {
  const client = getSupabaseClient();
  if (!client) {
    return { ok: false, message: "Supabase is not configured yet. Add SUPABASE_URL and SUPABASE_ANON_KEY." };
  }

  const { data, error } = await client.auth.signUp({
    email: username,
    password,
    options: {
      data: {
        display_name: username.split("@")[0],
      },
    },
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  const hasSession = Boolean(data.session);
  if (hasSession) {
    onlineSession = {
      username,
      password,
      authenticated: true,
    };
  }

  return {
    ok: true,
    username,
    requiresConfirmation: !hasSession,
    message: hasSession
      ? "Account created."
      : "Account created. Check your email to confirm the account before first sign-in.",
  };
}

async function signOutOnline() {
  const client = getSupabaseClient();
  if (!client) return;
  try {
    await client.auth.signOut();
  } catch {
    // ignore sign-out cleanup failures
  }
  onlineSession = {
    username: "",
    password: "",
    authenticated: false,
  };
}

async function getWorkspaceSnapshot(client) {
  const config = getSupabaseConfig();
  let workspaceQuery = client
    .from("workspaces")
    .select("id")
    .order("created_at", { ascending: true })
    .limit(1);

  if (config.workspaceId) {
    workspaceQuery = workspaceQuery.eq("id", config.workspaceId);
  }

  const workspaceResult = await workspaceQuery.maybeSingle();
  if (workspaceResult.error) {
    return { ok: false, message: workspaceResult.error.message };
  }

  if (!workspaceResult.data?.id) {
    return {
      ok: false,
      message: config.workspaceId
        ? "This Supabase account does not have access to the configured shared workspace."
        : "No Supabase workspace is available for this account.",
    };
  }

  const snapshotResult = await client
    .from("workspace_snapshots")
    .select("id, workspace_id, payload, updated_at")
    .eq("workspace_id", workspaceResult.data.id)
    .maybeSingle();

  if (!snapshotResult.error) {
    if (!snapshotResult.data) {
      const insertResult = await client
        .from("workspace_snapshots")
        .insert({
          workspace_id: workspaceResult.data.id,
          payload: {},
          schema_version: 1,
        })
        .select("id, workspace_id, payload, updated_at")
        .single();

      if (insertResult.error) {
        return { ok: false, message: insertResult.error.message };
      }

      return { ok: true, snapshot: insertResult.data };
    }

    return { ok: true, snapshot: snapshotResult.data };
  }

  return { ok: false, message: snapshotResult.error.message };
}

async function loadRemoteWorkspace() {
  if (!onlineSession.authenticated) {
    return { ok: false, message: "No authenticated Supabase session is active." };
  }

  const client = getSupabaseClient();
  if (!client) {
    return { ok: false, message: "Supabase is not configured yet." };
  }

  const userResult = await client.auth.getUser();
  if (userResult.error || !userResult.data.user) {
    return { ok: false, message: userResult.error?.message || "Could not read the signed-in Supabase user." };
  }

  const snapshotResult = await getWorkspaceSnapshot(client);
  if (!snapshotResult.ok) {
    return snapshotResult;
  }

  return {
    ok: true,
    data: snapshotResult.snapshot.payload || {},
    remoteUpdatedAt: snapshotResult.snapshot.updated_at || "",
  };
}

async function saveRemoteWorkspace(data, lastKnownRemoteAt, force = false) {
  if (!onlineSession.authenticated) {
    return { ok: false, message: "No authenticated Supabase session is active." };
  }

  const client = getSupabaseClient();
  if (!client) {
    return { ok: false, message: "Supabase is not configured yet." };
  }

  const snapshotResult = await getWorkspaceSnapshot(client);
  if (!snapshotResult.ok) {
    return snapshotResult;
  }

  const snapshot = snapshotResult.snapshot;
  const remoteUpdatedAt = snapshot.updated_at || "";
  if (
    remoteUpdatedAt &&
    lastKnownRemoteAt &&
    remoteUpdatedAt !== lastKnownRemoteAt &&
    !force
  ) {
    return {
      ok: false,
      conflict: true,
      message: "The workspace was updated on another machine. Review the latest remote copy before overwriting it.",
      remoteUpdatedAt,
      remoteData: snapshot.payload || {},
    };
  }

  const updateResult = await client
    .from("workspace_snapshots")
    .update({
      payload: data,
      schema_version: 1,
      updated_at: new Date().toISOString(),
    })
    .eq("workspace_id", snapshot.workspace_id)
    .select("updated_at")
    .single();

  if (updateResult.error) {
    return { ok: false, message: updateResult.error.message };
  }

  return {
    ok: true,
    remoteUpdatedAt: updateResult.data.updated_at,
  };
}

function loadLocalWorkspace(username, password) {
  const verification = verifyCredentials(username, password);
  if (!verification.ok) {
    return verification;
  }

  const dataPath = appFile(DATA_FILE);
  if (!fs.existsSync(dataPath)) {
    return { ok: true, data: {} };
  }

  try {
    const encrypted = readJson(dataPath);
    const data = decryptPayload(encrypted, password, verification.auth.salt);
    return { ok: true, data };
  } catch {
    return { ok: false, message: "Encrypted local data could not be opened with this password." };
  }
}

function saveLocalWorkspace(username, password, data) {
  const currentAuth = getAuth();
  const auth = currentAuth?.username === username
    ? currentAuth
    : storeLocalAccess(username, password, currentAuth);

  writeJson(appFile(DATA_FILE), encryptPayload(data, password, auth.salt));
  return { ok: true };
}

ipcMain.handle("auth:status", () => {
  const auth = getAuth();
  const config = getSupabaseConfigInfo();
  const remembered = readRememberedLogin();
  const configured = Boolean(config.configured);
  return {
    hasAccess: configured ? false : Boolean(auth),
    username: configured ? remembered?.username || "" : auth?.username || "",
    configured,
    mode: configured ? "supabase" : "local",
    hasExternalConfig: Boolean(config.envPath),
    rememberedUsername: remembered?.username || "",
    canAutoLogin: Boolean(remembered?.username && remembered?.password),
  };
});

ipcMain.handle("auth:create", async (_event, payload) => {
  const username = String(payload?.username || "").trim();
  const password = String(payload?.password || "");
  const remember = Boolean(payload?.remember);
  const throttleMessage = getAuthThrottleMessage(username);
  if (throttleMessage) {
    return { ok: false, message: throttleMessage };
  }
  if (!username || password.length < 8) {
    consumeAuthFailure(username);
    return { ok: false, message: "Provide an email address and a password with at least 8 characters." };
  }

  if (!hasSupabaseConfig()) {
    storeLocalAccess(username, password);
    if (remember) {
      writeRememberedLogin(username, password);
    } else {
      clearRememberedLogin();
    }
    clearAuthFailures(username);
    return { ok: true, username, offlineOnly: true, message: "Account created." };
  }

  const signup = await signUpOnline(username, password);
  if (!signup.ok) {
    const login = await signInOnline(username, password);
    if (login.ok) {
      if (remember) {
        writeRememberedLogin(username, password);
      } else {
        clearRememberedLogin();
      }
      clearAuthFailures(username);
      return {
        ok: true,
        username,
        offline: false,
        message: "Account already exists. Logged in successfully.",
      };
    }
    consumeAuthFailure(username);
    return signup;
  }

  if (signup.requiresConfirmation) {
    clearRememberedLogin();
    clearAuthFailures(username);
    return signup;
  }

  if (remember) {
    writeRememberedLogin(username, password);
  } else {
    clearRememberedLogin();
  }
  clearAuthFailures(username);

  return signup;
});

ipcMain.handle("auth:login", async (_event, payload) => {
  const username = String(payload?.username || "").trim();
  const password = String(payload?.password || "");
  const remember = Boolean(payload?.remember);
  const throttleMessage = getAuthThrottleMessage(username);
  if (throttleMessage) {
    return { ok: false, message: throttleMessage };
  }

  const result = await performDesktopLogin(username, password);
  if (result.ok) {
    if (remember) {
      writeRememberedLogin(username, password);
    } else {
      clearRememberedLogin();
    }
  }
  return result;
});

ipcMain.handle("auth:auto-login", async () => {
  const remembered = readRememberedLogin();
  if (!remembered?.username || !remembered?.password) {
    return { ok: false, message: "No saved login details were found." };
  }

  const result = await performDesktopLogin(remembered.username, remembered.password);
  if (!result.ok) {
    clearRememberedLogin();
  }
  return result;
});

ipcMain.handle("auth:change-password", async (_event, payload) => {
  const username = String(payload?.username || "").trim();
  const currentPassword = String(payload?.currentPassword || "");
  const newPassword = String(payload?.newPassword || "");
  const throttleMessage = getAuthThrottleMessage(username);
  if (throttleMessage) {
    return { ok: false, message: throttleMessage };
  }

  if (newPassword.length < 8) {
    consumeAuthFailure(username);
    return { ok: false, message: "Use at least 8 characters for the new password." };
  }

  if (hasSupabaseConfig()) {
    const login = await signInOnline(username, currentPassword);
    if (!login.ok) {
      consumeAuthFailure(username);
      return login;
    }

    const client = getSupabaseClient();
    const updateResult = await client.auth.updateUser({ password: newPassword });
    if (updateResult.error) {
      return { ok: false, message: updateResult.error.message };
    }

    onlineSession = {
      username,
      password: newPassword,
      authenticated: true,
    };
    const remembered = readRememberedLogin();
    if (remembered?.username === username) {
      writeRememberedLogin(username, newPassword);
    }
    clearAuthFailures(username);
    return { ok: true, username };
  }

  const verification = verifyCredentials(username, currentPassword);
  if (!verification.ok) {
    consumeAuthFailure(username);
    return verification;
  }

  const currentDataResult = loadLocalWorkspace(username, currentPassword);
  const currentData = currentDataResult.ok ? currentDataResult.data : {};
  const previousAuth = getAuth();
  const previousSalt = previousAuth?.salt || "";
  const nextAuth = storeLocalAccess(username, newPassword, previousAuth);
  saveLocalWorkspace(username, newPassword, currentData);
  if (previousSalt) {
    migrateSecretsToNewPassword(username, currentPassword, newPassword, previousSalt, nextAuth.salt);
  }

  onlineSession = {
    username,
    password: newPassword,
    authenticated: false,
  };
  const remembered = readRememberedLogin();
  if (remembered?.username === username) {
    writeRememberedLogin(username, newPassword);
  }
  clearAuthFailures(username);
  return { ok: true, username };
});

ipcMain.handle("auth:reset", async () => {
  await signOutOnline();

  const authPath = appFile(AUTH_FILE);
  const dataPath = appFile(DATA_FILE);
  if (fs.existsSync(authPath)) fs.unlinkSync(authPath);
  if (fs.existsSync(dataPath)) fs.unlinkSync(dataPath);
  clearRememberedLogin();
  const companySecretsPath = getLegacySecretsWritePath();
  const personSecretsPath = getPersonSecretsWritePath();
  if (fs.existsSync(companySecretsPath)) fs.unlinkSync(companySecretsPath);
  if (fs.existsSync(personSecretsPath)) fs.unlinkSync(personSecretsPath);
  return { ok: true };
});

ipcMain.handle("data:load", async (_event, payload) => {
  const username = String(payload?.username || "").trim();
  const password = String(payload?.password || "");

  if (hasSupabaseConfig()) {
    const onlineStatus = await ensureOnlineSession(username, password);
    if (!onlineStatus.authenticated) {
      return {
        ok: false,
        message: onlineStatus.message || "Cloud sign-in is required to open this workspace.",
      };
    }

    const remote = await loadRemoteWorkspace();
    if (remote.ok) {
      const remoteData = remote.data || {};
      return {
        ok: true,
        data: remoteData,
        source: "remote",
        remoteUpdatedAt: remote.remoteUpdatedAt || "",
      };
    }

    return remote;
  }

  const local = loadLocalWorkspace(username, password);
  if (local.ok) {
    return {
      ok: true,
      data: local.data || {},
      source: "local",
      remoteUpdatedAt: "",
      offline: true,
      message: "",
    };
  }

  return local;
});

ipcMain.handle("data:save", async (_event, payload) => {
  const username = String(payload?.username || "").trim();
  const password = String(payload?.password || "");
  const data = payload?.data || {};
  const lastKnownRemoteAt = String(payload?.lastKnownRemoteAt || "");
  const force = Boolean(payload?.force);

  if (hasSupabaseConfig()) {
    const onlineStatus = await ensureOnlineSession(username, password);
    if (!onlineStatus.authenticated) {
      return {
        ok: false,
        message: onlineStatus.message || "Cloud sign-in is required before saving this workspace.",
        localSaved: false,
      };
    }

    const remote = await saveRemoteWorkspace(data, lastKnownRemoteAt, force);
    if (!remote.ok) {
      return {
        ok: false,
        conflict: Boolean(remote.conflict),
        message: remote.message,
        remoteUpdatedAt: remote.remoteUpdatedAt || "",
        remoteData: remote.remoteData || null,
        localSaved: false,
      };
    }

    return {
      ok: true,
      localSaved: false,
      remoteUpdatedAt: remote.remoteUpdatedAt || "",
      source: "remote",
    };
  }

  const local = saveLocalWorkspace(username, password, data);
  if (!local.ok) {
    return local;
  }

  return {
    ok: true,
    localSaved: true,
    remoteUpdatedAt: "",
    source: "local",
    offline: true,
    message: "",
  };
});

ipcMain.handle("app:meta", () => {
  const config = getSupabaseConfigInfo();
  return {
    appName: app.getName(),
    version: app.getVersion(),
    packaged: app.isPackaged,
    configured: config.configured,
    hasExternalConfig: Boolean(config.envPath),
    updateState,
  };
});

ipcMain.handle("secrets:legacy-company", () => {
  if (!onlineSession.username || !onlineSession.password) {
    return {};
  }
  return readLegacyCompanySecretsForSession(onlineSession.username, onlineSession.password);
});

ipcMain.handle("secrets:legacy-company-record", (_event, payload) => {
  const companyId = String(payload?.companyId || "").trim();
  const username = String(payload?.username || "").trim();
  const password = String(payload?.password || "");
  const session = verifyDesktopSession(username, password);
  if (!session.ok || !companyId) {
    return {};
  }

  const secrets = readLegacyCompanySecretsForSession(username, password);
  return secrets[companyId] || {};
});

ipcMain.handle("secrets:save-company-record", (_event, payload) => {
  const companyId = String(payload?.companyId || "").trim();
  const username = String(payload?.username || "").trim();
  const password = String(payload?.password || "");
  const session = verifyDesktopSession(username, password);
  if (!session.ok || !companyId) {
    return { ok: false, message: session.message || "A signed-in desktop session is required." };
  }

  const incoming = payload?.secrets && typeof payload.secrets === "object" ? payload.secrets : {};
  const sanitized = Object.entries(incoming).reduce((accumulator, [key, value]) => {
    const text = String(value || "").trim();
    if (text) accumulator[key] = text;
    return accumulator;
  }, {});

  const secrets = readLegacyCompanySecretsForSession(username, password);
  if (Object.keys(sanitized).length) {
    secrets[companyId] = sanitized;
  } else {
    delete secrets[companyId];
  }
  writeLegacyCompanySecretsForSession(username, password, secrets);
  return { ok: true };
});

ipcMain.handle("secrets:self-employed-record", (_event, payload) => {
  const personId = String(payload?.personId || "").trim();
  const username = String(payload?.username || "").trim();
  const password = String(payload?.password || "");
  const session = verifyDesktopSession(username, password);
  if (!session.ok || !personId) {
    return {};
  }

  const secrets = readPersonSecretsForSession(username, password);
  return secrets[personId] || {};
});

ipcMain.handle("secrets:save-self-employed-record", (_event, payload) => {
  const personId = String(payload?.personId || "").trim();
  const username = String(payload?.username || "").trim();
  const password = String(payload?.password || "");
  const session = verifyDesktopSession(username, password);
  if (!session.ok || !personId) {
    return { ok: false, message: session.message || "A signed-in desktop session is required." };
  }

  const incoming = payload?.secrets && typeof payload.secrets === "object" ? payload.secrets : {};
  const sanitized = Object.entries(incoming).reduce((accumulator, [key, value]) => {
    const text = String(value || "").trim();
    if (text) accumulator[key] = text;
    return accumulator;
  }, {});

  const secrets = readPersonSecretsForSession(username, password);
  if (Object.keys(sanitized).length) {
    secrets[personId] = sanitized;
  } else {
    delete secrets[personId];
  }
  writePersonSecretsForSession(username, password, secrets);
  return { ok: true };
});

ipcMain.handle("backup:export", async (_event, payload) => {
  const username = String(payload?.username || "").trim();
  const password = String(payload?.password || "");
  const backup = buildBackupPackage(username, password);
  if (!backup.ok) {
    return backup;
  }

  const result = await dialog.showSaveDialog({
    title: "Export encrypted backup",
    defaultPath: `aligned-financials-backup-${new Date().toISOString().slice(0, 10)}.${BACKUP_FILE_EXTENSION}`,
    filters: [{ name: "Aligned Financials Backup", extensions: [BACKUP_FILE_EXTENSION] }],
  });

  if (result.canceled || !result.filePath) {
    return { ok: false, cancelled: true };
  }

  const encrypted = {
    format: "aligned-financials-backup-file-v1",
    createdAt: backup.payload.createdAt,
    payload: encryptPayload(backup.payload, password, backup.salt),
  };
  fs.writeFileSync(result.filePath, `${JSON.stringify(encrypted, null, 2)}\n`, "utf8");
  return { ok: true, filePath: result.filePath };
});

ipcMain.handle("backup:import", async (_event, payload) => {
  const username = String(payload?.username || "").trim();
  const password = String(payload?.password || "");
  const verification = verifyDesktopSession(username, password);
  if (!verification.ok) {
    return verification;
  }

  const result = await dialog.showOpenDialog({
    title: "Restore encrypted backup",
    filters: [{ name: "Aligned Financials Backup", extensions: [BACKUP_FILE_EXTENSION] }],
    properties: ["openFile"],
  });

  if (result.canceled || !result.filePaths?.[0]) {
    return { ok: false, cancelled: true };
  }

  try {
    const raw = JSON.parse(fs.readFileSync(result.filePaths[0], "utf8"));
    const payloadValue = isEncryptedStore({
      format: ENCRYPTED_STORE_FORMAT,
      payload: raw?.payload,
    })
      ? decryptPayload(raw.payload, password, verification.auth.salt)
      : null;
    if (!payloadValue || payloadValue.format !== "aligned-financials-backup-v1") {
      return { ok: false, message: "That backup file is not valid for this workspace." };
    }

    saveLocalWorkspace(username, password, payloadValue.workspace || {});
    writeLegacyCompanySecretsForSession(username, password, payloadValue.companySecrets || {});
    writePersonSecretsForSession(username, password, payloadValue.personSecrets || {});
    return {
      ok: true,
      restoredAt: new Date().toISOString(),
      filePath: result.filePaths[0],
      data: payloadValue.workspace || {},
    };
  } catch {
    return { ok: false, message: "The backup file could not be restored with the current password." };
  }
});

ipcMain.handle("updates:state", () => updateState);

ipcMain.handle("updates:check", async () => runUpdateCheck("manual"));

ipcMain.handle("updates:install", async () => {
  if (!updateState.updateDownloaded) {
    return { ok: false, message: "No downloaded update is ready to install yet." };
  }
  autoUpdater.quitAndInstall();
  return { ok: true };
});

ipcMain.handle("exports:save-file", async (_event, payload) => {
  const suggestedName = String(payload?.suggestedName || "aligned-financials-export.txt");
  const title = String(payload?.title || "Save export");
  const content = String(payload?.content || "");
  const filters = Array.isArray(payload?.filters) ? payload.filters : [];

  const result = await dialog.showSaveDialog({
    title,
    defaultPath: suggestedName,
    filters,
  });

  if (result.canceled || !result.filePath) {
    return { ok: false, cancelled: true };
  }

  fs.writeFileSync(result.filePath, content, "utf8");
  return { ok: true, filePath: result.filePath };
});

ipcMain.handle("exports:save-pdf", async (_event, payload) => {
  const suggestedName = String(payload?.suggestedName || "aligned-financials-export.pdf");
  const title = String(payload?.title || "Save PDF");
  const html = String(payload?.html || "");

  const result = await dialog.showSaveDialog({
    title,
    defaultPath: suggestedName,
    filters: [{ name: "PDF", extensions: ["pdf"] }],
  });

  if (result.canceled || !result.filePath) {
    return { ok: false, cancelled: true };
  }

  const exportWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      sandbox: false,
    },
  });

  try {
    await exportWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
    const pdf = await exportWindow.webContents.printToPDF({
      printBackground: true,
      preferCSSPageSize: true,
      pageSize: "A4",
    });
    fs.writeFileSync(result.filePath, pdf);
    return { ok: true, filePath: result.filePath };
  } finally {
    if (!exportWindow.isDestroyed()) {
      exportWindow.destroy();
    }
  }
});

app.whenReady().then(() => {
  createWindow();
  setupAutoUpdates();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
