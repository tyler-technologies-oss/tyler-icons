const { basename, resolve, join, dirname, parse } = require('path');
const { globFiles, rename } = require('@tylertech/build-tools');

const ROOT = resolve();
const TARGET_DIR = join(ROOT, './.build/**/*.ts');

(async function renameFiles() {
  const files = globFiles(TARGET_DIR);
  for (const file of files) {
    const filePath = dirname(file);
    const parsed = parse(basename(file));
    await rename(file, join(filePath, `${parsed.name}.cjs${parsed.ext}`));
  }
})();