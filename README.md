# Angika — the almirah

A boutique menu for **Angika** — *Where Style Meets Art* — built like a Bengali almirah. Dresses hang on **The Rail**, handmade things sit on **The Shelves**, and kalka textiles are folded in **The Trunk**. **The Lal Khata** (a red ledger) lists every price in ₹. The whole page is framed like a lal-paar saree and ends in its pallu.

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
| Notes on the measuring tape             | `src/data/site.ts` → `tape`                                            |
| Pieces, prices, photos, sizes, colours  | `src/data/catalog.ts` → `products`                                     |
| Room names, Bengali titles, hand notes  | `src/data/catalog.ts` → `collections`                                  |
| Logo files                              | `src/assets/brand/` (header, footer, neck labels), `src/app/icon.png`, `src/app/opengraph-image.png` |
| Colours & fonts                         | `src/app/globals.css` (`--maroon` and `--cream` come from the logo)    |

### Adding a piece

Copy any object in `products`, give it a new `id`, and set `price` in whole rupees (`mrp` shows struck out).

- **Photo:** paste an Unsplash URL (`https://images.unsplash.com/photo-…`) or put the photo in `public/products/` and use `"/products/your-photo.jpg"`.
- **`palette`:** three colours used to draw the piece while its photo loads (and if a photo is missing).
- **`note`:** the handwritten line on its tag.

The names, stories, notes, size charts and extra colours in the catalogue are sample data to replace with the real stock.

### Sizes and measurements

Garments get a `sizeChart` in **inches**. Each row is one size, and every column is optional:

```ts
sizeChart: [
  { size: "S", bust: 34, waist: 30, hip: 38, length: 44 },
  { size: "M", bust: 36, waist: 32, hip: 40, length: 44 },
],
```

The helpers `fitted(length)`, `flared(length)` and `lehenga(length)` at the top of the catalogue fill in a
standard XS–XXL chart; replace them with the supplier's real chart when you have it. Free-size pieces
(sarees, dupattas) use `measurements` instead, e.g. `[{ label: "Saree length", value: "5.5 m" }]`.
Candles, bangles and other simple options keep using `sizes` with an `optionLabel`.

### Colours

```ts
colours: [
  { name: "Dahi white", hex: "#F4F1EC" },                       // first = the colour in `photo`
  { name: "Neel", hex: "#8FA7D2", photo: "/products/mishti-neel.jpg" },
  { name: "Gulabi", hex: "#E7C6D2", palette: ["#E7C6D2", "#8FA3D6", "#FBEFF3"] },
],
```

The first colour is the one in the main `photo`. Give other colours their own `photo` when you have one;
until then the site draws the piece in that colour (from `palette`) and says the photo is coming soon.
The chosen size and colour travel with the piece into the potli and the WhatsApp chithi.

## Photographing the pieces

The rail frames each photo like a garment on a hanger, so the easiest shots are exactly that:

1. **Hang it.** Put the dress or kurta on a plain wooden hanger against a clean, light wall. Hook at the top, garment centred, nothing else in frame.
2. **Daylight, no flash.** Stand near a window with the light coming from the side; avoid midday sun. Turn off room lights so colours stay true.
3. **Portrait, straight on.** Hold the phone upright at chest height, level with the garment, and leave a little space above the hook. The site crops to 3:4.
4. **One photo per colour.** Shoot each colour the same way and add it to that colour's `photo`.
5. **Sarees and dupattas:** drape over the hanger so the border and pallu show, or photograph them folded (the trunk shows folds).
6. **Handmade pieces:** place them on a plain table or shelf with the same window light, shot straight on with some space around.
7. **Size:** export around 1600 px on the long side as JPG. Name files simply, e.g. `mishti-doi-neel.jpg`.

## How it's put together

- `components/rooms/hero.tsx`: the almirah. Its doors swing open on load, and each compartment links to its room.
- `components/rooms/rail.tsx`: garments on hangers on a brass rod, with kraft price tags. Scroll it sideways.
- `components/rooms/shelves.tsx`: objects on wooden shelves; each item brings its own length of plank.
- `components/rooms/trunk.tsx`: folded kalka cloths with dhobi chits, on a painted tin trunk.
- `components/rooms/khata.tsx`: the red ledger with taka and poisa columns, search, sort and ribbon bookmarks. Ticks go into the potli.
- `components/potli.tsx`: the potli (drawstring pouch) and the chithi, a letter that sends the list to WhatsApp.
- `components/trial-room.tsx`: the detail view. A curtain draws back to show the piece, its colours, a tailor's measurement slip (size chart in inches, tap to pick a size) and a satin care label.
- `components/art/*`: drawn fabrics (kalka buttis, temple borders, kantha stitch), garments and shelf objects. They show while photos load, and replace a photo if it fails.

Product photography: Unsplash contributors (Unsplash License).
