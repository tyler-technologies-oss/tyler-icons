/**
 * This script will modify the package.json from the distribution npm package directory (not the one at the root of the project)
 * to remove properties that we don't want to include in the final package that is distributed to consumers.
 */

const path = require('path');
const fs = require('fs');

const DIST_ROOT = path.resolve(__dirname, '../dist/@tylertech/tyler-icons');
const PACKAGE_JSON_PATH = path.join(DIST_ROOT, 'package.json');
const packageJson = require(PACKAGE_JSON_PATH);

// Remove unwanted distribution properties from the package.json here
delete packageJson.scripts;
delete packageJson.devDependencies;

fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(packageJson, null, 2), 'utf8');
