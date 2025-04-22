// fix-constants-names.js
import fs from 'fs';

const path = './dist/tyler-icons.ts'; // adjust if needed
let contents = fs.readFileSync(path, 'utf8');

contents = contents.replace(/name: '(\d)_([a-zA-Z])/g, (match, digit, char) => {
  return `name: '${digit}${char}`;
});

fs.writeFileSync(path, contents);
console.log('✅ Patched enum names to remove extra underscores after digits');
