import { Seed } from '../builder';

export const SMARTPHONES: Seed[] = [
  { b: 'Apple', m: 'iPhone 17 Pro Max', p: 1199, f: true, s: { Display: '6.9-inch', Chip: 'A19 Pro' } },
  { b: 'Apple', m: 'iPhone 17 Pro', p: 1099, f: true, s: { Display: '6.3-inch', Chip: 'A19 Pro' } },
  { b: 'Apple', m: 'iPhone 17', p: 799, f: true, s: { Display: '6.3-inch', Chip: 'A19' } },
  { b: 'Apple', m: 'iPhone 16', p: 699, w: 799, s: { Display: '6.1-inch', Chip: 'A18' } },
  { b: 'Samsung', m: 'Galaxy S25 Ultra', p: 1199, w: 1299, f: true, s: { Display: '6.9-inch', Chip: 'Snapdragon 8 Elite for Galaxy' } },
  { b: 'Samsung', m: 'Galaxy S25+', p: 999, s: { Display: '6.7-inch', Chip: 'Snapdragon 8 Elite for Galaxy' } },
  { b: 'Samsung', m: 'Galaxy S25', p: 799, s: { Display: '6.2-inch', Chip: 'Snapdragon 8 Elite for Galaxy' } },
  { b: 'Samsung', m: 'Galaxy Z Fold7', p: 1999, s: { 'Main display': '8.0-inch', 'Cover display': '6.5-inch' } },
  { b: 'Samsung', m: 'Galaxy Z Flip7', p: 1099, s: { 'Main display': '6.9-inch', 'Cover display': '4.1-inch' } },
  { b: 'Google', m: 'Pixel 10 Pro', p: 999, f: true, s: { Display: '6.3-inch', Chip: 'Google Tensor G5' } },
  { b: 'Xiaomi', m: '15', p: 899, s: { Display: '6.36-inch', Chip: 'Snapdragon 8 Elite' } },
  { b: 'OnePlus', m: '13', p: 899, s: { Display: '6.82-inch', Chip: 'Snapdragon 8 Elite' } },
];
