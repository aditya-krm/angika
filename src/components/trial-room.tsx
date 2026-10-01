"use client";

import { useState } from "react";
import { collectionById, lookOf, optionsOf, typeLabels, type Product } from "@/data/catalog";
import { cx, discountPercent, productEnquiry, whatsappLink } from "@/lib/format";
import { GarmentArt } from "./art/garment-art";
import { ObjectArt } from "./art/object-art";
import { FoldedCloth } from "./art/fabric";
import { Wordmark } from "./brand";
import { CheckIcon, CloseIcon, CopyIcon, PotliIcon, WhatsAppIcon } from "./icons";
import { useModal } from "./potli";
import { Price } from "./price";
import { PhotoOr } from "./product-art";
import { ColourSwatches } from "./rooms/room-parts";
import { useShop, type Choice } from "./shop-provider";

const APPAREL = new Set(["saree", "kurta", "dress", "coord", "lehenga", "dupatta"]);

/** Care symbols, in the style of a sewn-in care label. */
function CareSymbols({ care }: { care: string }) {
  const c = care.toLowerCase();
  const icons: React.ReactNode[] = [];
  if (c.includes("hand wash") || c.includes("gentle"))
    icons.push(<path key="hw" d="M3 8h18l-2 10H5Zm6 0V5c0-1 2-1 2 0v3m0-2c0-1 2-1 2 0v2m0-1c0-1 2-1 2 0v1" />);
  else if (c.includes("machine"))
    icons.push(
      <g key="mw">
        <path d="M3 8h18l-2 10H5Z" />
        <circle cx="12" cy="13" r="1" fill="currentColor" />
      </g>,
    );
  if (c.includes("dry clean"))
    icons.push(
      <g key="dc">
        <circle cx="12" cy="12" r="8" />
        <text x="12" y="15.5" fontSize="9" textAnchor="middle" fill="currentColor" stroke="none">
          P
        </text>
      </g>,
    );
  if (c.includes("shade") || c.includes("dry"))
    icons.push(
      <g key="sh">
        <rect x="4" y="4" width="16" height="16" />
        <path d="M4 8h4V4" />
      </g>,
    );
  if (!icons.length) return null;
  return (
    <div className="flex gap-2 text-[#3a3336]">
      {icons.map((icon, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          aria-hidden="true"
        >
          {icon}
        </svg>
      ))}
    </div>
  );
}

function Visual({ product: base, colour }: { product: Product; colour?: string }) {
  const look = lookOf(base, colour);
  const tint = `trial-${look.colour?.name ?? "base"}`.replace(/\s+/g, "-");
  const product = { ...base, palette: look.palette };
  const fallback =
    product.collection === "kalka" && !APPAREL.has(product.type) ? (
      <div className="flex h-full w-full items-center justify-center p-10">
        <div className="w-full -rotate-3 space-y-1.5">
          {[0, 1, 2, 3].map((i) => (
            <FoldedCloth key={i} product={product} uid={`${tint}-${i}`} className="h-16 w-full" />
          ))}
        </div>
      </div>
    ) : APPAREL.has(product.type) ? (
      <GarmentArt product={product} uid={tint} className="h-[88%] w-auto max-w-[80%]" />
    ) : (
      <ObjectArt product={product} uid={tint} className="h-[70%] w-auto max-w-[86%]" />
    );
  return (
    <div className="relative flex h-full min-h-[19rem] items-center justify-center bg-tant-3 sm:min-h-[22rem] md:min-h-[36rem]">
      {look.photo ? (
        <PhotoOr
          key={look.photo}
          src={look.photo}
          alt={look.photoAlt}
          sizes="(min-width: 768px) 32rem, 100vw"
          focus={product.focus}
          priority
          frameClassName="absolute inset-0 !bg-transparent"
          fallback={fallback}
        />
      ) : (
        <>
          {fallback}
          <span className="sr-only">{look.photoAlt}</span>
          <span className="absolute bottom-4 right-4 rounded-full bg-tant/85 px-3 py-1 font-hand text-sm text-pen backdrop-blur">
            photo of this colour coming soon
          </span>
        </>
      )}
    </div>
  );
}

/**
 * A tailor's measurement slip: a strip of measuring tape on top, then the size chart in inches.
 * Rows are tappable to pick a size. Free-size pieces list their measurements instead.
 */
function MeasureSlip({
  product,
  picked,
  onPick,
}: {
  product: Product;
  picked?: string;
  onPick?: (size: string | undefined) => void;
}) {
  const chart = product.sizeChart;
  const cols = chart
    ? (["bust", "waist", "hip", "length"] as const).filter((k) => chart.some((r) => typeof r[k] === "number"))
    : [];
  return (
    <div className="mt-7 shrink-0 overflow-hidden rounded-[3px] bg-[#fffdf6] shadow-[0_6px_16px_-10px_rgb(0_0_0/0.45),inset_0_0_0_1px_rgb(0_0_0/0.06)]">
      <div className="tape h-5" aria-hidden="true" />
      <div className="px-4 pb-4 pt-3 sm:px-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
          <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#8a8286]">
            {chart ? "Size & measurements" : "Measurements"}
          </p>
          {chart && <p className="font-hand text-sm text-[#27459a]">in inches · tap your size</p>}
        </div>
        {chart ? (
          <table className="mt-2 w-full border-collapse text-left">
            <thead>
              <tr className="font-sans text-[0.62rem] uppercase tracking-[0.16em] text-[#8a8286]">
                <th className="py-1.5 pr-2 font-medium">Size</th>
                {cols.map((c) => (
                  <th key={c} className="py-1.5 pr-2 text-right font-medium">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chart.map((r) => {
                const on = picked === r.size;
                return (
                  <tr
                    key={r.size}
                    onClick={() => onPick?.(on ? undefined : r.size)}
                    className={cx(
                      "tabular cursor-pointer border-t border-dashed border-[#d9d2c4] font-hand text-[1.02rem] text-[#27459a] transition-colors",
                      on ? "bg-[#27459a] text-white" : "hover:bg-[#27459a]/[0.06]",
                    )}
                  >
                    <td className="py-1.5 pl-1 pr-2">
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={(e) => {
                          e.stopPropagation();
                          onPick?.(on ? undefined : r.size);
                        }}
                        className="font-sans text-[0.8rem] font-semibold"
                      >
                        {r.size}
                      </button>
                    </td>
                    {cols.map((c) => (
                      <td key={c} className="py-1.5 pr-2 text-right">
                        {r[c] ?? "—"}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <dl className="mt-2 divide-y divide-dashed divide-[#d9d2c4]">
            {product.measurements?.map((m) => (
              <div key={m.label} className="flex items-baseline justify-between gap-4 py-1.5">
                <dt className="font-sans text-[0.78rem] text-[#5b5256]">{m.label}</dt>
                <dd className="font-hand text-[1.02rem] text-[#27459a]">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {chart && (
          <p className="mt-3 text-[0.72rem] leading-relaxed text-[#6b6064]">
            Garment measurements, laid flat. Compare with a piece that fits you well, or ask us on WhatsApp.
          </p>
        )}
      </div>
    </div>
  );
}

function Body({ product, onClose }: { product: Product; onClose: () => void }) {
  const { inPotli, togglePotli, choices, setChoice } = useShop();
  const [copied, setCopied] = useState<"idle" | "done" | string>("idle");
  const on = inPotli(product.id);
  const options = optionsOf(product);
  const saved = choices[product.id] ?? {};
  const picked: Choice = {
    option: saved.option ?? (options?.length === 1 ? options[0] : undefined),
    colour: saved.colour ?? (product.colours && product.colours.length > 1 ? product.colours[0].name : undefined),
  };
  const off = discountPercent(product);
  const collection = collectionById[product.collection];
  const care = product.details.find((d) => d.label.toLowerCase() === "care");

  return (
    <div className="relative grid max-h-[94dvh] overflow-y-auto md:max-h-[90dvh] md:grid-cols-[1fr_1.05fr] md:overflow-hidden">
      {/* the curtain, drawn back as the trial room opens */}
      <div
        className="pointer-events-none absolute inset-0 z-30 bg-[repeating-linear-gradient(90deg,#b01c2e_0_18px,#c7263a_18px_30px,#9a1627_30px_44px)] [animation:curtain-cloth_1s_var(--ease-cloth)_.1s_both]"
        aria-hidden="true"
      />
      <button
        type="button"
        onClick={onClose}
        autoFocus
        className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-tant/90 text-kajal shadow-sm backdrop-blur transition-colors hover:bg-sindoor hover:text-white"
        aria-label="Close the trial room"
      >
        <CloseIcon size={18} />
      </button>

      <div className="relative md:h-full">
        <span
          className="pointer-events-none absolute left-1/2 top-2 z-20 h-1 w-10 -translate-x-1/2 rounded-full bg-black/25 md:hidden"
          aria-hidden="true"
        />
        <Visual product={product} colour={picked.colour} />
        <span className="absolute left-4 top-4 rounded-full bg-tant/85 px-2.5 py-0.5 font-hand text-sm text-pen backdrop-blur">
          trial room
        </span>
      </div>

      <div className="flex flex-col px-6 pb-5 pt-7 sm:px-10 md:overflow-y-auto md:pb-9 md:pt-12">
        <p className="label pr-12 text-sindoor">
          {collection.title} · {typeLabels[product.type]}
        </p>
        <h2
          id="trial-title"
          className="mt-4 font-display text-[2.3rem] leading-[1.02] tracking-[-0.015em] text-kajal sm:text-[2.9rem]"
        >
          {product.name}
        </h2>
        {product.bn && (
          <p className="mt-1 font-bn-display text-2xl text-kajal-faint" lang="bn">
            {product.bn}
          </p>
        )}

        <div className="mt-5 flex flex-wrap items-baseline gap-3">
          <Price value={product.price} className="font-display text-[2.2rem] text-kajal" />
          {product.mrp && <Price value={product.mrp} className="text-lg text-kajal-faint line-through" />}
          {off && (
            <span className="label rounded-full bg-sindoor-wash px-2.5 py-1 !text-[0.6rem] text-sindoor">
              {off}% off
            </span>
          )}
        </div>
        {product.stock !== undefined && product.stock <= 3 && (
          <p className="mt-1 text-sm font-medium text-sindoor">
            Only {product.stock} left{product.stock === 1 ? ". It's a one-off." : "."}
          </p>
        )}

        {product.note && <p className="mt-5 -rotate-1 font-hand text-xl text-pen">&ldquo;{product.note}&rdquo;</p>}
        <p className="mt-4 leading-[1.75] text-kajal-soft">{product.story}</p>

        {product.colours && product.colours.length > 1 && (
          <div className="mt-7">
            <p className="label text-kajal-faint">
              Colour · <span className="text-kajal">{picked.colour}</span>
            </p>
            <ColourSwatches product={product} size="md" className="mt-3" />
          </div>
        )}

        {product.sizeChart ? (
          <MeasureSlip product={product} picked={picked.option} onPick={(o) => setChoice(product.id, { option: o })} />
        ) : product.measurements ? (
          <MeasureSlip product={product} />
        ) : (
          options &&
          options.length > 1 && (
            <fieldset className="mt-7">
              <legend className="label text-kajal-faint">{product.optionLabel ?? "Size"}</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {options.map((o) => (
                  <button
                    key={o}
                    type="button"
                    aria-pressed={picked.option === o}
                    onClick={() => setChoice(product.id, { option: picked.option === o ? undefined : o })}
                    className={cx(
                      "woven min-w-11 px-3 py-2 text-sm transition-transform hover:-translate-y-0.5",
                      picked.option === o
                        ? "text-white [--woven-bg:var(--kajal)] [--woven-edge:var(--kajal)]"
                        : "text-kajal",
                    )}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </fieldset>
          )
        )}

        {/* a satin care label */}
        <div className="mt-8 shrink-0 rounded-[3px] bg-[linear-gradient(135deg,#ffffff,#f1eee9_45%,#fbfaf7)] px-5 py-4 text-[#3a3336] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.08),0_4px_10px_-6px_rgb(0_0_0/0.3)]">
          <div className="flex items-center justify-between gap-4 border-b border-dashed border-black/15 pb-3">
            <Wordmark className="h-3.5 text-[#42141e]" />
            {care && (APPAREL.has(product.type) || product.type === "textile") && <CareSymbols care={care.value} />}
          </div>
          <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-[0.8rem]">
            {product.details.map((d) => (
              <div key={d.label}>
                <dt className="font-sans text-[0.6rem] uppercase tracking-[0.18em] text-[#8a8286]">{d.label}</dt>
                <dd>{d.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* On phones the actions stay pinned to the bottom of the sheet while you scroll. */}
        <div className="sticky bottom-0 z-10 -mx-6 mt-8 flex items-center gap-2.5 border-t border-line bg-tant/95 px-6 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] pt-3 backdrop-blur-md sm:-mx-10 sm:px-10 md:static md:mx-0 md:flex-wrap md:gap-3 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
          <button
            type="button"
            onClick={() => togglePotli(product.id)}
            aria-pressed={on}
            className={cx(
              "inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-3.5 font-medium transition-colors sm:px-6 md:flex-none",
              on ? "bg-kajal text-tant" : "bg-sindoor text-white hover:bg-sindoor-deep",
            )}
          >
            <PotliIcon size={19} filled={on} />
            {on ? "In your potli" : "Put in my potli"}
          </button>
          <a
            href={whatsappLink(productEnquiry(product, picked))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-kajal/20 px-4 py-3.5 text-kajal transition-colors hover:border-sobuj hover:text-sobuj sm:px-5"
          >
            <WhatsAppIcon size={18} />
            <span className="sm:hidden">Ask</span>
            <span className="hidden sm:inline">Ask on WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={async () => {
              const url = `${window.location.origin}${window.location.pathname}#piece-${product.id}`;
              try {
                await navigator.clipboard.writeText(url);
                setCopied("done");
                window.setTimeout(() => setCopied("idle"), 1800);
              } catch {
                setCopied(url);
              }
            }}
            className="hidden h-12 items-center gap-1.5 px-2 text-sm text-kajal-soft hover:text-kajal md:inline-flex"
          >
            {copied === "done" ? <CheckIcon size={16} className="text-sobuj" /> : <CopyIcon size={16} />}
            {copied === "done" ? "Link copied" : "Copy link"}
          </button>
        </div>
        {copied !== "idle" && copied !== "done" && (
          <p className="mt-2 select-all break-all rounded bg-tant-2 px-3 py-2 text-xs text-kajal-soft">{copied}</p>
        )}
        <p className="mt-5 text-xs text-kajal-faint">
          This is a menu, so nothing is charged here. We&rsquo;ll confirm availability, sizing and delivery on WhatsApp.
        </p>
      </div>
    </div>
  );
}

export function TrialRoom() {
  const { activeProduct, closeProduct } = useShop();
  const ref = useModal(Boolean(activeProduct), closeProduct);
  return (
    <dialog
      ref={ref}
      aria-labelledby="trial-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeProduct();
      }}
      className="m-0 mt-auto max-h-[94dvh] w-full max-w-none overflow-hidden rounded-t-[1.5rem] bg-tant p-0 text-kajal shadow-2xl backdrop:bg-[#140c0e]/60 backdrop:backdrop-blur-sm md:m-auto md:max-h-[90dvh] md:w-[min(68rem,calc(100vw-3rem))] md:rounded-[1.5rem]"
    >
      {activeProduct && <Body key={activeProduct.id} product={activeProduct} onClose={closeProduct} />}
    </dialog>
  );
}
