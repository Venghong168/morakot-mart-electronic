import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService, DELIVERY_FEE, FREE_DELIVERY_FROM } from '../../core/services/cart.service';
import { ToastService } from '../../core/services/toast.service';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { imageFallback } from '../../shared/utils';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, EmptyStateComponent],
  template: `
    <div class="container py-4">
      <h1 class="page-title">Shopping Cart <span>កន្ត្រកទំនិញ</span></h1>
      @if (cart.items().length === 0) {
        <app-empty-state icon="bi-bag-x" title="Your cart is empty · កន្ត្រករបស់អ្នកនៅទទេ"
          message="Add a product to your cart and it will show up here." actionLabel="Shop Now" />
      } @else {
        <p class="muted">{{ cart.count() }} item{{ cart.count() === 1 ? '' : 's' }} in your cart</p>
        <div class="row g-4">
          <div class="col-lg-8">
            <ul class="cart-list">
              @for (i of cart.items(); track i.productId) {
                <li class="cart-row">
                  <img [src]="i.image" [alt]="i.name" (error)="onError($event)" />
                  <div class="cart-info">
                    <a [routerLink]="['/products', i.productId]" class="fw-semibold">{{ i.name }}</a>
                    <div class="muted small">{{ i.price | currency: 'USD' }} each</div>
                    <button type="button" class="btn btn-link btn-sm p-0 text-danger" (click)="cart.remove(i.productId)">
                      <i class="bi bi-trash" aria-hidden="true"></i> Remove<span class="visually-hidden"> {{ i.name }}</span>
                    </button>
                  </div>
                  <div class="qty" role="group" [attr.aria-label]="'Quantity for ' + i.name">
                    <button type="button" aria-label="Decrease quantity" [disabled]="i.quantity <= 1" (click)="cart.decrease(i.productId)"><i class="bi bi-dash-lg" aria-hidden="true"></i></button>
                    <output>{{ i.quantity }}</output>
                    <button type="button" aria-label="Increase quantity" (click)="increase(i.productId)"><i class="bi bi-plus-lg" aria-hidden="true"></i></button>
                  </div>
                  <strong class="cart-line">{{ cart.lineTotal(i) | currency: 'USD' }}</strong>
                </li>
              }
            </ul>
            <div class="d-flex flex-wrap gap-2 mt-3">
              <a routerLink="/shop" class="btn btn-outline-emerald"><i class="bi bi-arrow-left" aria-hidden="true"></i> Continue Shopping</a>
              @if (!confirming()) {
                <button type="button" class="btn btn-outline-danger" (click)="confirming.set(true)"><i class="bi bi-trash3" aria-hidden="true"></i> Clear cart</button>
              } @else {
                <div class="confirm" role="alertdialog" aria-label="Confirm clearing the cart">
                  <span>Remove all items from your cart?</span>
                  <button type="button" class="btn btn-danger btn-sm" (click)="clear()">Yes, clear</button>
                  <button type="button" class="btn btn-light btn-sm" (click)="confirming.set(false)">Keep items</button>
                </div>
              }
            </div>
          </div>
          <div class="col-lg-4">
            <aside class="summary" aria-label="Order summary">
              <h2 class="h5">Order summary · សង្ខេបការបញ្ជាទិញ</h2>
              <div class="sum-row"><span>Subtotal</span><span>{{ cart.subtotal() | currency: 'USD' }}</span></div>
              <div class="sum-row"><span>Delivery fee</span><span>{{ cart.deliveryFee() === 0 ? 'Free' : (cart.deliveryFee() | currency: 'USD') }}</span></div>
              <p class="small muted">Flat {{ fee | currency: 'USD' }} delivery. Free when your subtotal is {{ freeFrom | currency: 'USD' : 'symbol' : '1.0-0' }} or more.</p>
              <div class="sum-row total"><span>Total</span><span>{{ cart.total() | currency: 'USD' }}</span></div>
              <a routerLink="/checkout" class="btn btn-emerald w-100 mt-2">Proceed to Checkout · ទូទាត់ប្រាក់</a>
            </aside>
          </div>
        </div>
      }
    </div>`,
})
export class CartComponent {
  cart = inject(CartService);
  private toast = inject(ToastService);
  confirming = signal(false);
  fee = DELIVERY_FEE;
  freeFrom = FREE_DELIVERY_FROM;
  onError = imageFallback;

  increase(id: number): void {
    const r = this.cart.increase(id);
    if (!r.ok) this.toast.show(r.message, 'danger');
  }

  clear(): void {
    this.cart.clear();
    this.confirming.set(false);
    this.toast.show('Your cart has been cleared.', 'info');
  }
}
