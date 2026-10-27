export const CATEGORY_NAMES = [
  'Smartphones', 'Tablets', 'Laptops', 'Headphones and Earbuds', 'Smartwatches',
  'Speakers', 'Chargers and Power Banks', 'Keyboards', 'Computer Mice', 'Computer Accessories',
] as const;

export type CategoryName = (typeof CATEGORY_NAMES)[number];

export interface CategoryInfo {
  name: CategoryName;
  khmer: string;
  icon: string;
  /** Category illustration, used when no product photo has been added. */
  image: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  brand: string;
  model: string;
  category: CategoryName;
  description: string;
  /** Sample/demo price in USD (not a verified retail price). */
  price: number;
  originalPrice?: number;
  /** Intended photo path. It is only used if the file exists (see image-manifest.ts). */
  image: string;
  additionalImages: string[];
  stock: number;
  featured: boolean;
  specifications: Record<string, string>;
}

export const fullName = (p: Pick<Product, 'brand' | 'name'>): string => `${p.brand} ${p.name}`;
