import { resolve, join } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import * as allIcons from '../tyler-icons.mjs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT_DIR = resolve(__dirname, '../');
const OUTPUT_DIR = ROOT_DIR;
const OUTPUT_FILENAME = 'tyler-icons-metadata.json';

try {
  const icons = Object.values(allIcons);
  fs.writeFileSync(join(OUTPUT_DIR, `${OUTPUT_FILENAME}`), JSON.stringify(icons, undefined, 2));
} catch (e) {
  console.error('An error occurred while generating the metadata', e);
}
