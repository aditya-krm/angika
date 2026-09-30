# Angika — the almirah

A boutique menu for **Angika**, built like a Bengali almirah. Dresses hang on **The Rail**, handmade things sit on **The Shelves**, and kalka textiles are folded in **The Trunk**. **The Lal Khata** (a red ledger) lists every price in ₹. The whole page is framed like a lal-paar saree and ends in its pallu.

Built with **Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Bun**.

## Run it

```bash
bun install
bun dev          # http://localhost:3000 on the Bun runtime
```

Production:

```bash
bun run build
bun run start
```

> `dev` runs with `bun --bun` (Bun runtime). `build` and `start` are launched by Bun but run Next's production server on
> Node, because Next 16.3's production runtime currently hits a Bun bug ("Expected CommonJS module to have a function
> wrapper"). Once Bun fixes it, prefix them with `bun --bun` too.

## Make it yours

| What                                    | Where                                                                  |
| --------------------------------------- | ---------------------------------------------------------------------- |
| WhatsApp number, Instagram, hours       | `src/data/site.ts`                                                     |
| Notes on the measuring tape             | `src/data/site.ts` → `tape` (sample promises: keep only true ones)     |
| Pieces, prices, photos, sizes, notes    | `src/data/catalog.ts` → `products`                                     |
| Room names, Bengali titles, hand notes  | `src/data/catalog.ts` → `collections`                                  |
| Colours & fonts                         | `src/app/globals.css`                                                  |

**Adding a piece:** copy any object in `products`, give it a new `id`, and set `price` in whole rupees (`mrp` shows struck out). For the photo, paste an Unsplash URL (`https://images.unsplash.com/photo-…`) or put your own image in `public/products/` and use `"/products/your-photo.jpg"`. `palette` is three colours used to draw the piece's fabric. `note` is the handwritten line on its tag. The names, stories and notes in the catalogue are sample copy.

## How it's put together

- `components/rooms/hero.tsx`: the almirah. Its doors swing open on load, and each compartment links to its room.
- `components/rooms/rail.tsx`: garments on hangers on a brass rod, with kraft price tags. Scroll it sideways.
- `components/rooms/shelves.tsx`: objects on wooden shelves; each item brings its own length of plank.
- `components/rooms/trunk.tsx`: folded kalka cloths with dhobi chits, on a painted tin trunk.
- `components/rooms/khata.tsx`: the red ledger with taka and poisa columns, search, sort and ribbon bookmarks. Ticks go into the potli.
- `components/potli.tsx`: the potli (drawstring pouch) and the chithi, a letter that sends the list to WhatsApp.
- `components/trial-room.tsx`: the detail view. A curtain draws back to show the piece, its sizes and a satin care label.
- `components/art/*`: drawn fabrics (kalka buttis, temple borders, kantha stitch), garments and shelf objects. They show while photos load, and replace a photo if it fails.

Product photography: Unsplash contributors (Unsplash License).
