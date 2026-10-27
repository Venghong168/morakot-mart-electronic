export function readJson<T>(key: string, fallback: T): T {
  try {
    if (typeof localStorage === 'undefined') return fallback;
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson(key: string, value: unknown): boolean {
  try {
    if (typeof localStorage === 'undefined') return false;
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export const round2 = (n: number): number => Math.round((n + Number.EPSILON) * 100) / 100;

export function imageFallback(event: Event): void {
  const img = event.target as HTMLImageElement;
  if (!img.src.endsWith('images/placeholder.svg')) img.src = 'assets/images/placeholder.svg';
}
