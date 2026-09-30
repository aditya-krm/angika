import Image from "next/image";
import figureImg from "@/assets/brand/angika-figure.png";
import logoImg from "@/assets/brand/angika-logo.png";
import markCreamImg from "@/assets/brand/angika-mark-cream.png";
import taglineImg from "@/assets/brand/angika-tagline.png";
import wordmarkImg from "@/assets/brand/angika-wordmark.png";
import { cx } from "@/lib/format";

type Asset = string | { src: string };
const srcOf = (a: Asset) => (typeof a === "string" ? a : a.src);

/**
 * Paints one of the brand PNGs (white shapes on transparent) in the current text colour,
 * so the same artwork works as ink on paper or cream on maroon.
 */
function Masked({
  asset,
  ratio,
  className,
  label,
}: {
  asset: Asset;
  ratio: string;
  className?: string;
  label?: string;
}) {
  const url = `url(${srcOf(asset)})`;
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cx("inline-block shrink-0 bg-current", className)}
      style={{
        aspectRatio: ratio,
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

/** "ANGIKA", traced from the logo. Size it with a height class; colour follows `color`. */
export function Wordmark({ className, label = true }: { className?: string; label?: boolean }) {
  return <Masked asset={wordmarkImg} ratio="716 / 145" className={className} label={label ? "Angika" : undefined} />;
}

/** "Where Style Meets Art", traced from the logo. */
export function Tagline({ className }: { className?: string }) {
  return <Masked asset={taglineImg} ratio="709 / 37" className={className} label="Where Style Meets Art" />;
}

/** The saree silhouette from the logo. */
export function BrandFigure({ className }: { className?: string }) {
  return <Masked asset={figureImg} ratio="348 / 480" className={className} />;
}

/** The round maroon logo badge. */
export function LogoBadge({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src={logoImg}
      alt=""
      aria-hidden="true"
      width={96}
      height={96}
      priority={priority}
      className={cx("rounded-full", className)}
    />
  );
}

/** The full logo artwork in cream, for maroon grounds (the footer). */
export function LogoMarkCream({ className }: { className?: string }) {
  return (
    <Image src={markCreamImg} alt="Angika · Where Style Meets Art" width={480} height={590} className={className} />
  );
}

/** Kalka (Bengali paisley) as a single gold line drawing. */
export function Kalka({
  className,
  filled = false,
  strokeWidth = 1.3,
}: {
  className?: string;
  filled?: boolean;
  strokeWidth?: number;
}) {
  return (
    <svg viewBox="0 0 64 80" className={className} aria-hidden="true" focusable="false" fill="none">
      <path
        d="M30 76C13 76 5 62 8 48 11 34 24 30 32 24c8-6 10-14 8-22 12 8 20 22 20 38 0 20-12 36-30 36Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill={filled ? "currentColor" : "none"}
        strokeLinejoin="round"
      />
      {!filled && (
        <>
          <path
            d="M30 68c-11 0-16-9-14-18 2-8 10-11 16-15 5-3 8-8 9-13 6 7 9 15 9 24 0 13-8 22-20 22Z"
            stroke="currentColor"
            strokeWidth={strokeWidth * 0.8}
            opacity={0.7}
          />
          <circle cx="30" cy="54" r="4.5" fill="currentColor" opacity="0.85" />
          <path
            d="M22 44c3-2 5-2 8 0M20 52c2-1.5 3.5-1.5 5 0M36 44c2-1 4-1 6 1"
            stroke="currentColor"
            strokeWidth={strokeWidth * 0.7}
            strokeLinecap="round"
            opacity="0.6"
          />
        </>
      )}
    </svg>
  );
}

/** A loose, hand-drawn arrow in blue ball-pen. */
export function HandArrow({
  className,
  variant = "curl",
}: {
  className?: string;
  variant?: "curl" | "down" | "swoop";
}) {
  const d = {
    curl: "M6 40c16 6 34 2 44-10 7-9 4-20-5-19-9 1-9 14 1 19 12 6 30 2 44-8",
    down: "M20 4c-6 14-6 30 2 44",
    swoop: "M4 30C30 6 70 4 96 24",
  }[variant];
  const head = {
    curl: "M83 22l8 3-4 8",
    down: "M14 42l8 7 5-9",
    swoop: "M86 16l10 8-11 5",
  }[variant];
  return (
    <svg viewBox="0 0 100 52" className={cx("text-pen", className)} aria-hidden="true" focusable="false" fill="none">
      <path d={d} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d={head} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A little hand-drawn heart. */
export function HandHeart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 22" className={className} aria-hidden="true" focusable="false" fill="none">
      <path
        d="M12 20C6 16 2 12 2.6 7.5 3.2 3.4 8 2.3 11.8 6.6c3-4.6 9-4 9.6.4.7 4.8-4.4 9-9.4 13Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Hand-drawn underline scribble. */
export function Scribble({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 16"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
    >
      <path
        d="M3 10c40-6 90-8 130-5 22 2 40 3 64-1M20 13c30-3 70-4 110-2"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Running stitch rule. */
export function Stitch({ className }: { className?: string }) {
  return <div className={cx("stitch h-[2px] w-full", className)} aria-hidden="true" />;
}

/** The lal paar (red border with zari). */
export function Paar({ className }: { className?: string }) {
  return <div className={cx("paar w-full", className)} aria-hidden="true" />;
}
