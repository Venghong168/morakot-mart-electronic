import { CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { ToastService } from '../../../core/services/toast.service';
import { Product } from '../../../models/product.model';
import { ProductImageComponent } from '../product-image/product-image.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, ProductImageComponent],
  template: `
    <article class="p-card">
      <a [routerLink]="['/products', product().id]" class="p-img" [attr.aria-label]="'View ' + product().brand + ' ' + product().name">
        <app-product-image [product]="product()" />
        @if (product().featured) { <span class="badge-gold">Featured</span> }
      </a>
      <div class="p-body">
        <span class="p-cat">{{ product().brand }} · {{ product().category }}</span>
        <h3 class="p-name"><a [routerLink]="['/products', product().id]">{{ product().name }}</a></h3>
        <div class="d-flex justify-content-between align-items-baseline">
          <span>
            <span class="p-price">{{ product().price | currency: 'USD' : 'symbol' : '1.0-0' }}</span>
            @if (product().originalPrice) { <s class="p-was">{{ product().originalPrice | currency: 'USD' : 'symbol' : '1.0-0' }}</s> }
          </span>
          <span class="p-stock" [class.low]="product().stock <= 5">
            {{ product().stock > 0 ? (product().stock <= 5 ? 'Only ' + product().stock + ' left' : product().stock + ' in stock') : 'Out of stock' }}
          </span>
        </div>
        <div class="d-flex gap-2 mt-3">
          <a class="btn btn-outline-emerald btn-sm flex-fill" [routerLink]="['/products', product().id]">Details</a>
          <button type="button" class="btn btn-emerald btn-sm flex-fill" [disabled]="product().stock < 1" (click)="add()">
            <i class="bi bi-bag-plus" aria-hidden="true"></i> Add to Cart
          </button>
        </div>
      </div>
    </article>`,
})
export class ProductCardComponent {
  product = input.required<Product>();
  private cart = inject(CartService);
  private toast = inject(ToastService);

  add(): void {
    const r = this.cart.add(this.product());
    this.toast.show(r.message, r.ok ? 'success' : 'danger');
  }
}
