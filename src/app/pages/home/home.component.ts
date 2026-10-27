import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CatalogComponent } from '../../shared/components/catalog/catalog.component';
import { CategoryCardComponent } from '../../shared/components/category-card/category-card.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CatalogComponent, CategoryCardComponent, ProductCardComponent],
  template: `
    <section class="hero">
      <div class="container">
        <div class="row align-items-center g-4">
          <div class="col-lg-7">
            <p class="hero-kicker">MORAKOT MART ELECTRONIC  · មរកតម៉ាត អេឡិចត្រូនិក</p>
            <h1>ទិញអេឡិចត្រូនិកអនឡាញ ដោយទំនុកចិត្ត</h1>
            <p class="hero-tag">ទិញងាយ ស្រួលចិត្ត គុណភាពទុកចិត្តបាន</p>
            <p class="hero-sub">Genuine models from Apple, Samsung, Sony, Logitech and more, in 10 categories. Add to cart, check out in a minute and get a printable invoice. Your Trusted Online Shop.</p>
            <a routerLink="/shop" class="btn btn-gold btn-lg">Shop Now · ទិញឥឡូវនេះ</a>
          </div>
          <div class="col-lg-5">
            <div class="hero-art"><img src="assets/images/categories/18pm4.jpg" alt="Illustration of a smartphone" /></div>
          </div>
        </div>
      </div>
    </section>

    <section class="container section" aria-labelledby="h-cat">
      <h2 id="h-cat" class="section-title">Shop by category <span>ប្រភេទទំនិញ</span></h2>
      <div class="row g-3 row-cols-2 row-cols-md-3 row-cols-xl-5">
        @for (c of products.categories; track c.name) {
          <div class="col"><app-category-card [category]="c" [count]="products.countIn(c.name)" /></div>
        }
      </div>
    </section>

    <section class="container section" aria-labelledby="h-feat">
      <h2 id="h-feat" class="section-title">Featured products <span>ទំនិញពេញនិយម</span></h2>
      <div class="row g-3 g-lg-4">
        @for (p of featured(); track p.id) {
          <div class="col-6 col-lg-3"><app-product-card [product]="p" /></div>
        }
      </div>
    </section>

    <section class="container section" aria-labelledby="h-all">
      <h2 id="h-all" class="section-title">All products <span>ទំនិញទាំងអស់</span></h2>
      <app-catalog />
    </section>

    <section class="container section">
      <div class="promo">
        <div>
          <h2>Free delivery on orders of $100 or more</h2>
          <p class="mb-0">ដឹកជញ្ជូនឥតគិតថ្លៃសម្រាប់ការបញ្ជាទិញចាប់ពី $100 ឡើង</p>
        </div>
        <a routerLink="/shop" class="btn btn-gold">Start shopping</a>
      </div>
    </section>`,
})
export class HomeComponent {
  products = inject(ProductService);
  /** One featured pick per category, so the home page shows variety. */
  featured = computed(() => this.products.categories
    .map(c => this.products.products.find(p => p.featured && p.category === c.name))
    .filter((p): p is NonNullable<typeof p> => !!p)
    .slice(0, 8));
}
