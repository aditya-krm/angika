"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { collectionById, products, type ProductType } from "@/data/catalog";
import { cx } from "@/lib/format";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";
import { useShop } from "../shop-provider";
import { GarmentOnHanger } from "./hanger";
import { KraftPrice, PotliToggle, RoomHeader, TagLine, WovenFilters } from "./room-parts";

type Kind = "all" | "saree" | "kurta" | "dress" | "lehenga";
const KIND_TYPES: Record<Exclude<Kind, "all">, ProductType[]> = {
  saree: ["saree"],
  kurta: ["kurta", "dupatta"],
  dress: ["dress", "coord"],
  lehenga: ["lehenga"],
};
const KIND_LABEL: Record<Kind, string> = {
  all: "Everything",
  saree: "Sarees",
  kurta: "Kurta sets & dupattas",
  dress: "Dresses & co-ords",
  lehenga: "Lehengas",
};

const RAIL = products.filter((p) => p.collection === "twirl");

export function Rail() {
  const { openProduct } = useShop();
  const [kind, setKind] = useState<Kind>("all");
  const scroller = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState({ start: 0, size: 1 });

  const items = useMemo(() => (kind === "all" ? RAIL : RAIL.filter((p) => KIND_TYPES[kind].includes(p.type))), [kind]);

  const options = (Object.keys(KIND_LABEL) as Kind[]).map((k) => ({
    id: k,
    label: KIND_LABEL[k],
    count: k === "all" ? RAIL.length : RAIL.filter((p) => KIND_TYPES[k].includes(p.type)).length,
  }));

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    const measure = () => {
      const max = el.scrollWidth;
      setProgress({ start: el.scrollLeft / max, size: Math.min(1, el.clientWidth / max) });
    };
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [items]);

  const nudge = (dir: 1 | -1) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section id="rail" className="relative scroll-mt-16 pb-24 pt-20 sm:pt-28">
      <div className="mx-auto max-w-[84rem] px-4 sm:px-8">
        <RoomHeader collection={collectionById.twirl}>
          <WovenFilters label="Kinds of clothes" options={options} value={kind} onChange={setKind} />
        </RoomHeader>
      </div>

      <div className="relative mt-14">
        <div
          ref={scroller}
          className="no-scrollbar snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth"
          tabIndex={0}
          aria-label="The rail. Scroll sideways to see every piece."
        >
          <ul
            className="relative flex w-max gap-2 pt-[11px] sm:gap-4"
            style={{ paddingInline: "max(1rem, min(2rem, 4vw), calc((100vw - 84rem) / 2 + 2rem))" }}
          >
            {/* the brass rod, with its wall brackets */}
            <span
              className="pointer-events-none absolute inset-x-0 top-[13px] h-[7px] rounded-full bg-[linear-gradient(#f6e1a0,#c9a24f_55%,#8a6a2a)] shadow-[0_3px_5px_rgb(0_0_0/0.25)]"
              aria-hidden="true"
            />
            {items.map((p, i) => (
              <li key={p.id} className="group relative w-[12.5rem] shrink-0 snap-start sm:w-[15rem]">
                <button
                  type="button"
                  onClick={() => openProduct(p.id)}
                  className="sway-on-hover relative block w-full text-left focus-visible:outline-none"
                  aria-label={`${p.name}, open in the trial room`}
                >
                  <div className="sway origin-[50%_4px] transition-transform">
                    <GarmentOnHanger product={p} uid="rail" sizes="(min-width: 640px) 240px, 200px" priority={i < 3} />
                    <div className="absolute right-[2%] top-[17%] z-20 origin-left rotate-[8deg] transition-transform duration-500 group-hover:rotate-[2deg]">
                      <span
                        className="absolute -left-10 top-1/2 h-px w-10 origin-right rotate-[-24deg] bg-kraft-ink/40"
                        aria-hidden="true"
                      />
                      <KraftPrice product={p} />
                    </div>
                  </div>
                  <span className="pointer-events-none absolute inset-0 rounded-xl ring-sindoor ring-offset-4 ring-offset-tant group-focus-visible:ring-2" />
                </button>

                <div className="mt-5 px-2">
                  <TagLine product={p} />
                  <h3 className="mt-1.5 font-display text-[1.32rem] leading-tight text-kajal">
                    <button type="button" onClick={() => openProduct(p.id)} className="text-left hover:text-sindoor">
                      {p.name}
                    </button>
                  </h3>
                  {p.bn && (
                    <p className="font-bn text-[0.95rem] text-kajal-faint" lang="bn">
                      {p.bn}
                    </p>
                  )}
                  <p className="mt-1.5 line-clamp-2 text-[0.88rem] leading-relaxed text-kajal-soft">{p.blurb}</p>
                  {p.note && (
                    <p className="mt-1.5 -rotate-1 font-hand text-[0.95rem] leading-snug text-pen">{p.note}</p>
                  )}
                  <PotliToggle product={p} className="mt-3" />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-10 flex max-w-[84rem] items-center gap-5 px-4 sm:px-8">
          <div className="relative h-[2px] flex-1 bg-line" aria-hidden="true">
            <span
              className="absolute inset-y-[-1px] rounded-full bg-sindoor transition-[left,width] duration-300"
              style={{ left: `${progress.start * 100}%`, width: `${progress.size * 100}%` }}
            />
          </div>
          <div className="flex gap-2">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => nudge(d)}
                className={cx(
                  "grid h-11 w-11 place-items-center rounded-full border border-kajal/15 text-kajal transition-colors hover:border-sindoor hover:bg-sindoor hover:text-white",
                )}
                aria-label={d < 0 ? "Slide the rail left" : "Slide the rail right"}
              >
                {d < 0 ? <ChevronLeftIcon size={18} /> : <ChevronRightIcon size={18} />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
