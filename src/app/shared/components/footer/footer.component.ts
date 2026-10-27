import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, LogoComponent],
  template: `
    <footer class="mm-footer no-print">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-5">
            <div class="d-flex align-items-center gap-2 mb-2"><app-logo [size]="36" /><strong class="fs-5">MORAKOT MART ELECTRONIC  · មរកតម៉ាត អេឡិចត្រូនិក</strong></div>
            <p class="gold mb-1">ទិញងាយ ស្រួលចិត្ត គុណភាពទុកចិត្តបាន</p>
            <p class="muted">មរកតម៉ាត គឺជាហាងអនឡាញសម្រាប់ទិញគ្រឿងអេឡិចត្រូនិក ទំនិញគុណភាព និងសេវាកម្មដែលអ្នកអាចទុកចិត្តបាន។ Your Trusted Online Shop.</p>
          </div>
          <div class="col-6 col-lg-3">
            <h2 class="h6">Quick links</h2>
            <ul class="list-unstyled">
              <li><a routerLink="/">Home</a></li>
              <li><a routerLink="/shop">Shop</a></li>
              <li><a routerLink="/cart">Cart</a></li>
              <li><a routerLink="/checkout">Checkout</a></li>
            </ul>
          </div>
          <div class="col-6 col-lg-4">
            <h2 class="h6">Contact (demo details)</h2>
            <ul class="list-unstyled muted">
              <li><i class="bi bi-geo-alt" aria-hidden="true"></i> Demo address, Phnom Penh</li>
              <li><i class="bi bi-telephone" aria-hidden="true"></i> 000 000 000 (demo)</li>
              <li><i class="bi bi-envelope" aria-hidden="true"></i> demo&#64;example.com</li>
            </ul>
            <div class="social" aria-label="Social media placeholders">
              <span><i class="bi bi-facebook" aria-hidden="true"></i></span>
              <span><i class="bi bi-instagram" aria-hidden="true"></i></span>
              <span><i class="bi bi-telegram" aria-hidden="true"></i></span>
            </div>
          </div>
        </div>
        <hr />
        <p class="small muted mb-0">© 2026 Morakot Mart.  midterm demo project. Prices are sample/demo prices. Brand names belong to their owners. No real products are sold and no real payments are taken.</p>
      </div>
    </footer>`,
})
export class FooterComponent {}
