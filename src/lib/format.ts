import { site } from "@/data/site";
import type { Product } from "@/data/catalog";

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** ₹1,890 · ₹18,500 · ₹1,25,000 — Indian digit grouping. */
export function formatINR(value: number): string {
  return inr.format(value);
}

/** Digits only, Indian grouping, no symbol: 18,500 */
export function formatNumberIN(value: number): string {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);
}

export function discountPercent(p: Pick<Product, "price" | "mrp">): number | null {
  if (!p.mrp || p.mrp <= p.price) return null;
  return Math.round(((p.mrp - p.price) / p.mrp) * 100);
}

export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function productEnquiry(p: Product, option?: string): string {
  const opt = option ? ` (${p.optionLabel ?? "Size"}: ${option})` : "";
  return `Hi ${site.name}! I'd love to know more about the "${p.name}"${opt} — ${formatINR(p.price)}. Is it available?`;
}

/** The chithi (letter) a visitor sends on WhatsApp with everything in their potli. */
export function chithiMessage(items: Product[], choices: Record<string, string>, name?: string): string {
  const lines = items.map((p, i) => {
    const choice = choices[p.id] ? ` (${p.optionLabel ?? "Size"}: ${choices[p.id]})` : "";
    return `${i + 1}. ${p.name}${choice} — ${formatINR(p.price)}`;
  });
  const total = items.reduce((sum, p) => sum + p.price, 0);
  return [
    `Dear ${site.name},`,
    "",
    "These are in my potli:",
    ...lines,
    "",
    `That's ${formatINR(total)} in all. Could you tell me what's available?`,
    "",
    name?.trim() ? `Love, ${name.trim()}` : "Love,",
  ].join("\n");
}

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Small deterministic hash so painted swatches look the same on server and client. */
export function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
