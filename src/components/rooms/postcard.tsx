import { Kalka } from "../brand";

const PEN = "#27459a";

const STEPS = [
  "Put the pieces you love in your potli. Tap the little pouch on anything, or tick it in the lal khata.",
  "Write us a chithi. One tap sends your list, with sizes, colours and prices, to our WhatsApp.",
  "We reply with what's available, help you pick the right size and colour, and sort out how it reaches you.",
];

function Stamp() {
  return (
    <div
      className="relative h-32 w-[6.5rem] rotate-[4deg] bg-[#fbf7ef] p-2 shadow-[0_2px_6px_rgb(0_0_0/0.18)]"
      style={{
        WebkitMask: "radial-gradient(circle at 5px 5px, transparent 2.6px, #000 3px) -5px -5px / 10px 10px",
        mask: "radial-gradient(circle at 5px 5px, transparent 2.6px, #000 3px) -5px -5px / 10px 10px",
      }}
      aria-hidden="true"
    >
      <div className="relative flex h-full flex-col items-center justify-between bg-[#c21f32] px-1 py-2 text-[#fbf1dc]">
        <span className="text-[0.5rem] font-semibold uppercase tracking-[0.2em]">Angika</span>
        <Kalka className="h-12 w-10 text-[#f2c15b]" />
        <span className="font-display text-sm italic">₹5</span>
      </div>
    </div>
  );
}

function Postmark() {
  return (
    <svg
      viewBox="0 0 140 90"
      className="pointer-events-none absolute -left-16 top-4 w-36 -rotate-12 opacity-60"
      aria-hidden="true"
    >
      <circle cx="45" cy="45" r="36" fill="none" stroke="#3b3b4f" strokeWidth="2" />
      <circle cx="45" cy="45" r="27" fill="none" stroke="#3b3b4f" strokeWidth="1" />
      <path id="pm-arc" d="M17 45a28 28 0 0 1 56 0" fill="none" />
      <text fontSize="9" fill="#3b3b4f" letterSpacing="2">
        <textPath href="#pm-arc" startOffset="8%">
          WITH LOVE
        </textPath>
      </text>
      <text x="45" y="52" fontSize="11" textAnchor="middle" fill="#3b3b4f" fontWeight="600">
        ANGIKA
      </text>
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M84 ${28 + i * 11}q9-6 18 0t18 0t18 0`} fill="none" stroke="#3b3b4f" strokeWidth="1.8" />
      ))}
    </svg>
  );
}

export function Postcard() {
  return (
    <section aria-labelledby="how-title" className="relative overflow-x-clip py-24 sm:py-32">
      <div className="mx-auto max-w-[84rem] px-4 sm:px-8">
        <p className="label text-center text-sindoor">How the almirah works</p>
        <h2
          id="how-title"
          className="mt-4 text-center font-display text-[clamp(2.6rem,5.5vw,4.6rem)] leading-[0.95] tracking-[-0.02em] text-kajal"
        >
          No cart. No checkout. <span className="italic text-sindoor">Just a chithi.</span>
        </h2>

        <div className="relative mx-auto mt-16 max-w-5xl -rotate-[1.2deg] rounded-[4px] bg-[#fbf7ef] p-6 shadow-[0_40px_60px_-30px_rgb(0_0_0/0.35),0_2px_4px_rgb(0_0_0/0.08)] sm:p-10">
          <div className="grid gap-10 md:grid-cols-[1.25fr_1px_1fr] md:gap-10">
            <div className="font-hand text-[1.15rem] leading-[1.7]" style={{ color: PEN }}>
              <p className="text-2xl">Dear you,</p>
              <p className="mt-3">Here&rsquo;s how it works:</p>
              <ol className="mt-3 space-y-3">
                {STEPS.map((s, i) => (
                  <li key={i} className="grid grid-cols-[1.6rem_1fr]">
                    <span className="font-bold">{i + 1}.</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-5">That&rsquo;s it! Nothing is ever charged on this website.</p>
              <p className="mt-4">Love,</p>
              <p className="font-sign -mt-1 text-6xl leading-none text-[#1e1a1d]">Angika</p>
            </div>
            <div className="hidden bg-[#d9d2c4] md:block" />
            <div className="relative flex flex-col">
              <div className="flex justify-end">
                <div className="relative">
                  <Postmark />
                  <Stamp />
                </div>
              </div>
              <div className="mt-10 space-y-0 font-hand text-[1.2rem]" style={{ color: PEN }}>
                {["To,", "Someone who loves", "pretty things,", "wherever you are ♡"].map((line, i) => (
                  <p key={i} className="flex h-11 items-end border-b border-[#cfc6b6] pb-1">
                    {line}
                  </p>
                ))}
              </div>
              <p className="mt-6 text-right font-sans text-[0.6rem] uppercase tracking-[0.3em] text-[#9a8f84]">
                Post card
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
