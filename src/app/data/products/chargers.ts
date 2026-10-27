import { Seed } from '../builder';

export const CHARGERS: Seed[] = [
  { b: 'Anker', m: '735 Charger (GaNPrime 65W)', p: 55, f: true, s: { Type: 'Wall charger', Output: '65W', Ports: '3' } },
  { b: 'Anker', m: '737 Charger (GaNPrime 120W)', p: 90, s: { Type: 'Wall charger', Output: '120W' } },
  { b: 'Anker', m: '737 Power Bank (PowerCore 24K)', p: 130, f: true, s: { Type: 'Power bank', Capacity: '24,000mAh', Output: '140W' } },
  { b: 'Anker', m: '535 Power Bank (PowerCore 20K)', p: 60, s: { Type: 'Power bank', Capacity: '20,000mAh' } },
  { b: 'Anker', m: 'PowerCore 10000', p: 30, s: { Type: 'Power bank', Capacity: '10,000mAh' } },
  { b: 'Anker', m: '622 Magnetic Battery (MagGo)', p: 50, s: { Type: 'Magnetic power bank', Capacity: '5,000mAh' } },
  { b: 'Apple', m: '20W USB-C Power Adapter', p: 19, s: { Type: 'Wall charger', Output: '20W' } },
  { b: 'Apple', m: '35W Dual USB-C Port Compact Power Adapter', p: 59, s: { Type: 'Wall charger', Output: '35W', Ports: '2' } },
  { b: 'Apple', m: 'MagSafe Charger', p: 39, s: { Type: 'Magnetic wireless charger' } },
  { b: 'Samsung', m: '25W Super Fast Charging Wall Charger', p: 25, s: { Type: 'Wall charger', Output: '25W' } },
  { b: 'Samsung', m: '45W Power Adapter', p: 35, f: true, s: { Type: 'Wall charger', Output: '45W' } },
  { b: 'Xiaomi', m: '67W Charging Combo', p: 29, s: { Type: 'Wall charger with cable', Output: '67W' } },
];
