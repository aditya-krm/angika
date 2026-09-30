"use client";

import { useEffect, useState } from "react";
import { cx } from "@/lib/format";
import { Paar, Wordmark } from "./brand";
import { MoonIcon, SunIcon } from "./icons";

const ROOMS = [
  { href: "#rail", label: "The Rail" },
  { href: "#shelves", label: "The Shelves" },
  { href: "#trunk", label: "The Trunk" },
  { href: "#khata", label: "Lal Khata" },
];

function useEffectiveTheme() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const read = () => {
      const explicit = document.documentElement.dataset.theme;
      setTheme(explicit === "dark" || explicit === "light" ? explicit : media.matches ? "dark" : "light");
    };
    read();
    media.addEventListener("change", read);
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => {
      media.removeEventListener("change", read);
      observer.disconnect();
    };
  }, []);
  return theme;
}

function ThemeToggle() {
  const theme = useEffectiveTheme();
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={() => {
        document.documentElement.dataset.theme = next;
        try {
          window.localStorage.setItem("angika:theme", next);
        } catch {
          /* ignore */
        }
      }}
      className="grid h-10 w-10 place-items-center rounded-full text-kajal-soft transition-colors hover:bg-tant-2 hover:text-kajal"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Lights on" : "Lights off"}
    >
      {theme === "dark" ? <SunIcon size={19} /> : <MoonIcon size={18} />}
    </button>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* The lal paar runs down both sides of the page on wide screens, like the border of a saree. */}
      <div className="paar-v fixed inset-y-0 left-0 z-50 hidden 2xl:block" aria-hidden="true" />
      <div className="paar-v fixed inset-y-0 right-0 z-50 hidden 2xl:block" aria-hidden="true" />

      <header className="sticky top-0 z-40 pt-[env(safe-area-inset-top,0px)]">
        <Paar />
        <div
          className={cx(
            "border-b transition-[background-color,border-color] duration-500",
            scrolled ? "border-line bg-tant/92 backdrop-blur-md" : "border-transparent bg-tant/0",
          )}
        >
          <div className="mx-auto flex h-16 max-w-[84rem] items-center justify-between gap-6 px-4 sm:px-8">
            <a href="#top" className="flex items-end gap-2" aria-label="Angika, back to the top">
              <Wordmark />
              <span className="font-bn-display mb-0.5 hidden text-sm text-sindoor sm:inline" lang="bn">
                অঙ্গিকা
              </span>
            </a>
            <nav aria-label="Rooms" className="hidden items-center gap-8 lg:flex">
              {ROOMS.map((r) => (
                <a
                  key={r.href}
                  href={r.href}
                  className="label group relative py-2 text-kajal-soft transition-colors hover:text-sindoor"
                >
                  {r.label}
                  <span className="stitch absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 text-sindoor transition-transform duration-500 group-hover:scale-x-100" />
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <a
                href="#khata"
                className="label hidden rounded-full border border-kajal/15 px-4 py-2.5 text-kajal transition-colors hover:border-sindoor hover:bg-sindoor hover:text-white sm:inline-block"
              >
                Price book
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
