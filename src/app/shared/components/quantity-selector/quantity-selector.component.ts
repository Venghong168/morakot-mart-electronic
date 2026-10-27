import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-quantity-selector',
  standalone: true,
  template: `
    <div class="qty" role="group" [attr.aria-label]="label()">
      <button type="button" aria-label="Decrease quantity" [disabled]="value() <= min()" (click)="valueChange.emit(value() - 1)">
        <i class="bi bi-dash-lg" aria-hidden="true"></i>
      </button>
      <output aria-live="polite">{{ value() }}</output>
      <button type="button" aria-label="Increase quantity" [disabled]="value() >= max()" (click)="valueChange.emit(value() + 1)">
        <i class="bi bi-plus-lg" aria-hidden="true"></i>
      </button>
    </div>`,
})
export class QuantitySelectorComponent {
  value = input.required<number>();
  min = input(1);
  max = input.required<number>();
  label = input('Quantity');
  valueChange = output<number>();
}
