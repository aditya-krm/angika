import { cx } from "@/lib/format";

/** The Angika wordmark: italic Playfair with the little paintbrush from the logo. */
export function Wordmark({
  className,
  size = "md",
  tone = "ink",
}: {
  className?: string;
  size?: "md" | "xl";
  tone?: "ink" | "ivory";
}) {
  const big = size === "xl";
  return (
    <span className={cx("inline-flex items-end gap-1.5", className)}>
      <span
        className={cx(
          "font-wordmark font-medium italic leading-none tracking-tight",
          big ? "text-[clamp(4rem,12vw,9.5rem)]" : "text-[1.75rem]",
          tone === "ivory" ? "text-[#fbf6ee]" : "text-kajal",
        )}
      >
        Angika
      </span>
      <svg
        viewBox="0 0 24 24"
        className={cx(
          big ? "mb-[1.2vw] h-[clamp(2rem,5vw,4rem)] w-[clamp(2rem,5vw,4rem)]" : "mb-1 h-4 w-4",
          tone === "ivory" ? "text-[#e8c56d]" : "text-sindoor",
        )}
        aria-hidden="true"
        focusable="false"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      >
        <path d="M21 3 11.5 12.5" />
        <path
          d="M12 12c-2.6-.6-5 .9-5.2 3.5-.1 1.7-1 2.6-2.8 3 3.8 1.6 8.5.6 9-3.5"
          fill="currentColor"
          fillOpacity={0.35}
        />
      </svg>
    </span>
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
