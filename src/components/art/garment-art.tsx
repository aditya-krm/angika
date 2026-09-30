import type { Product } from "@/data/catalog";
import { FabricPattern, INK, TempleBorder, ZARI, fabricColors, fabricOf, mix } from "./fabric";

/**
 * A fashion "flat": the garment as it hangs on a hanger, cut from its own fabric.
 * Neck sits at (100, 8) so the rail's hanger lines up.
 */

/** A dupatta folded over the hanger bar, with a zig-zag fringe. */
const DUPATTA =
  "M42 4h116v252" +
  Array.from({ length: 10 }, (_, i) => `L${158 - i * 11.6 - 5.8} 264L${158 - (i + 1) * 11.6} 256`).join("") +
  "Z";

type Shape = { outline: string; details?: string; hem: number; extra?: "pallu" | "dupatta" | "pants" };

const SHAPES: Record<string, Shape> = {
  kurta: {
    outline: "M76 8Q100 24 124 8L152 16l28 46-18 10-14-22 2 218H52l2-218-14 22-18-10 28-46Z",
    details: "M92 11l8 18 8-18M100 29v26M66 206v62M134 206v62",
    hem: 246,
  },
  dress: {
    outline: "M78 8Q100 22 122 8l14 6-2 30q-2 26-8 52 44 74 60 172H14Q30 170 74 96q-6-26-8-52l-2-30Z",
    details: "M74 96q26 8 52 0M100 22v18",
    hem: 248,
  },
  coord: {
    outline: "M72 8Q100 22 128 8l32 14 12 36-18 6-10-20v72H56V44L46 64l-18-6 12-36Z",
    details: "M86 10q14 16 28 0",
    hem: 106,
    extra: "pants",
  },
  saree: {
    outline: "M80 8Q100 20 120 8l12 6 2 46q4 90 8 208H58q4-118 8-208l2-46Z",
    details: "M94 200l-4 68M102 196v72M110 200l4 68",
    hem: 246,
    extra: "pallu",
  },
  lehenga: {
    outline: "M78 8Q100 20 122 8l12 6-2 42H68l-2-42ZM70 62h60q46 98 64 206H6Q24 160 70 62Z",
    details: "M70 62h60",
    hem: 236,
    extra: "dupatta",
  },
  dupatta: {
    outline: DUPATTA,
    details: "M100 6v240",
    hem: 226,
  },
};

export function GarmentArt({
  product,
  uid,
  className,
}: {
  product: Pick<Product, "id" | "type" | "collection" | "palette">;
  uid: string;
  className?: string;
}) {
  const shapeKey = product.type in SHAPES ? product.type : "dress";
  const shape = SHAPES[shapeKey];
  const kind = fabricOf(product);
  const c = fabricColors(product.palette);
  const id = `g-${uid}-${product.id}`;
  const line = mix(c.base, INK, 0.45);

  return (
    <svg viewBox="0 0 200 280" className={className} aria-hidden="true" focusable="false">
      <defs>
        <FabricPattern id={`${id}-f`} kind={kind} base={c.base} motif={c.motif} scale={0.9} />
        <FabricPattern
          id={`${id}-f2`}
          kind={kind === "plain" ? "dots" : "plain"}
          base={c.motif}
          motif={c.base}
          scale={0.9}
        />
        <clipPath id={`${id}-clip`}>
          <path d={shape.outline} />
          {shape.extra === "pants" && <path d="M58 112h84l10 156h-42l-10-110-10 110H48Z" />}
        </clipPath>
        <linearGradient id={`${id}-shade`} x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".2" />
          <stop offset=".3" stopColor="#fff" stopOpacity=".1" />
          <stop offset=".55" stopColor="#000" stopOpacity=".02" />
          <stop offset=".8" stopColor="#000" stopOpacity=".08" />
          <stop offset="1" stopColor="#000" stopOpacity=".24" />
        </linearGradient>
      </defs>

      <g clipPath={`url(#${id}-clip)`}>
        <rect width="200" height="280" fill={`url(#${id}-f)`} />
        {shape.extra === "pants" && <rect y="112" width="200" height="168" fill={`url(#${id}-f2)`} opacity=".9" />}
        {shape.extra !== "pants" && <TempleBorder y={shape.hem} width={200} height={22} color={c.border} />}
        {shape.extra === "pants" && <TempleBorder y={shape.hem - 12} width={200} height={12} color={c.border} />}
        {/* pleats & drape folds */}
        <path
          d="M60 120q6 80 0 160M140 120q-6 80 0 160"
          stroke="#000"
          strokeOpacity=".08"
          strokeWidth="8"
          fill="none"
        />
        <rect width="200" height="280" fill={`url(#${id}-shade)`} />
      </g>

      {shape.extra === "pallu" && (
        <g>
          <path d="M68 12l26-6 50 126-10 38Z" fill={`url(#${id}-f)`} />
          <path d="M68 12l26-6 50 126-10 38Z" fill="#000" opacity=".1" />
          <path d="M94 6l50 126" stroke={c.border} strokeWidth="9" />
          <path d="M94 6l50 126" stroke={ZARI} strokeWidth="1.2" strokeDasharray="4 3" />
        </g>
      )}
      {shape.extra === "dupatta" && (
        <g opacity=".75">
          <path d="M122 10q30 60 18 150l18 6q14-90-22-160Z" fill={mix(c.light, "#ffffff", 0.3)} />
          <path d="M140 160l18 6" stroke={ZARI} strokeWidth="3" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} cx={128 + i * 3} cy={40 + i * 22} r="1.4" fill={ZARI} />
          ))}
        </g>
      )}

      <path d={shape.outline} fill="none" stroke={line} strokeOpacity=".55" strokeWidth="1.2" strokeLinejoin="round" />
      {shape.extra === "pants" && (
        <path
          d="M58 112h84l10 156h-42l-10-110-10 110H48Z"
          fill="none"
          stroke={line}
          strokeOpacity=".5"
          strokeWidth="1.2"
        />
      )}
      {shape.details && (
        <path d={shape.details} fill="none" stroke={line} strokeOpacity=".45" strokeWidth="1.1" strokeLinecap="round" />
      )}
    </svg>
  );
}
