import { Injectable, signal } from '@angular/core';

export interface Toast { id: number; message: string; type: 'success' | 'danger' | 'info'; }

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toasts = signal<Toast[]>([]);
  private nextId = 1;

  show(message: string, type: Toast['type'] = 'success'): void {
    const id = this.nextId++;
    this.toasts.update(list => [...list, { id, message, type }]);
    setTimeout(() => this.dismiss(id), 3200);
  }

  dismiss(id: number): void {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }
}
