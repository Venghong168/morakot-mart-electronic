import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { OrderService } from '../../core/services/order.service';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { formatDate } from '../../shared/invoice-template';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, EmptyStateComponent],
  template: `
    <div class="container py-5">
      @if (order(); as o) {
        <div class="success-card">
          <i class="bi bi-check-circle-fill success-icon" aria-hidden="true"></i>
          <h1 class="h3">ការបញ្ជាទិញរបស់អ្នកបានជោគជ័យ</h1>
          <p class="muted">Your demo order has been placed. Thank you for shopping with Morakot Mart.</p>
          <dl class="success-dl">
            <div><dt>Order number</dt><dd>{{ o.orderNumber }}</dd></div>
            <div><dt>Order date</dt><dd>{{ date(o.date) }}</dd></div>
            <div><dt>Customer</dt><dd>{{ o.customer.fullName }}</dd></div>
            <div><dt>Payment method</dt><dd>{{ o.paymentMethod }}</dd></div>
            <div><dt>Total amount</dt><dd class="fw-bold">{{ o.total | currency: 'USD' }}</dd></div>
          </dl>
          <div class="d-flex flex-wrap justify-content-center gap-2">
            <a class="btn btn-emerald" [routerLink]="['/invoice', o.orderNumber]"><i class="bi bi-receipt" aria-hidden="true"></i> View Invoice</a>
            <a class="btn btn-outline-emerald" routerLink="/shop">Continue Shopping</a>
          </div>
        </div>
      } @else {
        <app-empty-state icon="bi-exclamation-circle" title="Order not found · រកមិនឃើញការបញ្ជាទិញ"
          message="We could not find this order in this browser. Demo orders are stored per browser and are lost when site data is cleared." actionLabel="Back to Shop" />
      }
    </div>`,
})
export class OrderSuccessComponent {
  private orders = inject(OrderService);
  private id = toSignal(inject(ActivatedRoute).paramMap.pipe(map(p => p.get('orderId') ?? '')), { initialValue: '' });
  order = computed(() => this.orders.getById(this.id()));
  date = formatDate;
}
