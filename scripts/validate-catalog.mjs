// Checks catalog quality: counts per category, unique ids/slugs, numeric prices, image mapping.
import { build } from 'esbuild';
import fs from 'fs';
const outfile = 'node_modules/.cache/catalog-check.mjs';
await build({ entryPoints: ['src/app/data/products/index.ts'], bundle: true, format: 'esm', platform: 'node', outfile, logLevel: 'error' });
await build({ entryPoints: ['src/app/data/image-manifest.ts'], bundle: true, format: 'esm', platform: 'node', outfile: 'node_modules/.cache/manifest-check.mjs', logLevel: 'error' });
const { ALL_PRODUCTS: P } = await import('../' + outfile);
const { PHOTO_FILES } = await import('../node_modules/.cache/manifest-check.mjs');
let bad = 0; const fail = m => { bad++; console.log('FAIL:', m); };
const cats = {}; P.forEach(p => (cats[p.category] ??= []).push(p));
console.log('Total products:', P.length);
for (const [c, l] of Object.entries(cats)) { console.log(`  ${c.padEnd(26)} ${l.length}`); if (l.length < 10) fail(`${c} has < 10`); }
if (Object.keys(cats).length !== 10) fail('expected 10 categories');
if (P.length < 100) fail('fewer than 100 products');
if (new Set(P.map(p => p.id)).size !== P.length) fail('duplicate ids');
if (new Set(P.map(p => p.slug)).size !== P.length) fail('duplicate slugs');
if (new Set(P.map(p => `${p.brand}|${p.model}`)).size !== P.length) fail('duplicate brand+model');
P.forEach(p => { if (typeof p.price !== 'number' || p.price <= 0) fail(`price ${p.slug}`); if (p.originalPrice && p.originalPrice <= p.price) fail(`originalPrice ${p.slug}`); if (!Object.keys(p.specifications).length) fail(`specs ${p.slug}`); });
const withPhoto = P.filter(p => PHOTO_FILES[p.slug]);
console.log(`Brands: ${new Set(P.map(p => p.brand)).size} | With real photo: ${withPhoto.length}/${P.length} | Using illustration fallback: ${P.length - withPhoto.length}`);
Object.keys(PHOTO_FILES).filter(s => !P.some(p => p.slug === s)).forEach(s => console.log('WARN: photo with no matching product slug:', s));
console.log(bad ? `${bad} problem(s) found` : 'Catalog OK');
process.exit(bad ? 1 : 0);
