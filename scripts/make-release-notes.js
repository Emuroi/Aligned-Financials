const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const version = packageJson.version;

let commits = [];

try {
  commits = execSync("git log --pretty=format:%s -n 12", { cwd: root, encoding: "utf8" })
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
} catch {
  commits = ["Release notes could not read local git history."];
}

const content = [
  `# Aligned Financials ${version}`,
  "",
  "## Highlights",
  ...commits.map((line) => `- ${line}`),
  "",
  "## Release Checklist",
  "- Bump version before publishing.",
  "- Confirm the external `.env` is present on the target machine if cloud sync is needed.",
  "- Build with `npm run dist:installer` or publish with `npm run dist:publish`.",
  "- Install the new `.exe` over the existing app on client machines.",
  "",
].join("\n");

fs.mkdirSync(distDir, { recursive: true });
const filePath = path.join(distDir, `release-notes-v${version}.md`);
fs.writeFileSync(filePath, content, "utf8");

console.log(filePath);
