import { collections } from "@/data/catalog";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/format";
import { Kalka, LogoMarkCream } from "./brand";
import { ArrowUpRightIcon, InstagramIcon, WhatsAppIcon } from "./icons";

/**
 * The pallu: every saree ends with its richest part, so the page does too.
 * It wears the logo's maroon and cream, and looks the same in light and dark.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer id="visit" className="relative isolate overflow-hidden bg-maroon text-[#efe6d6]">
      {/* woven top border */}
      <div
        className="h-16 border-b-4 border-sindoor bg-maroon-deep"
        style={{
          backgroundImage:
            "linear-gradient(#e8c56d,#e8c56d),linear-gradient(#e8c56d,#e8c56d),url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='40'%3E%3Cpath d='M0 40 12 14l12 26Z' fill='%23e8c56d' fill-opacity='.7'/%3E%3Cpath d='M12 4c3 3 4 6 1 9-2 2-4 0-3-3 1-2 2-3 2-6Z' fill='%23e8c56d' fill-opacity='.8'/%3E%3C/svg%3E\")",
          backgroundPosition: "0 6px, 0 calc(100% - 6px), 0 12px",
          backgroundRepeat: "no-repeat, no-repeat, repeat-x",
          backgroundSize: "100% 1.5px, 100% 1.5px, 24px 40px",
        }}
        aria-hidden="true"
      />

      {/* faint butti all over the pallu */}
      <div
        className="pointer-events-none absolute inset-0 top-16 -z-10 opacity-[0.045]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56'%3E%3Cpath d='M18 40c-7 0-10-5-9-10s5-6 9-9 5-6 4-9c5 3 8 8 8 14 0 8-5 14-12 14Z' fill='%23fff'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[84rem] px-4 pb-10 pt-20 sm:px-8">
        <p className="font-hand text-lg text-[#f3d98f]">
          every saree ends with its prettiest part, the pallu. so does this page.
        </p>
        <div className="mt-6 grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr] lg:items-end">
          <div>
            <LogoMarkCream className="h-auto w-44 sm:w-52" />
            <p className="mt-8 max-w-md text-[1.02rem] leading-relaxed text-[#efe6d6]/80">{site.description}</p>
          </div>

          <div>
            <p className="label text-[#e8c56d]">Come say hello</p>
            <p className="mt-4 font-display text-2xl italic">{site.visit.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#efe6d6]/75">{site.visit.note}</p>
            <ul className="mt-5 space-y-1 text-sm">
              {site.visit.hours.map((h) => (
                <li key={h.days} className="flex gap-4">
                  <span className="w-24 text-[#efe6d6]">{h.days}</span>
                  <span className="text-[#efe6d6]/75">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <p className="label text-[#e8c56d]">Talk to us</p>
            <a
              href={whatsappLink(`Hi ${site.name}! I'd love to know more about Angika.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between border-b border-[#efe6d6]/25 py-3 transition-colors hover:border-[#f3d98f]"
            >
              <span className="flex items-center gap-3">
                <WhatsAppIcon size={20} />
                <span className="font-display text-xl">WhatsApp</span>
              </span>
              <ArrowUpRightIcon
                size={18}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between border-b border-[#efe6d6]/25 py-3 transition-colors hover:border-[#f3d98f]"
            >
              <span className="flex items-center gap-3">
                <InstagramIcon size={20} />
                <span className="font-display text-xl">{site.instagram.handle}</span>
              </span>
              <ArrowUpRightIcon
                size={18}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-8 border-t border-[#e8c56d]/40 pt-8 sm:flex-row sm:items-end">
          <div className="flex items-end gap-4">
            <span className="font-hand text-lg text-[#efe6d6]/80">with love,</span>
            <span className="font-sign text-6xl leading-[0.6] text-[#efe6d6]">Angika</span>
          </div>
          <nav aria-label="Rooms" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#efe6d6]/80">
            {collections.map((c) => (
              <a
                key={c.id}
                href={`#${c.id === "twirl" ? "rail" : c.id === "handmade" ? "shelves" : "trunk"}`}
                className="hover:text-[#f3d98f]"
              >
                {c.title}
              </a>
            ))}
            <a href="#khata" className="hover:text-[#f3d98f]">
              Lal Khata
            </a>
          </nav>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-xs text-[#efe6d6]/55">
          <p>
            © {year} {site.name}. Every price in Indian rupees.
          </p>
          <p className="flex items-center gap-2">
            <Kalka className="h-4 w-3.5 text-[#e8c56d]" filled /> Photography courtesy of Unsplash contributors.
          </p>
        </div>
      </div>
    </footer>
  );
}
