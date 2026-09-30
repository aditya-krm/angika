"use client";

import { collectionById, products, typeLabels } from "@/data/catalog";
import { cx, hashString } from "@/lib/format";
import { FoldedCloth } from "../art/fabric";
import { Kalka } from "../brand";
import { PhotoOr } from "../product-art";
import { useShop } from "../shop-provider";
import { KraftPrice, PotliToggle, RoomHeader } from "./room-parts";

const TRUNK = products.filter((p) => p.collection === "kalka");

const FACTS = [
  {
    bn: "আম",
    roman: "aam",
    text: "The shape comes from a raw mango, which is why many grandmothers call it the mango motif.",
  },
  {
    bn: "পাড়",
    roman: "paar",
    text: "Tant and jamdani weavers run kalkas along the border and pallu, so they sway when the saree moves.",
  },
  {
    bn: "কাঁথা",
    roman: "kantha",
    text: "Kantha artisans stitch them in running stitch, one tiny dash after another, into soft old cotton.",
  },
];

function SafetyPin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 12" className={className} aria-hidden="true" focusable="false" fill="none">
      <path d="M4 6c0-2.5 2-4 4-4h26c2 0 3 1 3 2.5S36 7 34 7H10" stroke="#9aa3ab" strokeWidth="1.4" />
      <path d="M8 2c-2 0-4 1.5-4 4s2 4 4 4h26" stroke="#c3cad0" strokeWidth="1.4" />
      <rect x="30" y="1.5" width="7" height="6" rx="1.5" fill="#9aa3ab" />
    </svg>
  );
}

function PaintedTrunk() {
  return (
    <div
      className="relative mx-[-2%] h-40 rounded-[10px] bg-[#1f4d40] shadow-[0_30px_40px_-24px_rgb(0_0_0/0.6)] sm:h-48"
      aria-hidden="true"
    >
      <div className="absolute inset-x-0 top-0 h-9 rounded-t-[10px] bg-[#245847] shadow-[0_4px_0_rgb(0_0_0/0.25)]" />
      <div className="absolute inset-x-[3%] top-12 bottom-[10%] rounded-md border-2 border-[#d9b45a]/70" />
      {/* painted flowers */}
      <svg
        viewBox="0 0 300 100"
        className="absolute left-[6%] top-14 h-[calc(100%-5rem)] w-[88%]"
        preserveAspectRatio="xMidYMid meet"
      >
        {[40, 260].map((x) => (
          <g key={x} transform={`translate(${x} 48)`}>
            {[0, 60, 120, 180, 240, 300].map((r) => (
              <ellipse key={r} cx="0" cy="-12" rx="6" ry="12" fill="#e46f6f" transform={`rotate(${r})`} />
            ))}
            <circle r="6" fill="#f2c15b" />
            <path d="M-26 22c10-8 18-8 26 0 8-8 16-8 26 0" stroke="#7fb28f" strokeWidth="3" fill="none" />
          </g>
        ))}
        <text
          x="150"
          y="60"
          textAnchor="middle"
          fontSize="36"
          fill="#f2d98f"
          style={{ fontFamily: "var(--font-bn-display)" }}
        >
          অঙ্গিকা
        </text>
      </svg>
      <span className="absolute left-1/2 top-6 h-10 w-7 -translate-x-1/2 rounded-b-md bg-[linear-gradient(#f3d98f,#b8913e)] shadow" />
      <span className="absolute left-[8%] top-1/2 h-3 w-10 rounded-full border-2 border-[#b8913e]" />
      <span className="absolute right-[8%] top-1/2 h-3 w-10 rounded-full border-2 border-[#b8913e]" />
    </div>
  );
}

export function Trunk() {
  const { openProduct } = useShop();
  return (
    <section id="trunk" className="relative scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto max-w-[84rem] px-4 sm:px-8">
        <RoomHeader collection={collectionById.kalka} />

        <div className="mt-16 grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          {/* What is kalka? */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-[#1d2a55] p-8 text-[#f4ecdf] sm:p-10">
              <Kalka className="absolute -right-10 -top-6 h-72 w-60 rotate-12 text-[#d9b45a]/25" strokeWidth={0.9} />
              <p className="label text-[#d9b45a]">What is kalka?</p>
              <p className="mt-4 font-display text-[2.1rem] leading-[1.1]">
                A little mango that learned to <span className="italic text-[#f2c15b]">dance.</span>
              </p>
              <p className="mt-4 max-w-sm text-[0.97rem] leading-relaxed text-[#f4ecdf]/80">
                The world calls it paisley. In Bengal it has always been kalka, curling across pujo sarees, wedding
                shawls and the kantha quilts our grandmothers stitched.
              </p>
              <ul className="mt-8 grid gap-5">
                {FACTS.map((f) => (
                  <li
                    key={f.roman}
                    className="grid grid-cols-[4.5rem_1fr] items-baseline gap-4 border-t border-[#d9b45a]/25 pt-4"
                  >
                    <span>
                      <span className="block font-bn-display text-3xl text-[#f2c15b]" lang="bn">
                        {f.bn}
                      </span>
                      <span className="label !text-[0.58rem] text-[#f4ecdf]/60">{f.roman}</span>
                    </span>
                    <span className="text-sm leading-relaxed text-[#f4ecdf]/80">{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* The stack, resting on the painted trunk */}
          <div>
            <p className="mb-5 font-hand text-lg text-pen">pull one out to have a look ↓</p>
            <ul className="flex flex-col gap-1.5">
              {TRUNK.map((p, i) => {
                const h = hashString(p.id);
                const dx = ((h % 13) - 6) * 1.4;
                const rot = (((h >> 4) % 9) - 4) * 0.12;
                return (
                  <li key={p.id} style={{ transform: `translateX(${dx}px) rotate(${rot}deg)` }}>
                    <div className="group relative h-[5.6rem] transition-transform duration-500 ease-[var(--ease-cloth)] hover:translate-x-5 focus-within:translate-x-5 sm:h-24">
                      <FoldedCloth
                        product={p}
                        uid="trunk"
                        className="absolute inset-0 h-full w-full drop-shadow-[0_6px_6px_rgb(0_0_0/0.18)]"
                      />
                      <div className="relative flex h-full items-center gap-3 pl-3 pr-3 pt-4 sm:gap-4 sm:pl-5 sm:pr-5">
                        <PhotoOr
                          src={p.photo}
                          alt={p.photoAlt}
                          sizes="64px"
                          focus={p.focus}
                          frameClassName="hidden h-12 w-12 shrink-0 rounded-full ring-2 ring-[#fbf7ef] sm:block"
                          fallback={null}
                        />
                        {/* dhobi chit, safety-pinned to the fold */}
                        <button
                          type="button"
                          onClick={() => openProduct(p.id)}
                          className="relative min-w-0 max-w-[62%] rounded-[3px] bg-[#fbf7ef] px-3 py-1.5 text-left shadow-[0_3px_8px_-3px_rgb(0_0_0/0.35)] transition-transform hover:-rotate-1"
                          style={{ transform: `rotate(${i % 2 ? 0.8 : -0.8}deg)` }}
                        >
                          <SafetyPin className="absolute -left-4 -top-1 h-3 w-9" />
                          <span className="block truncate font-display text-[1.02rem] leading-tight text-[#1e1a1d] sm:text-[1.12rem]">
                            {p.name}
                          </span>
                          <span className="flex items-baseline gap-2 text-[0.72rem] text-[#6b6064]">
                            {p.bn && (
                              <span className="font-bn text-[0.82rem]" lang="bn">
                                {p.bn}
                              </span>
                            )}
                            <span className="truncate">{typeLabels[p.type]}</span>
                          </span>
                        </button>
                        <div className="ml-auto flex shrink-0 items-center gap-2">
                          <PotliToggle product={p} compact className="hidden sm:inline-flex" />
                          <KraftPrice product={p} className={cx("rotate-[4deg]")} />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <PaintedTrunk />
          </div>
        </div>
      </div>
    </section>
  );
}
