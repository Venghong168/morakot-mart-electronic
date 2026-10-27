import { Seed } from '../builder';

const portable = (rating = 'IP67') => ({ Type: 'Portable Bluetooth speaker', 'Water/dust rating': rating });

export const SPEAKERS: Seed[] = [
  { b: 'JBL', m: 'Flip 6', p: 109, f: true, s: portable() },
  { b: 'JBL', m: 'Charge 5', p: 149, s: portable() },
  { b: 'JBL', m: 'Clip 5', p: 79, s: portable() },
  { b: 'JBL', m: 'Go 4', p: 49, s: portable() },
  { b: 'JBL', m: 'Xtreme 4', p: 379, s: portable() },
  { b: 'Sony', m: 'SRS-XB100', p: 59, s: portable() },
  { b: 'Sony', m: 'ULT Field 1', p: 129, f: true, s: portable() },
  { b: 'Anker', m: 'Soundcore Motion 300', p: 79, s: portable('IPX7') },
  { b: 'Bose', m: 'SoundLink Flex', p: 149, w: 169, s: portable() },
  { b: 'Marshall', m: 'Emberton II', p: 169, s: portable() },
  { b: 'Ultimate Ears', m: 'WONDERBOOM 4', p: 99, s: portable() },
  { b: 'Apple', m: 'HomePod mini', p: 99, f: true, s: { Type: 'Smart speaker', Assistant: 'Siri' } },
];
