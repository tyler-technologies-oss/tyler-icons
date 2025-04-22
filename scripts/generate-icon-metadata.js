import { resolve, join, parse } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import keywords from './keywords.json' assert { type: 'json' };

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT_DIR = resolve(__dirname, '../');
const SVG_DIR = join(ROOT_DIR, 'svg');
const OUTPUT_DIR = ROOT_DIR;
const OUTPUT_FILENAME = 'tyler-icons-metadata.json';

try {
  const icons = iconsFromDir(SVG_DIR);
  fs.writeFileSync(join(OUTPUT_DIR, `${OUTPUT_FILENAME}`), JSON.stringify(icons, undefined, 2));
} catch (e) {
  console.error('An error occurred while generating the metadata', e);
}

function iconsFromDir(startPath, icons = []) {
  if (!fs.existsSync(startPath)) {
    throw new Error(`Invalid start path: ${startPath}`);
  }

  const files = fs.readdirSync(startPath);

  for(let i = 0; i< files.length; i++) {
    const filename = join(startPath, files[i]);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()){
      return [...icons, ...fromDir(filename, filter, callback)];
    } else if (/\.svg$/.test(filename)) {
      const name = parse(filename).name;
      const data = fs.readFileSync(filename, 'utf-8');
      icons.push({ name, data, keywords: getKeywordsForFilename(name)});
    }
  }

  return icons;
}

function getKeywordsForFilename(name) {
  const match = keywords.find(entry => entry.name === name);

  if (!match) return [];

  if (typeof match.keywords === 'string') {
    // Remove commas, trim, then split by whitespace
    return match.keywords.replace(/,/g, '').trim().split(/\s+/);
  }

  return Array.isArray(match.keywords) ? match.keywords : [];
}


