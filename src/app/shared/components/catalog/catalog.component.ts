import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { fullName } from '../../../models/product.model';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { ProductCardComponent } from '../product-card/product-card.component';

type SortKey = 'default' | 'price-asc' | 'price-desc' | 'name' | 'brand';
const PAGE_SIZE = 12;

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent, EmptyStateComponent],
  template: `
    <section class="filters" aria-label="Product filters">
      <div class="row g-2 align-items-end">
        <div class="col-12 col-md-6 col-xl-3">
          <label class="form-label" for="f-q">Search name or model</label>
          <input #qi id="f-q" class="form-control" type="search" placeholder="e.g. iPhone, MX Master, Galaxy…" [value]="q()" (input)="q.set(qi.value)" />
        </div>
        <div class="col-6 col-md-3 col-xl-2">
          <label class="form-label" for="f-cat">Category</label>
          <select #ci id="f-cat" class="form-select" (change)="setCategory(ci.value)">
            <option value="" [selected]="!category()">All ({{ products.products.length }})</option>
            @for (c of products.categories; track c.name) {
              <option [value]="c.name" [selected]="category() === c.name">{{ c.name }} ({{ products.countIn(c.name) }})</option>
            }
          </select>
        </div>
        <div class="col-6 col-md-3 col-xl-2">
          <label class="form-label" for="f-brand">Brand</label>
          <select #bi id="f-brand" class="form-select" (change)="brand.set(bi.value)">
            <option value="" [selected]="!brand()">All brands</option>
            @for (b of brands(); track b) { <option [value]="b" [selected]="brand() === b">{{ b }}</option> }
          </select>
        </div>
        <div class="col-8 col-md-6 col-xl-3">
          <label class="form-label" for="f-sort">Sort by</label>
          <select #si id="f-sort" class="form-select" (change)="sort.set($any(si.value))">
            <option value="default">Featured first</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name">Name: A–Z</option>
            <option value="brand">Brand: A–Z</option>
          </select>
        </div>
        <div class="col-4 col-md-6 col-xl-2">
          <div class="form-check mb-2">
            <input #fi class="form-check-input" type="checkbox" id="f-feat" [checked]="featuredOnly()" (change)="featuredOnly.set(fi.checked)" />
            <label class="form-check-label" for="f-feat">Featured only</label>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2">
        <p class="mb-0 muted" aria-live="polite">Showing {{ shown().length }} of {{ results().length }} products</p>
        @if (hasFilters()) {
          <button type="button" class="btn btn-link btn-sm p-0" (click)="clear()"><i class="bi bi-x-circle" aria-hidden="true"></i> Clear all filters</button>
        }
      </div>
    </section>

    @if (results().length) {
      <div class="row g-3 g-lg-4">
        @for (p of shown(); track p.id) {
          <div class="col-6 col-md-4 col-xl-3"><app-product-card [product]="p" /></div>
        }
      </div>
      @if (shown().length < results().length) {
        <div class="text-center mt-4">
          <button type="button" class="btn btn-outline-emerald btn-lg" (click)="limit.set(limit() + pageSize)">
            Load more ({{ results().length - shown().length }} remaining)
          </button>
        </div>
      }
    } @else {
      <app-empty-state icon="bi-search" title="No products found"
        message="Try a different name or model, or clear the filters. មិនមានទំនិញដែលត្រូវនឹងការស្វែងរកទេ។" />
    }
    <p class="small muted mt-4 mb-0">All prices are sample/demo prices in USD, not current retail prices.</p>`,
})
export class CatalogComponent {
  products = inject(ProductService);
  private route = inject(ActivatedRoute);
  readonly pageSize = PAGE_SIZE;

  q = signal('');
  category = signal('');
  brand = signal('');
  sort = signal<SortKey>('default');
  featuredOnly = signal(false);
  limit = signal(PAGE_SIZE);

  constructor() {
    // Keep local filter state in sync with the URL (navbar search, category cards and links).
    this.route.queryParamMap.subscribe(p => {
      this.q.set(p.get('q') ?? '');
      this.category.set(p.get('category') ?? '');
      this.brand.set(p.get('brand') ?? '');
    });
    effect(() => { this.results(); this.limit.set(PAGE_SIZE); }, { allowSignalWrites: true });
  }

  brands = computed(() => this.products.brandsIn(this.category()));
  hasFilters = computed(() => !!(this.q() || this.category() || this.brand() || this.featuredOnly() || this.sort() !== 'default'));

  results = computed(() => {
    const tokens = this.q().trim().toLowerCase().split(/\s+/).filter(Boolean);
    const cat = this.category();
    const brand = this.brand();
    const list = this.products.products.filter(p => {
      if (cat && p.category !== cat) return false;
      if (brand && p.brand !== brand) return false;
      if (this.featuredOnly() && !p.featured) return false;
      const hay = `${fullName(p)} ${p.model} ${p.category}`.toLowerCase();
      return tokens.every(t => hay.includes(t));
    });
    switch (this.sort()) {
      case 'price-asc': return [...list].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...list].sort((a, b) => b.price - a.price);
      case 'name': return [...list].sort((a, b) => fullName(a).localeCompare(fullName(b)));
      case 'brand': return [...list].sort((a, b) => a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name));
      default: return [...list].sort((a, b) => Number(b.featured) - Number(a.featured) || a.id - b.id);
    }
  });

  shown = computed(() => this.results().slice(0, this.limit()));

  setCategory(value: string): void {
    this.category.set(value);
    if (this.brand() && !this.products.brandsIn(value).includes(this.brand())) this.brand.set('');
  }

  clear(): void {
    this.q.set(''); this.category.set(''); this.brand.set(''); this.sort.set('default'); this.featuredOnly.set(false);
  }
}
