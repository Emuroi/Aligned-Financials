const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("alignedDesktop", {
  platform: process.platform,
  isDesktop: true,
  authStatus: () => ipcRenderer.invoke("auth:status"),
  createAccess: (payload) => ipcRenderer.invoke("auth:create", payload),
  login: (payload) => ipcRenderer.invoke("auth:login", payload),
  changePassword: (payload) => ipcRenderer.invoke("auth:change-password", payload),
  resetAccess: () => ipcRenderer.invoke("auth:reset"),
  saveData: (payload) => ipcRenderer.invoke("data:save", payload),
  loadData: (payload) => ipcRenderer.invoke("data:load", payload),
  appMeta: () => ipcRenderer.invoke("app:meta"),
  getLegacyCompanySecrets: () => ipcRenderer.invoke("secrets:legacy-company"),
  getLegacyCompanySecretRecord: (payload) => ipcRenderer.invoke("secrets:legacy-company-record", payload),
  saveLegacyCompanySecretRecord: (payload) => ipcRenderer.invoke("secrets:save-company-record", payload),
  getSelfEmployedSecretRecord: (payload) => ipcRenderer.invoke("secrets:self-employed-record", payload),
  saveSelfEmployedSecretRecord: (payload) => ipcRenderer.invoke("secrets:save-self-employed-record", payload),
  getUpdateState: () => ipcRenderer.invoke("updates:state"),
  checkForUpdates: () => ipcRenderer.invoke("updates:check"),
  installUpdateNow: () => ipcRenderer.invoke("updates:install"),
  exportEncryptedBackup: (payload) => ipcRenderer.invoke("backup:export", payload),
  importEncryptedBackup: (payload) => ipcRenderer.invoke("backup:import", payload),
  saveExportFile: (payload) => ipcRenderer.invoke("exports:save-file", payload),
  saveExportPdf: (payload) => ipcRenderer.invoke("exports:save-pdf", payload),
  onUpdateStatus: (callback) => {
    const listener = (_event, payload) => callback(payload);
    ipcRenderer.on("app:update-status", listener);
    return () => ipcRenderer.removeListener("app:update-status", listener);
  },
});
