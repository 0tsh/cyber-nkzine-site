export const slugify = (s: string) =>
  (s.normalize('NFKD').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '').slice(0, 60).replace(/-+$/, '')) || 'x';
// Distinct names that collapse to the same slug get a numeric suffix so no page is overwritten.
export function slugMap(names: string[]) {
  const used = new Map<string, string>(); const out = new Map<string, string>();
  for (const n of [...new Set(names)].sort()) {
    let s = slugify(n), i = 2; while (used.has(s)) s = `${slugify(n)}-${i++}`;
    used.set(s, n); out.set(n, s);
  }
  return out;
}
