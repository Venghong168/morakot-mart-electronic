import { Component, computed, input, signal } from '@angular/core';
import { categoryImage, photosOf } from '../../../data/product-image';
import { Product, fullName } from '../../../models/product.model';

/** Shows the real product photo when one exists; otherwise a clearly labelled category illustration. */
@Component({
  selector: 'app-product-image',
  standalone: true,
  template: `
    <figure class="pimg" [class.no-photo]="!isPhoto()">
      <img [src]="src()" [alt]="alt()" [attr.loading]="eager() ? 'eager' : 'lazy'" decoding="async" width="600" height="600" (error)="failed.set(true)" />
      @if (!isPhoto() && caption()) { <figcaption>Illustration · official photo pending</figcaption> }
    </figure>`,
})
export class ProductImageComponent {
  product = input.required<Product>();
  index = input(0);
  eager = input(false);
  caption = input(true);
  failed = signal(false);

  private photos = computed(() => photosOf(this.product()));
  isPhoto = computed(() => !this.failed() && !!this.photos()[this.index()]);
  src = computed(() => this.isPhoto() ? this.photos()[this.index()] : categoryImage(this.product().category));
  alt = computed(() => this.isPhoto() ? fullName(this.product()) : `${fullName(this.product())} (category illustration)`);
}
