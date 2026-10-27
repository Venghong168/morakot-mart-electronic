import { CategoryName, Product } from '../../models/product.model';
import { build, Seed } from '../builder';
import { ACCESSORIES } from './accessories';
import { CHARGERS } from './chargers';
import { HEADPHONES } from './headphones';
import { KEYBOARDS } from './keyboards';
import { LAPTOPS } from './laptops';
import { MICE } from './mice';
import { SMARTPHONES } from './smartphones';
import { SMARTWATCHES } from './smartwatches';
import { SPEAKERS } from './speakers';
import { TABLETS } from './tablets';

const GROUPS: [CategoryName, Seed[]][] = [
  ['Smartphones', SMARTPHONES], ['Tablets', TABLETS], ['Laptops', LAPTOPS],
  ['Headphones and Earbuds', HEADPHONES], ['Smartwatches', SMARTWATCHES], ['Speakers', SPEAKERS],
  ['Chargers and Power Banks', CHARGERS], ['Keyboards', KEYBOARDS], ['Computer Mice', MICE],
  ['Computer Accessories', ACCESSORIES],
];

export const ALL_PRODUCTS: Product[] = (() => {
  const out: Product[] = [];
  for (const [category, seeds] of GROUPS) out.push(...build(category, seeds, out.length + 1));
  return out;
})();
