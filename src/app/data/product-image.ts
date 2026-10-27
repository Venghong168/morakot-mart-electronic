import { CategoryName, Product } from '../models/product.model';
import { CATEGORIES } from './categories';
import { PHOTO_FILES } from './image-manifest';

export const categoryImage = (c: CategoryName): string =>
  CATEGORIES.find(x => x.name === c)?.image ?? 'assets/images/placeholder.svg';

/** Real photos that exist for this product (main image first). Empty if none were added. */
export const photosOf = (p: Product): string[] =>
  (PHOTO_FILES[p.slug] ?? []).map(f => `assets/images/products/${f}`);

/** The image to show: the real photo if available, otherwise the category illustration. */
export const productImage = (p: Product): string => photosOf(p)[0] ?? categoryImage(p.category);
