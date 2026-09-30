import { site } from "@/data/site";

/** A tailor's measuring tape laid across the page, printed with the shop's little promises. */
export function Tape() {
  const notes = [...site.tape, ...site.tape];
  return (
    <div className="relative -my-2 overflow-hidden py-6" aria-label="Shop notes">
      <div className="tape relative -mx-4 -rotate-[1.4deg] shadow-[0_8px_18px_-10px_rgb(0_0_0/0.45)]">
        <ul className="tape-roll flex w-max items-center gap-10 whitespace-nowrap px-6 pb-2.5 pt-4">
          {notes.map((n, i) => (
            <li
              key={i}
              aria-hidden={i >= site.tape.length ? true : undefined}
              className="flex items-center gap-10 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#2a2320] [font-stretch:115%]"
            >
              {n}
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-[#2a2320]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <circle cx="6" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <path d="M8.5 7.5 20 17M8.5 16.5 20 7" strokeLinecap="round" />
              </svg>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
