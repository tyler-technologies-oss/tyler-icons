// It fixes name: '3_d_rotation' → name: '3d_rotation', by removing the underscore (_) 
// that svg-to-ts wrongly inserts between a digit and a letter at the start of the filename.
import fs from 'fs';

const path = './dist/tyler-icons.ts'; // adjust if needed
let contents = fs.readFileSync(path, 'utf8');

contents = contents.replace(/name: '(\d)_([a-zA-Z])/g, (match, digit, char) => {
  return `name: '${digit}${char}`;
});

fs.writeFileSync(path, contents);
console.log('✅ Patched enum names to remove extra underscores after digits');
