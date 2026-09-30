"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { collectionById, products, tagLabels, typeLabels, type CollectionId, type Product } from "@/data/catalog";
import { cx, formatINR, formatNumberIN } from "@/lib/format";
import { HandArrow } from "../brand";
import { useShop } from "../shop-provider";

/**
 * The lal khata: the red cloth-bound ledger Bengali shopkeepers open fresh every Poila Boishakh.
 * Here it's the full price list: every piece, in pen, with taka and poisa columns.
 * The paper stays paper-coloured in both themes, so colours here are fixed.
 */

const PEN = "#27459a";
const FAINT = "#7b7f8e";
const RED = "rgb(194 31 50 / 0.5)";

type Room = CollectionId | "all";
type Sort = "serial" | "low" | "high";

const RIBBONS: { id: Room; label: string; color: string }[] = [
  { id: "all", label: "All", color: "#c21f32" },
  { id: "twirl", label: "Rail", color: "#d8628a" },
  { id: "handmade", label: "Shelves", color: "#3f7a5c" },
  { id: "kalka", label: "Trunk", color: "#c9962e" },
];

const SERIAL = new Map(products.map((p, i) => [p.id, i + 1]));
const INDEX = new Map(
  products.map((p) => [
    p.id,
    [p.name, p.bn, p.blurb, typeLabels[p.type], collectionById[p.collection].title, ...p.tags.map((t) => tagLabels[t])]
      .join(" ")
      .toLowerCase(),
  ]),
);

function Tick({ on }: { on: boolean }) {
  return (
    <span
      className="relative grid h-5 w-5 place-items-center rounded-[3px] border-[1.5px]"
      style={{ borderColor: PEN }}
    >
      {on && (
        <svg viewBox="0 0 24 24" className="absolute -right-1 -top-2 h-7 w-7" fill="none" aria-hidden="true">
          <path
            d="M4 13c3 2 5 5 6 7 2-6 6-12 11-16"
            stroke={PEN}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}

function Entry({ p }: { p: Product }) {
  const { inPotli, togglePotli, openProduct } = useShop();
  const on = inPotli(p.id);
  return (
    <li className="grid h-11 grid-cols-[3.2rem_2rem_minmax(0,1fr)_4.2rem_0rem] items-center sm:grid-cols-[3.2rem_2.25rem_minmax(0,1fr)_5.5rem_2.4rem]">
      <span className="tabular pr-2 text-right font-hand text-[0.82rem]" style={{ color: FAINT }}>
        {SERIAL.get(p.id)}.
      </span>
      <button
        type="button"
        onClick={() => togglePotli(p.id)}
        aria-pressed={on}
        aria-label={on ? `Untick ${p.name}` : `Tick ${p.name} for your potli`}
        className="grid h-9 w-9 place-items-center justify-self-center"
      >
        <Tick on={on} />
      </button>
      <button type="button" onClick={() => openProduct(p.id)} className="group min-w-0 truncate pl-1 text-left">
        <span
          className="font-hand text-[0.98rem] underline-offset-4 group-hover:underline sm:text-[1.08rem]"
          style={{ color: PEN }}
        >
          {p.name}
        </span>
        <span
          className="ml-2 hidden font-sans text-[0.62rem] uppercase tracking-[0.16em] sm:inline"
          style={{ color: FAINT }}
        >
          {typeLabels[p.type]}
        </span>
      </button>
      <span
        className="tabular h-full border-l pr-2 pt-2.5 text-right font-hand text-[1.05rem]"
        style={{ color: PEN, borderColor: RED }}
      >
        {formatNumberIN(p.price)}
      </span>
      <span
        className="tabular hidden h-full border-l pt-2.5 text-center font-hand text-[0.95rem] sm:block"
        style={{ color: PEN, borderColor: RED }}
      >
        00
      </span>
    </li>
  );
}

function ColumnHeads() {
  return (
    <div
      className="grid h-11 grid-cols-[3.2rem_2rem_minmax(0,1fr)_4.2rem_0rem] items-end pb-1.5 font-bn text-[0.82rem] sm:grid-cols-[3.2rem_2.25rem_minmax(0,1fr)_5.5rem_2.4rem]"
      style={{ color: FAINT }}
      lang="bn"
    >
      <span className="pr-2 text-right">নং</span>
      <span />
      <span className="pl-1">বিবরণ</span>
      <span className="h-full border-l pr-2 pt-4 text-right" style={{ borderColor: RED }}>
        টাকা
      </span>
      <span className="hidden h-full border-l pt-4 text-center sm:block" style={{ borderColor: RED }}>
        পঃ
      </span>
    </div>
  );
}

export function Khata() {
  const { potli, setChithiOpen } = useShop();
  const [room, setRoom] = useState<Room>("all");
  const [sort, setSort] = useState<Sort>("serial");
  const [query, setQuery] = useState("");
  const q = useDeferredValue(query).trim().toLowerCase();

  const entries = useMemo(() => {
    const terms = q.split(/\s+/).filter(Boolean);
    const list = products.filter(
      (p) => (room === "all" || p.collection === room) && terms.every((t) => INDEX.get(p.id)!.includes(t)),
    );
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    return list;
  }, [room, sort, q]);

  const half = Math.ceil(entries.length / 2);
  const total = potli.reduce((s, p) => s + p.price, 0);

  const footer = (
    <div
      className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t-2 border-double pt-3"
      style={{ borderColor: RED }}
    >
      <p className="font-hand text-[1.05rem]" style={{ color: PEN }}>
        Ticked: {potli.length} {potli.length === 1 ? "piece" : "pieces"} ·{" "}
        <span className="font-bold">{formatINR(total)}</span>
      </p>
      <button
        type="button"
        onClick={() => setChithiOpen(true)}
        disabled={potli.length === 0}
        className="rounded-full bg-[#c21f32] px-4 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-35"
      >
        Write the chithi →
      </button>
    </div>
  );

  const empty = (
    <p className="py-6 pl-[3.6rem] font-hand text-lg" style={{ color: PEN }}>
      Nothing written under &ldquo;{query}&rdquo;. Try &ldquo;saree&rdquo; or &ldquo;jhumka&rdquo;.
    </p>
  );

  return (
    <section id="khata" className="relative scroll-mt-16 overflow-x-clip bg-tant-2 py-20 sm:py-28">
      <div className="paar absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="mx-auto max-w-[84rem] px-4 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="label text-sindoor">Every price, in one book</p>
          <h2 className="mt-5 font-display text-[clamp(3.2rem,7.5vw,6.8rem)] font-normal leading-[0.92] tracking-[-0.025em] text-kajal">
            The Lal <span className="italic text-sindoor">Khata</span>
          </h2>
          <p className="mt-3 font-bn-display text-2xl text-kajal-faint" lang="bn">
            লাল খাতা
          </p>
          <p className="mx-auto mt-5 max-w-lg text-kajal-soft">
            Like the red ledger every Bengali shop opens fresh on Poila Boishakh. All {products.length} pieces, written
            in pen. Tick the ones you like and they go into your potli.
          </p>
        </div>

        <div className="relative mx-auto mt-20 max-w-6xl">
          {/* ribbon bookmarks */}
          <div
            role="radiogroup"
            aria-label="Show a room"
            className="absolute -top-11 left-6 z-10 flex gap-2 sm:left-12"
          >
            {RIBBONS.map((r) => {
              const on = room === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setRoom(r.id)}
                  className={cx(
                    "relative w-[4.4rem] pb-5 pt-2 text-center text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white transition-transform sm:w-[5.4rem]",
                    on ? "-translate-y-2" : "translate-y-1 hover:-translate-y-0.5",
                  )}
                  style={{ background: r.color, clipPath: "polygon(0 0,100% 0,100% 100%,50% 82%,0 100%)" }}
                >
                  {r.label}
                </button>
              );
            })}
          </div>

          {/* the cloth-bound cover */}
          <div className="relative rounded-[16px] bg-[#8f1426] p-2.5 shadow-[0_50px_80px_-40px_rgb(60_10_15/0.7)] sm:p-4">
            <div
              className="absolute inset-0 rounded-[16px] bg-[repeating-linear-gradient(45deg,rgb(255_255_255/0.035)_0_2px,transparent_2px_5px)]"
              aria-hidden="true"
            />
            <div className="relative grid overflow-hidden rounded-[8px] lg:grid-cols-2">
              {/* left page */}
              <div className="ledger relative pb-8 pr-3 pt-0 sm:pr-6">
                <div className="flex h-11 items-end justify-between gap-3 pb-1 pl-[3.2rem]">
                  <p className="truncate font-hand text-xl sm:text-2xl" style={{ color: PEN }}>
                    Angika
                    <span className="hidden sm:inline">
                      {" "}
                      &mdash;{" "}
                      <span className="font-bn" lang="bn">
                        হালখাতা
                      </span>
                    </span>
                  </p>
                  <div
                    className="flex shrink-0 items-center gap-2 font-hand text-[0.88rem] sm:text-[0.95rem]"
                    style={{ color: FAINT }}
                  >
                    <span className="hidden sm:inline">sort:</span>
                    {(
                      [
                        ["serial", "no."],
                        ["low", "cheapest"],
                        ["high", "dearest"],
                      ] as const
                    ).map(([id, label]) => (
                      <button
                        key={id}
                        type="button"
                        aria-pressed={sort === id}
                        onClick={() => setSort(id)}
                        className={cx("underline-offset-4", sort === id ? "underline decoration-2" : "hover:underline")}
                        style={{ color: sort === id ? PEN : FAINT }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <label className="flex h-11 items-end gap-2 pb-1.5 pl-[3.2rem]">
                  <span className="font-hand text-[1.05rem]" style={{ color: FAINT }}>
                    look for:
                  </span>
                  <input
                    id="khata-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="jhumka, kantha, pink…"
                    className="min-w-0 flex-1 border-b border-dashed bg-transparent font-hand text-[1.1rem] outline-none placeholder:opacity-50 focus:border-solid"
                    style={{ color: PEN, borderColor: PEN }}
                  />
                </label>
                <ColumnHeads />
                {entries.length === 0 && empty}
                <ul className="lg:hidden">
                  {entries.map((p) => (
                    <Entry key={p.id} p={p} />
                  ))}
                </ul>
                <ul className="hidden lg:block">
                  {entries.slice(0, half).map((p) => (
                    <Entry key={p.id} p={p} />
                  ))}
                </ul>
                <div className="lg:hidden">{footer}</div>
              </div>

              {/* right page */}
              <div className="ledger relative hidden pb-8 pr-6 pt-0 lg:block">
                <div
                  className="pointer-events-none absolute inset-y-0 -left-px w-10 bg-[linear-gradient(90deg,rgb(0_0_0/0.14),transparent)]"
                  aria-hidden="true"
                />
                <div className="h-[5.5rem]" />
                <ColumnHeads />
                <ul>
                  {entries.slice(half).map((p) => (
                    <Entry key={p.id} p={p} />
                  ))}
                </ul>
                {footer}
              </div>
              <div
                className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-8 -translate-x-full bg-[linear-gradient(270deg,rgb(0_0_0/0.14),transparent)] lg:block"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="pointer-events-none absolute -bottom-14 right-4 hidden items-center gap-2 sm:flex">
            <HandArrow variant="swoop" className="w-16 -scale-y-100" />
            <span className="-rotate-2 font-hand text-lg text-pen">ticks go straight into your potli</span>
          </div>
        </div>
      </div>
    </section>
  );
}
