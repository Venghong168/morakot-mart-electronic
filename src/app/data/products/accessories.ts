import { Seed } from '../builder';

export const ACCESSORIES: Seed[] = [
  { b: 'Anker', m: '555 USB-C Hub (8-in-1)', p: 70, f: true, s: { Type: 'USB-C hub', Ports: '8-in-1' } },
  { b: 'Anker', m: '341 USB-C Hub (7-in-1)', p: 40, s: { Type: 'USB-C hub', Ports: '7-in-1' } },
  { b: 'Logitech', m: 'C920 HD Pro Webcam', p: 69, s: { Type: 'Webcam', Resolution: '1080p' } },
  { b: 'Logitech', m: 'C922 Pro Stream Webcam', p: 79, s: { Type: 'Webcam', Resolution: '1080p' } },
  { b: 'Razer', m: 'Kiyo Pro', p: 99, s: { Type: 'Webcam', Resolution: '1080p' } },
  { b: 'Samsung', m: 'T7 Portable SSD', p: 89, s: { Type: 'Portable SSD', Interface: 'USB 3.2 Gen 2' } },
  { b: 'Samsung', m: 'T9 Portable SSD', p: 129, f: true, s: { Type: 'Portable SSD', Interface: 'USB 3.2 Gen 2x2' } },
  { b: 'SanDisk', m: 'Extreme Portable SSD', p: 99, s: { Type: 'Portable SSD' } },
  { b: 'Blue', m: 'Yeti USB Microphone', p: 109, s: { Type: 'USB microphone' } },
  { b: 'Razer', m: 'Gigantus V2', p: 25, s: { Type: 'Gaming mouse mat' } },
  { b: 'Apple', m: 'USB-C Digital AV Multiport Adapter', p: 69, s: { Type: 'Adapter', Output: 'HDMI' } },
  { b: 'Dell', m: 'UltraSharp U2723QE', p: 599, s: { Type: 'Monitor', Size: '27-inch', Resolution: '4K' } },
];
