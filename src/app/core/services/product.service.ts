import { Injectable } from '@angular/core';
import { CATEGORIES } from '../../data/categories';
import { ALL_PRODUCTS } from '../../data/products';
import { CategoryInfo, CategoryName, Product } from '../../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  readonly products: readonly Product[] = ALL_PRODUCTS;
  readonly categories: readonly CategoryInfo[] = CATEGORIES;
  readonly brands: readonly string[] = [...new Set(ALL_PRODUCTS.map(p => p.brand))].sort((a, b) => a.localeCompare(b));

  getById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  countIn(category: CategoryName): number {
    return this.products.filter(p => p.category === category).length;
  }

  brandsIn(category: string): string[] {
    const list = category ? this.products.filter(p => p.category === category) : this.products;
    return [...new Set(list.map(p => p.brand))].sort((a, b) => a.localeCompare(b));
  }

  related(product: Product, limit = 4): Product[] {
    return this.products
      .filter(p => p.category === product.category && p.id !== product.id)
      .sort((a, b) => Number(b.brand === product.brand) - Number(a.brand === product.brand) || a.id - b.id)
      .slice(0, limit);
  }
}
