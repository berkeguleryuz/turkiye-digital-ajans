/**
 * Türkçe karakterleri ASCII'ye çevirir ve URL-safe slug oluşturur
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Array olup olmadığını kontrol eder, değilse boş array döner
 */
export function ensureArray<T>(data: unknown): T[] {
  return Array.isArray(data) ? data : [];
}
