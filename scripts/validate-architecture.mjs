import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const componentsDir = path.join(rootDir, "src", "components");
const servicesDir = path.join(rootDir, "src", "services");
const utilsDir = path.join(rootDir, "src", "utils");
const packageJsonPath = path.join(rootDir, "package.json");
const rootIndexPath = path.join(rootDir, "src", "index.ts");
const mainScssPath = path.join(rootDir, "src", "styles", "main.scss");
const colorsScssPath = path.join(rootDir, "src", "styles", "_colors.scss");
const spacingScssPath = path.join(rootDir, "src", "styles", "_spacing.scss");
const devEntryPath = path.join(rootDir, "src", "dev.ts");
const supportNamingRootPaths = [
  path.join(rootDir, "src", "components"),
  path.join(rootDir, "src", "services"),
  path.join(rootDir, "src", "service"),
  path.join(rootDir, "src", "utils"),
  path.join(rootDir, "src", "util"),
];

const issues = [];

function addIssue(message) {
  issues.push(message);
}

function readText(filePath) {
  return readFileSync(filePath, "utf8");
}

function getModuleDirectories(baseDir, missingDirMessage) {
  if (!existsSync(baseDir)) {
    if (missingDirMessage) {
      addIssue(missingDirMessage);
    }

    return [];
  }

  return readdirSync(baseDir)
    .map(name => path.join(baseDir, name))
    .filter(entryPath => statSync(entryPath).isDirectory())
    .sort((left, right) => left.localeCompare(right));
}

function getComponentDirectories() {
  return getModuleDirectories(componentsDir, "Missing src/components directory.");
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

function validateTypesFile(moduleName, filePath, { enforcePrefix = true } = {}) {
  const source = readText(filePath);
  const exportMatches = [...source.matchAll(/export\s+(?:type|interface)\s+([A-Za-z0-9_]+)/g)];

  if (exportMatches.length === 0) {
    addIssue(`${path.relative(rootDir, filePath)} should export public types or interfaces.`);

    return;
  }

  if (!enforcePrefix) {
    return;
  }

  for (const [, exportName] of exportMatches) {
    if (!exportName.startsWith(moduleName)) {
      addIssue(
        `${path.relative(rootDir, filePath)} exports "${exportName}", but public component types must be prefixed with "${moduleName}".`,
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

function validateModuleIndexFile(moduleName, filePath, moduleImportPath) {
  const source = readText(filePath);

  if (!source.includes('from "./types"')) {
    addIssue(`${path.relative(rootDir, filePath)} should re-export public types from ./types.`);
  }

  if (moduleImportPath && !source.includes(moduleImportPath)) {
    addIssue(`${path.relative(rootDir, filePath)} should re-export the public implementation for "${moduleName}".`);
  }
}

function walkDirectory(directoryPath, filePaths = []) {
  for (const entryName of readdirSync(directoryPath)) {
    const entryPath = path.join(directoryPath, entryName);

    if (statSync(entryPath).isDirectory()) {
      walkDirectory(entryPath, filePaths);
      continue;
    }

    filePaths.push(entryPath);
  }

  return filePaths;
}

function validateSupportFileNames(baseDir) {
  if (!existsSync(baseDir)) {
    return;
  }

  for (const filePath of walkDirectory(baseDir)) {
    const fileName = path.basename(filePath);
    const relativePath = path.relative(rootDir, filePath);

    if (fileName === "config.ts") {
      addIssue(`${relativePath} should be named configs.ts.`);
    }

    if (fileName === "constant.ts") {
      addIssue(`${relativePath} should be named constants.ts.`);
    }
  }
}

function validateNoExportedTypesOutsideTypesFile(baseDir) {
  if (!existsSync(baseDir)) {
    return;
  }

  for (const filePath of walkDirectory(baseDir)) {
    const relativePath = path.relative(rootDir, filePath);
    const fileName = path.basename(filePath);
    const extension = path.extname(filePath);

    if (![".ts", ".vue"].includes(extension)) {
      continue;
    }

    if (fileName === "types.ts") {
      continue;
    }

    const source = readText(filePath);

    if (/export\s+(?:type|interface)\s+[A-Za-z0-9_]+/g.test(source)) {
      addIssue(`${relativePath} should move exported types and interfaces into types.ts.`);
    }
  }
}

function validateRepositorySupportFileNames() {
  for (const baseDir of supportNamingRootPaths) {
    validateSupportFileNames(baseDir);
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

  validateRootExportsForModules(source, servicesDir, "./services");
  validateRootExportsForModules(source, utilsDir, "./utils");
}

function validateRootExportsForModules(rootIndexSource, baseDir, publicBaseImportPath) {
  if (!existsSync(baseDir)) {
    return;
  }

  for (const moduleDir of getModuleDirectories(baseDir)) {
    const moduleName = path.basename(moduleDir);
    const expectedPathFragment = `from "${publicBaseImportPath}/${moduleName}"`;

    if (!rootIndexSource.includes(expectedPathFragment)) {
      addIssue(
        `src/index.ts should re-export public module "${moduleName}" from ${publicBaseImportPath}/${moduleName}.`,
      );
    }
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

  if (!existsSync(colorsScssPath)) {
    addIssue("Missing src/styles/_colors.scss.");
  }

  const source = readText(mainScssPath);

  if (!source.includes('@use "./colors";')) {
    addIssue('src/styles/main.scss should import "./colors".');
  }

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

function validateServiceOrUtilityDirectory(moduleDir, moduleKind) {
  const moduleName = path.basename(moduleDir);
  const expectedIndexFile = path.join(moduleDir, "index.ts");
  const expectedTypesFile = path.join(moduleDir, "types.ts");
  const implementationCandidates = readdirSync(moduleDir).filter(
    fileName =>
      [".ts", ".js", ".vue"].includes(path.extname(fileName)) &&
      ![
        "index.ts",
        "types.ts",
        "configs.ts",
        "constants.ts",
        `${moduleName}.stories.ts`,
        `${moduleName}.stories.scss`,
      ].includes(fileName),
  );

  if (!existsSync(expectedIndexFile)) {
    addIssue(`${moduleKind} "${moduleName}" is missing index.ts.`);
  }

  if (!existsSync(expectedTypesFile)) {
    addIssue(`${moduleKind} "${moduleName}" is missing types.ts.`);
  }

  if (implementationCandidates.length === 0) {
    addIssue(
      `${moduleKind} "${moduleName}" should contain a public implementation file in addition to index.ts and types.ts.`,
    );
  }

  if (existsSync(expectedTypesFile)) {
    validateTypesFile(moduleName, expectedTypesFile, { enforcePrefix: false });
  }

  if (existsSync(expectedIndexFile)) {
    const primaryImplementationImport = implementationCandidates[0]
      ? `./${path.basename(implementationCandidates[0], path.extname(implementationCandidates[0]))}`
      : null;

    validateModuleIndexFile(moduleName, expectedIndexFile, primaryImplementationImport);
  }
}

for (const componentDir of getComponentDirectories()) {
  validateComponentDirectory(componentDir);
}

for (const serviceDir of getModuleDirectories(servicesDir)) {
  validateServiceOrUtilityDirectory(serviceDir, "Service");
}

for (const utilityDir of getModuleDirectories(utilsDir)) {
  validateServiceOrUtilityDirectory(utilityDir, "Utility");
}

validateRepositorySupportFileNames();
validateNoExportedTypesOutsideTypesFile(componentsDir);
validateNoExportedTypesOutsideTypesFile(servicesDir);
validateNoExportedTypesOutsideTypesFile(utilsDir);
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
