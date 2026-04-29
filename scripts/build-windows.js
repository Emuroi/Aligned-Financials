const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const builder = path.join(root, "node_modules", ".bin", process.platform === "win32" ? "electron-builder.cmd" : "electron-builder");
const shouldPublish = process.argv.includes("--publish");
const args = ["--win", "nsis"];

if (shouldPublish) {
  args.push("--publish", "always");
}

const env = {
  ...process.env,
  CSC_IDENTITY_AUTO_DISCOVERY: process.env.CSC_IDENTITY_AUTO_DISCOVERY || "false",
};

const cacheHint = path.join(process.env.LOCALAPPDATA || "", "electron-builder", "Cache", "winCodeSign");

if (!fs.existsSync(builder)) {
  console.error("electron-builder is not installed. Run npm install first.");
  process.exit(1);
}

const child = spawn(builder, args, {
  cwd: root,
  env,
  stdio: "inherit",
  shell: false,
});

child.on("exit", (code) => {
  if (code === 0) {
    process.exit(0);
  }

  console.error("");
  console.error("Windows build failed.");
  console.error("If the error mentioned symbolic links or 'A required privilege is not held by the client':");
  console.error("1. Turn on Windows Developer Mode.");
  console.error("2. Re-open PowerShell.");
  console.error(`3. Clear the winCodeSign cache at: ${cacheHint}`);
  console.error("4. Run this script again, or run PowerShell as Administrator if needed.");
  process.exit(code || 1);
});
