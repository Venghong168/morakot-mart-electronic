import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="empty-state">
      <i class="bi" [class]="icon()" aria-hidden="true"></i>
      <h2 class="h4">{{ title() }}</h2>
      <p>{{ message() }}</p>
      @if (actionLabel()) {
        <a class="btn btn-emerald" [routerLink]="actionLink()">{{ actionLabel() }}</a>
      }
    </div>`,
})
export class EmptyStateComponent {
  icon = input('bi-bag');
  title = input.required<string>();
  message = input('');
  actionLabel = input('');
  actionLink = input('/shop');
}
