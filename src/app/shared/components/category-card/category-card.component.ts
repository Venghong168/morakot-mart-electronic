import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryInfo } from '../../../models/product.model';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a class="cat-card" routerLink="/shop" [queryParams]="{ category: category().name }">
      <img [src]="category().image" [alt]="''" loading="lazy" width="96" height="96" />
      <strong>{{ category().name }}</strong>
      <span class="khmer">{{ category().khmer }}</span>
      <small>{{ count() }} products</small>
    </a>`,
})
export class CategoryCardComponent {
  category = input.required<CategoryInfo>();
  count = input(0);
}
