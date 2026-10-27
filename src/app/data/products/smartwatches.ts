import { Seed } from '../builder';

export const SMARTWATCHES: Seed[] = [
  { b: 'Apple', m: 'Watch Series 11', p: 399, f: true, s: { Platform: 'watchOS', Type: 'Smartwatch' } },
  { b: 'Apple', m: 'Watch Ultra 3', p: 799, s: { Platform: 'watchOS', Type: 'Rugged smartwatch' } },
  { b: 'Apple', m: 'Watch SE 3', p: 249, s: { Platform: 'watchOS', Type: 'Smartwatch' } },
  { b: 'Samsung', m: 'Galaxy Watch8', p: 349, f: true, s: { Platform: 'Wear OS', Type: 'Smartwatch' } },
  { b: 'Samsung', m: 'Galaxy Watch8 Classic', p: 499, s: { Platform: 'Wear OS', Type: 'Smartwatch' } },
  { b: 'Samsung', m: 'Galaxy Watch Ultra', p: 649, s: { Platform: 'Wear OS', Type: 'Rugged smartwatch' } },
  { b: 'Google', m: 'Pixel Watch 4', p: 349, s: { Platform: 'Wear OS', Type: 'Smartwatch' } },
  { b: 'OnePlus', m: 'Watch 3', p: 329, s: { Platform: 'Wear OS', Type: 'Smartwatch' } },
  { b: 'Xiaomi', m: 'Smart Band 9', p: 49, f: true, s: { Type: 'Fitness band', Display: '1.62-inch AMOLED' } },
  { b: 'Garmin', m: 'Venu 3', p: 449, s: { Type: 'Smartwatch', Display: 'AMOLED' } },
  { b: 'Garmin', m: 'Forerunner 265', p: 449, s: { Type: 'Running smartwatch', Display: 'AMOLED' } },
  { b: 'Fitbit', m: 'Charge 6', p: 159, s: { Type: 'Fitness tracker' } },
];
