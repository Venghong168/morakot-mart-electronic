import { Component } from '@angular/core';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [EmptyStateComponent],
  template: `
    <div class="container py-5">
      <app-empty-state icon="bi-compass" title="Page not found · រកមិនឃើញទំព័រ"
        message="The page you are looking for does not exist or has moved." actionLabel="Back to Home" actionLink="/" />
    </div>`,
})
export class NotFoundComponent {}
