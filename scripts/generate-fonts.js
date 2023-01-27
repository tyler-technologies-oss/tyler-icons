const svgtofont = require('svgtofont');
const path = require('path');
const { mkdirp, cleanFiles } = require('@tylertech/forge-build-tools');

const ROOT_DIR = path.resolve(__dirname, '../');
const SVG_DIR = path.join(ROOT_DIR, 'dist/svg');
const STYLE_TEMPLATES_DIR = path.join(ROOT_DIR, 'scripts/templates');
const OUTPUT_DIR = path.join(ROOT_DIR, 'dist/fonts');

async function createFont(dirName, fileName, fontName, className) {
  const dist = path.join(OUTPUT_DIR, dirName);
  await cleanFiles(dist);
  mkdirp(dist);
  await svgtofont({
    src: path.join(SVG_DIR, dirName),
    dist,
    styleTemplates: STYLE_TEMPLATES_DIR,
    fontName,
    classNamePrefix: className,
    // startUnicode: 20000,
    useNameAsUnicode: true,
    css: {
      fileName,
      fontSize: '24px',
    },
    svgicons2svgfont: {
      fontHeight: 1000,
      normalize: true,
    },
  });
}

async function main() {
  await createFont('standard', 'tyler-icons-standard', 'TylerIcons', 'tyler-icons');
  await createFont('extended', 'tyler-icons-extended', 'TylerIconsExtended', 'tyler-icons-ext');
  await createFont('custom', 'tyler-icons-custom', 'TylerIconsCustom', 'tyler-icons-custom');
}

main();
