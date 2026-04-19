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
});
