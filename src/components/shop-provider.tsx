"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { productById, type Product } from "@/data/catalog";

/**
 * The visitor's potli (a little drawstring pouch) of saved pieces, plus which piece is
 * open in the trial room. Everything is kept on the visitor's own device.
 */
type Shop = {
  potli: Product[];
  choices: Record<string, string>;
  inPotli: (id: string) => boolean;
  togglePotli: (id: string, choice?: string) => void;
  setChoice: (id: string, choice: string | undefined) => void;
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

type Saved = { ids: string[]; choices: Record<string, string> };

function read(): Saved {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as Partial<Saved>) : {};
    const ids = Array.isArray(parsed.ids) ? parsed.ids.filter((id) => typeof id === "string" && id in productById) : [];
    const choices = parsed.choices && typeof parsed.choices === "object" ? parsed.choices : {};
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
    (id: string, choice?: string) => {
      const adding = !savedRef.current.ids.includes(id);
      update((s) => {
        if (s.ids.includes(id)) return { ...s, ids: s.ids.filter((x) => x !== id) };
        return { ids: [...s.ids, id], choices: choice ? { ...s.choices, [id]: choice } : s.choices };
      });
      // bump is read by the potli button to play its little hop
      if (adding) setBump((n) => n + 1);
    },
    [update],
  );

  const setChoice = useCallback(
    (id: string, choice: string | undefined) =>
      update((s) => {
        const choices = { ...s.choices };
        if (choice) choices[id] = choice;
        else delete choices[id];
        return { ...s, choices };
      }),
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
