const path = require('path');
const fs = require('fs');

const ROOT_DIR = path.resolve(__dirname, '../');
const SVG_DIR = path.join(ROOT_DIR, 'svg');
const OUTPUT_DIR = path.join(ROOT_DIR, 'dist');
const OUTPUT_FILENAME = 'tyler-icons-metadata-svg';

async function main() {
  try {
    const metadata = createMetadata(SVG_DIR);
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
    writeFile(metadata, OUTPUT_FILENAME);
    writeFile(metadata, `${OUTPUT_FILENAME}-pretty`, true);
  } catch (e) {
    console.error('An error occurred while generating the metadata', e);
  }
}

function writeFile(obj, filename, pretty = false) {
  fs.writeFileSync(path.join(OUTPUT_DIR, `${filename}.json`), pretty ? JSON.stringify(obj, null, 2) : JSON.stringify(obj));
}

function createMetadata(svgDir) {
  const customIcons = iconsFromDir(path.join(svgDir, 'custom'));
  const extendedIcons = iconsFromDir(path.join(svgDir, 'extended'));
  const standardIcons = iconsFromDir(path.join(svgDir, 'standard'));

  return [
    createMetadataFromIcons('Custom', customIcons),
    createMetadataFromIcons('Extended', extendedIcons),
    createMetadataFromIcons('Standard', standardIcons)
  ];
}

function createMetadataFromIcons(name, icons) {
  return {
    identifier: `tyler-icons-${name.toLowerCase()}`,
    name,
    count: icons.length,
    icons
  };
}

function iconsFromDir(startPath, icons = []) {
  if (!fs.existsSync(startPath)) {
    throw new Error(`Invalid start path: ${startPath}`);
  }

  const files = fs.readdirSync(startPath);

  for(let i = 0; i< files.length; i++) {
    const filename = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()){
      return [...icons, ...fromDir(filename, filter, callback)];
    } else if (/\.svg$/.test(filename)) {
      const name = path.parse(filename).name;
      icons.push(name);
    }
  }

  return icons;
}

main();
