import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const componentsDir = path.join(rootDir, "src", "components");
const packageJsonPath = path.join(rootDir, "package.json");
const rootIndexPath = path.join(rootDir, "src", "index.ts");
const mainScssPath = path.join(rootDir, "src", "styles", "main.scss");
const spacingScssPath = path.join(rootDir, "src", "styles", "_spacing.scss");
const devEntryPath = path.join(rootDir, "src", "dev.ts");

const issues = [];

function addIssue(message) {
  issues.push(message);
}

function readText(filePath) {
  return readFileSync(filePath, "utf8");
}

function getComponentDirectories() {
  if (!existsSync(componentsDir)) {
    addIssue("Missing src/components directory.");

    return [];
  }

  return readdirSync(componentsDir)
    .map(name => path.join(componentsDir, name))
    .filter(entryPath => statSync(entryPath).isDirectory())
    .sort((left, right) => left.localeCompare(right));
}

function validateComponentDirectory(componentDir) {
  const componentName = path.basename(componentDir);
  const expectedVueFile = path.join(componentDir, `${componentName}.vue`);
  const expectedIndexFile = path.join(componentDir, "index.ts");
  const expectedTypesFile = path.join(componentDir, "types.ts");
  const expectedStoryFile = path.join(componentDir, `${componentName}.stories.ts`);

  if (!componentName.startsWith("Pz")) {
    addIssue(`Component directory "${componentName}" must use the Pz prefix.`);
  }

  if (!existsSync(expectedVueFile)) {
    addIssue(`Component "${componentName}" is missing ${componentName}.vue.`);
  }

  if (!existsSync(expectedIndexFile)) {
    addIssue(`Component "${componentName}" is missing index.ts.`);
  }

  if (!existsSync(expectedTypesFile)) {
    addIssue(`Component "${componentName}" is missing types.ts.`);
  }

  if (!existsSync(expectedStoryFile)) {
    addIssue(`Component "${componentName}" is missing ${componentName}.stories.ts.`);
  }

  if (existsSync(expectedVueFile)) {
    validateVueComponentFile(componentName, expectedVueFile);
  }

  if (existsSync(expectedTypesFile)) {
    validateTypesFile(componentName, expectedTypesFile);
  }

  if (existsSync(expectedIndexFile)) {
    validateComponentIndexFile(componentName, componentDir, expectedIndexFile);
  }
}

function validateVueComponentFile(componentName, filePath) {
  const source = readText(filePath);

  if (!source.includes('<script setup lang="ts">')) {
    addIssue(`${path.relative(rootDir, filePath)} must use <script setup lang="ts">.`);
  }

  const expectedDefineOptions = `name: "${componentName}"`;

  if (!source.includes(expectedDefineOptions)) {
    addIssue(`${path.relative(rootDir, filePath)} should declare defineOptions name "${componentName}".`);
  }
}

function validateTypesFile(componentName, filePath) {
  const source = readText(filePath);
  const exportMatches = [...source.matchAll(/export\s+(?:type|interface)\s+([A-Za-z0-9_]+)/g)];

  if (exportMatches.length === 0) {
    addIssue(`${path.relative(rootDir, filePath)} should export public types or interfaces.`);

    return;
  }

  for (const [, exportName] of exportMatches) {
    if (!exportName.startsWith(componentName)) {
      addIssue(
        `${path.relative(rootDir, filePath)} exports "${exportName}", but public component types must be prefixed with "${componentName}".`,
      );
    }
  }
}

function getPublicVueComponentNames(componentDir) {
  return readdirSync(componentDir)
    .filter(name => name.endsWith(".vue"))
    .map(name => path.basename(name, ".vue"))
    .filter(name => name.startsWith("Pz"))
    .sort((left, right) => left.localeCompare(right));
}

function validateComponentIndexFile(componentName, componentDir, filePath) {
  const source = readText(filePath);
  const expectedComponentExport = `export { default as ${componentName} } from "./${componentName}.vue";`;

  if (!source.includes(expectedComponentExport)) {
    addIssue(`${path.relative(rootDir, filePath)} should re-export ${componentName} from ./${componentName}.vue.`);
  }

  for (const publicComponentName of getPublicVueComponentNames(componentDir)) {
    const expectedExport = `export { default as ${publicComponentName} } from "./${publicComponentName}.vue";`;

    if (!source.includes(expectedExport)) {
      addIssue(
        `${path.relative(rootDir, filePath)} should re-export ${publicComponentName} from ./${publicComponentName}.vue.`,
      );
    }
  }

  if (!source.includes('from "./types"')) {
    addIssue(`${path.relative(rootDir, filePath)} should re-export public types from ./types.`);
  }
}

function validateRootExports() {
  if (!existsSync(rootIndexPath)) {
    addIssue("Missing src/index.ts.");

    return;
  }

  const source = readText(rootIndexPath);

  if (!source.includes('import "./styles/main.scss";')) {
    addIssue('src/index.ts should import "./styles/main.scss".');
  }
}

function validatePackageJson() {
  if (!existsSync(packageJsonPath)) {
    addIssue("Missing package.json.");

    return;
  }

  const packageJson = JSON.parse(readText(packageJsonPath));
  const exportsField = packageJson.exports ?? {};
  const filesField = packageJson.files ?? [];

  if (packageJson.style !== "dist/style.css") {
    addIssue('package.json should expose `"style": "dist/style.css"`.');
  }

  if (exportsField["./style.css"] !== "./dist/style.css") {
    addIssue('package.json should export "./style.css" -> "./dist/style.css".');
  }

  if (exportsField["./main.scss"] !== "./src/styles/main.scss") {
    addIssue('package.json should export "./main.scss" -> "./src/styles/main.scss".');
  }

  if (!Array.isArray(filesField) || !filesField.includes("src/styles")) {
    addIssue('package.json files should include "src/styles" so the SCSS entrypoint is published.');
  }

  if (!packageJson.peerDependencies || !packageJson.peerDependencies.vue) {
    addIssue("package.json should keep vue in peerDependencies.");
  }
}

function validateStyleEntry() {
  if (!existsSync(mainScssPath)) {
    addIssue("Missing src/styles/main.scss.");

    return;
  }

  if (!existsSync(spacingScssPath)) {
    addIssue("Missing src/styles/_spacing.scss.");
  }

  const source = readText(mainScssPath);

  if (!source.includes('@use "./spacing";')) {
    addIssue('src/styles/main.scss should import "./spacing".');
  }
}

function validateDevEntry() {
  if (!existsSync(devEntryPath)) {
    addIssue("Missing src/dev.ts.");

    return;
  }

  const source = readText(devEntryPath);

  if (!source.includes('import "./styles/main.scss";')) {
    addIssue('src/dev.ts should import "./styles/main.scss" so local previews load global library styles.');
  }
}

for (const componentDir of getComponentDirectories()) {
  validateComponentDirectory(componentDir);
}

validateRootExports();
validatePackageJson();
validateStyleEntry();
validateDevEntry();

if (issues.length > 0) {
  // eslint-disable-next-line no-undef
  console.error("Architecture validation failed:\n");

  for (const issue of issues) {
    // eslint-disable-next-line no-undef
    console.error(`- ${issue}`);
  }

  process.exit(1);
}

// eslint-disable-next-line no-undef
console.log("Architecture validation passed.");
