import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function read(relativePath) {
  return readFileSync(path.join(root, relativePath), "utf8");
}

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

test("the current App Router does not contain file-operation API handlers", () => {
  const appFiles = walk(path.join(root, "app"));
  const handlers = appFiles.filter((file) => /^route\.(ts|tsx|js|jsx)$/.test(path.basename(file)));
  assert.deepEqual(handlers, []);
});

test("login is explicitly a browser-side demo role selector", () => {
  const login = read("components/login-form.tsx");
  assert.match(login, /localStorage\.setItem\(["']userRole["']/);
  assert.match(login, /setTimeout/);
  assert.doesNotMatch(login, /fetch\s*\(/);
  assert.match(login, /Demo access only/i);
});

test("dashboard layout uses local role state rather than a server session", () => {
  const layout = read("app/dashboard/layout.tsx");
  assert.match(layout, /localStorage\.getItem\(["']userRole["']/);
  assert.match(layout, /router\.push\(["']\/["']/);
});

test("upload is a simulation and not a byte-transfer implementation", () => {
  const upload = read("app/dashboard/upload/page.tsx");
  assert.match(upload, /setTimeout/);
  assert.doesNotMatch(upload, /fetch\s*\(/);
  assert.doesNotMatch(upload, /FormData/);
  assert.match(upload, /does not upload or store file content/i);
});

test("file display pages use the known mock fixture module", () => {
  const dashboard = read("app/dashboard/page.tsx");
  const users = read("app/dashboard/manage-users/page.tsx");
  const fixtures = read("lib/mock-data.ts");

  assert.match(fixtures, /export const mockFiles/);
  assert.match(fixtures, /export const mockUsers/);
  assert.match(fixtures, /export const mockFolders/);
  assert.match(dashboard, /from ["']@\/lib\/mock-data["']/);
  assert.match(users, /from ["']@\/lib\/mock-data["']/);
});

test("preview is placeholder-based and does not fetch document bytes", () => {
  const preview = read("components/file-preview-dialog.tsx");
  assert.match(preview, /placeholder\.svg/);
  assert.match(preview, /renderPreview/);
  assert.doesNotMatch(preview, /fetch\s*\(/);
});

test("activity and analytics are not represented as a live audit pipeline", () => {
  const activity = read("components/recent-activity.tsx");
  const analytics = read("app/dashboard/analytics/page.tsx");

  assert.match(activity, /const activities = \[/);
  assert.match(analytics, /monthlyUploadsData/);
  assert.match(analytics, /Active Users/);
});

test("application copy explicitly labels the UI-only prototype", () => {
  const home = read("app/page.tsx");
  const metadata = read("app/layout.tsx");
  const login = read("components/login-form.tsx");

  assert.match(home, /No real files are uploaded, stored, or encrypted/i);
  assert.match(metadata, /UI prototype/i);
  assert.match(login, /Email and password are not verified/i);
});

test("package scripts include explicit type and repository checks", () => {
  const pkg = JSON.parse(read("package.json"));
  assert.equal(pkg.scripts.typecheck, "tsc --noEmit");
  assert.equal(pkg.scripts.test, "node --test tests/*.test.mjs");
  assert.equal(pkg.packageManager.split("@")[1].split("+")[0], "10.6.5");
});

test("environment files remain ignored except the example template", () => {
  const gitignore = read(".gitignore");
  const lines = gitignore.split(String.fromCharCode(10));
  assert.ok(lines.includes(".env"));
  assert.ok(lines.includes(".env.*"));
  assert.ok(lines.includes("!.env.example"));
});

test("deep technical documentation covers the production trust boundaries", () => {
  for (const file of [
    "docs/ROUTES.md",
    "docs/COMPONENT-REFERENCE.md",
    "docs/DATA-MODEL.md",
    "docs/AUTHENTICATION-AUTHORIZATION.md",
    "docs/UPLOAD-AND-STORAGE.md",
    "docs/THREAT-MODEL.md",
    "docs/OPERATIONS-PRIVACY.md",
  ]) {
    assert.ok(existsSync(path.join(root, file)), `Missing documentation: ${file}`);
  }
});
