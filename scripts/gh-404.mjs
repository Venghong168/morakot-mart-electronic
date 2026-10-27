import fs from 'fs';
const dir = 'dist/morakot-mart/browser';
fs.copyFileSync(`${dir}/index.html`, `${dir}/404.html`);
fs.writeFileSync(`${dir}/.nojekyll`, '');
console.log('Created 404.html and .nojekyll in', dir);
