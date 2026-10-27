import { Seed } from '../builder';

export const KEYBOARDS: Seed[] = [
  { b: 'Logitech', m: 'MX Keys S', p: 109, f: true, s: { Type: 'Wireless full-size', Connection: 'Bluetooth / Logi Bolt' } },
  { b: 'Logitech', m: 'MX Keys Mini', p: 99, s: { Type: 'Compact wireless', Connection: 'Bluetooth / Logi Bolt' } },
  { b: 'Logitech', m: 'K380', p: 39, s: { Type: 'Compact multi-device', Connection: 'Bluetooth' } },
  { b: 'Logitech', m: 'MX Mechanical', p: 149, s: { Type: 'Wireless mechanical', Connection: 'Bluetooth / Logi Bolt' } },
  { b: 'Logitech', m: 'G915 TKL', p: 199, w: 229, f: true, s: { Type: 'Wireless mechanical, tenkeyless', Connection: 'Lightspeed / Bluetooth' } },
  { b: 'Razer', m: 'BlackWidow V4 Pro', p: 229, s: { Type: 'Wired mechanical' } },
  { b: 'Razer', m: 'Huntsman V3 Pro', p: 249, s: { Type: 'Analog optical, wired' } },
  { b: 'Razer', m: 'Huntsman Mini', p: 119, s: { Type: '60% optical, wired' } },
  { b: 'Keychron', m: 'K2', p: 89, s: { Layout: '75%', Connection: 'Bluetooth / wired' } },
  { b: 'Keychron', m: 'Q1', p: 169, s: { Layout: '75%', Connection: 'Wired' } },
  { b: 'Apple', m: 'Magic Keyboard with Touch ID', p: 149, s: { Type: 'Wireless', Feature: 'Touch ID' } },
  { b: 'ASUS', m: 'ROG Azoth', p: 249, f: true, s: { Layout: '75%', Connection: 'Wireless / wired' } },
];
