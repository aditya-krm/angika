"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { productById, type Product } from "@/data/catalog";

/**
 * The visitor's potli (a little drawstring pouch) of saved pieces, plus which piece is
 * open in the trial room. Everything is kept on the visitor's own device.
 */
/** What the visitor picked for a piece: a size (or scent…) and a colour. */
export type Choice = { option?: string; colour?: string };

type Shop = {
  potli: Product[];
  choices: Record<string, Choice>;
  inPotli: (id: string) => boolean;
  togglePotli: (id: string) => void;
  setChoice: (id: string, patch: Choice) => void;
  emptyPotli: () => void;
  bump: number;
  activeProduct: Product | null;
  openProduct: (id: string) => void;
  closeProduct: () => void;
  chithiOpen: boolean;
  setChithiOpen: (open: boolean) => void;
};

const ShopContext = createContext<Shop | null>(null);
const KEY = "angika:potli";

type Saved = { ids: string[]; choices: Record<string, Choice> };

function read(): Saved {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as Partial<Saved>) : {};
    const ids = Array.isArray(parsed.ids) ? parsed.ids.filter((id) => typeof id === "string" && id in productById) : [];
    const choices: Record<string, Choice> = {};
    if (parsed.choices && typeof parsed.choices === "object") {
      for (const [id, value] of Object.entries(parsed.choices as Record<string, unknown>)) {
        // Earlier versions saved just the size as a string.
        if (typeof value === "string") choices[id] = { option: value };
        else if (value && typeof value === "object") choices[id] = value as Choice;
      }
    }
    return { ids, choices };
  } catch {
    return { ids: [], choices: {} };
  }
}

function write(saved: Saved) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(saved));
  } catch {
    /* private mode: the potli lasts for this visit only */
  }
}

function idFromHash(): string | null {
  const m = window.location.hash.match(/^#piece-([a-z0-9-]+)$/);
  return m && m[1] in productById ? m[1] : null;
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<Saved>({ ids: [], choices: {} });
  const [activeId, setActiveId] = useState<string | null>(null);
  const [chithiOpen, setChithiOpen] = useState(false);
  const [bump, setBump] = useState(0);
  const savedRef = useRef(saved);
  useEffect(() => {
    savedRef.current = saved;
  }, [saved]);

  useEffect(() => {
    const stored = read();
    const fromHash = idFromHash();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restore browser-only state after hydration
    if (stored.ids.length) setSaved(stored);
    if (fromHash) setActiveId(fromHash);
    const onHash = () => setActiveId(idFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const update = useCallback((fn: (s: Saved) => Saved) => {
    setSaved((prev) => {
      const next = fn(prev);
      write(next);
      return next;
    });
  }, []);

  const togglePotli = useCallback(
    (id: string) => {
      const adding = !savedRef.current.ids.includes(id);
      update((s) =>
        s.ids.includes(id) ? { ...s, ids: s.ids.filter((x) => x !== id) } : { ...s, ids: [...s.ids, id] },
      );
      // bump is read by the potli button to play its little hop
      if (adding) setBump((n) => n + 1);
    },
    [update],
  );

  const setChoice = useCallback(
    (id: string, patch: Choice) =>
      update((s) => ({ ...s, choices: { ...s.choices, [id]: { ...s.choices[id], ...patch } } })),
    [update],
  );

  const emptyPotli = useCallback(() => update(() => ({ ids: [], choices: {} })), [update]);

  const openProduct = useCallback((id: string) => {
    setActiveId(id);
    try {
      window.history.replaceState(null, "", `#piece-${id}`);
    } catch {
      /* sandboxed frames may refuse */
    }
  }, []);

  const closeProduct = useCallback(() => {
    setActiveId(null);
    try {
      if (window.location.hash.startsWith("#piece-")) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<Shop>(() => {
    const set = new Set(saved.ids);
    return {
      potli: saved.ids.map((id) => productById[id]).filter(Boolean),
      choices: saved.choices,
      inPotli: (id) => set.has(id),
      togglePotli,
      setChoice,
      emptyPotli,
      bump,
      activeProduct: activeId ? (productById[activeId] ?? null) : null,
      openProduct,
      closeProduct,
      chithiOpen,
      setChithiOpen,
    };
  }, [saved, activeId, chithiOpen, bump, togglePotli, setChoice, emptyPotli, openProduct, closeProduct]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop(): Shop {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside <ShopProvider>");
  return ctx;
}
