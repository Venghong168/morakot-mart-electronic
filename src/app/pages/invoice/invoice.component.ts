import { Component, ViewEncapsulation, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { OrderService } from '../../core/services/order.service';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { INVOICE_CSS, invoiceBody, invoiceDocument } from '../../shared/invoice-template';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [RouterLink, EmptyStateComponent],
  encapsulation: ViewEncapsulation.None,
  styles: [INVOICE_CSS],
  template: `
    @if (order(); as o) {
      <div class="container py-4">
        <div class="invoice-actions no-print">
          <a routerLink="/shop" class="btn btn-outline-emerald">Continue Shopping</a>
          <button type="button" class="btn btn-emerald" (click)="print()"><i class="bi bi-printer" aria-hidden="true"></i> Print Invoice</button>
          <button type="button" class="btn btn-gold" (click)="download(o.invoiceNumber)"><i class="bi bi-download" aria-hidden="true"></i> Download Invoice HTML</button>
        </div>
        <div class="invoice-sheet" [innerHTML]="html()"></div>
      </div>
    } @else {
      <div class="container py-5">
        <app-empty-state icon="bi-receipt-cutoff" title="Invoice not found · រកមិនឃើញវិក្កយបត្រ"
          message="No order with this number exists in this browser. Demo orders are stored per browser." actionLabel="Back to Shop" />
      </div>
    }`,
})
export class InvoiceComponent {
  private orders = inject(OrderService);
  private sanitizer = inject(DomSanitizer);
  private id = toSignal(inject(ActivatedRoute).paramMap.pipe(map(p => p.get('orderId') ?? '')), { initialValue: '' });

  order = computed(() => this.orders.getById(this.id()));
  // Safe to trust: invoiceBody() HTML-escapes every value that comes from the saved order.
  html = computed(() => { const o = this.order(); return o ? this.sanitizer.bypassSecurityTrustHtml(invoiceBody(o)) : ''; });

  print(): void { window.print(); }

  download(invoiceNumber: string): void {
    const o = this.order();
    if (!o) return;
    const blob = new Blob([invoiceDocument(o)], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${invoiceNumber}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
