"use client";

import { useMemo, useState } from "react";
import { collectionById, products, type Product, type ProductType } from "@/data/catalog";
import { cx } from "@/lib/format";
import { ObjectArt, objectKindOf, shelfWidth, type ObjectKind } from "../art/object-art";
import { PhotoOr } from "../product-art";
import { useShop } from "../shop-provider";
import { KraftPrice, PotliToggle, RoomHeader, TagLine, WovenFilters } from "./room-parts";

type Kind = "all" | "jewellery" | "clay" | "candles" | "wall" | "soft";
const KIND_TYPES: Record<Exclude<Kind, "all">, ProductType[]> = {
  jewellery: ["jewellery"],
  clay: ["pottery"],
  candles: ["candle"],
  wall: ["art", "decor"],
  soft: ["textile", "bag"],
};
const KIND_LABEL: Record<Kind, string> = {
  all: "Everything",
  jewellery: "Jewellery",
  clay: "Clay",
  candles: "Candles",
  wall: "For the walls",
  soft: "Soft things & bags",
};

const SHELF = products.filter((p) => p.collection === "handmade");

const BASIS = {
  s: "basis-[9.5rem] sm:basis-[11rem]",
  m: "basis-[11rem] sm:basis-[13.5rem]",
  l: "basis-[13rem] sm:basis-[17rem]",
};

function frameFor(kind: ObjectKind) {
  switch (kind) {
    case "painting":
    case "madhubani":
    case "hoop":
      return "aspect-[4/5] h-[88%] border-[9px] border-[#6b4524] bg-white p-1.5 shadow-[4px_8px_14px_-6px_rgb(0_0_0/0.45)]";
    case "jhumka":
    case "drops":
    case "mala":
    case "bangles":
      return "aspect-square h-[74%] rounded-full ring-[6px] ring-[#fbf7ef] shadow-[0_10px_18px_-10px_rgb(0_0_0/0.5)]";
    case "vases":
    case "pot":
    case "bowls":
    case "jar-candles":
    case "pillars":
      return "aspect-[3/4] h-[86%] rounded-t-full shadow-[0_10px_18px_-10px_rgb(0_0_0/0.5)]";
    default:
      return "aspect-[4/5] h-[86%] rounded-[1.25rem] shadow-[0_10px_18px_-10px_rgb(0_0_0/0.5)]";
  }
}

function ShelfItem({ product, index }: { product: Product; index: number }) {
  const { openProduct } = useShop();
  const kind = objectKindOf(product);
  const width = shelfWidth(kind);
  return (
    <li className={cx("group flex min-w-0 grow flex-col", BASIS[width])}>
      <button
        type="button"
        onClick={() => openProduct(product.id)}
        className="relative flex h-[11.5rem] items-end justify-center px-3 sm:h-[14rem]"
        aria-label={`${product.name}, open in the trial room`}
      >
        <div className="flex h-full w-full items-end justify-center transition-transform duration-500 ease-[var(--ease-cloth)] group-hover:-translate-y-2">
          <PhotoOr
            src={product.photo}
            alt={product.photoAlt}
            sizes="(min-width: 640px) 220px, 160px"
            focus={product.focus}
            priority={index < 4}
            frameClassName={cx("max-w-full", frameFor(kind))}
            fallback={<ObjectArt product={product} uid="shelf" className="h-full max-w-full" />}
          />
        </div>
      </button>
      {/* the plank: each item brings its own length of board, so a row reads as one shelf */}
      <div
        className="relative h-3.5 bg-[linear-gradient(#d7ae78,#b88652)] shadow-[0_9px_12px_-6px_rgb(60_35_15/0.45)]"
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 bottom-0 h-1 bg-[#8a5f33]/70" />
      </div>
      <div className="px-3 pb-12">
        <div className="flex items-start justify-between gap-2">
          <div className="-mt-1 origin-top-left rotate-[-5deg] transition-transform duration-500 group-hover:rotate-[2deg]">
            <span className="mx-auto block h-3 w-px bg-kraft-ink/40" aria-hidden="true" />
            <KraftPrice product={product} />
          </div>
          <PotliToggle product={product} compact className="mt-2" />
        </div>
        <TagLine product={product} className="mt-3" />
        <h3 className="mt-1 font-display text-[1.12rem] leading-snug text-kajal">
          <button type="button" onClick={() => openProduct(product.id)} className="text-left hover:text-sindoor">
            {product.name}
          </button>
        </h3>
        {product.note && <p className="mt-0.5 font-hand text-[0.92rem] leading-snug text-pen">{product.note}</p>}
      </div>
    </li>
  );
}

export function Shelves() {
  const [kind, setKind] = useState<Kind>("all");
  const items = useMemo(
    () => (kind === "all" ? SHELF : SHELF.filter((p) => KIND_TYPES[kind].includes(p.type))),
    [kind],
  );
  const options = (Object.keys(KIND_LABEL) as Kind[]).map((k) => ({
    id: k,
    label: KIND_LABEL[k],
    count: k === "all" ? SHELF.length : SHELF.filter((p) => KIND_TYPES[k].includes(p.type)).length,
  }));

  return (
    <section id="shelves" className="relative scroll-mt-16 bg-tant-2 py-20 sm:py-28">
      <div className="paar absolute inset-x-0 top-0 opacity-90" aria-hidden="true" />
      <div className="mx-auto max-w-[84rem] px-4 sm:px-8">
        <RoomHeader collection={collectionById.handmade}>
          <WovenFilters label="Kinds of handmade things" options={options} value={kind} onChange={setKind} />
        </RoomHeader>

        <ul className="mt-16 flex flex-wrap items-stretch">
          {items.map((p, i) => (
            <ShelfItem key={p.id} product={p} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
