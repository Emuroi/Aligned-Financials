const { app, BrowserWindow, shell } = require("electron");
const path = require("path");

function createWindow() {
  const window = new BrowserWindow({
    width: 1560,
    height: 980,
    minWidth: 1280,
    minHeight: 820,
    backgroundColor: "#09090b",
    autoHideMenuBar: true,
    title: "Aligned Financials",
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
