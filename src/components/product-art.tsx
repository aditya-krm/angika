"use client";

import Image, { type ImageLoaderProps } from "next/image";
import { useState } from "react";
import { cx } from "@/lib/format";

/** In the self-contained preview build remote photos can't load, so pieces show their drawn art instead. */
export const PHOTOS_ENABLED = process.env.NEXT_PUBLIC_ANGIKA_PREVIEW !== "1";

function unsplashLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 72));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  return url.toString();
}

/** Keep a caller's `absolute`/`fixed` positioning; otherwise become the positioning context. */
function positioned(className?: string) {
  return /(^|\s)(absolute|fixed|sticky)(\s|$)/.test(className ?? "") ? "" : "relative";
}

export function isUnsplash(src: string) {
  return src.startsWith("https://images.unsplash.com/");
}

export function Photo({
  src,
  alt,
  sizes,
  focus,
  priority,
  className,
  onReady,
  onFail,
}: {
  src: string;
  alt: string;
  sizes: string;
  focus?: string;
  priority?: boolean;
  className?: string;
  onReady?: () => void;
  onFail?: () => void;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      loader={isUnsplash(src) ? unsplashLoader : undefined}
      className={className}
      style={{ objectFit: "cover", objectPosition: focus ?? "50% 50%" }}
      onLoad={onReady}
      onError={onFail}
    />
  );
}

/**
 * Shows the photo inside `frameClassName` when photos are available; otherwise (or if the
 * photo fails) shows the drawn `fallback` on its own, unframed.
 */
export function PhotoOr({
  src,
  alt,
  sizes,
  focus,
  priority,
  frameClassName,
  frameStyle,
  imgClassName,
  fallback,
}: {
  src: string;
  alt: string;
  sizes: string;
  focus?: string;
  priority?: boolean;
  frameClassName?: string;
  frameStyle?: React.CSSProperties;
  imgClassName?: string;
  fallback: React.ReactNode;
}) {
  const [state, setState] = useState<"loading" | "ready" | "failed">("loading");
  if (!PHOTOS_ENABLED || state === "failed") {
    return (
      <>
        {fallback}
        <span className="sr-only">{alt}</span>
      </>
    );
  }
  return (
    <div className={cx(positioned(frameClassName), "overflow-hidden bg-tant-3", frameClassName)} style={frameStyle}>
      {state !== "ready" && fallback && (
        <div
          className="absolute inset-0 flex items-end justify-center p-[8%] opacity-35 [&>*]:max-h-full"
          aria-hidden="true"
        >
          {fallback}
        </div>
      )}
      <Photo
        src={src}
        alt={alt}
        sizes={sizes}
        focus={focus}
        priority={priority}
        className={cx("photo-fade", state === "ready" ? "opacity-100" : "opacity-0", imgClassName)}
        onReady={() => setState("ready")}
        onFail={() => setState("failed")}
      />
    </div>
  );
}
