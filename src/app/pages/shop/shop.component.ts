import { Component } from '@angular/core';
import { CatalogComponent } from '../../shared/components/catalog/catalog.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CatalogComponent],
  template: `
    <div class="container py-4">
      <h1 class="page-title">Shop <span>ហាងទំនិញ</span></h1>
      <app-catalog />
    </div>`,
})
export class ShopComponent {}
