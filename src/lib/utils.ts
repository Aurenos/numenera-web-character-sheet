export function clamp(value: number, min: number, max: number): number {
  return Math.max(Math.min(value, max), min);
}

export function cap(value: number, max: number): number {
  return Math.min(value, max);
}

export function minCap(value: number, min: number): number {
  return Math.max(value, min);
}
