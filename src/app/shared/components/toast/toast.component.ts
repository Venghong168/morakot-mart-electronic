import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  template: `
    <div class="toast-stack no-print" aria-live="polite" role="status">
      @for (t of toast.toasts(); track t.id) {
        <div class="mm-toast" [class.error]="t.type === 'danger'">
          <i class="bi" [class]="t.type === 'danger' ? 'bi-exclamation-circle-fill' : 'bi-check-circle-fill'" aria-hidden="true"></i>
          <span>{{ t.message }}</span>
          <button type="button" class="btn-close btn-close-white ms-2" aria-label="Dismiss notification" (click)="toast.dismiss(t.id)"></button>
        </div>
      }
    </div>`,
})
export class ToastComponent {
  toast = inject(ToastService);
}
