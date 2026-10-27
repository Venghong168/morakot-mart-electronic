import { CurrencyPipe, KeyValuePipe } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { ToastService } from '../../core/services/toast.service';
import { photosOf } from '../../data/product-image';
import { fullName } from '../../models/product.model';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductImageComponent } from '../../shared/components/product-image/product-image.component';
import { QuantitySelectorComponent } from '../../shared/components/quantity-selector/quantity-selector.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, KeyValuePipe, EmptyStateComponent, ProductCardComponent, ProductImageComponent, QuantitySelectorComponent],
  template: `
    <div class="container py-4">
      @if (product(); as p) {
        <nav aria-label="Breadcrumb"><ol class="breadcrumb">
          <li class="breadcrumb-item"><a routerLink="/">Home</a></li>
          <li class="breadcrumb-item"><a routerLink="/shop">Shop</a></li>
          <li class="breadcrumb-item"><a routerLink="/shop" [queryParams]="{ category: p.category }">{{ p.category }}</a></li>
          <li class="breadcrumb-item active" aria-current="page">{{ name(p) }}</li>
        </ol></nav>

        <div class="row g-4">
          <div class="col-md-5">
            <div class="detail-img"><app-product-image [product]="p" [index]="shot()" [eager]="true" /></div>
            @if (photoCount() > 1) {
              <div class="thumbs" role="group" aria-label="Product images">
                @for (n of thumbs(); track n) {
                  <button type="button" [class.active]="n === shot()" [attr.aria-label]="'Show image ' + (n + 1)" (click)="shot.set(n)">
                    <app-product-image [product]="p" [index]="n" [caption]="false" />
                  </button>
                }
              </div>
            }
          </div>
          <div class="col-md-7">
            <span class="p-cat">{{ p.brand }} · {{ p.category }}</span>
            <h1 class="h2 mt-1">{{ name(p) }}</h1>
            <p class="detail-price">
              {{ p.price | currency: 'USD' : 'symbol' : '1.0-0' }}
              @if (p.originalPrice) { <s class="p-was fs-5">{{ p.originalPrice | currency: 'USD' : 'symbol' : '1.0-0' }}</s> }
              <small class="muted fs-6 fw-normal">· sample/demo price</small>
            </p>
            <p>{{ p.description }}</p>
            <p class="p-stock" [class.low]="p.stock <= 5">
              <i class="bi" [class]="p.stock > 0 ? 'bi-check-circle' : 'bi-x-circle'" aria-hidden="true"></i>
              {{ p.stock > 0 ? p.stock + ' available in stock' : 'Out of stock' }}
            </p>
            @if (p.stock > 0) {
              <div class="d-flex flex-wrap align-items-center gap-3 my-3">
                <app-quantity-selector [value]="qty()" [max]="p.stock" (valueChange)="qty.set($event)" />
                <button type="button" class="btn btn-emerald btn-lg" (click)="add()"><i class="bi bi-bag-plus" aria-hidden="true"></i> Add to Cart · ដាក់ក្នុងកន្ត្រក</button>
              </div>
            }
            <a routerLink="/shop" class="btn btn-outline-emerald"><i class="bi bi-arrow-left" aria-hidden="true"></i> Back to Shop</a>

            <h2 class="h5 mt-4">Specifications</h2>
            <table class="table spec-table">
              <tbody>
                <tr><th scope="row">Brand</th><td>{{ p.brand }}</td></tr>
                <tr><th scope="row">Model</th><td>{{ p.model }}</td></tr>
                @for (s of p.specifications | keyvalue: keepOrder; track s.key) {
                  <tr><th scope="row">{{ s.key }}</th><td>{{ s.value }}</td></tr>
                }
              </tbody>
            </table>
            <p class="small muted">Only key specifications are listed. Confirm full details with the manufacturer before buying.</p>
          </div>
        </div>

        <h2 class="section-title mt-5">Related products <span>ទំនិញពាក់ព័ន្ធ</span></h2>
        <div class="row g-3 g-lg-4">
          @for (r of related(); track r.id) { <div class="col-6 col-lg-3"><app-product-card [product]="r" /></div> }
        </div>
      } @else {
        <app-empty-state icon="bi-question-circle" title="Product not found · រកមិនឃើញទំនិញ"
          message="This product does not exist or is no longer available." actionLabel="Back to Shop" />
      }
    </div>`,
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  private catalog = inject(ProductService);
  private cart = inject(CartService);
  private toast = inject(ToastService);
  name = fullName;
  keepOrder = () => 0;

  private id = toSignal(this.route.paramMap.pipe(map(p => Number(p.get('id')))), { initialValue: NaN });
  product = computed(() => this.catalog.getById(this.id()));
  related = computed(() => { const p = this.product(); return p ? this.catalog.related(p) : []; });
  photoCount = computed(() => { const p = this.product(); return p ? photosOf(p).length : 0; });
  thumbs = computed(() => Array.from({ length: this.photoCount() }, (_, i) => i));
  qty = signal(1);
  shot = signal(0);

  constructor() {
    effect(() => { this.id(); this.qty.set(1); this.shot.set(0); }, { allowSignalWrites: true });
  }

  add(): void {
    const p = this.product();
    if (!p) return;
    const r = this.cart.add(p, this.qty());
    this.toast.show(r.message, r.ok ? 'success' : 'danger');
    if (r.ok) this.qty.set(1);
  }
}
