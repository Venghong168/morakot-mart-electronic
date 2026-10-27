// Generates 10 local product illustrations (SVG) into public/images/products
import fs from 'fs';

const wrap = (inner, id) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" role="img">
<defs>
<linearGradient id="bg${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F3F7F4"/><stop offset="1" stop-color="#DCE7E0"/></linearGradient>
<linearGradient id="dark" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2b3833"/><stop offset="1" stop-color="#111a17"/></linearGradient>
<linearGradient id="screen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1f7a5e"/><stop offset="1" stop-color="#0D3027"/></linearGradient>
<linearGradient id="metal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef1ef"/><stop offset="1" stop-color="#b9c2bd"/></linearGradient>
<linearGradient id="goldg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ecd08d"/><stop offset="1" stop-color="#c39b45"/></linearGradient>
<radialGradient id="shadow"><stop offset="0" stop-color="#0D3027" stop-opacity=".28"/><stop offset="1" stop-color="#0D3027" stop-opacity="0"/></radialGradient>
</defs>
<rect width="600" height="600" fill="url(#bg${id})"/>
${inner}</svg>`;
const shadow = (cx, cy, rx, ry = 22) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#shadow)"/>`;
const wallpaper = (x, y, w, h, r = 10) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="url(#screen)"/><circle cx="${x + w * .72}" cy="${y + h * .3}" r="${Math.min(w, h) * .18}" fill="#D8B66A" opacity=".85"/><path d="M${x} ${y + h} L${x + w * .35} ${y + h * .55} L${x + w * .6} ${y + h * .8} L${x + w * .8} ${y + h * .62} L${x + w} ${y + h * .85} V${y + h} Z" fill="#0a241d" opacity=".55"/>`;

const items = {};

items.phone = shadow(300, 520, 120) + `
<rect x="196" y="80" width="208" height="430" rx="38" fill="url(#dark)"/>
<rect x="206" y="90" width="188" height="410" rx="30" fill="#000"/>
${wallpaper(210, 94, 180, 402, 26)}
<rect x="262" y="104" width="76" height="16" rx="8" fill="#000"/>
<g fill="#fff" opacity=".9"><rect x="228" y="150" width="60" height="10" rx="5"/><rect x="228" y="168" width="36" height="7" rx="3.5" opacity=".7"/></g>
<g>${[0,1,2,3].map(i => `<rect x="${228 + i * 38}" y="430" width="30" height="30" rx="8" fill="#fff" opacity=".85"/>`).join('')}</g>
<rect x="402" y="170" width="5" height="60" rx="2.5" fill="#3b4a44"/>`;

items.tablet = shadow(300, 470, 210) + `
<rect x="90" y="140" width="420" height="300" rx="30" fill="url(#dark)"/>
${wallpaper(106, 156, 388, 268, 18)}
<circle cx="98" cy="290" r="3.5" fill="#000"/>
<g>${[0,1,2,3,4].map(i => `<rect x="${180 + i * 48}" y="384" width="34" height="26" rx="8" fill="#fff" opacity=".85"/>`).join('')}</g>
<g fill="#fff" opacity=".9"><rect x="132" y="190" width="110" height="14" rx="7"/><rect x="132" y="214" width="70" height="9" rx="4.5" opacity=".7"/></g>`;

items.laptop = shadow(300, 462, 270, 20) + `
<rect x="120" y="118" width="360" height="236" rx="16" fill="url(#dark)"/>
${wallpaper(132, 130, 336, 212, 8)}
<g fill="#fff" opacity=".9"><rect x="156" y="160" width="120" height="14" rx="7"/><rect x="156" y="184" width="76" height="9" rx="4.5" opacity=".7"/></g>
<path d="M70 366 H530 L506 428 Q502 440 490 440 H110 Q98 440 94 428 Z" fill="url(#metal)"/>
<path d="M70 366 H530 L526 378 H74 Z" fill="#9ea9a3"/>
<rect x="252" y="366" width="96" height="10" rx="5" fill="#8c9791"/>
<rect x="150" y="394" width="300" height="2" fill="#aab4af"/>`;

items.headphones = shadow(300, 520, 170) + `
<path d="M135 330 V290 A165 165 0 0 1 465 290 V330" fill="none" stroke="url(#dark)" stroke-width="30" stroke-linecap="round"/>
<path d="M150 300 A150 150 0 0 1 450 300" fill="none" stroke="url(#goldg)" stroke-width="6" stroke-linecap="round" opacity=".9"/>
<g>
<rect x="88" y="300" width="100" height="190" rx="46" fill="url(#dark)"/><rect x="104" y="326" width="68" height="138" rx="34" fill="#0D3027"/><circle cx="138" cy="395" r="20" fill="url(#goldg)"/>
<rect x="412" y="300" width="100" height="190" rx="46" fill="url(#dark)"/><rect x="428" y="326" width="68" height="138" rx="34" fill="#0D3027"/><circle cx="462" cy="395" r="20" fill="url(#goldg)"/>
</g>`;

items.smartwatch = shadow(300, 540, 120) + `
<rect x="238" y="30" width="124" height="190" rx="30" fill="#17483A"/>
<rect x="238" y="380" width="124" height="190" rx="30" fill="#17483A"/>
<g stroke="#0D3027" stroke-width="3">${[430,460,490,520].map(y => `<line x1="262" y1="${y}" x2="338" y2="${y}"/>`).join('')}</g>
<rect x="170" y="170" width="260" height="260" rx="66" fill="url(#metal)"/>
<rect x="182" y="182" width="236" height="236" rx="56" fill="#000"/>
<circle cx="300" cy="300" r="82" fill="none" stroke="#17483A" stroke-width="16"/>
<path d="M300 218 A82 82 0 1 1 218 300" fill="none" stroke="#D8B66A" stroke-width="16" stroke-linecap="round"/>
<g stroke="#fff" stroke-width="7" stroke-linecap="round"><line x1="300" y1="300" x2="300" y2="262"/><line x1="300" y1="300" x2="326" y2="316"/></g>
<circle cx="300" cy="300" r="7" fill="#D8B66A"/>
<rect x="430" y="262" width="14" height="48" rx="6" fill="url(#goldg)"/>`;

items.speaker = shadow(300, 470, 240) + `
<rect x="80" y="190" width="440" height="270" rx="110" fill="url(#dark)"/>
<g fill="#4c5b55">${Array.from({length: 7}, (_, r) => Array.from({length: 17}, (_, c) => `<circle cx="${128 + c * 21.5 + (r % 2) * 10}" cy="${228 + r * 30}" r="5"/>`).join('')).join('')}</g>
<rect x="80" y="300" width="440" height="22" fill="url(#goldg)"/>
<circle cx="300" cy="311" r="20" fill="#111a17"/><circle cx="300" cy="311" r="7" fill="#D8B66A"/>
<g fill="#fff" opacity=".8"><circle cx="196" cy="311" r="5"/><circle cx="236" cy="311" r="5"/><circle cx="364" cy="311" r="5"/><circle cx="404" cy="311" r="5"/></g>`;

items.charger = shadow(300, 520, 150) + `
<rect x="238" y="70" width="26" height="90" rx="5" fill="#9ea9a3"/><rect x="336" y="70" width="26" height="90" rx="5" fill="#9ea9a3"/>
<rect x="190" y="150" width="220" height="340" rx="40" fill="#fff"/>
<rect x="190" y="150" width="220" height="340" rx="40" fill="none" stroke="#cfd8d3" stroke-width="3"/>
<rect x="250" y="400" width="100" height="34" rx="17" fill="#17483A"/><rect x="262" y="410" width="76" height="14" rx="7" fill="#0b1411"/>
<path d="M310 220 L270 300 H298 L286 360 L334 270 H304 Z" fill="url(#goldg)"/>
<text x="300" y="468" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="22" fill="#17483A">30W</text>`;

const keys = [];
for (let r = 0; r < 4; r++) {
  const n = r === 3 ? 0 : 12 - (r === 0 ? 0 : 0);
  for (let c = 0; c < n; c++) keys.push(`<rect x="${112 + c * 31.5}" y="${216 + r * 44}" width="27" height="36" rx="6" fill="#f4f7f5"/>`);
}
items.keyboard = shadow(300, 470, 260) + `
<path d="M60 190 H540 L560 440 Q562 456 546 456 H54 Q38 456 40 440 Z" fill="url(#dark)"/>
<path d="M90 200 H510 L526 430 H74 Z" fill="#0f1713"/>
${keys.join('')}
<rect x="112" y="348" width="38" height="36" rx="6" fill="#D8B66A"/><rect x="156" y="348" width="38" height="36" rx="6" fill="#f4f7f5"/>
<rect x="200" y="348" width="200" height="36" rx="6" fill="#f4f7f5"/>
<rect x="406" y="348" width="38" height="36" rx="6" fill="#f4f7f5"/><rect x="450" y="348" width="38" height="36" rx="6" fill="#D8B66A"/>`;

items.mouse = shadow(300, 520, 120) + `
<path d="M300 70 C410 70 450 170 450 290 C450 430 390 520 300 520 C210 520 150 430 150 290 C150 170 190 70 300 70 Z" fill="url(#dark)"/>
<path d="M300 70 C410 70 450 170 450 250 H150 C150 170 190 70 300 70 Z" fill="#26332e"/>
<line x1="300" y1="72" x2="300" y2="250" stroke="#0b1411" stroke-width="5"/>
<rect x="282" y="140" width="36" height="76" rx="18" fill="url(#goldg)"/>
<path d="M170 300 C170 340 180 400 210 450" fill="none" stroke="#3b4a44" stroke-width="6" stroke-linecap="round"/>
<path d="M300 520 C240 520 190 470 170 400" fill="none" stroke="#D8B66A" stroke-width="5" opacity=".8"/>`;

items.hub = shadow(300, 500, 230) + `
<path d="M62 310 C30 310 34 270 26 236" fill="none" stroke="#2b3833" stroke-width="16" stroke-linecap="round"/>
<rect x="60" y="290" width="40" height="40" rx="8" fill="#17483A"/>
<rect x="100" y="230" width="400" height="190" rx="40" fill="url(#metal)"/>
<rect x="100" y="230" width="400" height="190" rx="40" fill="none" stroke="#9ea9a3" stroke-width="3"/>
<rect x="500" y="262" width="60" height="42" rx="6" fill="#2b3833"/><rect x="500" y="346" width="60" height="42" rx="6" fill="#2b3833"/>
<g fill="#111a17"><rect x="140" y="270" width="66" height="30" rx="5"/><rect x="226" y="270" width="66" height="30" rx="5"/><rect x="312" y="270" width="66" height="30" rx="5"/><rect x="398" y="270" width="62" height="30" rx="15"/></g>
<g fill="#111a17"><rect x="140" y="346" width="90" height="26" rx="4"/><rect x="250" y="346" width="60" height="26" rx="4"/><rect x="330" y="346" width="60" height="26" rx="4"/></g>
<circle cx="440" cy="359" r="7" fill="#D8B66A"/>`;

Object.entries(items).forEach(([name, inner], i) => fs.writeFileSync(`src/assets/images/categories/${name}.svg`, wrap(inner, i)));
console.log('wrote', Object.keys(items).length, 'images');
