const { app, BrowserWindow, shell, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const AUTH_FILE = "aligned-auth.json";
const DATA_FILE = "aligned-data.enc";
const ENV_FILE = ".env";

let supabaseClient = null;
let onlineSession = {
  username: "",
  password: "",
  authenticated: false,
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
      sandbox: false,
    },
  });

  window.loadFile(path.join(__dirname, "app", "index.html"));

  window.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
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

function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, Buffer.from(salt, "hex"), 150000, 32, "sha256").toString("hex");
}

function parseEnvFile() {
  const envPath = path.join(__dirname, ENV_FILE);
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

function getSupabaseConfig() {
  const fileConfig = parseEnvFile();
  return {
    url: process.env.SUPABASE_URL || fileConfig.SUPABASE_URL || "",
    anonKey: process.env.SUPABASE_ANON_KEY || fileConfig.SUPABASE_ANON_KEY || "",
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
  const snapshotResult = await client
    .from("workspace_snapshots")
    .select("id, workspace_id, payload, updated_at")
    .single();

  if (!snapshotResult.error) {
    return { ok: true, snapshot: snapshotResult.data };
  }

  if (snapshotResult.error.code !== "PGRST116") {
    return { ok: false, message: snapshotResult.error.message };
  }

  const workspaceResult = await client
    .from("workspaces")
    .select("id")
    .single();

  if (workspaceResult.error) {
    return { ok: false, message: workspaceResult.error.message };
  }

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
  return {
    hasAccess: Boolean(auth),
    username: auth?.username || "",
    configured: hasSupabaseConfig(),
    mode: hasSupabaseConfig() ? "supabase" : "local",
  };
});

ipcMain.handle("auth:create", async (_event, payload) => {
  const username = String(payload?.username || "").trim();
  const password = String(payload?.password || "");
  if (!username || password.length < 8) {
    return { ok: false, message: "Provide an email address and a password with at least 8 characters." };
  }

  if (!hasSupabaseConfig()) {
    storeLocalAccess(username, password);
    return { ok: true, username, offlineOnly: true, message: "Account created." };
  }

  const signup = await signUpOnline(username, password);
  if (!signup.ok) {
    const login = await signInOnline(username, password);
    if (login.ok) {
      storeLocalAccess(username, password, getAuth());
      return {
        ok: true,
        username,
        offline: false,
        message: "Account already exists. Logged in successfully.",
      };
    }
    return signup;
  }

  // Keep the local encrypted access in step with account creation so the user can
  // reopen the same workspace reliably even if email confirmation is enabled.
  storeLocalAccess(username, password, getAuth());

  return signup;
});

ipcMain.handle("auth:login", async (_event, payload) => {
  const username = String(payload?.username || "").trim();
  const password = String(payload?.password || "");

  if (!hasSupabaseConfig()) {
    const verification = verifyCredentials(username, password);
    if (!verification.ok) return verification;
    onlineSession = {
      username,
      password,
      authenticated: false,
    };
    return { ok: true, username, offline: true, message: "Logged in successfully." };
  }

  const online = await signInOnline(username, password);
  if (online.ok) {
    storeLocalAccess(username, password, getAuth());
    return { ok: true, username, offline: false, message: "Logged in successfully." };
  }

  const localFallback = verifyCredentials(username, password);
  if (localFallback.ok && isLikelyNetworkError(online.message)) {
    onlineSession = {
      username,
      password,
      authenticated: false,
    };
    return {
      ok: true,
      username,
      offline: true,
      message: "Cloud sync is unavailable right now. Opened the saved local workspace instead.",
    };
  }

  if (localFallback.ok && isConfirmationError(online.message)) {
    onlineSession = {
      username,
      password,
      authenticated: false,
    };
    return {
      ok: true,
      username,
      offline: true,
      message: "Email confirmation is still pending. Opened the saved local workspace for now.",
    };
  }

  return online;
});

ipcMain.handle("auth:change-password", async (_event, payload) => {
  const username = String(payload?.username || "").trim();
  const currentPassword = String(payload?.currentPassword || "");
  const newPassword = String(payload?.newPassword || "");

  if (newPassword.length < 8) {
    return { ok: false, message: "Use at least 8 characters for the new password." };
  }

  if (hasSupabaseConfig()) {
    const login = await signInOnline(username, currentPassword);
    if (!login.ok) {
      return login;
    }

    const client = getSupabaseClient();
    const updateResult = await client.auth.updateUser({ password: newPassword });
    if (updateResult.error) {
      return { ok: false, message: updateResult.error.message };
    }
  } else {
    const verification = verifyCredentials(username, currentPassword);
    if (!verification.ok) {
      return verification;
    }
  }

  const currentDataResult = loadLocalWorkspace(username, currentPassword);
  const currentData = currentDataResult.ok ? currentDataResult.data : {};
  storeLocalAccess(username, newPassword, getAuth());
  saveLocalWorkspace(username, newPassword, currentData);
  onlineSession = {
    username,
    password: newPassword,
    authenticated: hasSupabaseConfig(),
  };
  return { ok: true, username };
});

ipcMain.handle("auth:reset", async () => {
  await signOutOnline();

  const authPath = appFile(AUTH_FILE);
  const dataPath = appFile(DATA_FILE);
  if (fs.existsSync(authPath)) fs.unlinkSync(authPath);
  if (fs.existsSync(dataPath)) fs.unlinkSync(dataPath);
  return { ok: true };
});

ipcMain.handle("data:load", async (_event, payload) => {
  const username = String(payload?.username || "").trim();
  const password = String(payload?.password || "");

  const local = loadLocalWorkspace(username, password);

  if (hasSupabaseConfig() && onlineSession.authenticated && onlineSession.username === username) {
    const remote = await loadRemoteWorkspace();
    if (remote.ok) {
      saveLocalWorkspace(username, password, remote.data || {});
      return {
        ok: true,
        data: remote.data || {},
        source: "remote",
        remoteUpdatedAt: remote.remoteUpdatedAt || "",
      };
    }

    if (local.ok) {
      return {
        ok: true,
        data: local.data || {},
        source: "local",
        remoteUpdatedAt: "",
        offline: true,
        message: remote.message,
      };
    }

    return remote;
  }

  if (local.ok) {
    return {
      ok: true,
      data: local.data || {},
      source: "local",
      remoteUpdatedAt: "",
      offline: true,
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

  const local = saveLocalWorkspace(username, password, data);
  if (!local.ok) {
    return local;
  }

  if (hasSupabaseConfig() && onlineSession.authenticated && onlineSession.username === username) {
    const remote = await saveRemoteWorkspace(data, lastKnownRemoteAt, force);
    if (!remote.ok) {
      return {
        ok: false,
        conflict: Boolean(remote.conflict),
        message: remote.message,
        remoteUpdatedAt: remote.remoteUpdatedAt || "",
        remoteData: remote.remoteData || null,
        localSaved: true,
      };
    }

    return {
      ok: true,
      localSaved: true,
      remoteUpdatedAt: remote.remoteUpdatedAt || "",
      source: "remote",
    };
  }

  return {
    ok: true,
    localSaved: true,
    remoteUpdatedAt: "",
    source: "local",
    offline: true,
  };
});

app.whenReady().then(() => {
  createWindow();

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
