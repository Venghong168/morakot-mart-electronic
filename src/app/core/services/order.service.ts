import { Injectable, inject } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { Order, PaymentMethod } from '../../models/order.model';
import { readJson, writeJson } from '../../shared/utils';
import { CartService } from './cart.service';

export const ORDERS_KEY = 'morakot_mart_orders';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly cart = inject(CartService);

  getAll(): Order[] {
    const data = readJson<unknown>(ORDERS_KEY, []);
    return Array.isArray(data)
      ? (data as Order[]).filter(o => !!o && typeof o.orderNumber === 'string' && Array.isArray(o.items) && !!o.customer)
      : [];
  }

  getById(orderNumber: string): Order | undefined {
    return this.getAll().find(o => o.orderNumber === orderNumber);
  }

  /** Saves the order first; the cart is cleared only if saving succeeded. */
  placeOrder(customer: Customer, paymentMethod: PaymentMethod): Order | null {
    const items = this.cart.items();
    if (items.length === 0 || items.some(i => i.quantity < 1 || i.quantity > i.stock)) return null;

    const orders = this.getAll();
    const now = new Date();
    const stamp = now.toISOString().slice(0, 10).replace(/-/g, '');
    let orderNumber = '';
    do { orderNumber = `MM-${stamp}-${Math.floor(10000 + Math.random() * 90000)}`; }
    while (orders.some(o => o.orderNumber === orderNumber));

    const order: Order = {
      orderNumber,
      invoiceNumber: orderNumber.replace('MM-', 'INV-'),
      date: now.toISOString(),
      customer,
      items: items.map(i => ({ productId: i.productId, name: i.name, unitPrice: i.price, quantity: i.quantity, lineTotal: this.cart.lineTotal(i) })),
      paymentMethod,
      subtotal: this.cart.subtotal(),
      deliveryFee: this.cart.deliveryFee(),
      total: this.cart.total(),
      status: paymentMethod === 'Cash on Delivery' ? 'Pending – pay on delivery' : 'Pending – awaiting demo transfer',
    };

    if (!writeJson(ORDERS_KEY, [...orders, order])) return null;
    this.cart.clear();
    return order;
  }
}
