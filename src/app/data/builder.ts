import { CategoryName, Product } from '../models/product.model';

/** Compact product seed. b=brand, m=model (without brand), p=sample USD price, s=specifications, f=featured, w=original (pre-discount) demo price. */
export interface Seed { b: string; m: string; p: number; s: Record<string, string>; f?: boolean; w?: number; }

export const slugify = (t: string): string =>
  t.toLowerCase().replace(/\+/g, ' plus ').replace(/\(([^)]*)\)/g, '$1').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export function build(category: CategoryName, seeds: Seed[], startId: number): Product[] {
  return seeds.map((x, i) => {
    const id = startId + i;
    const slug = slugify(`${x.b} ${x.m}`);
    const details = Object.entries(x.s).map(([k, v]) => `${k.toLowerCase()}: ${v}`).join('; ');
    return {
      id, slug, name: x.m, brand: x.b, model: x.m, category,
      description: `${x.b} ${x.m}. Key details – ${details}. Sample listing with a demo price.`,
      price: x.p,
      ...(x.w ? { originalPrice: x.w } : {}),
      image: `assets/images/products/${slug}.webp`,
      additionalImages: [],
      stock: 3 + ((id * 7) % 28),
      featured: !!x.f,
      specifications: { ...x.s },
    };
  });
}
