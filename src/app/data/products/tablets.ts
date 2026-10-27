import { Seed } from '../builder';

export const TABLETS: Seed[] = [
  { b: 'Apple', m: 'iPad Pro 13-inch (M5)', p: 1299, f: true, s: { Display: '13-inch', Chip: 'M5' } },
  { b: 'Apple', m: 'iPad Pro 11-inch (M5)', p: 999, s: { Display: '11-inch', Chip: 'M5' } },
  { b: 'Apple', m: 'iPad Air 13-inch (M3)', p: 799, s: { Display: '13-inch', Chip: 'M3' } },
  { b: 'Apple', m: 'iPad Air 11-inch (M3)', p: 599, f: true, s: { Display: '11-inch', Chip: 'M3' } },
  { b: 'Apple', m: 'iPad (A16)', p: 349, w: 399, s: { Display: '11-inch', Chip: 'A16' } },
  { b: 'Apple', m: 'iPad mini (A17 Pro)', p: 499, s: { Display: '8.3-inch', Chip: 'A17 Pro' } },
  { b: 'Samsung', m: 'Galaxy Tab S10 Ultra', p: 1199, f: true, s: { Display: '14.6-inch', Chip: 'Dimensity 9300+' } },
  { b: 'Samsung', m: 'Galaxy Tab S10+', p: 999, s: { Display: '12.4-inch', Chip: 'Dimensity 9300+' } },
  { b: 'Samsung', m: 'Galaxy Tab S10 FE', p: 499, s: { Display: '10.9-inch', Chip: 'Exynos 1580' } },
  { b: 'Samsung', m: 'Galaxy Tab A9+', p: 219, s: { Display: '11-inch', Chip: 'Snapdragon 695' } },
  { b: 'Xiaomi', m: 'Pad 7', p: 349, s: { Display: '11.2-inch', Chip: 'Snapdragon 7+ Gen 3' } },
  { b: 'Lenovo', m: 'Tab P12', p: 349, s: { Display: '12.7-inch', Chip: 'Dimensity 7050' } },
];
