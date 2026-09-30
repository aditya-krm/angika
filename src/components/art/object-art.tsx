import type { Product } from "@/data/catalog";
import { FabricPattern, INK, ZARI, mix } from "./fabric";

/**
 * Little still-lifes for the shelves. Everything stands on a baseline at y = 196
 * so a row of them sits on the same plank.
 */

export type ObjectKind =
  | "jhumka"
  | "drops"
  | "mala"
  | "bangles"
  | "vases"
  | "pot"
  | "bowls"
  | "macrame"
  | "planter"
  | "jar-candles"
  | "pillars"
  | "painting"
  | "madhubani"
  | "hoop"
  | "tote"
  | "basket"
  | "rug"
  | "cushion";

const BY_ID: Record<string, ObjectKind> = {
  "jhum-jhum-jhumkas": "jhumka",
  "chandni-drops": "drops",
  "rainbow-mala-beads": "mala",
  "bangle-bazaar-stack": "bangles",
  "maati-ki-khushboo-vases": "vases",
  "kulhad-cutie-pot": "pot",
  "little-clay-garden-bowls": "bowls",
  "knotty-but-nice-macrame": "macrame",
  "hang-loose-plant-hanger": "planter",
  "glow-gossip-candles": "jar-candles",
  "moonlit-pillar-trio": "pillars",
  "pastel-posy-painting": "painting",
  "mayur-madhubani": "madhubani",
  "kamal-kamdhenu-madhubani": "madhubani",
  "hoop-dreams-embroidery": "hoop",
  "tote-ally-yours": "tote",
  "basket-case-weaves": "basket",
  "cosy-crochet-rugs": "rug",
  "birdsong-cushion-covers": "cushion",
};

const BY_TYPE: Partial<Record<Product["type"], ObjectKind>> = {
  jewellery: "jhumka",
  pottery: "vases",
  decor: "macrame",
  candle: "pillars",
  art: "painting",
  textile: "cushion",
  bag: "tote",
};

export function objectKindOf(p: Pick<Product, "id" | "type">): ObjectKind {
  return BY_ID[p.id] ?? BY_TYPE[p.type] ?? "vases";
}

/** How much shelf room each object wants, as a relative width. */
export function shelfWidth(kind: ObjectKind): "s" | "m" | "l" {
  if (kind === "painting" || kind === "madhubani" || kind === "macrame" || kind === "cushion") return "l";
  if (kind === "drops" || kind === "pot" || kind === "hoop") return "s";
  return "m";
}

const Flame = ({ x, y }: { x: number; y: number }) => (
  <g>
    <ellipse cx={x} cy={y - 6} rx="9" ry="12" fill="#ffd27a" opacity=".25" />
    <path d={`M${x} ${y - 16}c5 6 6 10 0 14-6-4-5-8 0-14Z`} fill="#f6a623" />
    <path d={`M${x} ${y - 10}c2 3 2 5 0 6-2-1-2-3 0-6Z`} fill="#fff3c4" />
    <path d={`M${x} ${y - 2}v4`} stroke={INK} strokeWidth="1.4" />
  </g>
);

export function ObjectArt({
  product,
  uid,
  className,
}: {
  product: Pick<Product, "id" | "type" | "palette">;
  uid: string;
  className?: string;
}) {
  const kind = objectKindOf(product);
  const [a, b, l] = product.palette;
  const id = `o-${uid}-${product.id}`;

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-round`} x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".18" />
          <stop offset=".35" stopColor="#fff" stopOpacity=".22" />
          <stop offset=".7" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".22" />
        </linearGradient>
        <FabricPattern id={`${id}-jaal`} kind="jaal" base={a} motif={b} scale={0.8} />
        <FabricPattern id={`${id}-check`} kind="check" base={l} motif={a} scale={0.7} />
      </defs>

      <ellipse cx="100" cy="196" rx="78" ry="5" fill="#000" opacity=".12" />

      {kind === "jhumka" && (
        <g>
          <path d="M100 56v136M70 194h60" stroke="#8a5f33" strokeWidth="5" strokeLinecap="round" />
          <path d="M46 58h108" stroke="#8a5f33" strokeWidth="5" strokeLinecap="round" />
          {[62, 138].map((x) => (
            <g key={x}>
              <path d={`M${x} 58v16`} stroke={ZARI} strokeWidth="1.6" />
              <circle cx={x} cy={80} r="7" fill={b} stroke={ZARI} strokeWidth="1.5" />
              <path d={`M${x - 24} 128Q${x} 74 ${x + 24} 128Z`} fill={a} />
              <path d={`M${x - 24} 128Q${x} 74 ${x + 24} 128Z`} fill={`url(#${id}-round)`} />
              <path
                d={`M${x - 18} 112q18-10 36 0M${x - 22} 122q22-8 44 0`}
                stroke={ZARI}
                strokeWidth="1.3"
                fill="none"
              />
              {Array.from({ length: 7 }, (_, i) => (
                <g key={i}>
                  <path d={`M${x - 21 + i * 7} 128v8`} stroke={ZARI} strokeWidth="1" />
                  <circle cx={x - 21 + i * 7} cy={139} r="2.6" fill={i % 2 ? b : l} stroke={ZARI} strokeWidth=".6" />
                </g>
              ))}
            </g>
          ))}
        </g>
      )}

      {kind === "drops" && (
        <g>
          <rect x="58" y="50" width="84" height="146" rx="6" fill={mix(b, INK, 0.55)} />
          <rect x="58" y="50" width="84" height="146" rx="6" fill={`url(#${id}-round)`} />
          {[82, 118].map((x) => (
            <g key={x}>
              <circle cx={x} cy="82" r="5" fill={a} stroke="#fff" strokeOpacity=".6" />
              <path d={`M${x} 88v10`} stroke={b} strokeWidth="1.5" />
              <path d={`M${x} 98c10 14 12 26 0 36-12-10-10-22 0-36Z`} fill={a} />
              <path d={`M${x} 104c5 9 6 16 0 22-6-6-5-13 0-22Z`} fill={b} opacity=".85" />
            </g>
          ))}
        </g>
      )}

      {kind === "mala" && (
        <g>
          <path d="M70 196c0-40 8-64 8-96 0-24-4-40-4-56h52c0 16-4 32-4 56 0 32 8 56 8 96Z" fill={l} />
          <path
            d="M70 196c0-40 8-64 8-96 0-24-4-40-4-56h52c0 16-4 32-4 56 0 32 8 56 8 96Z"
            fill={`url(#${id}-round)`}
          />
          {[
            { d: "M76 62q24 44 48 0", c: a },
            { d: "M78 66q22 62 44 0", c: b },
            { d: "M79 70q21 84 42 0", c: mix(a, b, 0.5) },
          ].map((s, i) => (
            <path
              key={i}
              d={s.d}
              fill="none"
              stroke={s.c}
              strokeWidth="6.5"
              strokeLinecap="round"
              strokeDasharray="0.1 8"
            />
          ))}
        </g>
      )}

      {kind === "bangles" && (
        <g>
          <path d="M92 194l6-150h4l6 150Z" fill="#8a5f33" />
          {[a, b, l, a, b, mix(a, b, 0.5)].map((col, i) => (
            <ellipse
              key={i}
              cx="100"
              cy={176 - i * 20}
              rx={34 - i * 1.5}
              ry="9"
              fill="none"
              stroke={col}
              strokeWidth="7"
            />
          ))}
          {[0, 2, 4].map((i) => (
            <ellipse
              key={i}
              cx="100"
              cy={176 - i * 20}
              rx={34 - i * 1.5}
              ry="9"
              fill="none"
              stroke={ZARI}
              strokeWidth="1"
              strokeDasharray="2 3"
            />
          ))}
        </g>
      )}

      {kind === "vases" && (
        <g>
          <path
            d="M60 40c4 30 0 60-6 80M60 40l-6-10M60 40l8-8M58 70l-10-6M56 90l10-8"
            stroke="#c9b690"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
          />
          <ellipse cx="60" cy="34" rx="10" ry="16" fill="#f1ead9" opacity=".9" />
          {[
            { x: 58, w: 30, h: 96 },
            { x: 108, w: 38, h: 72 },
            { x: 150, w: 26, h: 52 },
          ].map((v, i) => (
            <g key={i}>
              <path
                d={`M${v.x - v.w * 0.22} ${196 - v.h}h${v.w * 0.44}v${v.h * 0.12}c${v.w * 0.5} ${v.h * 0.12} ${v.w * 0.5} ${v.h * 0.5} ${v.w * 0.22} ${v.h * 0.88}H${v.x - v.w * 0.44}c${-v.w * 0.28} ${-v.h * 0.38} ${-v.w * 0.28} ${-v.h * 0.76} ${v.w * 0.22} ${-v.h * 0.88}Z`}
                fill={i === 1 ? mix(a, b, 0.25) : a}
              />
              <path
                d={`M${v.x - v.w * 0.22} ${196 - v.h}h${v.w * 0.44}v${v.h * 0.12}c${v.w * 0.5} ${v.h * 0.12} ${v.w * 0.5} ${v.h * 0.5} ${v.w * 0.22} ${v.h * 0.88}H${v.x - v.w * 0.44}c${-v.w * 0.28} ${-v.h * 0.38} ${-v.w * 0.28} ${-v.h * 0.76} ${v.w * 0.22} ${-v.h * 0.88}Z`}
                fill={`url(#${id}-round)`}
              />
            </g>
          ))}
        </g>
      )}

      {kind === "pot" && (
        <g>
          {[-28, -12, 6, 22].map((dx, i) => (
            <path
              key={i}
              d={`M100 118q${dx} -30 ${dx * 1.2} -52q${-dx * 0.4} 20 ${-dx * 1.2} 52`}
              fill={mix("#6f9a5b", "#2f5e3a", i / 4)}
            />
          ))}
          <path d="M62 114h76l-4 14h-68Z" fill={mix(a, INK, 0.15)} />
          <path d="M66 128h68l-10 68H76Z" fill={a} />
          <path d="M66 128h68l-10 68H76Z" fill={`url(#${id}-round)`} />
          <path
            d="M84 150a3 3 0 1 0 .1 0M100 162a3 3 0 1 0 .1 0M116 148a3 3 0 1 0 .1 0"
            stroke={mix(a, INK, 0.3)}
            strokeWidth="1.2"
            fill="none"
          />
        </g>
      )}

      {kind === "bowls" && (
        <g>
          {[
            { x: 50, c: a },
            { x: 100, c: b },
            { x: 150, c: l },
          ].map((bw, i) => (
            <g key={i}>
              <path d={`M${bw.x - 28} 160h56c0 20-12 36-28 36s-28-16-28-36Z`} fill={bw.c} />
              <path d={`M${bw.x - 28} 160h56c0 20-12 36-28 36s-28-16-28-36Z`} fill={`url(#${id}-round)`} />
              <ellipse cx={bw.x} cy="160" rx="28" ry="6" fill={mix(bw.c, INK, 0.2)} />
            </g>
          ))}
          <path d="M72 138h56c0 14-12 24-28 24s-28-10-28-24Z" fill={mix(a, b, 0.5)} />
          <ellipse cx="100" cy="138" rx="28" ry="5" fill={mix(mix(a, b, 0.5), INK, 0.2)} />
        </g>
      )}

      {kind === "macrame" && (
        <g>
          <path d="M40 22h120" stroke="#8a5f33" strokeWidth="7" strokeLinecap="round" />
          <path d="M70 22 100 6l30 16" stroke={mix(a, INK, 0.2)} strokeWidth="1.5" fill="none" />
          {Array.from({ length: 11 }, (_, i) => {
            const x = 50 + i * 10;
            return (
              <path
                key={i}
                d={`M${x} 24q${(5 - i) * 2} 50 ${(100 - x) * 0.45} 96q${(i - 5) * 2} 30 ${(x - 100) * 0.3} 70`}
                stroke={a}
                strokeWidth="3.2"
                fill="none"
                strokeLinecap="round"
              />
            );
          })}
          {[
            [70, 60],
            [100, 60],
            [130, 60],
            [85, 90],
            [115, 90],
            [100, 120],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="6" fill={mix(a, INK, 0.15)} />
          ))}
        </g>
      )}

      {kind === "planter" && (
        <g>
          <circle cx="100" cy="12" r="6" fill="none" stroke="#8a5f33" strokeWidth="3" />
          <path d="M100 18 64 130M100 18l36 112M100 18v112" stroke={mix(l, INK, 0.22)} strokeWidth="2.4" />
          {[-30, -14, 4, 20, 34].map((dx, i) => (
            <path
              key={i}
              d={`M100 128q${dx} -26 ${dx * 1.3} -44q${-dx * 0.2} 22 ${-dx * 1.3} 44`}
              fill={mix(a, "#2f5e3a", i / 6)}
            />
          ))}
          <path d="M68 128h64l-8 44H76Z" fill={mix(b, "#ffffff", 0.2)} />
          <path d="M68 128h64l-8 44H76Z" fill={`url(#${id}-round)`} />
          <path d="M100 172v10M92 182h16" stroke={mix(l, INK, 0.25)} strokeWidth="2" />
        </g>
      )}

      {kind === "jar-candles" && (
        <g>
          {[56, 100, 144].map((x, i) => (
            <g key={x}>
              <rect
                x={x - 20}
                y="128"
                width="40"
                height="68"
                rx="8"
                fill="#ffffff"
                opacity=".45"
                stroke={mix(b, INK, 0.2)}
                strokeOpacity=".4"
              />
              <rect x={x - 17} y="142" width="34" height="50" rx="5" fill={[a, l, b][i]} />
              <rect x={x - 14} y="160" width="28" height="18" rx="2" fill="#dcc39b" />
              <path d={`M${x - 8} 169h16`} stroke="#3f2d1b" strokeWidth="1.3" />
              <Flame x={x} y={142} />
            </g>
          ))}
        </g>
      )}

      {kind === "pillars" && (
        <g>
          <path
            d="M150 196c-6-30 2-60 20-80M158 170l14-6M154 150l-12-4M160 132l12-2"
            stroke="#6f8f69"
            strokeWidth="2"
            fill="none"
          />
          {[
            { x: 60, h: 110 },
            { x: 100, h: 80 },
            { x: 134, h: 56 },
          ].map((p, i) => (
            <g key={i}>
              <rect x={p.x - 16} y={196 - p.h} width="32" height={p.h} rx="4" fill={a} />
              <rect x={p.x - 16} y={196 - p.h} width="32" height={p.h} rx="4" fill={`url(#${id}-round)`} />
              <Flame x={p.x} y={196 - p.h} />
            </g>
          ))}
        </g>
      )}

      {(kind === "painting" || kind === "madhubani") && (
        <g>
          <path d="M60 196 84 40M140 196 116 40M72 150h56" stroke="#8a5f33" strokeWidth="4" strokeLinecap="round" />
          <rect x="34" y="30" width="132" height="128" rx="2" fill="#6b4524" />
          <rect x="40" y="36" width="120" height="116" fill={kind === "madhubani" ? l : "#fbf7ef"} />
          {kind === "painting" ? (
            <g>
              <path d="M84 150h32l-4-34H88Z" fill={mix(b, INK, 0.15)} />
              {[
                [80, 84, a],
                [100, 70, b],
                [120, 88, a],
                [92, 100, l],
                [110, 104, mix(a, b, 0.5)],
              ].map(([x, y, col], i) => (
                <circle
                  key={i}
                  cx={x as number}
                  cy={y as number}
                  r={13 - (i % 2) * 3}
                  fill={col as string}
                  opacity=".85"
                />
              ))}
              <path d="M94 116l-8-18M104 116l2-24M110 116l10-16" stroke={mix(b, INK, 0.3)} strokeWidth="1.2" />
            </g>
          ) : (
            <g>
              <rect x="46" y="42" width="108" height="104" fill="none" stroke={a} strokeWidth="2" />
              <rect
                x="50"
                y="46"
                width="100"
                height="96"
                fill="none"
                stroke={b}
                strokeWidth="1"
                strokeDasharray="3 2"
              />
              <path d="M62 94q38-34 70 0-32 34-70 0Z" fill={a} />
              <path d="M132 94l14-12v24Z" fill={b} />
              <circle cx="76" cy="90" r="4" fill="#fff" stroke={INK} />
              <path d="M84 84q20-10 40 0M84 94h44M84 104q20 10 40 0" stroke={b} strokeWidth="1.4" fill="none" />
              {Array.from({ length: 9 }, (_, i) => (
                <path key={i} d={`M${52 + i * 11} 136l5-8 5 8Z`} fill={b} />
              ))}
            </g>
          )}
        </g>
      )}

      {kind === "hoop" && (
        <g>
          <path d="M92 196l8-24 8 24" stroke="#8a5f33" strokeWidth="4" fill="none" />
          <circle cx="100" cy="106" r="66" fill={l} />
          <circle cx="100" cy="106" r="66" fill="none" stroke="#c49460" strokeWidth="9" />
          <rect x="92" y="30" width="16" height="12" rx="2" fill="#b9975d" />
          <g stroke={b} strokeWidth="2" strokeLinecap="round" fill="none">
            <path d="M100 150V96" stroke="#6f8f69" />
            <path d="M100 124c-14-4-20-12-20-20M100 132c14-4 20-12 20-20" stroke="#6f8f69" />
            {[0, 60, 120, 180, 240, 300].map((r) => (
              <path
                key={r}
                d="M100 90q6-12 0-22-6 10 0 22Z"
                transform={`rotate(${r} 100 90)`}
                fill={b}
                fillOpacity=".4"
              />
            ))}
          </g>
          <circle cx="100" cy="90" r="4" fill={a} />
        </g>
      )}

      {kind === "tote" && (
        <g>
          <path d="M76 70c0-34 48-34 48 0" stroke={mix(a, INK, 0.2)} strokeWidth="6" fill="none" />
          <path d="M48 70h104l6 126H42Z" fill={a} />
          <path d="M48 70h104l6 126H42Z" fill={`url(#${id}-round)`} />
          <path
            d="M100 172c-16 0-24-12-21-24 3-12 15-15 21-20 6-5 8-11 7-17 10 7 16 18 16 30 0 17-10 31-23 31Z"
            fill={b}
            opacity=".9"
          />
          <circle cx="98" cy="154" r="5" fill={a} />
        </g>
      )}

      {kind === "basket" && (
        <g>
          <path d="M60 96c0-40 80-40 80 0" stroke={mix(a, INK, 0.3)} strokeWidth="6" fill="none" />
          <path d="M36 96h128l-14 100H50Z" fill={a} />
          {Array.from({ length: 6 }, (_, i) => (
            <path
              key={i}
              d={`M${38 + i * 1} ${108 + i * 15}h${124 - i * 3}`}
              stroke={mix(a, INK, 0.28)}
              strokeWidth="2"
            />
          ))}
          {Array.from({ length: 12 }, (_, i) => (
            <path
              key={i}
              d={`M${46 + i * 10} 96l${i < 6 ? 2 : -2} 100`}
              stroke={mix(a, "#ffffff", 0.25)}
              strokeWidth="1.5"
            />
          ))}
          <path d="M36 96h128" stroke={mix(a, INK, 0.35)} strokeWidth="5" />
        </g>
      )}

      {kind === "rug" && (
        <g>
          {[70, 58, 46, 34, 22, 10].map((r, i) => (
            <ellipse key={r} cx="100" cy={196 - 70} rx={r} ry={r} fill={[a, b, l][i % 3]} />
          ))}
          <ellipse
            cx="100"
            cy="126"
            rx="70"
            ry="70"
            fill="none"
            stroke="#fff"
            strokeOpacity=".35"
            strokeDasharray="2 4"
          />
        </g>
      )}

      {kind === "cushion" && (
        <g>
          <path d="M26 196q-6-40 6-76 70-10 136 0 12 36 6 76-74 8-148 0Z" fill={`url(#${id}-jaal)`} />
          <path d="M26 196q-6-40 6-76 70-10 136 0 12 36 6 76-74 8-148 0Z" fill={`url(#${id}-round)`} />
          <path d="M44 128q-6-36 4-64 56-8 106 0 10 28 4 64-58 8-114 0Z" fill={mix(b, "#ffffff", 0.08)} />
          <path d="M44 128q-6-36 4-64 56-8 106 0 10 28 4 64-58 8-114 0Z" fill={`url(#${id}-round)`} />
          <g fill={ZARI}>
            <path d="M84 96c6-10 18-12 26-6-6 0-8 4-8 8 0 6-6 10-12 8-4 0-6-6-6-10Z" />
            <path d="M108 88l10-4-6 8Z" />
          </g>
          <path d="M60 104q10-16 20-8M130 100q-8-14-18-6" stroke={ZARI} strokeWidth="1.2" fill="none" />
        </g>
      )}
    </svg>
  );
}
