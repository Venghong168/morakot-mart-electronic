import { Order } from '../models/order.model';

export const esc = (v: string | number): string =>
  String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export const money = (n: number): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

export const LOGO_SVG = `<svg width="52" height="52" viewBox="0 0 48 48" aria-label="Morakot Mart logo"><path d="M16 20v-4a8 8 0 0 1 16 0v4" fill="none" stroke="#D8B66A" stroke-width="2.8" stroke-linecap="round"/><rect x="7" y="19" width="34" height="24" rx="6" fill="#17483A" stroke="#D8B66A" stroke-width="1.6"/><path d="M24 24l8 6-8 11-8-11z" fill="#D8B66A"/><path d="M16 30h16M21 30l3-6 3 6-3 11z" fill="none" stroke="#0D3027" stroke-width="1.1" stroke-linejoin="round"/></svg>`;

export const INVOICE_CSS = `
.inv{font-family:'Kantumruy Pro','Segoe UI',system-ui,sans-serif;color:#202522;background:#fff;max-width:210mm;margin:0 auto;padding:16mm 14mm;box-sizing:border-box;font-size:14px;line-height:1.5}
.inv *{box-sizing:border-box}
.inv-head{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;border-bottom:3px solid #D8B66A;padding-bottom:14px;margin-bottom:18px}
.inv-brand{display:flex;gap:12px;align-items:center}
.inv-brand h1{margin:0;font-size:20px;color:#0D3027;letter-spacing:.5px}
.inv-brand p{margin:0;color:#6B746E;font-size:12px}
.inv-title{text-align:right}
.inv-title h2{margin:0;font-size:24px;color:#0D3027}
.inv-title p{margin:0;color:#6B746E}
.inv-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:18px}
.inv h3{margin:0 0 6px;font-size:13px;color:#17483A;border-bottom:1px solid #E5E9E5;padding-bottom:4px}
.inv-grid p{margin:2px 0}
.inv table{width:100%;border-collapse:collapse;margin-bottom:14px}
.inv th{background:#0D3027;color:#fff;text-align:left;padding:8px 10px;font-size:13px}
.inv td{padding:8px 10px;border-bottom:1px solid #E5E9E5}
.inv .r{text-align:right}
.inv-totals{margin-left:auto;width:min(100%,280px)}
.inv-totals div{display:flex;justify-content:space-between;padding:4px 0}
.inv-totals .grand{border-top:2px solid #D8B66A;margin-top:4px;padding-top:8px;font-size:17px;font-weight:700;color:#0D3027}
.inv-status{display:inline-block;background:#F7F8F6;border:1px solid #D8B66A;color:#17483A;border-radius:999px;padding:1px 10px;font-size:12px}
.inv-foot{margin-top:26px;padding-top:12px;border-top:1px solid #E5E9E5;text-align:center;color:#17483A}
.inv-foot small{display:block;color:#6B746E;margin-top:4px}
@page{size:A4;margin:10mm}
@media print{.inv{padding:0;max-width:none}.inv th{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
`;

/** Single source of truth: used by the Angular invoice route AND the downloadable standalone file. */
export function invoiceBody(o: Order): string {
  const rows = o.items.map(i =>
    `<tr><td>${esc(i.name)}</td><td class="r">${i.quantity}</td><td class="r">${money(i.unitPrice)}</td><td class="r">${money(i.lineTotal)}</td></tr>`).join('');
  const c = o.customer;
  return `<article class="inv">
<div class="inv-head">
 <div class="inv-brand">${LOGO_SVG}<div><h1>MORAKOT MART · មរកតម៉ាត</h1><p>ទិញងាយ ស្រួលចិត្ត គុណភាពទុកចិត្តបាន</p><p>Your Trusted Online Shop</p></div></div>
 <div class="inv-title"><h2>INVOICE · វិក្កយបត្រ</h2><p>No. ${esc(o.invoiceNumber)}</p></div>
</div>
<div class="inv-grid">
 <div><h3>Bill to · អតិថិជន</h3><p><strong>${esc(c.fullName)}</strong></p><p>${esc(c.phone)}</p><p>${esc(c.email)}</p><p>${esc(c.address)}</p>${c.notes ? `<p><em>Note: ${esc(c.notes)}</em></p>` : ''}</div>
 <div><h3>Order details · ព័ត៌មានការបញ្ជាទិញ</h3><p>Order number: <strong>${esc(o.orderNumber)}</strong></p><p>Invoice date: ${esc(formatDate(o.date))}</p><p>Payment: ${esc(o.paymentMethod)}</p><p>Status: <span class="inv-status">${esc(o.status)}</span></p></div>
</div>
<table><thead><tr><th>Product</th><th class="r">Qty</th><th class="r">Unit price</th><th class="r">Subtotal</th></tr></thead><tbody>${rows}</tbody></table>
<div class="inv-totals">
 <div><span>Subtotal · សរុបរង</span><span>${money(o.subtotal)}</span></div>
 <div><span>Delivery fee · ថ្លៃដឹកជញ្ជូន</span><span>${money(o.deliveryFee)}</span></div>
 <div class="grand"><span>Total · សរុប</span><span>${money(o.total)}</span></div>
</div>
<div class="inv-foot"><strong>សូមអរគុណដែលបានទិញទំនិញនៅមរកតម៉ាត!</strong><br>Thank you for shopping with Morakot Mart.<small>Demo invoice for a university project. No real payment was taken.</small></div>
</article>`;
}

export function invoiceDocument(o: Order): string {
  return `<!DOCTYPE html>
<html lang="km"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Invoice ${esc(o.invoiceNumber)} – Morakot Mart</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;600;700&display=swap" rel="stylesheet">
<style>body{margin:0;background:#F7F8F6}.inv{background:#fff}@media print{body{background:#fff}}${INVOICE_CSS}</style></head>
<body>${invoiceBody(o)}</body></html>`;
}
