import type { Product } from "@/data/catalog";
import { cx } from "@/lib/format";
import { GarmentArt } from "../art/garment-art";
import { PhotoOr } from "../product-art";

/** A wooden hanger with a brass hook. The hook tip sits at the top centre. */
export function Hanger({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 64" className={className} aria-hidden="true" focusable="false" fill="none">
      <path
        d="M100 34v-9c0-6 9-8 9-15 0-5-4-8-9-8s-8 3-8 7"
        stroke="var(--brass)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path d="M100 32 18 54c-7 2-6 9 1 9h162c7 0 8-7 1-9Z" fill="var(--wood)" />
      <path d="M100 32 18 54c-7 2-6 9 1 9h162c7 0 8-7 1-9Z" fill="url(#hanger-sheen)" />
      <defs>
        <linearGradient id="hanger-sheen" x1="0" x2="0" y1="0" y2="1">
          <stop offset=".55" stopColor="#fff" stopOpacity=".25" />
          <stop offset="1" stopColor="#000" stopOpacity=".2" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="36" r="3.4" fill="var(--brass)" />
    </svg>
  );
}

/** The shoulder-shaped frame a photographed garment hangs in. */
export const SHOULDERS = "polygon(33% 0, 67% 0, 100% 7%, 100% 100%, 0 100%, 0 7%)";

/** Tiny woven brand label sewn inside the neckline. */
export function NeckLabel({ className }: { className?: string }) {
  return (
    <span
      className={cx(
        "woven pointer-events-none absolute left-1/2 top-1.5 z-10 -translate-x-1/2 px-2 py-[3px] font-wordmark text-[0.62rem] italic leading-none text-kajal [--woven-bg:#fbf7ef]",
        className,
      )}
      aria-hidden="true"
    >
      Angika
    </span>
  );
}

export function GarmentOnHanger({
  product,
  uid,
  sizes,
  priority,
  className,
  artClassName,
  label = true,
}: {
  product: Product;
  uid: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  artClassName?: string;
  label?: boolean;
}) {
  return (
    <div className={cx("relative flex flex-col items-center", className)}>
      <Hanger className="relative z-10 -mb-[3%] w-[82%]" />
      <PhotoOr
        src={product.photo}
        alt={product.photoAlt}
        sizes={sizes}
        focus={product.focus}
        priority={priority}
        frameClassName="aspect-[3/4] w-[88%] shadow-[0_18px_30px_-18px_rgb(var(--shadow)/0.55)]"
        frameStyle={{ clipPath: SHOULDERS }}
        fallback={
          <GarmentArt
            product={product}
            uid={uid}
            className={cx("w-[88%] drop-shadow-[0_14px_14px_rgb(0_0_0/0.14)]", artClassName)}
          />
        }
      />
      {label && <NeckLabel className="top-[calc(18%+2px)]" />}
    </div>
  );
}
