// Writes PRODUCT-SLUGS.md: the exact photo file name (without extension) for every product.
import { build } from 'esbuild';
import fs from 'fs';
const out = 'node_modules/.cache/catalog-list.mjs';
await build({ entryPoints: ['src/app/data/products/index.ts'], bundle: true, format: 'esm', platform: 'node', outfile: out, logLevel: 'error' });
const { ALL_PRODUCTS: P } = await import('../' + out);
const photos = fs.existsSync('src/assets/images/products') ? fs.readdirSync('src/assets/images/products') : [];
let md = '# Photo file names\n\nSave each photo in `src/assets/images/products/` using the name below + `.webp`, `.jpg` or `.png`.\nExtra gallery photos: add `-2`, `-3` before the extension.\n';
let cat = '';
for (const p of P) {
  if (p.category !== cat) { cat = p.category; md += `\n## ${cat}\n\n| Product | File name |\n|---|---|\n`; }
  const has = photos.some(f => f.startsWith(p.slug + '.') || f.startsWith(p.slug + '-'));
  md += `| ${p.brand} ${p.name} | \`${p.slug}\`${has ? ' ✅' : ''} |\n`;
}
fs.writeFileSync('PRODUCT-SLUGS.md', md);
console.log('Wrote PRODUCT-SLUGS.md with', P.length, 'products');
