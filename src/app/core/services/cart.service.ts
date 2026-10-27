import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { CartItem } from '../../models/cart-item.model';
import { productImage } from '../../data/product-image';
import { Product, fullName } from '../../models/product.model';
import { readJson, round2, writeJson } from '../../shared/utils';
import { ProductService } from './product.service';

export const CART_KEY = 'morakot_mart_cart';
export const DELIVERY_FEE = 2;
export const FREE_DELIVERY_FROM = 100;

export interface CartResult { ok: boolean; message: string; }

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly catalog = inject(ProductService);
  private readonly _items = signal<CartItem[]>(this.load());

  readonly items = this._items.asReadonly();
  readonly count = computed(() => this._items().reduce((n, i) => n + i.quantity, 0));
  readonly subtotal = computed(() => round2(this._items().reduce((s, i) => s + this.lineTotal(i), 0)));
  readonly deliveryFee = computed(() =>
    this._items().length === 0 || this.subtotal() >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE);
  readonly total = computed(() => round2(this.subtotal() + this.deliveryFee()));

  constructor() {
    effect(() => { writeJson(CART_KEY, this._items().map(i => ({ productId: i.productId, quantity: i.quantity }))); });
  }

  lineTotal(item: CartItem): number {
    return round2(item.price * item.quantity);
  }

  add(product: Product, quantity = 1): CartResult {
    if (product.stock < 1) return { ok: false, message: 'This product is out of stock.' };
    if (quantity < 1) return { ok: false, message: 'Quantity must be at least 1.' };
    const existing = this._items().find(i => i.productId === product.id);
    const wanted = (existing?.quantity ?? 0) + quantity;
    if (wanted > product.stock) {
      return { ok: false, message: `Only ${product.stock} in stock. You already have ${existing?.quantity ?? 0} in your cart.` };
    }
    if (existing) {
      this._items.update(list => list.map(i => i.productId === product.id ? { ...i, quantity: wanted } : i));
    } else {
      this._items.update(list => [...list, {
        productId: product.id, name: fullName(product), price: product.price,
        image: productImage(product), quantity, stock: product.stock,
      }]);
    }
    return { ok: true, message: `${product.name} added to your cart.` };
  }

  increase(productId: number): CartResult {
    const item = this._items().find(i => i.productId === productId);
    if (!item) return { ok: false, message: 'Item not found.' };
    if (item.quantity >= item.stock) return { ok: false, message: `Only ${item.stock} available in stock.` };
    this._items.update(list => list.map(i => i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i));
    return { ok: true, message: 'Quantity updated.' };
  }

  decrease(productId: number): void {
    this._items.update(list => list
      .map(i => i.productId === productId && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i));
  }

  remove(productId: number): void {
    this._items.update(list => list.filter(i => i.productId !== productId));
  }

  clear(): void {
    this._items.set([]);
  }

  /** Rebuilds the cart from saved ids and quantities using current catalog data, so prices and stock are always trusted. */
  private load(): CartItem[] {
    const saved = readJson<unknown>(CART_KEY, []);
    if (!Array.isArray(saved)) return [];
    const items: CartItem[] = [];
    for (const entry of saved) {
      const e = entry as { productId?: unknown; quantity?: unknown };
      if (typeof e?.productId !== 'number' || typeof e?.quantity !== 'number') continue;
      const p = this.catalog.getById(e.productId);
      if (!p || items.some(i => i.productId === p.id)) continue;
      const qty = Math.min(Math.floor(e.quantity), p.stock);
      if (qty < 1) continue;
      items.push({ productId: p.id, name: fullName(p), price: p.price, image: productImage(p), quantity: qty, stock: p.stock });
    }
    return items;
  }
}
