const { join, resolve } = require('path');
const { modifyFile } = require('@tylertech/forge-build-tools');

const ROOT = resolve(__dirname, '../');
const DIST_PATH = join(ROOT, 'dist/@tylertech/tyler-icons')
const packageJsonPath = join(DIST_PATH, 'package.json');

(async function main() {
  await modifyFile(packageJsonPath, info => {
    const json = JSON.parse(info.contents);
    delete json.devDependencies;
    delete json.scripts;
    delete json.private;
    return JSON.stringify(json, null, 2);
  });
})();
