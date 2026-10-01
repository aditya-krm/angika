"use client";

import type { Collection, Product } from "@/data/catalog";
import { tagLabels } from "@/data/catalog";
import { cx } from "@/lib/format";
import { HandArrow } from "../brand";
import { PotliIcon } from "../icons";
import { Price } from "../price";
import { useShop } from "../shop-provider";

export function RoomHeader({
  collection,
  children,
  tone = "default",
}: {
  collection: Collection;
  children?: React.ReactNode;
  tone?: "default" | "ivory";
}) {
  const ivory = tone === "ivory";
  return (
    <div className="grid gap-5 sm:gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
      <div className="min-w-0">
        <p className={cx("label flex items-center gap-3", ivory ? "text-[#e8c56d]" : "text-sindoor")}>
          <span className={cx("h-px w-10", ivory ? "bg-[#e8c56d]" : "bg-sindoor")} />
          {collection.kicker}
        </p>
        <h2
          className={cx(
            "mt-4 flex flex-wrap items-baseline gap-x-4 font-display text-[3.2rem] font-normal leading-[0.9] tracking-[-0.025em] sm:mt-5 sm:gap-x-5 sm:text-[clamp(3.4rem,8vw,7.4rem)]",
            ivory ? "text-[#fbf6ee]" : "text-kajal",
          )}
        >
          <span>
            {collection.title.split(" ")[0]}{" "}
            <span className="italic">{collection.title.split(" ").slice(1).join(" ")}</span>
          </span>
          <span
            className={cx("font-bn-display text-[0.42em] tracking-normal", ivory ? "text-[#e8c56d]" : "text-sindoor")}
            lang="bn"
          >
            {collection.bengali}
          </span>
        </h2>
        <p
          className={cx(
            "mt-3 flex items-center gap-2 font-hand text-lg sm:mt-4 sm:text-xl",
            ivory ? "text-[#f3d98f]" : "text-pen",
          )}
        >
          <HandArrow variant="swoop" className={cx("w-12 -scale-x-100 rotate-[160deg]", ivory && "!text-[#f3d98f]")} />
          {collection.handNote}
        </p>
      </div>
      <div className={cx("min-w-0 max-w-xl", ivory ? "text-[#f1e6d8]/85" : "text-kajal-soft")}>
        <p className="text-[0.97rem] leading-[1.7] sm:text-[1.02rem] sm:leading-[1.75]">{collection.blurb}</p>
        {children}
      </div>
    </div>
  );
}

/** Filters styled as the little woven labels sewn into clothes. */
export function WovenFilters<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { id: T; label: string; count: number }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:mt-7 sm:flex-wrap sm:px-0"
    >
      {options.map((o) => {
        const on = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o.id)}
            className={cx(
              "woven shrink-0 px-3.5 py-2 text-[0.8rem] transition-[transform,color] hover:-translate-y-0.5",
              on ? "text-white [--woven-bg:var(--sindoor)] [--woven-edge:var(--sindoor-deep)]" : "text-kajal",
            )}
          >
            {o.label}{" "}
            <span className={cx("tabular ml-1 text-[0.7rem]", on ? "text-white/70" : "text-kajal-faint")}>
              {o.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function TagLine({ product, className }: { product: Product; className?: string }) {
  const low = product.stock !== undefined && product.stock <= 3;
  if (!product.tags.length && !low) return null;
  return (
    <p className={cx("label !text-[0.6rem] !tracking-[0.16em] text-sindoor", className)}>
      {[...product.tags.map((t) => tagLabels[t]), ...(low ? [`only ${product.stock} left`] : [])].join(" · ")}
    </p>
  );
}

/** Price on a kraft swing tag, written in pen. */
export function KraftPrice({ product, className }: { product: Product; className?: string }) {
  return (
    <span
      className={cx(
        "kraft-tag inline-flex flex-col py-1.5 pl-6 pr-3 leading-none shadow-[0_6px_14px_-8px_rgb(0_0_0/0.5)]",
        className,
      )}
    >
      <span className="font-hand text-[1.05rem] font-bold text-kraft-ink">
        <Price value={product.price} className="[&>span:first-child]:font-hand" />
      </span>
      {product.mrp && (
        <span className="mt-0.5 font-hand text-[0.72rem] text-kraft-ink/60 line-through">
          <Price value={product.mrp} className="[&>span:first-child]:font-hand" />
        </span>
      )}
    </span>
  );
}

export function PotliToggle({
  product,
  className,
  compact,
}: {
  product: Product;
  className?: string;
  compact?: boolean;
}) {
  const { inPotli, togglePotli } = useShop();
  const on = inPotli(product.id);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        togglePotli(product.id);
      }}
      aria-pressed={on}
      aria-label={on ? `Take ${product.name} out of your potli` : `Put ${product.name} in your potli`}
      className={cx(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border text-[0.78rem] transition-colors",
        compact ? "h-9 w-9 justify-center" : "px-3 py-1.5",
        on
          ? "border-sindoor bg-sindoor text-white"
          : "border-kajal/15 bg-tant text-kajal hover:border-sindoor hover:text-sindoor",
        className,
      )}
    >
      <PotliIcon size={16} filled={on} />
      {!compact && (on ? "In your potli" : "Add to potli")}
    </button>
  );
}

/** Little colour dots. Picking one changes the piece everywhere: rail, trial room and chithi. */
export function ColourSwatches({
  product,
  size = "sm",
  showName = true,
  className,
}: {
  product: Product;
  size?: "sm" | "md";
  showName?: boolean;
  className?: string;
}) {
  const { choices, setChoice } = useShop();
  if (!product.colours || product.colours.length < 2) return null;
  const current = choices[product.id]?.colour ?? product.colours[0].name;
  const dot = size === "md" ? "h-8 w-8" : showName ? "h-5 w-5" : "h-4 w-4";
  return (
    <div
      role="radiogroup"
      aria-label={`Colours of ${product.name}`}
      className={cx("flex items-center gap-2", className)}
    >
      {product.colours.map((c) => {
        const on = c.name === current;
        return (
          <button
            key={c.name}
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={c.name}
            title={c.name}
            onClick={(e) => {
              e.stopPropagation();
              setChoice(product.id, { colour: c.name });
            }}
            className={cx(
              "rounded-full shadow-[inset_0_0_0_1px_rgb(0_0_0/0.12)] transition-transform hover:scale-110",
              dot,
              on ? "ring-2 ring-kajal ring-offset-2 ring-offset-tant" : "",
            )}
            style={{ background: c.hex }}
          />
        );
      })}
      {showName && size === "sm" && <span className="font-hand text-[0.92rem] text-pen">{current}</span>}
    </div>
  );
}
