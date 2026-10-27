// Optional helper. Fill scripts/image-sources.json as { "apple-iphone-17-pro-max": "https://.../image.webp" }
// using image URLs you are allowed to use (e.g. a manufacturer's press/media page), then run: npm run images:fetch
// Requires Node 18+ and internet access. Images are saved into src/assets/images/products/.
import fs from 'fs';
import path from 'path';
const sources = JSON.parse(fs.readFileSync('scripts/image-sources.json', 'utf8'));
const out = 'src/assets/images/products';
fs.mkdirSync(out, { recursive: true });
const ext = { 'image/webp': 'webp', 'image/jpeg': 'jpg', 'image/png': 'png', 'image/avif': 'avif' };
for (const [name, url] of Object.entries(sources)) {
  try {
    const res = await fetch(url);
    const type = (res.headers.get('content-type') || '').split(';')[0];
    if (!res.ok || !ext[type]) throw new Error(`HTTP ${res.status}, type "${type}" (must be a direct image)`);
    fs.writeFileSync(path.join(out, `${name}.${ext[type]}`), Buffer.from(await res.arrayBuffer()));
    console.log('saved  ', name);
  } catch (e) { console.log('FAILED ', name, '-', e.message); }
}
