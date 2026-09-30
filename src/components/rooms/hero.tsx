import { productById, products } from "@/data/catalog";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/format";
import { FoldedCloth } from "../art/fabric";
import { GarmentArt } from "../art/garment-art";
import { ObjectArt } from "../art/object-art";
import { HandArrow, Kalka, Scribble } from "../brand";
import { WhatsAppIcon } from "../icons";
import { Price } from "../price";
import { GarmentOnHanger } from "./hanger";

const lowest = Math.min(...products.map((p) => p.price));

const RAIL = ["haldi-hues-lehenga", "tota-pakhi-saree", "mishti-doi-kurta-set"].map((id) => productById[id]);
const SHELF_TOP = ["jhum-jhum-jhumkas", "chandni-drops"].map((id) => productById[id]);
const SHELF_MID = ["maati-ki-khushboo-vases"].map((id) => productById[id]);
const SHELF_LOW = ["glow-gossip-candles", "mayur-madhubani"].map((id) => productById[id]);
const DRAWER = ["lal-paar-kalka-saree", "aam-kalka-dupatta", "raater-kalka-shawl", "shiuli-bela-saree"].map(
  (id) => productById[id],
);

function RoomTag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`kraft-tag pointer-events-none absolute z-20 whitespace-nowrap py-1 pl-6 pr-2.5 font-hand text-[0.8rem] leading-none shadow-sm sm:text-sm ${className ?? ""}`}
    >
      {children}
    </span>
  );
}

/** Painted door front: sindoor lacquer, zari border, a big kalka. */
function DoorFront({ side }: { side: "l" | "r" }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[3px] bg-[#c21f32] [backface-visibility:hidden]">
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgb(255_255_255/0.14),transparent_35%,rgb(0_0_0/0.12))]" />
      <div className="absolute inset-[7%] rounded-[2px] border border-[#e8c56d]/70" />
      <div className="absolute inset-[10%] rounded-[2px] border border-[#e8c56d]/35" />
      <Kalka
        className={`absolute left-1/2 top-1/2 h-[42%] w-[62%] -translate-x-1/2 -translate-y-1/2 text-[#e8c56d] ${side === "r" ? "-scale-x-100" : ""}`}
        strokeWidth={1.1}
      />
      <Kalka className="absolute left-1/2 top-[13%] h-[8%] w-[16%] -translate-x-1/2 text-[#e8c56d]/80" filled />
      <Kalka
        className="absolute bottom-[13%] left-1/2 h-[8%] w-[16%] -translate-x-1/2 rotate-180 text-[#e8c56d]/80"
        filled
      />
      <span
        className={`absolute top-1/2 h-[9%] w-[7%] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff3c4,#c9a24f_45%,#7d5a1c)] shadow ${side === "l" ? "right-[5%]" : "left-[5%]"}`}
      />
    </div>
  );
}

function DoorBack({ side }: { side: "l" | "r" }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[3px] bg-[#6d1522] [backface-visibility:hidden] [transform:rotateY(180deg)]">
      <div className="absolute inset-[6%] rounded-[2px] bg-tant-2">
        {side === "l" ? (
          <div className="absolute inset-x-[14%] top-[10%] bottom-[22%] rounded-[50%] bg-[linear-gradient(135deg,#eef2f4,#b7c1c8_42%,#f6f8fa_58%,#a9b3ba)] shadow-inner" />
        ) : (
          <div className="absolute inset-x-[12%] top-[12%] bottom-[18%] bg-[#fffdf8] shadow">
            <GarmentArt
              product={productById["haldi-hues-lehenga"]}
              uid="door"
              className="h-full w-full p-2 opacity-60 grayscale"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function Almirah() {
  return (
    <div className="relative mx-auto w-full max-w-[36rem] px-[13%] pb-6 pt-10">
      {/* crown */}
      <svg viewBox="0 0 400 60" className="relative z-10 -mb-px block w-full" aria-hidden="true" focusable="false">
        <path d="M6 60V40h14c30-20 90-30 180-38 90 8 150 18 180 38h14v20Z" fill="#8f1426" />
        <path d="M22 48c34-18 98-28 178-34 80 6 144 16 178 34" stroke="#e8c56d" strokeOpacity=".75" fill="none" />
        <path d="M200 12c-8 8-10 14-4 20 4 4 10 2 10-4 0-6-6-10-6-16Z" fill="#e8c56d" />
        <rect x="0" y="52" width="400" height="8" fill="#6d1522" />
      </svg>

      {/* body */}
      <div className="relative rounded-b-[4px] bg-[#8f1426] p-[4.5%] shadow-[0_40px_70px_-40px_rgb(var(--shadow)/0.7)]">
        <div className="absolute inset-0 rounded-b-[4px] bg-[linear-gradient(90deg,rgb(0_0_0/0.2),transparent_12%,transparent_88%,rgb(0_0_0/0.2))]" />
        <div className="relative [perspective:1600px]">
          {/* upper cupboard */}
          <div className="relative grid aspect-[4/4.1] grid-cols-2 bg-[#efe6d8] shadow-[inset_0_10px_30px_rgb(60_30_20/0.35)] dark:bg-[#2b2224]">
            {/* rail compartment */}
            <a
              href="#rail"
              className="group relative block border-r-[6px] border-[#b58a57]"
              aria-label="Go to The Rail: dresses and sarees"
            >
              <span className="absolute inset-x-[6%] top-[9%] h-[5px] rounded-full bg-[linear-gradient(#f3d98f,#b8913e)] shadow" />
              <div className="absolute inset-x-[2%] top-[7.5%] flex justify-center">
                {RAIL.map((p, i) => (
                  <div
                    key={p.id}
                    className="w-[56%] shrink-0 origin-top transition-transform duration-700 group-hover:rotate-[4deg]"
                    style={{ marginLeft: i ? "-34%" : 0, transform: `rotate(${[-3, 2, -1][i]}deg)`, zIndex: 3 - i }}
                  >
                    <GarmentOnHanger product={p} uid="hero" sizes="160px" priority label={false} />
                  </div>
                ))}
              </div>
              {/* a pair of embroidered juttis on the cupboard floor */}
              <svg viewBox="0 0 120 40" className="absolute bottom-[3%] right-[8%] w-[44%]" aria-hidden="true">
                {[0, 52].map((x) => (
                  <g key={x} transform={`translate(${x} 0)`}>
                    <path d="M4 34c0-8 10-14 22-16 10-2 20 0 30 6 6 4 6 10 0 10Z" fill="#8f1426" />
                    <path
                      d="M26 18c6 6 14 10 26 12"
                      stroke="#e8c56d"
                      strokeWidth="1.4"
                      fill="none"
                      strokeDasharray="2 2"
                    />
                    <circle cx="18" cy="26" r="2.2" fill="#e8c56d" />
                    <path d="M4 34h52" stroke="#5a0d17" strokeWidth="2.4" />
                  </g>
                ))}
              </svg>
              <RoomTag className="bottom-[16%] left-[8%] rotate-[-4deg]">the rail →</RoomTag>
            </a>

            {/* shelves compartment */}
            <a
              href="#shelves"
              className="group relative grid grid-rows-3"
              aria-label="Go to The Shelves: handcrafted art"
            >
              {[SHELF_TOP, SHELF_MID, SHELF_LOW].map((row, r) => (
                <div
                  key={r}
                  className="relative flex items-end justify-center gap-[4%] border-b-[6px] border-[#b58a57] px-[6%]"
                >
                  {row.map((p) => (
                    <ObjectArt
                      key={p.id}
                      product={p}
                      uid="hero"
                      className="h-[94%] w-auto max-w-[52%] transition-transform duration-500 group-hover:-translate-y-1"
                    />
                  ))}
                </div>
              ))}
              <RoomTag className="right-[8%] top-[29%] rotate-[5deg]">the shelves →</RoomTag>
            </a>

            {/* doors */}
            <div className="door-l absolute inset-y-0 left-0 w-1/2 [transform-style:preserve-3d]" aria-hidden="true">
              <DoorFront side="l" />
              <DoorBack side="l" />
            </div>
            <div className="door-r absolute inset-y-0 right-0 w-1/2 [transform-style:preserve-3d]" aria-hidden="true">
              <DoorFront side="r" />
              <DoorBack side="r" />
            </div>
          </div>

          {/* drawer, pulled open */}
          <a href="#trunk" className="group relative mt-[3%] block" aria-label="Go to The Trunk: kalka textiles">
            <div className="relative mx-[3%] flex flex-col-reverse gap-[2px] bg-[#e7dccb] px-[5%] pt-[3%] shadow-[inset_0_8px_16px_rgb(60_30_20/0.3)] dark:bg-[#2b2224]">
              {DRAWER.map((p, i) => (
                <FoldedCloth
                  key={p.id}
                  product={p}
                  uid="hero"
                  className="h-[1.1rem] w-full sm:h-6"
                  style={{ transform: `translateX(${[0, 6, -4, 3][i]}px) rotate(${[0.4, -0.5, 0.3, -0.2][i]}deg)` }}
                />
              ))}
            </div>
            <div className="relative flex h-10 items-center justify-center rounded-[2px] bg-[#c21f32] shadow-[0_10px_18px_-10px_rgb(0_0_0/0.6)] sm:h-14">
              <div className="absolute inset-[10%_3%] rounded-[2px] border border-[#e8c56d]/60" />
              <span className="h-2.5 w-14 rounded-full bg-[linear-gradient(#f6dd97,#b8913e)] shadow" />
            </div>
            <RoomTag className="-bottom-3 right-[6%] rotate-[-3deg]">the trunk →</RoomTag>
          </a>
        </div>
      </div>
      {/* feet */}
      <div className="flex justify-between px-[6%]" aria-hidden="true">
        <span className="h-4 w-8 rounded-b-md bg-[#6d1522]" />
        <span className="h-4 w-8 rounded-b-md bg-[#6d1522]" />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-x-clip">
      <div className="mx-auto grid max-w-[84rem] items-center gap-6 px-4 pb-16 pt-8 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-4 lg:pb-24 lg:pt-10">
        <div className="relative z-10 max-w-[38rem]">
          <p className="rise label flex items-center gap-3 text-sindoor">
            <span className="h-px w-10 bg-sindoor" />
            Angika · boutique &amp; atelier
          </p>

          <h1 className="rise mt-6 font-display text-[clamp(3.1rem,7.2vw,6.6rem)] font-normal leading-[0.94] tracking-[-0.02em] text-kajal [animation-delay:80ms]">
            Come, peek
            <br />
            inside the{" "}
            <span className="relative inline-block italic text-sindoor">
              almirah.
              <Scribble className="absolute -bottom-2 left-0 h-3 w-full text-sindoor/40" />
            </span>
          </h1>

          <p className="rise mt-4 font-bn-display text-2xl text-kajal-faint [animation-delay:140ms]" lang="bn">
            আলমারি খুলে দেখো
          </p>

          <p className="rise mt-7 max-w-[31rem] text-[1.05rem] leading-[1.75] text-kajal-soft [animation-delay:200ms]">
            Every Bengali home has one: the tall almirah where the good sarees live, folded with neem leaves and
            stories. This is ours. A rail of dresses, shelves of handmade things and a trunk full of kalka, each with
            its price tag in rupees. There&rsquo;s no checkout here; just tell us what you love.
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-3 [animation-delay:260ms]">
            <a
              href="#rail"
              className="group inline-flex items-center gap-3 rounded-full bg-kajal py-3.5 pl-6 pr-4 text-[0.95rem] font-medium text-tant transition-colors hover:bg-sindoor"
            >
              Open the almirah
              <span className="grid h-7 w-7 place-items-center rounded-full bg-tant/15 transition-transform group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
            <a
              href={whatsappLink(`Hi ${site.name}! I just peeked inside the almirah and I'd love to know more.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-3.5 text-[0.95rem] text-kajal underline decoration-kajal/20 underline-offset-[6px] transition-colors hover:text-sobuj hover:decoration-sobuj"
            >
              <WhatsAppIcon size={18} />
              Say hello on WhatsApp
            </a>
          </div>

          <p className="rise mt-12 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm text-kajal-soft [animation-delay:320ms]">
            <span className="tabular font-display text-3xl text-kajal">{products.length}</span> pieces ·
            <span className="tabular font-display text-3xl text-kajal">3</span> rooms · from
            <Price value={lowest} className="font-display text-3xl text-kajal" />
          </p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -left-2 top-4 z-20 hidden w-44 -rotate-6 lg:block xl:-left-6">
            <p className="font-hand text-lg leading-snug text-pen">everything inside has a little price tag</p>
            <HandArrow variant="curl" className="ml-8 mt-1 w-28 rotate-[18deg]" />
          </div>
          <Almirah />
        </div>
      </div>
    </section>
  );
}
