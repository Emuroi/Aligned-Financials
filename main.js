const { app, BrowserWindow, shell, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const AUTH_FILE = "aligned-auth.json";
const DATA_FILE = "aligned-data.enc";

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

function getAuth() {
  return readJson(appFile(AUTH_FILE));
}

function verifyCredentials(username, password) {
  const auth = getAuth();
  if (!auth) {
    return { ok: false, message: "No local access has been configured." };
  }

  if (auth.username !== username) {
    return { ok: false, message: "Username not recognized." };
  }

  const candidateHash = hashPassword(password, auth.salt);
  if (candidateHash !== auth.passwordHash) {
    return { ok: false, message: "Incorrect password." };
  }

  return { ok: true, auth };
}

ipcMain.handle("auth:status", () => {
  const auth = getAuth();
  return {
    hasAccess: Boolean(auth),
    username: auth?.username || "",
  };
});

ipcMain.handle("auth:create", (_event, payload) => {
  const username = String(payload?.username || "").trim();
  const password = String(payload?.password || "");
  if (!username || password.length < 8) {
    return { ok: false, message: "Provide a username and a password with at least 8 characters." };
  }

  const salt = crypto.randomBytes(16).toString("hex");
  const auth = {
    username,
    salt,
    passwordHash: hashPassword(password, salt),
    createdAt: new Date().toISOString(),
  };
  writeJson(appFile(AUTH_FILE), auth);

  if (!fs.existsSync(appFile(DATA_FILE))) {
    const encrypted = encryptPayload({}, password, salt);
    writeJson(appFile(DATA_FILE), encrypted);
  }

  return { ok: true, username };
});

ipcMain.handle("auth:login", (_event, payload) => {
  const username = String(payload?.username || "").trim();
  const password = String(payload?.password || "");
  const verification = verifyCredentials(username, password);
  if (!verification.ok) {
    return verification;
  }
  return { ok: true, username };
});

ipcMain.handle("auth:change-password", (_event, payload) => {
  const username = String(payload?.username || "").trim();
  const currentPassword = String(payload?.currentPassword || "");
  const newPassword = String(payload?.newPassword || "");

  if (newPassword.length < 8) {
    return { ok: false, message: "Use at least 8 characters for the new password." };
  }

  const verification = verifyCredentials(username, currentPassword);
  if (!verification.ok) {
    return verification;
  }

  let currentData = {};
  const dataPath = appFile(DATA_FILE);
  if (fs.existsSync(dataPath)) {
    currentData = decryptPayload(readJson(dataPath), currentPassword, verification.auth.salt);
  }

  const newSalt = crypto.randomBytes(16).toString("hex");
  const nextAuth = {
    username,
    salt: newSalt,
    passwordHash: hashPassword(newPassword, newSalt),
    createdAt: verification.auth.createdAt,
    updatedAt: new Date().toISOString(),
  };
  writeJson(appFile(AUTH_FILE), nextAuth);
  writeJson(dataPath, encryptPayload(currentData, newPassword, newSalt));
  return { ok: true, username };
});

ipcMain.handle("auth:reset", () => {
  const authPath = appFile(AUTH_FILE);
  const dataPath = appFile(DATA_FILE);
  if (fs.existsSync(authPath)) fs.unlinkSync(authPath);
  if (fs.existsSync(dataPath)) fs.unlinkSync(dataPath);
  return { ok: true };
});

ipcMain.handle("data:load", (_event, payload) => {
  const username = String(payload?.username || "").trim();
  const password = String(payload?.password || "");
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
    return { ok: false, message: "Encrypted data could not be opened with this password." };
  }
});

ipcMain.handle("data:save", (_event, payload) => {
  const username = String(payload?.username || "").trim();
  const password = String(payload?.password || "");
  const data = payload?.data || {};
  const verification = verifyCredentials(username, password);
  if (!verification.ok) {
    return verification;
  }

  writeJson(appFile(DATA_FILE), encryptPayload(data, password, verification.auth.salt));
  return { ok: true };
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
