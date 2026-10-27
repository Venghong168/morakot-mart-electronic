import { Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { HomeComponent } from './pages/home/home.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ShopComponent } from './pages/shop/shop.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Morakot Mart · មរកតម៉ាត' },
  { path: 'shop', component: ShopComponent, title: 'Shop · Morakot Mart' },
  { path: 'products/:id', component: ProductDetailComponent, title: 'Product · Morakot Mart' },
  { path: 'cart', component: CartComponent, title: 'Cart · Morakot Mart' },
  { path: 'checkout', component: CheckoutComponent, title: 'Checkout · Morakot Mart' },
  { path: 'order-success/:orderId', component: OrderSuccessComponent, title: 'Order placed · Morakot Mart' },
  { path: 'invoice/:orderId', component: InvoiceComponent, title: 'Invoice · Morakot Mart' },
  { path: '**', component: NotFoundComponent, title: 'Not found · Morakot Mart' },
];
