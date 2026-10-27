import { Customer } from './customer.model';

export type PaymentMethod = 'Cash on Delivery' | 'Demo Bank Transfer';

export interface OrderItem {
  productId: number;
  name: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface Order {
  orderNumber: string;
  invoiceNumber: string;
  date: string; // ISO 8601
  customer: Customer;
  items: OrderItem[];
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: string;
}
