import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { ToastService } from '../../core/services/toast.service';
import { PaymentMethod } from '../../models/order.model';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

/** Cambodian-style numbers: 0xx xxx xxx(x) or +855 xx xxx xxx(x). Spaces and dashes are ignored. */
function phoneValidator(c: AbstractControl): ValidationErrors | null {
  const v = String(c.value ?? '').replace(/[\s-]/g, '');
  return !v || /^(\+855|855|0)[1-9]\d{7,8}$/.test(v) ? null : { phone: true };
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CurrencyPipe, EmptyStateComponent],
  template: `
    <div class="container py-4">
      <h1 class="page-title">Checkout <span>ទូទាត់ប្រាក់</span></h1>
      @if (cart.items().length === 0 && !placing()) {
        <app-empty-state icon="bi-bag-x" title="Nothing to check out · គ្មានទំនិញសម្រាប់ទូទាត់"
          message="Your cart is empty. Add a product before checking out." actionLabel="Shop Now" />
      } @else {
        <div class="alert alert-demo" role="note"><i class="bi bi-info-circle" aria-hidden="true"></i>
          Demo checkout only. No real payment is processed, no card details are collected and nothing is sent to a server.</div>
        <form [formGroup]="form" (ngSubmit)="submit()" novalidate class="row g-4">
          <div class="col-lg-7">
            <div class="panel">
              <h2 class="h5">Customer details · ព័ត៌មានអតិថិជន</h2>
              <div class="mb-3">
                <label for="fullName" class="form-label">Full name *</label>
                <input id="fullName" class="form-control" formControlName="fullName" autocomplete="name" [class.is-invalid]="bad('fullName')" />
                @if (bad('fullName')) { <div class="invalid-feedback">Enter your full name (at least 2 characters).</div> }
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="phone" class="form-label">Phone number *</label>
                  <input id="phone" class="form-control" type="tel" formControlName="phone" placeholder="012 345 678" autocomplete="tel" [class.is-invalid]="bad('phone')" />
                  @if (bad('phone')) { <div class="invalid-feedback">Enter a valid phone number, e.g. 012 345 678 or +855 12 345 678.</div> }
                </div>
                <div class="col-md-6 mb-3">
                  <label for="email" class="form-label">Email address *</label>
                  <input id="email" class="form-control" type="email" formControlName="email" autocomplete="email" [class.is-invalid]="bad('email')" />
                  @if (bad('email')) { <div class="invalid-feedback">Enter a valid email address, e.g. name&#64;example.com.</div> }
                </div>
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">Delivery address *</label>
                <textarea id="address" rows="3" class="form-control" formControlName="address" autocomplete="street-address" [class.is-invalid]="bad('address')"></textarea>
                @if (bad('address')) { <div class="invalid-feedback">Enter your delivery address (at least 10 characters).</div> }
              </div>
              <div>
                <label for="notes" class="form-label">Order notes (optional)</label>
                <textarea id="notes" rows="2" class="form-control" formControlName="notes"></textarea>
              </div>
            </div>
            <fieldset class="panel mt-3">
              <legend class="h5">Payment method · វិធីបង់ប្រាក់</legend>
              <div class="form-check pay-opt">
                <input class="form-check-input" type="radio" id="pay-cod" value="Cash on Delivery" formControlName="payment" />
                <label class="form-check-label" for="pay-cod"><strong>Cash on Delivery</strong><br><small class="muted">បង់ប្រាក់ពេលទទួលទំនិញ</small></label>
              </div>
              <div class="form-check pay-opt">
                <input class="form-check-input" type="radio" id="pay-bank" value="Demo Bank Transfer" formControlName="payment" />
                <label class="form-check-label" for="pay-bank"><strong>Demo Bank Transfer</strong><br><small class="muted">ផ្ទេរប្រាក់តាមធនាគារ (សាកល្បង). Pretend payment, no money moves.</small></label>
              </div>
            </fieldset>
          </div>
          <div class="col-lg-5">
            <aside class="summary" aria-label="Order summary">
              <h2 class="h5">Order summary · សង្ខេបការបញ្ជាទិញ</h2>
              @for (i of cart.items(); track i.productId) {
                <div class="sum-row"><span>{{ i.name }}<br><small class="muted">{{ i.quantity }} × {{ i.price | currency: 'USD' }}</small></span><span>{{ cart.lineTotal(i) | currency: 'USD' }}</span></div>
              }
              <hr />
              <div class="sum-row"><span>Subtotal</span><span>{{ cart.subtotal() | currency: 'USD' }}</span></div>
              <div class="sum-row"><span>Delivery fee</span><span>{{ cart.deliveryFee() === 0 ? 'Free' : (cart.deliveryFee() | currency: 'USD') }}</span></div>
              <div class="sum-row"><span>Payment</span><span>{{ form.controls.payment.value }}</span></div>
              <div class="sum-row total"><span>Total</span><span>{{ cart.total() | currency: 'USD' }}</span></div>
              @if (error()) { <div class="alert alert-danger mt-2" role="alert">{{ error() }}</div> }
              <button type="submit" class="btn btn-emerald w-100 mt-2" [disabled]="placing()">Place Demo Order · បញ្ជាទិញ</button>
              <a routerLink="/cart" class="btn btn-link w-100">Back to cart</a>
            </aside>
          </div>
        </form>
      }
    </div>`,
})
export class CheckoutComponent {
  cart = inject(CartService);
  private orders = inject(OrderService);
  private router = inject(Router);
  private toast = inject(ToastService);
  private fb = inject(FormBuilder).nonNullable;

  placing = signal(false);
  error = signal('');

  form = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, phoneValidator]],
    email: ['', [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
    address: ['', [Validators.required, Validators.minLength(10)]],
    notes: [''],
    payment: ['Cash on Delivery' as PaymentMethod, Validators.required],
  });

  bad(name: 'fullName' | 'phone' | 'email' | 'address'): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || c.dirty);
  }

  submit(): void {
    this.error.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    this.placing.set(true);
    const order = this.orders.placeOrder(
      { fullName: v.fullName.trim(), phone: v.phone.trim(), email: v.email.trim(), address: v.address.trim(), notes: v.notes.trim() },
      v.payment);
    if (!order) {
      this.placing.set(false);
      this.error.set('We could not save your order. Check your cart quantities and that browser storage is enabled, then try again.');
      return;
    }
    this.toast.show('Demo order placed.');
    this.router.navigate(['/order-success', order.orderNumber]);
  }
}
