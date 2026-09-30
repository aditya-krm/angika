"use client";

import { useEffect, useRef, useState } from "react";
import { optionsOf } from "@/data/catalog";
import { site } from "@/data/site";
import { chithiMessage, cx, formatINR, whatsappLink } from "@/lib/format";
import { BrandFigure } from "./brand";
import { CloseIcon } from "./icons";
import { useShop } from "./shop-provider";

const PEN = "#27459a";

/** Open a native <dialog> as a modal while `open` is true. */
export function useModal(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) {
      el.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && el.open) {
      el.close();
    }
    if (!open) document.documentElement.style.overflow = "";
  }, [open]);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = () => {
      document.documentElement.style.overflow = "";
      onClose();
    };
    el.addEventListener("close", handle);
    return () => el.removeEventListener("close", handle);
  }, [onClose]);
  return ref;
}

/** The potli itself, drawn: a sindoor pouch with a zari drawstring. */
function PotliDrawing({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <path d="M20 22c-9 6-13 15-11 24 2 9 11 13 23 13s21-4 23-13c2-9-2-18-11-24Z" fill="#c21f32" />
      <path d="M20 22c-9 6-13 15-11 24 2 9 11 13 23 13s21-4 23-13c2-9-2-18-11-24Z" fill="url(#potli-sheen)" />
      <path d="M14 44c10 4 26 4 36 0" stroke="#e8c56d" strokeWidth="1.3" fill="none" strokeDasharray="3 2" />
      <path d="M32 36c-4 3-6 6-5 10 4-1 6-4 5-10Zm0 0c4 3 6 6 5 10-4-1-6-4-5-10Z" fill="#e8c56d" />
      <path d="M20 22 16 9c5-3 10-1 16 3 6-4 11-6 16-3l-4 13" fill="#a3182a" />
      <path d="M19 22h26" stroke="#e8c56d" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M32 22c-3 5-6 9-9 11M32 22c3 5 5 9 9 11"
        stroke="#e8c56d"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="23" cy="33.5" r="2" fill="#e8c56d" />
      <circle cx="41" cy="33.5" r="2" fill="#e8c56d" />
      <defs>
        <linearGradient id="potli-sheen" x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".2" />
          <stop offset=".35" stopColor="#fff" stopOpacity=".18" />
          <stop offset="1" stopColor="#000" stopOpacity=".25" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function PotliButton() {
  const { potli, bump, setChithiOpen } = useShop();
  return (
    <button
      type="button"
      onClick={() => setChithiOpen(true)}
      className="group fixed bottom-[calc(env(safe-area-inset-bottom,0px)+1.1rem)] right-4 z-40 flex items-end sm:right-6 2xl:right-10"
      aria-label={`Open your potli, ${potli.length} ${potli.length === 1 ? "piece" : "pieces"}`}
    >
      <span className="mb-2 mr-1 hidden rounded-full bg-kajal px-3 py-1.5 font-hand text-sm text-tant opacity-0 shadow-lg transition-opacity group-hover:opacity-100 sm:block">
        my potli
      </span>
      <span
        key={bump}
        className={cx("relative block h-16 w-16 drop-shadow-[0_10px_14px_rgb(0_0_0/0.3)]", bump > 0 && "potli-bounce")}
      >
        <PotliDrawing className="h-full w-full" />
        <span className="kraft-tag tabular absolute -right-3 top-6 rotate-[14deg] py-0.5 pl-5 pr-2 font-hand text-sm font-bold">
          {potli.length}
        </span>
      </span>
    </button>
  );
}

export function Chithi() {
  const { potli, choices, setChoice, togglePotli, emptyPotli, chithiOpen, setChithiOpen, openProduct } = useShop();
  const ref = useModal(chithiOpen, () => setChithiOpen(false));
  const [name, setName] = useState("");
  const [copy, setCopy] = useState<"idle" | "done" | "failed">("idle");
  const total = potli.reduce((s, p) => s + p.price, 0);
  const message = chithiMessage(potli, choices, name);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("angika:name");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restoring the visitor's name from their device
      if (saved) setName(saved);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby="chithi-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) setChithiOpen(false);
      }}
      className="m-0 mt-auto max-h-[94dvh] w-full max-w-none overflow-visible bg-transparent p-0 backdrop:bg-[#140c0e]/55 backdrop:backdrop-blur-[3px] sm:mb-24 sm:ml-auto sm:mr-6 sm:mt-auto sm:w-[29rem]"
    >
      <div className="relative max-h-[94dvh] overflow-y-auto rounded-t-[6px] bg-[#fbf7ef] px-7 pb-8 pt-9 shadow-2xl sm:rounded-[6px] [animation:letter-in_.55s_var(--ease-cloth)]">
        <div
          className="absolute inset-x-0 top-0 h-2 bg-[repeating-linear-gradient(90deg,#c21f32_0_14px,#fbf7ef_14px_20px,#20305e_20px_34px,#fbf7ef_34px_40px)]"
          aria-hidden="true"
        />
        <button
          type="button"
          onClick={() => setChithiOpen(false)}
          className="absolute right-4 top-5 grid h-9 w-9 place-items-center rounded-full text-[#5b5256] hover:bg-black/5"
          aria-label="Close the chithi"
        >
          <CloseIcon size={18} />
        </button>

        <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[#9a8f84]">Your chithi</p>
        <h2 id="chithi-title" className="mt-3 font-hand text-[1.7rem]" style={{ color: PEN }}>
          Dear {site.name},
        </h2>

        {potli.length === 0 ? (
          <div className="font-hand text-[1.15rem] leading-relaxed" style={{ color: PEN }}>
            <p className="mt-3">My potli is empty for now&hellip;</p>
            <p className="mt-3 text-[#6b6064]">
              Tap the little pouch on anything you like, or tick it in the lal khata, and it will be written here.
            </p>
            <a
              href="#rail"
              onClick={() => setChithiOpen(false)}
              className="mt-6 inline-block rounded-full bg-[#1e1a1d] px-5 py-2.5 font-sans text-sm text-[#fbf7ef]"
            >
              Open the almirah
            </a>
          </div>
        ) : (
          <>
            <p className="mt-2 font-hand text-[1.1rem]" style={{ color: PEN }}>
              These are in my potli:
            </p>
            <ol className="mt-3 space-y-2.5">
              {potli.map((p, i) => (
                <li
                  key={p.id}
                  className="grid grid-cols-[1.4rem_1fr_auto_1.6rem] items-baseline gap-x-1 font-hand text-[1.08rem]"
                  style={{ color: PEN }}
                >
                  <span>{i + 1}.</span>
                  <span className="min-w-0">
                    <button
                      type="button"
                      onClick={() => {
                        setChithiOpen(false);
                        openProduct(p.id);
                      }}
                      className="text-left underline-offset-4 hover:underline"
                    >
                      {p.name}
                    </button>
                    {(optionsOf(p)?.length ?? 0) > 1 && (
                      <select
                        aria-label={`${p.sizeChart ? "Size" : (p.optionLabel ?? "Size")} for ${p.name}`}
                        value={choices[p.id]?.option ?? ""}
                        onChange={(e) => setChoice(p.id, { option: e.target.value || undefined })}
                        className="ml-1.5 rounded-sm border border-dashed bg-transparent px-1 font-hand text-[0.92rem]"
                        style={{ color: PEN, borderColor: `${PEN}66` }}
                      >
                        <option value="">{(p.sizeChart ? "size" : (p.optionLabel ?? "size")).toLowerCase()}?</option>
                        {optionsOf(p)!.map((s) => {
                          const row = p.sizeChart?.find((r) => r.size === s);
                          return (
                            <option key={s} value={s}>
                              {row?.bust ? `${s} · bust ${row.bust}″` : s}
                            </option>
                          );
                        })}
                      </select>
                    )}
                    {p.colours && p.colours.length > 1 && (
                      <select
                        aria-label={`Colour for ${p.name}`}
                        value={choices[p.id]?.colour ?? p.colours[0].name}
                        onChange={(e) => setChoice(p.id, { colour: e.target.value })}
                        className="ml-1.5 rounded-sm border border-dashed bg-transparent px-1 font-hand text-[0.92rem]"
                        style={{ color: PEN, borderColor: `${PEN}66` }}
                      >
                        {p.colours.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </span>
                  <span className="tabular text-right">{formatINR(p.price)}</span>
                  <button
                    type="button"
                    onClick={() => togglePotli(p.id)}
                    className="grid h-6 w-6 place-items-center self-center justify-self-end rounded-full text-[#9a8f84] hover:bg-black/5 hover:text-[#c21f32]"
                    aria-label={`Take ${p.name} out`}
                  >
                    <CloseIcon size={13} />
                  </button>
                </li>
              ))}
            </ol>
            <p
              className="mt-5 border-t border-dashed border-[#cfc6b6] pt-4 font-hand text-[1.12rem] leading-relaxed"
              style={{ color: PEN }}
            >
              That&rsquo;s <span className="font-bold">{formatINR(total)}</span> in all. Could you tell me what&rsquo;s
              available?
            </p>
            <label className="mt-5 flex items-end gap-2 font-hand text-[1.12rem]" style={{ color: PEN }}>
              Love,
              <input
                id="chithi-name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  try {
                    window.localStorage.setItem("angika:name", e.target.value);
                  } catch {
                    /* ignore */
                  }
                }}
                placeholder="your name"
                autoComplete="given-name"
                className="min-w-0 flex-1 border-b border-dashed bg-transparent pb-0.5 font-hand text-[1.3rem] outline-none placeholder:opacity-40 focus:border-solid"
                style={{ color: PEN, borderColor: PEN }}
              />
            </label>

            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 flex items-center gap-4 rounded-full bg-[#c21f32] py-2.5 pl-2.5 pr-6 font-medium text-white shadow-[0_12px_24px_-12px_rgb(194_31_50/0.8)] transition-transform hover:-translate-y-0.5"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#7a2a38,#42141e)] text-[#e1d6c3] shadow-[inset_0_-3px_6px_rgb(0_0_0/0.35)] transition-transform group-hover:rotate-12">
                <BrandFigure className="h-7" />
              </span>
              Seal it &amp; send on WhatsApp
            </a>
            <div className="mt-4 flex items-center justify-between font-sans text-sm text-[#6b6064]">
              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(message);
                    setCopy("done");
                    window.setTimeout(() => setCopy("idle"), 2000);
                  } catch {
                    setCopy("failed");
                  }
                }}
                className="underline-offset-4 hover:underline"
              >
                {copy === "done" ? "Copied ✓" : "Copy the chithi"}
              </button>
              <button
                type="button"
                onClick={emptyPotli}
                className="underline-offset-4 hover:text-[#c21f32] hover:underline"
              >
                Empty the potli
              </button>
            </div>
            {copy === "failed" && (
              <pre className="mt-3 max-h-40 select-all overflow-auto whitespace-pre-wrap rounded bg-black/5 p-3 font-sans text-xs text-[#5b5256]">
                {message}
              </pre>
            )}
          </>
        )}
      </div>
    </dialog>
  );
}
