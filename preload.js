const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("alignedDesktop", {
  platform: process.platform,
  isDesktop: true,
});
