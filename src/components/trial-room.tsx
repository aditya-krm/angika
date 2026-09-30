"use client";

import { useState } from "react";
import { collectionById, typeLabels, type Product } from "@/data/catalog";
import { cx, discountPercent, productEnquiry, whatsappLink } from "@/lib/format";
import { GarmentArt } from "./art/garment-art";
import { ObjectArt } from "./art/object-art";
import { FoldedCloth } from "./art/fabric";
import { CheckIcon, CloseIcon, CopyIcon, PotliIcon, WhatsAppIcon } from "./icons";
import { useModal } from "./potli";
import { Price } from "./price";
import { PhotoOr } from "./product-art";
import { useShop } from "./shop-provider";

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

function Visual({ product }: { product: Product }) {
  const fallback =
    product.collection === "kalka" && !APPAREL.has(product.type) ? (
      <div className="flex h-full w-full items-center justify-center p-10">
        <div className="w-full -rotate-3 space-y-1.5">
          {[0, 1, 2, 3].map((i) => (
            <FoldedCloth key={i} product={product} uid={`trial-${i}`} className="h-16 w-full" />
          ))}
        </div>
      </div>
    ) : APPAREL.has(product.type) ? (
      <GarmentArt product={product} uid="trial" className="h-[88%] w-auto max-w-[80%]" />
    ) : (
      <ObjectArt product={product} uid="trial" className="h-[70%] w-auto max-w-[86%]" />
    );
  return (
    <div className="relative flex h-full min-h-[22rem] items-center justify-center bg-tant-3 md:min-h-[36rem]">
      <PhotoOr
        src={product.photo}
        alt={product.photoAlt}
        sizes="(min-width: 768px) 32rem, 100vw"
        focus={product.focus}
        priority
        frameClassName="absolute inset-0 !bg-transparent"
        fallback={fallback}
      />
    </div>
  );
}

function Body({ product, onClose }: { product: Product; onClose: () => void }) {
  const { inPotli, togglePotli, choices, setChoice } = useShop();
  const [copied, setCopied] = useState<"idle" | "done" | string>("idle");
  const on = inPotli(product.id);
  const choice = choices[product.id] ?? (product.sizes?.length === 1 ? product.sizes[0] : undefined);
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
        <Visual product={product} />
        <span className="absolute left-4 top-4 rounded-full bg-tant/85 px-2.5 py-0.5 font-hand text-sm text-pen backdrop-blur">
          trial room
        </span>
      </div>

      <div className="flex flex-col px-6 pb-9 pt-8 sm:px-10 md:overflow-y-auto md:pt-12">
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

        {product.sizes && product.sizes.length > 1 && (
          <fieldset className="mt-7">
            <legend className="label text-kajal-faint">{product.optionLabel ?? "Size"}</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={choice === s}
                  onClick={() => setChoice(product.id, choice === s ? undefined : s)}
                  className={cx(
                    "woven min-w-11 px-3 py-2 text-sm transition-transform hover:-translate-y-0.5",
                    choice === s ? "text-white [--woven-bg:var(--kajal)] [--woven-edge:var(--kajal)]" : "text-kajal",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {/* a satin care label */}
        <div className="mt-8 rounded-[3px] bg-[linear-gradient(135deg,#ffffff,#f1eee9_45%,#fbfaf7)] px-5 py-4 text-[#3a3336] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.08),0_4px_10px_-6px_rgb(0_0_0/0.3)]">
          <div className="flex items-center justify-between gap-4 border-b border-dashed border-black/15 pb-3">
            <span className="font-wordmark text-lg italic">Angika</span>
            {care && <CareSymbols care={care.value} />}
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

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => togglePotli(product.id, choice)}
            aria-pressed={on}
            className={cx(
              "inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 font-medium transition-colors sm:flex-none",
              on ? "bg-kajal text-tant" : "bg-sindoor text-white hover:bg-sindoor-deep",
            )}
          >
            <PotliIcon size={19} filled={on} />
            {on ? "In your potli" : "Put in my potli"}
          </button>
          <a
            href={whatsappLink(productEnquiry(product, choice))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-kajal/20 px-5 py-3.5 text-kajal transition-colors hover:border-sobuj hover:text-sobuj"
          >
            <WhatsAppIcon size={18} />
            Ask on WhatsApp
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
            className="inline-flex h-12 items-center gap-1.5 px-2 text-sm text-kajal-soft hover:text-kajal"
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
