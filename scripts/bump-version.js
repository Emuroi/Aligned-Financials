const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const packageJsonPath = path.join(root, "package.json");
const packageLockPath = path.join(root, "package-lock.json");
const releaseType = process.argv[2] || "patch";

function bump(version, type) {
  const parts = String(version).split(".").map((value) => Number(value) || 0);
  while (parts.length < 3) parts.push(0);

  if (type === "major") {
    return `${parts[0] + 1}.0.0`;
  }

  if (type === "minor") {
    return `${parts[0]}.${parts[1] + 1}.0`;
  }

  return `${parts[0]}.${parts[1]}.${parts[2] + 1}`;
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const nextVersion = bump(packageJson.version, releaseType);
packageJson.version = nextVersion;
writeJson(packageJsonPath, packageJson);

if (fs.existsSync(packageLockPath)) {
  const packageLock = JSON.parse(fs.readFileSync(packageLockPath, "utf8"));
  packageLock.version = nextVersion;
  if (packageLock.packages?.[""]) {
    packageLock.packages[""].version = nextVersion;
  }
  writeJson(packageLockPath, packageLock);
}

console.log(nextVersion);
