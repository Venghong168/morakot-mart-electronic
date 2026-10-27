import { Seed } from '../builder';

export const LAPTOPS: Seed[] = [
  { b: 'Apple', m: 'MacBook Air 13-inch (M4)', p: 999, f: true, s: { Display: '13.6-inch', Chip: 'M4' } },
  { b: 'Apple', m: 'MacBook Air 15-inch (M4)', p: 1199, s: { Display: '15.3-inch', Chip: 'M4' } },
  { b: 'Apple', m: 'MacBook Pro 14-inch (M4)', p: 1599, f: true, s: { Display: '14.2-inch', Chip: 'M4' } },
  { b: 'Apple', m: 'MacBook Pro 16-inch (M4 Pro)', p: 2499, s: { Display: '16.2-inch', Chip: 'M4 Pro' } },
  { b: 'ASUS', m: 'ROG Zephyrus G14', p: 1599, f: true, s: { Display: '14-inch', Type: 'Gaming laptop' } },
  { b: 'ASUS', m: 'Zenbook 14 OLED', p: 999, s: { Display: '14-inch OLED', Type: 'Ultraportable' } },
  { b: 'Lenovo', m: 'ThinkPad X1 Carbon Gen 12', p: 1699, s: { Display: '14-inch', Type: 'Business ultrabook' } },
  { b: 'HP', m: 'Spectre x360 14', p: 1499, s: { Display: '14-inch', Type: '2-in-1 convertible' } },
  { b: 'HP', m: 'Pavilion Aero 13', p: 749, s: { Display: '13.3-inch', Type: 'Ultraportable' } },
  { b: 'Dell', m: 'XPS 13', p: 1099, s: { Display: '13.4-inch', Type: 'Ultraportable' } },
  { b: 'Dell', m: 'XPS 14', p: 1599, s: { Display: '14.5-inch', Type: 'Premium laptop' } },
  { b: 'Acer', m: 'Swift Go 14', p: 749, w: 849, s: { Display: '14-inch', Type: 'Ultraportable' } },
];
