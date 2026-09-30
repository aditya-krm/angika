import type { Product } from "@/data/catalog";
import { hashString } from "@/lib/format";

/**
 * Woven and printed textiles, drawn as SVG patterns so every piece has a believable
 * fabric even before (or without) its photo.
 */

export type FabricKind =
  | "kalka"
  | "kalka-dense"
  | "floral"
  | "block"
  | "jaal"
  | "dots"
  | "stripe"
  | "kantha"
  | "check"
  | "plain";

export const ZARI = "#d4af37";
export const INK = "#2a2024";

export function mix(hex: string, withHex: string, amount: number): string {
  const a = hex.replace("#", "");
  const b = withHex.replace("#", "");
  const out = [0, 2, 4].map((i) => {
    const x = parseInt(a.slice(i, i + 2), 16);
    const y = parseInt(b.slice(i, i + 2), 16);
    return Math.round(x + (y - x) * amount)
      .toString(16)
      .padStart(2, "0");
  });
  return `#${out.join("")}`;
}

function luminance(hex: string) {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Pick a fabric that suits the piece. */
export function fabricOf(p: Pick<Product, "id" | "type" | "collection">): FabricKind {
  if (p.collection === "kalka") {
    if (p.type === "saree") return "kalka";
    if (p.type === "textile") return "kantha";
    return "kalka-dense";
  }
  switch (p.type) {
    case "saree":
      return hashString(p.id) % 2 ? "dots" : "jaal";
    case "lehenga":
      return "jaal";
    case "kurta":
      return "floral";
    case "coord":
      return "block";
    case "dress":
      return hashString(p.id) % 3 === 0 ? "stripe" : "floral";
    case "dupatta":
      return "plain";
    case "textile":
      return "check";
    default:
      return "plain";
  }
}

/** Resolve a palette into base / motif / light colours with enough contrast between base and motif. */
export function fabricColors(palette: readonly [string, string, string]) {
  const base = palette[0];
  let motif = palette[1];
  const light = palette[2];
  if (Math.abs(luminance(base) - luminance(motif)) < 0.12) {
    motif = luminance(base) > 0.5 ? mix(motif, INK, 0.45) : mix(motif, "#ffffff", 0.55);
  }
  return { base, motif, light, border: luminance(base) > 0.6 ? mix(motif, INK, 0.2) : mix(base, INK, 0.35) };
}

const KALKA =
  "M6 17C2 17 0 14 .6 11 1.2 8 4 7 6 5.6 8 4.2 8.6 2.4 8.2 .5 11 2.3 12.6 5.4 12.6 9 12.6 13.4 9.8 17 6 17Z";

/** <pattern> element for a fabric. Put inside <defs>. */
export function FabricPattern({
  id,
  kind,
  base,
  motif,
  scale = 1,
}: {
  id: string;
  kind: FabricKind;
  base: string;
  motif: string;
  scale?: number;
}) {
  const s = 28 * scale;
  const soft = mix(motif, base, 0.35);
  return (
    <pattern id={id} width={s} height={s} patternUnits="userSpaceOnUse">
      <rect width={s} height={s} fill={base} />
      <g transform={`scale(${scale})`}>
        {kind === "kalka" && (
          <>
            <path d={KALKA} fill={motif} transform="translate(3 4) scale(.62)" />
            <path d={KALKA} fill={soft} transform="translate(17 18) scale(-.62 .62) translate(-12 0)" opacity=".8" />
          </>
        )}
        {kind === "kalka-dense" && (
          <>
            <path d={KALKA} fill={motif} transform="translate(2 2) scale(.72)" />
            <path
              d={KALKA}
              fill="none"
              stroke={soft}
              strokeWidth="1"
              transform="translate(16 14) scale(-.72 .72) translate(-12 0)"
            />
            <circle cx="24" cy="5" r="1.4" fill={soft} />
            <circle cx="6" cy="22" r="1.2" fill={soft} />
          </>
        )}
        {kind === "floral" && (
          <>
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse key={a} cx="8" cy="5" rx="1.8" ry="3.2" fill={motif} transform={`rotate(${a} 8 8.5)`} />
            ))}
            <circle cx="8" cy="8.5" r="1.4" fill={base} />
            <circle cx="21" cy="21" r="1.5" fill={soft} />
            <path d="M18 14c2-1 4-1 5 1" stroke={soft} strokeWidth="1" fill="none" strokeLinecap="round" />
          </>
        )}
        {kind === "block" && (
          <>
            <circle cx="7" cy="7" r="4.2" fill="none" stroke={motif} strokeWidth="1.3" />
            <circle cx="7" cy="7" r="1.4" fill={motif} />
            <path d="M18 17c3 0 5 2 5 5-3 0-5-2-5-5Z" fill={soft} />
            <path d="M18 17c0 3-2 5-5 5 0-3 2-5 5-5Z" fill={soft} opacity=".75" />
          </>
        )}
        {kind === "jaal" && (
          <>
            <path d="M0 14 14 0l14 14-14 14Z" fill="none" stroke={ZARI} strokeWidth=".8" opacity=".85" />
            <circle cx="14" cy="14" r="1.8" fill={ZARI} />
            <circle cx="0" cy="0" r="1.2" fill={motif} />
            <circle cx="28" cy="28" r="1.2" fill={motif} />
          </>
        )}
        {kind === "dots" && (
          <>
            <circle cx="7" cy="7" r="1.6" fill={ZARI} />
            <circle cx="21" cy="21" r="1.6" fill={ZARI} />
            <circle cx="21" cy="7" r=".8" fill={motif} />
            <circle cx="7" cy="21" r=".8" fill={motif} />
          </>
        )}
        {kind === "stripe" && (
          <>
            <rect x="0" width="5" height="28" fill={motif} opacity=".75" />
            <rect x="14" width="1.2" height="28" fill={motif} opacity=".6" />
          </>
        )}
        {kind === "kantha" && (
          <>
            {[3.5, 10.5, 17.5, 24.5].map((y) => (
              <path key={y} d={`M0 ${y}h28`} stroke={soft} strokeWidth=".9" strokeDasharray="2.6 2" opacity=".85" />
            ))}
            <path d={KALKA} fill="none" stroke={motif} strokeWidth="1.4" transform="translate(8 5) scale(.72)" />
          </>
        )}
        {kind === "check" && (
          <>
            <rect x="0" width="6" height="28" fill={motif} opacity=".55" />
            <rect y="0" width="28" height="6" fill={motif} opacity=".55" />
            <rect x="14" width="1.2" height="28" fill={motif} opacity=".4" />
            <rect y="14" width="28" height="1.2" fill={motif} opacity=".4" />
          </>
        )}
        {kind === "plain" && (
          <>
            <path d="M0 7h28M0 21h28" stroke={soft} strokeWidth=".35" opacity=".5" />
          </>
        )}
      </g>
    </pattern>
  );
}

/** A woven "temple" (mandir) border: zari threads and a row of triangles. */
export function TempleBorder({
  x = 0,
  y,
  width,
  height = 22,
  color,
  flip = false,
}: {
  x?: number;
  y: number;
  width: number;
  height?: number;
  color: string;
  flip?: boolean;
}) {
  const n = Math.ceil(width / 12);
  const t = flip ? y + height : y;
  const dir = flip ? -1 : 1;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={color} />
      <path d={`M${x} ${y + 3}h${width}M${x} ${y + height - 3}h${width}`} stroke={ZARI} strokeWidth="1" />
      <path
        d={Array.from({ length: n }, (_, i) => {
          const bx = x + i * 12;
          return `M${bx} ${t + dir * (height - 5)}l6 ${-dir * (height - 11)}l6 ${dir * (height - 11)}Z`;
        }).join("")}
        fill={ZARI}
        opacity=".75"
      />
    </g>
  );
}

/** A folded piece of cloth seen from its folded edge — used in the trunk stack. */
export function FoldedCloth({
  product,
  uid,
  className,
  style,
}: {
  product: Pick<Product, "id" | "type" | "collection" | "palette">;
  uid: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const kind = fabricOf(product);
  const c = fabricColors(product.palette);
  const pid = `fold-${uid}-${product.id}`;
  return (
    <svg
      viewBox="0 0 600 80"
      preserveAspectRatio="none"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <FabricPattern id={pid} kind={kind} base={c.base} motif={c.motif} scale={1.1} />
        <linearGradient id={`${pid}-fold`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".28" />
          <stop offset=".18" stopColor="#fff" stopOpacity="0" />
          <stop offset=".78" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".28" />
        </linearGradient>
      </defs>
      <rect width="600" height="80" rx="10" fill={`url(#${pid})`} />
      <TempleBorder y={0} width={600} height={20} color={c.border} />
      <rect width="600" height="80" rx="10" fill={`url(#${pid}-fold)`} />
    </svg>
  );
}
