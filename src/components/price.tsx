import { cx, formatNumberIN } from "@/lib/format";

/**
 * A rupee amount for display type. Playfair has no ₹ glyph, so the symbol is set
 * in Jost while the digits stay in whatever face surrounds them.
 */
export function Price({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cx("tabular whitespace-nowrap", className)}>
      <span className="mr-[0.06em] font-sans text-[0.82em] font-normal" aria-hidden="true">
        ₹
      </span>
      <span className="sr-only">Rupees </span>
      {formatNumberIN(value)}
    </span>
  );
}
