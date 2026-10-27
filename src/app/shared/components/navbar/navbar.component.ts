import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { ProductService } from '../../../core/services/product.service';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LogoComponent],
  template: `
    <header class="mm-header no-print">
      <a class="skip-link" href="#main">Skip to content</a>
      <nav class="container mm-nav" aria-label="Main navigation">
        <a routerLink="/" class="brand" aria-label="Morakot Mart home" (click)="open.set(false)">
          <app-logo [size]="40" />
          <span><strong>MORAKOT MART​ ELECTRONIC</strong><small>មរកតម៉ាត អេឡិចត្រូនិក</small></span>
        </a>
        <button type="button" class="nav-toggle" [attr.aria-expanded]="open()" aria-controls="nav-panel" aria-label="Toggle menu" (click)="open.set(!open())">
          <i class="bi" [class]="open() ? 'bi-x-lg' : 'bi-list'" aria-hidden="true"></i>
        </button>
        <div id="nav-panel" class="nav-panel" [class.open]="open()">
          <ul class="nav-links">
            <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" (click)="open.set(false)">Home</a></li>
            <li><a routerLink="/shop" routerLinkActive="active" (click)="open.set(false)">Shop</a></li>
          </ul>
          <form class="nav-search" role="search" (submit)="search($event, q.value)">
            <label for="nav-q" class="visually-hidden">Search products</label>
            <input #q id="nav-q" type="search" placeholder="Search products…" autocomplete="off" />
            <button type="submit" aria-label="Search"><i class="bi bi-search" aria-hidden="true"></i></button>
          </form>
        </div>
        <a routerLink="/cart" class="cart-link" [attr.aria-label]="'Shopping cart, ' + cart.count() + ' items'" (click)="open.set(false)">
          <i class="bi bi-bag" aria-hidden="true"></i>
          <span class="cart-badge" [class.empty]="cart.count() === 0">{{ cart.count() }}</span>
        </a>
      </nav>
      <div class="cat-bar">
        <div class="container">
          @for (c of products.categories; track c.name) {
            <a routerLink="/shop" [queryParams]="{ category: c.name }">{{ c.name }}</a>
          }
        </div>
      </div>
    </header>`,
})
export class NavbarComponent {
  cart = inject(CartService);
  products = inject(ProductService);
  private router = inject(Router);
  open = signal(false);

  search(event: Event, term: string): void {
    event.preventDefault();
    this.open.set(false);
    this.router.navigate(['/shop'], { queryParams: { q: term.trim() || null } });
  }
}
