import { Component, input } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 48 48" role="img" aria-label="Morakot Mart logo">
      <path d="M16 20v-4a8 8 0 0 1 16 0v4" fill="none" stroke="#D8B66A" stroke-width="2.8" stroke-linecap="round"/>
      <rect x="7" y="19" width="34" height="24" rx="6" fill="#17483A" stroke="#D8B66A" stroke-width="1.6"/>
      <path d="M24 24l8 6-8 11-8-11z" fill="#D8B66A"/>
      <path d="M16 30h16M21 30l3-6 3 6-3 11z" fill="none" stroke="#0D3027" stroke-width="1.1" stroke-linejoin="round"/>
    </svg>`,
})
export class LogoComponent {
  size = input(40);
}
