/**
 * The Angika menu.
 *
 * To add a piece: copy any product object below, give it a unique `id`, and fill in the fields.
 * Photos: paste an Unsplash photo URL (images.unsplash.com/photo-…) or drop your own image into
 * /public/products and use a path like "/products/my-saree.jpg".
 * Prices are whole rupees (₹). `mrp` is optional and shows as a struck-out price.
 */

export type CollectionId = "twirl" | "handmade" | "kalka";

export type ProductType =
  | "saree"
  | "kurta"
  | "dress"
  | "coord"
  | "lehenga"
  | "dupatta"
  | "jewellery"
  | "pottery"
  | "decor"
  | "candle"
  | "art"
  | "textile"
  | "bag";

export type Tag = "bestseller" | "new" | "made-to-order" | "limited" | "pujo" | "handpainted";

/** One colour a piece comes in. The first colour in the list is the one in `photo`. */
export type Colour = {
  name: string;
  /** Swatch colour. */
  hex: string;
  /** Photo of this colour. Without one, the site draws the piece in `palette`. */
  photo?: string;
  photoAlt?: string;
  /** Colours for the drawing: base, motif, light. Defaults to the product's palette. */
  palette?: [string, string, string];
};

/** A row of a size chart. Every measurement is in inches, taken flat and doubled where needed. */
export type SizeRow = { size: string; bust?: number; waist?: number; hip?: number; length?: number };

export type Collection = {
  id: CollectionId;
  /** The room of the almirah this collection lives in. */
  title: string;
  kicker: string;
  bengali: string;
  bengaliMeaning: string;
  blurb: string;
  /** A handwritten aside shown next to the room title. */
  handNote: string;
};

export type Product = {
  id: string;
  name: string;
  /** Optional Bengali / Hindi name shown in the Tiro Bangla face. */
  bn?: string;
  collection: CollectionId;
  type: ProductType;
  price: number;
  mrp?: number;
  blurb: string;
  story: string;
  /** A short handwritten note from the studio, shown on the tag. */
  note?: string;
  details: { label: string; value: string }[];
  /** Simple options that aren't garment sizes (a candle's scent, a bangle size). */
  sizes?: string[];
  /** Heading for `sizes` (e.g. "Scent"). */
  optionLabel?: string;
  /** Garment size chart in inches. Its sizes become the options to pick from. */
  sizeChart?: SizeRow[];
  /** Measurements for free-size pieces: a saree's length, a dupatta's width… */
  measurements?: { label: string; value: string }[];
  /** Colours this piece comes in. Leave out for one-colour pieces. */
  colours?: Colour[];
  tags: Tag[];
  /** Units left; 3 or fewer shows an "only n left" note. */
  stock?: number;
  photo: string;
  photoAlt: string;
  /** CSS object-position for the photo crop, e.g. "50% 20%". */
  focus?: string;
  /** Three colours for the painted swatch shown while the photo loads. */
  palette: [string, string, string];
  addedOn: string;
};

export const collections: Collection[] = [
  {
    id: "twirl",
    title: "The Rail",
    kicker: "Dresses, sarees & sets",
    bengali: "সাজঘর",
    bengaliMeaning: "sajghor · the dressing room",
    blurb:
      "Kurta sets for chai dates, sarees for pujo evenings, and a lehenga or three for the big day. Soft cottons, happy prints, zero fuss.",
    handNote: "go on, give them a twirl",
  },
  {
    id: "handmade",
    title: "The Shelves",
    kicker: "Handcrafted art & little things",
    bengali: "হাতের কাজ",
    bengaliMeaning: "hater kaaj · work of the hands",
    blurb:
      "Jhumkas, clay pots, macramé, candles and paintings. Each one shaped, knotted or painted by a real pair of hands, so no two are twins.",
    handNote: "no two are twins!",
  },
  {
    id: "kalka",
    title: "The Trunk",
    kicker: "Bengali kalka textiles",
    bengali: "কলকা কথা",
    bengaliMeaning: "kalka kotha · stories of the paisley",
    blurb:
      "The mango-shaped kalka has curled across Bengal's sarees, shawls and kantha quilts for centuries. Here it is, woven, stitched and painted.",
    handNote: "folded with neem leaves, like Ma does",
  },
];

export const typeLabels: Record<ProductType, string> = {
  saree: "Sarees",
  kurta: "Kurta sets",
  dress: "Dresses",
  coord: "Co-ords",
  lehenga: "Lehengas",
  dupatta: "Dupattas & stoles",
  jewellery: "Jewellery",
  pottery: "Clay & pottery",
  decor: "Macramé & décor",
  candle: "Candles",
  art: "Paintings",
  textile: "Quilts & cushions",
  bag: "Bags & baskets",
};

export const tagLabels: Record<Tag, string> = {
  bestseller: "Bestseller",
  new: "New in",
  "made-to-order": "Made to order",
  limited: "Limited",
  pujo: "Pujo edit",
  handpainted: "Hand-painted",
};

const U = (id: string) => `https://images.unsplash.com/photo-${id}`;

/* Size charts (inches). These are typical Indian womenswear sizes: replace them with the
   supplier's chart for each piece when you have it. */
const BODY: [string, number, number, number][] = [
  ["XS", 32, 28, 36],
  ["S", 34, 30, 38],
  ["M", 36, 32, 40],
  ["L", 38, 34, 42],
  ["XL", 40, 36, 44],
  ["XXL", 42, 38, 46],
];
/** Kurtas, tunics and straight dresses: bust, waist, hip and length. */
const fitted = (length: number): SizeRow[] =>
  BODY.map(([size, bust, waist, hip]) => ({ size, bust, waist, hip, length }));
/** Flared dresses and anarkalis: bust, waist and length (the skirt is free). */
const flared = (length: number): SizeRow[] => BODY.map(([size, bust, waist]) => ({ size, bust, waist, length }));
/** Lehengas: blouse bust, skirt waist and skirt length. */
const lehenga = (length: number): SizeRow[] =>
  BODY.slice(1, 5).map(([size, bust, waist]) => ({ size, bust, waist, length }));

const SAREE_MEASURE = [
  { label: "Saree length", value: "5.5 m" },
  { label: "Width", value: "1.15 m (45″)" },
  { label: "Blouse piece", value: "0.8 m, unstitched" },
];

export const products: Product[] = [
  /* ───────────────────────── The Twirl Room ───────────────────────── */
  {
    id: "mishti-doi-kurta-set",
    name: "Mishti Doi Kurta Set",
    bn: "মিষ্টি দই",
    collection: "twirl",
    type: "kurta",
    price: 1890,
    mrp: 2290,
    blurb: "Sweet-curd white mulmul with tiny sprigs of blue.",
    story:
      "Named after Bengal's favourite dessert because it is just as cool and soft. Breathable mulmul cotton, a relaxed straight cut and matching pyjama pants — the set you'll reach for every sticky afternoon.",
    note: "the one I live in all summer",
    details: [
      { label: "Fabric", value: "Mulmul cotton" },
      { label: "Set", value: "Kurta + pyjama" },
      { label: "Fit", value: "Relaxed, calf length" },
      { label: "Care", value: "Gentle hand wash" },
    ],
    sizeChart: fitted(44),
    colours: [
      { name: "Dahi white", hex: "#F4F1EC" },
      { name: "Neel", hex: "#8FA7D2", palette: ["#9DB4D8", "#F4F1EC", "#EEF2FB"] },
      { name: "Gulabi", hex: "#E7C6D2", palette: ["#E7C6D2", "#8FA3D6", "#FBEFF3"] },
    ],
    tags: ["bestseller"],
    photo: U("1745313452052-0e4e341f326c"),
    photoAlt: "Woman in a white floral kurta and pyjama set",
    focus: "50% 25%",
    palette: ["#F4F1EC", "#9DB4D8", "#E7C6D2"],
    addedOn: "2026-07-02",
  },
  {
    id: "gulabi-gupshup-kurta",
    name: "Gulabi Gupshup Kurta",
    bn: "গোলাপি গপ্পো",
    collection: "twirl",
    type: "kurta",
    price: 1650,
    blurb: "Rose-pink florals made for long chats over chai.",
    story:
      "A pink printed kurta with straight pants, cut roomy through the shoulders so you can laugh, lean and gossip all evening. Pairs with the Chhaya dupatta if you want a little drama.",
    details: [
      { label: "Fabric", value: "Cambric cotton" },
      { label: "Set", value: "Kurta + pants" },
      { label: "Fit", value: "Straight, knee length" },
      { label: "Care", value: "Machine wash cold" },
    ],
    sizeChart: fitted(42),
    colours: [
      { name: "Gulabi", hex: "#F6C6D4" },
      { name: "Pista", hex: "#BFD8B2", palette: ["#BFD8B2", "#5E8F5A", "#F1F7EE"] },
    ],
    tags: ["new"],
    photo: U("1741847639057-b51a25d42892"),
    photoAlt: "Woman in a pink floral kurta and pants",
    focus: "50% 25%",
    palette: ["#F6C6D4", "#E07A9A", "#FBE9EE"],
    addedOn: "2026-09-10",
  },
  {
    id: "sunny-side-tiered-dress",
    name: "Sunny Side Tiered Dress",
    collection: "twirl",
    type: "dress",
    price: 2150,
    blurb: "Three tiers of marigold yellow and a hand-embroidered yoke.",
    story: "Egg-yolk yellow, three swishy tiers and a neckline embroidered in thread. Built for twirling — we checked.",
    note: "yes, it twirls. we checked.",
    details: [
      { label: "Fabric", value: "Cotton voile, lined" },
      { label: "Work", value: "Hand embroidery at yoke" },
      { label: "Length", value: "Midi" },
      { label: "Care", value: "Hand wash, dry in shade" },
    ],
    sizeChart: flared(46),
    colours: [
      { name: "Marigold", hex: "#F6D46B" },
      { name: "Monsoon sky", hex: "#A9C7E8", palette: ["#A9C7E8", "#4F79B5", "#EEF4FB"] },
    ],
    tags: ["new", "bestseller"],
    photo: U("1760287363878-1a09af715b80"),
    photoAlt: "A yellow tiered dress with an embroidered neckline",
    focus: "50% 30%",
    palette: ["#F6D46B", "#E9A93B", "#FFF3D1"],
    addedOn: "2026-09-02",
  },
  {
    id: "bow-tiful-brunch-coord",
    name: "Bow-tiful Brunch Co-ord",
    collection: "twirl",
    type: "coord",
    price: 2450,
    mrp: 2890,
    blurb: "Tie-neck top and palazzos in a blush floral print.",
    story:
      "A floaty two-piece with a bow you can tie big and romantic or small and neat. Wear it together for brunch, or split it up with denim on weekdays.",
    note: "tie the bow big!",
    details: [
      { label: "Fabric", value: "Rayon crepe" },
      { label: "Set", value: "Tie-neck top + palazzo" },
      { label: "Fit", value: "Relaxed" },
      { label: "Care", value: "Dry clean first wash" },
    ],
    sizeChart: fitted(26),
    colours: [
      { name: "Blush", hex: "#F7C9D3" },
      { name: "Lilac", hex: "#C9B6E4", palette: ["#C9B6E4", "#7B5BA6", "#F4EFFA"] },
    ],
    tags: ["bestseller"],
    stock: 3,
    photo: U("1762777777819-4d9aa5529368"),
    photoAlt: "Woman in a pink floral outfit with a tie-neck bow",
    focus: "50% 25%",
    palette: ["#F7C9D3", "#C8577A", "#FDF0F2"],
    addedOn: "2026-06-14",
  },
  {
    id: "blueberry-button-dress",
    name: "Blueberry Button Dress",
    collection: "twirl",
    type: "dress",
    price: 1790,
    blurb: "An easy indigo shirt-dress with wooden buttons all the way down.",
    story:
      "Indigo-dyed cotton, a soft collar and real wooden buttons. Belt it for a picnic, leave it loose for a lazy Sunday.",
    details: [
      { label: "Fabric", value: "Indigo-dyed cotton" },
      { label: "Buttons", value: "Handmade wood" },
      { label: "Length", value: "Below knee" },
      { label: "Care", value: "Wash separately, colours may bleed" },
    ],
    sizeChart: fitted(44),
    colours: [
      { name: "Indigo", hex: "#5B74B8" },
      { name: "Kajal black", hex: "#2B2A30", palette: ["#2B2A30", "#8E8A99", "#EDECEF"] },
    ],
    tags: [],
    photo: U("1760287363750-1c888c75578f"),
    photoAlt: "Mannequin wearing a blue button-up dress",
    focus: "50% 30%",
    palette: ["#5B74B8", "#A9BCE6", "#EEF2FB"],
    addedOn: "2026-05-20",
  },
  {
    id: "lavender-lullaby-tunic-set",
    name: "Lavender Lullaby Tunic Set",
    collection: "twirl",
    type: "coord",
    price: 1990,
    blurb: "Lilac block-print tunic with candy-striped pants.",
    story:
      "Hand block-printed in soft purple, paired with striped straight pants that make the whole outfit smile. Comfortable enough to nap in — hence the name.",
    details: [
      { label: "Fabric", value: "Hand block-printed cotton" },
      { label: "Set", value: "Tunic + striped pants" },
      { label: "Fit", value: "Straight" },
      { label: "Care", value: "Hand wash cold" },
    ],
    sizeChart: fitted(36),
    tags: ["new"],
    photo: U("1760287363699-a08d553fb8a9"),
    photoAlt: "Mannequin in a purple patterned tunic and striped pants",
    focus: "50% 30%",
    palette: ["#C7B4E2", "#8C6BB8", "#F3EEFA"],
    addedOn: "2026-08-28",
  },
  {
    id: "neelambari-kurta-set",
    name: "Neelambari Kurta Set",
    bn: "নীলাম্বরী",
    collection: "twirl",
    type: "kurta",
    price: 1750,
    blurb: "Navy-blue florals, 'the one who wears the sky'.",
    story:
      "Deep navy printed with tiny white blooms, cut long with side slits and paired with matching pants. The kurta that goes from office to dinner without a change.",
    details: [
      { label: "Fabric", value: "Printed cotton" },
      { label: "Set", value: "Kurta + pants" },
      { label: "Fit", value: "Straight, calf length" },
      { label: "Care", value: "Machine wash cold" },
    ],
    sizeChart: fitted(46),
    colours: [
      { name: "Navy", hex: "#27366B" },
      { name: "Maroon", hex: "#6E1A2E", palette: ["#6E1A2E", "#E9C9A6", "#F7ECE6"] },
    ],
    tags: [],
    photo: U("1766994063823-ed214f883548"),
    photoAlt: "Woman in a floral navy blue kurta and pants",
    focus: "50% 25%",
    palette: ["#27366B", "#8FA3D6", "#F1EFE8"],
    addedOn: "2026-04-11",
  },
  {
    id: "monsoon-blues-tunic",
    name: "Monsoon Blues Tunic",
    collection: "twirl",
    type: "kurta",
    price: 1690,
    blurb: "Rain-cloud blue florals with matching pants.",
    story:
      "A light tunic set printed in every blue the sky turns in July. Quick to dry, easy to pack, happy in the rain.",
    details: [
      { label: "Fabric", value: "Cotton-linen" },
      { label: "Set", value: "Tunic + pants" },
      { label: "Fit", value: "A-line" },
      { label: "Care", value: "Machine wash cold" },
    ],
    sizeChart: fitted(40),
    tags: [],
    photo: U("1768651925876-637f68cd64f6"),
    photoAlt: "Woman in a blue floral print tunic and pants",
    focus: "50% 25%",
    palette: ["#6E93C7", "#BFD3EE", "#F2F6FB"],
    addedOn: "2026-07-18",
  },
  {
    id: "sage-garden-kurta",
    name: "Sage Garden Anarkali",
    collection: "twirl",
    type: "dress",
    price: 2050,
    blurb: "A flared green floral that feels like a walk in a courtyard garden.",
    story:
      "Leaf-green florals on a flared anarkali silhouette with gathered panels. Light enough for day, pretty enough for a wedding lunch.",
    details: [
      { label: "Fabric", value: "Chanderi-cotton" },
      { label: "Silhouette", value: "Flared anarkali" },
      { label: "Length", value: "Ankle" },
      { label: "Care", value: "Dry clean recommended" },
    ],
    sizeChart: flared(52),
    tags: [],
    photo: U("1610048869310-d889ff25c374"),
    photoAlt: "Woman in a green floral dress beside a wooden door",
    focus: "50% 25%",
    palette: ["#8FB28A", "#D8E6CF", "#F6EFE3"],
    addedOn: "2026-03-30",
  },
  {
    id: "chhaya-embroidered-dupatta",
    name: "Chhaya Embroidered Dupatta",
    bn: "ছায়া",
    collection: "twirl",
    type: "dupatta",
    price: 1250,
    blurb: "Black thread-work on soft grey — the 'shadow' that finishes any look.",
    story:
      "A soft grey dupatta with black resham embroidery along the border. Throw it over a plain kurta and the whole outfit gets dressed up.",
    note: "makes a plain kurta look fancy",
    details: [
      { label: "Fabric", value: "Cotton-silk" },
      { label: "Work", value: "Resham thread embroidery" },
      { label: "Care", value: "Dry clean only" },
    ],
    colours: [
      { name: "Smoke grey", hex: "#9A9A9E" },
      { name: "Ivory", hex: "#EFE8DA", palette: ["#EFE8DA", "#2F2A2E", "#FBF8F2"] },
    ],
    measurements: [{ label: "Length × width", value: "2.25 m × 0.9 m" }],
    tags: [],
    photo: U("1773439878281-5aa23c34dcaa"),
    photoAlt: "Woman in a grey outfit with a black embroidered dupatta",
    focus: "50% 30%",
    palette: ["#9A9A9E", "#2F2A2E", "#EEEDEA"],
    addedOn: "2026-08-05",
  },
  {
    id: "sindoor-sonnet-saree",
    name: "Sindoor Sonnet Saree",
    bn: "সিঁদুর",
    collection: "twirl",
    type: "saree",
    price: 3450,
    blurb: "Vermilion and cocoa, with a pallu that reads like poetry.",
    story:
      "A soft silk-cotton saree in sindoor red with a cocoa-brown body and zari lines at the pallu. Comes with an unstitched blouse piece.",
    note: "Ashtami evening, sorted",
    details: [
      { label: "Fabric", value: "Silk-cotton" },
      { label: "Finish", value: "Fall & pico done" },
      { label: "Care", value: "Dry clean only" },
    ],
    measurements: SAREE_MEASURE,
    tags: ["pujo", "bestseller"],
    photo: U("1610030469983-98e550d6193c"),
    photoAlt: "Woman in a red and brown sari",
    focus: "50% 25%",
    palette: ["#B6322E", "#6B3A2A", "#F3D6C4"],
    addedOn: "2026-08-20",
  },
  {
    id: "tota-pakhi-saree",
    name: "Tota Pakhi Saree",
    bn: "টিয়া পাখি",
    collection: "twirl",
    type: "saree",
    price: 4200,
    blurb: "Parrot-green silk with a gold border that catches every lamp.",
    story:
      "Named for the parrots that squabble outside our window. Bright green art silk with a woven gold border — made for sangeets, pujo nights and anyone who likes being noticed.",
    note: "only 2 left, sorry!",
    details: [
      { label: "Fabric", value: "Art silk, zari border" },
      { label: "Finish", value: "Fall & pico done" },
      { label: "Care", value: "Dry clean only" },
    ],
    colours: [
      { name: "Parrot green", hex: "#3E8E5A" },
      { name: "Rani pink", hex: "#C2185B", palette: ["#C2185B", "#D4AF37", "#F8E1EC"] },
    ],
    measurements: SAREE_MEASURE,
    tags: ["pujo"],
    stock: 2,
    photo: U("1679006831648-7c9ea12e5807"),
    photoAlt: "A woman wearing a green sari and jewellery",
    focus: "50% 25%",
    palette: ["#3E8E5A", "#D4AF37", "#E4F1E6"],
    addedOn: "2026-09-12",
  },
  {
    id: "jamun-jalebi-saree",
    name: "Jamun Jalebi Saree",
    collection: "twirl",
    type: "saree",
    price: 3890,
    blurb: "Plum-purple and syrupy gold — sweet in every sense.",
    story:
      "A jamun-purple saree with golden motifs swirling like fresh jalebis. Soft drape, light weight, and a pallu that photographs beautifully.",
    details: [
      { label: "Fabric", value: "Soft silk blend" },
      { label: "Finish", value: "Fall & pico done" },
      { label: "Care", value: "Dry clean only" },
    ],
    colours: [
      { name: "Jamun", hex: "#5E2B5C" },
      { name: "Bottle green", hex: "#1F5A45", palette: ["#1F5A45", "#D9A441", "#E3F0EA"] },
    ],
    measurements: SAREE_MEASURE,
    tags: [],
    photo: U("1641699862936-be9f49b1c38d"),
    photoAlt: "A woman in a purple and gold sari",
    focus: "50% 25%",
    palette: ["#5E2B5C", "#D9A441", "#F0E3EE"],
    addedOn: "2026-05-02",
  },
  {
    id: "sunday-sorbet-saree",
    name: "Sunday Sorbet Saree",
    collection: "twirl",
    type: "saree",
    price: 3250,
    blurb: "Pink and orange, like two scoops melting together.",
    story:
      "A light chiffon saree dip-dyed from candy pink into orange. Ties easily, drapes beautifully, and weighs almost nothing in a suitcase.",
    details: [
      { label: "Fabric", value: "Georgette chiffon" },
      { label: "Finish", value: "Fall & pico done" },
      { label: "Care", value: "Dry clean only" },
    ],
    measurements: SAREE_MEASURE,
    tags: ["new"],
    photo: U("1617627143750-d86bc21e42bb"),
    photoAlt: "A woman in a pink and orange sari with gold jewellery",
    focus: "50% 25%",
    palette: ["#F28CA6", "#F29E4C", "#FDEBE3"],
    addedOn: "2026-09-15",
  },
  {
    id: "haldi-hues-lehenga",
    name: "Haldi Hues Lehenga",
    collection: "twirl",
    type: "lehenga",
    price: 12900,
    blurb: "Turmeric-yellow and maroon, dressed up for the haldi morning.",
    story:
      "A flared yellow lehenga with maroon borders, gota work and a matching dupatta. Cut with a generous flare, so the twirl is exactly right.",
    details: [
      { label: "Fabric", value: "Silk blend, gota patti work" },
      { label: "Set", value: "Lehenga + blouse + dupatta" },
    ],
    sizeChart: lehenga(41),
    colours: [
      { name: "Haldi", hex: "#E9B949" },
      { name: "Mehendi green", hex: "#6B8E23", palette: ["#6B8E23", "#7A1F2B", "#EEF4DC"] },
    ],
    tags: [],
    photo: U("1767955694884-d4bf352c23c2"),
    photoAlt: "Woman in ornate yellow and maroon traditional Indian attire",
    focus: "50% 20%",
    palette: ["#E9B949", "#7A1F2B", "#FBF0D0"],
    addedOn: "2026-06-01",
  },
  {
    id: "rani-roohani-lehenga",
    name: "Rani Roohani Lehenga",
    collection: "twirl",
    type: "lehenga",
    price: 15500,
    mrp: 17900,
    blurb: "Deep maroon velvet with zardozi that feels like a royal secret.",
    story:
      "Maroon velvet worked with zardozi and sequins by hand. Heavy where it should be, light where you need to dance.",
    note: "the twirl on this one!",
    details: [
      { label: "Fabric", value: "Velvet, hand zardozi" },
      { label: "Set", value: "Lehenga + blouse + net dupatta" },
    ],
    sizeChart: lehenga(41),
    tags: ["limited"],
    photo: U("1756483488645-5973a1a92e33"),
    photoAlt: "Woman in an ornate maroon lehenga",
    focus: "50% 20%",
    palette: ["#6E1A2E", "#C98B5B", "#F4E1DA"],
    addedOn: "2026-04-22",
  },
  {
    id: "bride-to-blush-lehenga",
    name: "Bride-to-Blush Lehenga",
    collection: "twirl",
    type: "lehenga",
    price: 18500,
    blurb: "Classic bridal red, a veil of net and a thousand tiny stitches.",
    story:
      "Our bridal lehenga in traditional red with gold embroidery, a can-can for the perfect flare and a scalloped net veil.",
    note: "the one for the big day",
    details: [
      { label: "Fabric", value: "Raw silk, zari embroidery" },
      { label: "Set", value: "Lehenga + blouse + veil dupatta" },
    ],
    sizeChart: lehenga(42),
    tags: [],
    photo: U("1759906760638-eeffcb471e53"),
    photoAlt: "A bride in a traditional red lehenga and veil",
    focus: "50% 20%",
    palette: ["#B21F32", "#D9A441", "#F8DCD9"],
    addedOn: "2026-02-14",
  },

  /* ───────────────────────── Hand-made Hearts ───────────────────────── */
  {
    id: "jhum-jhum-jhumkas",
    name: "Jhum Jhum Jhumkas",
    collection: "handmade",
    type: "jewellery",
    price: 690,
    blurb: "Bell-shaped jhumkas that jingle when you laugh.",
    story:
      "Oxidised bell jhumkas with tiny beads along the rim. Light enough for all-day wear, loud enough to be heard across the room.",
    note: "they really do jingle",
    details: [
      { label: "Material", value: "Oxidised brass, glass beads" },
      { label: "Drop", value: "5 cm" },
      { label: "Weight", value: "Light, 12 g each" },
      { label: "Care", value: "Keep dry, store in the pouch" },
    ],
    tags: ["bestseller"],
    photo: U("1762686130435-897de4b26aac"),
    photoAlt: "Rows of ornate jhumka earrings hanging",
    palette: ["#B08D57", "#6E6A63", "#F1E9DA"],
    addedOn: "2026-03-01",
  },
  {
    id: "chandni-drops",
    name: "Chandni Drops",
    bn: "চাঁদনি",
    collection: "handmade",
    type: "jewellery",
    price: 890,
    blurb: "Moonlight-silver and gold, twisted by hand.",
    story:
      "Two-tone drop earrings hand-twisted from silver- and gold-plated wire. Quiet on a Monday, perfect with a saree on Saturday.",
    details: [
      { label: "Material", value: "Plated brass wire" },
      { label: "Drop", value: "4 cm" },
      { label: "Hooks", value: "Nickel-free" },
      { label: "Care", value: "Wipe with a soft cloth" },
    ],
    tags: ["new"],
    photo: U("1714733831162-0a6e849141be"),
    photoAlt: "A pair of silver and gold earrings",
    palette: ["#C9CCD3", "#D9B45A", "#F3F1EC"],
    addedOn: "2026-09-05",
  },
  {
    id: "rainbow-mala-beads",
    name: "Rainbow Mala Beads",
    collection: "handmade",
    type: "jewellery",
    price: 540,
    blurb: "Layer-happy necklaces in every colour of Holi.",
    story: "Hand-strung glass and wooden bead malas. Wear one for a hint of colour or stack five for a full festival.",
    details: [
      { label: "Material", value: "Glass & wooden beads" },
      { label: "Length", value: "45 cm, adjustable" },
      { label: "Sold as", value: "Single strand" },
      { label: "Care", value: "Keep away from perfume" },
    ],
    tags: [],
    photo: U("1523252012848-c22188792c27"),
    photoAlt: "Close-up of colourful beaded necklaces",
    palette: ["#E0595E", "#F2B134", "#4BA3A0"],
    addedOn: "2026-01-19",
  },
  {
    id: "bangle-bazaar-stack",
    name: "Bangle Bazaar Stack",
    collection: "handmade",
    type: "jewellery",
    price: 480,
    blurb: "A mix-and-match set of beaded bangles, like a fair in a box.",
    story:
      "Six hand-beaded bangles in a mix of colours and textures. Swap them around, share them with your sister, lose one to your mother.",
    details: [
      { label: "Material", value: "Seed beads on elastic" },
      { label: "Sizes", value: "2.4, 2.6, 2.8" },
      { label: "Sold as", value: "Set of 6" },
      { label: "Care", value: "Roll on gently" },
    ],
    sizes: ["2.4", "2.6", "2.8"],
    optionLabel: "Bangle size",
    tags: [],
    photo: U("1679590988898-50c20140aec0"),
    photoAlt: "Bracelets displayed on a wooden stand",
    palette: ["#C86B5A", "#E8C07A", "#EFE6DA"],
    addedOn: "2026-02-08",
  },
  {
    id: "maati-ki-khushboo-vases",
    name: "Maati Vase Trio",
    bn: "মাটি",
    collection: "handmade",
    type: "pottery",
    price: 1150,
    blurb: "Three chalk-white clay vases that smell of the first rain.",
    story:
      "Wheel-thrown and finished in a matte white slip, each vase is a little different from its siblings. Perfect for one tuberose or a bunch of dried kaash.",
    note: "lovely with dried kaash",
    details: [
      { label: "Material", value: "Wheel-thrown clay, matte slip" },
      { label: "Heights", value: "10, 14 and 18 cm" },
      { label: "Sold as", value: "Set of 3" },
      { label: "Care", value: "Dry flowers only, not watertight" },
    ],
    tags: ["bestseller"],
    photo: U("1520408222757-6f9f95d87d5d"),
    photoAlt: "White clay vases on a table",
    palette: ["#EDE7DF", "#B9A58D", "#F8F5F0"],
    addedOn: "2026-06-20",
  },
  {
    id: "kulhad-cutie-pot",
    name: "Kulhad Cutie Pot",
    collection: "handmade",
    type: "pottery",
    price: 390,
    blurb: "A little terracotta pot for succulents, pens or secrets.",
    story:
      "Hand-shaped terracotta with thumbprints left in on purpose. Sits happily on a desk, a window sill or a dressing table.",
    details: [
      { label: "Material", value: "Terracotta" },
      { label: "Size", value: "9 cm tall" },
      { label: "Drainage", value: "Hole at the base" },
      { label: "Care", value: "Wipe clean" },
    ],
    tags: [],
    photo: U("1589051079002-b140a970f568"),
    photoAlt: "Hands holding a brown clay pot",
    palette: ["#B5643C", "#E3A77F", "#F4E6DA"],
    addedOn: "2026-05-11",
  },
  {
    id: "little-clay-garden-bowls",
    name: "Little Clay Garden Bowls",
    collection: "handmade",
    type: "pottery",
    price: 850,
    blurb: "Four glazed bowls in garden colours for chutneys and trinkets.",
    story:
      "Small glazed bowls in moss, sky, butter and blush. Serve pickles in them, hold your rings in them, or just line them up and admire them.",
    details: [
      { label: "Material", value: "Glazed stoneware" },
      { label: "Size", value: "9 cm across" },
      { label: "Sold as", value: "Set of 4" },
      { label: "Care", value: "Food-safe, hand wash" },
    ],
    tags: [],
    photo: U("1615640325967-af4cfa4c0c6a"),
    photoAlt: "Assorted colourful ceramic bowls",
    palette: ["#8DB596", "#F2C572", "#E9A6A6"],
    addedOn: "2026-04-03",
  },
  {
    id: "knotty-but-nice-macrame",
    name: "Knotty but Nice Wall Hanging",
    collection: "handmade",
    type: "decor",
    price: 1450,
    blurb: "A cotton-rope macramé that softens any bare wall.",
    story:
      "Hand-knotted from undyed cotton rope on a driftwood dowel. Every knot is tied by hand, so it takes a whole afternoon to make one.",
    details: [
      { label: "Material", value: "Cotton rope, wooden dowel" },
      { label: "Size", value: "60 × 90 cm" },
      { label: "Made in", value: "About 5 hours" },
      { label: "Care", value: "Shake out dust, spot clean" },
    ],
    tags: ["bestseller"],
    photo: U("1715000103283-01ed4755483e"),
    photoAlt: "Close-up of a rope macramé wall hanging",
    palette: ["#E9DECD", "#B79F80", "#F7F2EA"],
    addedOn: "2026-03-17",
  },
  {
    id: "hang-loose-plant-hanger",
    name: "Hang Loose Plant Hanger",
    collection: "handmade",
    type: "decor",
    price: 690,
    blurb: "Let your money plant swing in a macramé hammock.",
    story: "A knotted plant hanger that holds pots up to 20 cm. Hang it by a window and watch your plant get fancy.",
    details: [
      { label: "Material", value: "Cotton rope, wooden ring" },
      { label: "Drop", value: "90 cm" },
      { label: "Holds", value: "Pots up to 20 cm" },
      { label: "Note", value: "Pot and plant not included" },
    ],
    tags: [],
    photo: U("1633594308237-3dcfa56b4e69"),
    photoAlt: "A macramé plant hanger on a wall",
    palette: ["#9CB38A", "#E6DAC4", "#F5F1E8"],
    addedOn: "2026-07-07",
  },
  {
    id: "glow-gossip-candles",
    name: "Glow Gossip Candles",
    collection: "handmade",
    type: "candle",
    price: 450,
    blurb: "Soy candles in rajnigandha, mitti and cardamom-chai.",
    story:
      "Hand-poured soy wax with cotton wicks. Pick a scent: rajnigandha, first-rain mitti, or cardamom chai. About 25 hours of glow each.",
    note: "chai one smells unreal",
    details: [
      { label: "Wax", value: "Soy, cotton wick" },
      { label: "Scents", value: "Rajnigandha · Mitti · Chai" },
      { label: "Burn time", value: "About 25 hours" },
      { label: "Weight", value: "150 g" },
    ],
    sizes: ["Rajnigandha", "Mitti", "Chai"],
    optionLabel: "Scent",
    tags: ["new"],
    photo: U("1643122966676-29e8597257f7"),
    photoAlt: "A group of candles sitting together",
    palette: ["#F2D7B6", "#C98E5A", "#FBF4EA"],
    addedOn: "2026-09-18",
  },
  {
    id: "moonlit-pillar-trio",
    name: "Moonlit Pillar Trio",
    collection: "handmade",
    type: "candle",
    price: 790,
    blurb: "Three unscented white pillars for dinners and diyas.",
    story:
      "Tall, slow-burning pillar candles in three heights. No scent, no fuss — only a soft, steady glow for Diwali and every night after.",
    details: [
      { label: "Wax", value: "Soy-palm blend" },
      { label: "Heights", value: "7.5, 10 and 15 cm" },
      { label: "Sold as", value: "Set of 3" },
      { label: "Burn time", value: "Up to 60 hours (tall)" },
    ],
    tags: [],
    photo: U("1613068431228-8cb6a1e92573"),
    photoAlt: "Lit white pillar candles with eucalyptus leaves",
    palette: ["#F5EFE3", "#8FA68A", "#2E2B29"],
    addedOn: "2026-01-28",
  },
  {
    id: "pastel-posy-painting",
    name: "Pastel Posy Painting",
    collection: "handmade",
    type: "art",
    price: 2400,
    blurb: "An original watercolour of flowers in a jug. One of one.",
    story:
      "An original watercolour on cold-press paper, signed by the artist on the back. Comes mounted, ready to frame.",
    note: "one of one, signed at the back",
    details: [
      { label: "Medium", value: "Watercolour on 300 gsm paper" },
      { label: "Size", value: "A4, mounted to A3" },
      { label: "Edition", value: "Original, 1 of 1" },
      { label: "Framing", value: "Add a frame for ₹650" },
    ],
    tags: ["handpainted", "limited"],
    stock: 1,
    photo: U("1700608277871-a16cfe788293"),
    photoAlt: "A painting of flowers in a vase",
    palette: ["#E7A9B8", "#A8C3A0", "#F7F1EA"],
    addedOn: "2026-08-12",
  },
  {
    id: "mayur-madhubani",
    name: "Mayur Madhubani",
    bn: "ময়ূর",
    collection: "handmade",
    type: "art",
    price: 3200,
    blurb: "A lady among peacocks, drawn in the Mithila tradition.",
    story:
      "A Madhubani painting in natural pigments on handmade paper — a woman in her garden surrounded by peacocks, every inch filled with fine line work.",
    details: [
      { label: "Medium", value: "Natural pigment on handmade paper" },
      { label: "Size", value: "30 × 40 cm" },
      { label: "Style", value: "Madhubani (Mithila)" },
      { label: "Framing", value: "Add a frame for ₹850" },
    ],
    tags: ["handpainted"],
    photo: U("1719498481691-d78f24dcff1b"),
    photoAlt: "Madhubani painting of a woman with peacocks in a garden",
    palette: ["#C8412E", "#2F6B4F", "#F2E2C4"],
    addedOn: "2026-06-25",
  },
  {
    id: "kamal-kamdhenu-madhubani",
    name: "Kamal & Kamdhenu",
    bn: "কমল",
    collection: "handmade",
    type: "art",
    price: 2800,
    blurb: "A decorated cow among lotuses, in folk-art reds and yellows.",
    story:
      "A Madhubani composition of a garlanded cow surrounded by lotus blooms. Bright, lucky and made for a new home.",
    details: [
      { label: "Medium", value: "Natural pigment on handmade paper" },
      { label: "Size", value: "25 × 35 cm" },
      { label: "Style", value: "Madhubani (Mithila)" },
      { label: "Framing", value: "Add a frame for ₹750" },
    ],
    tags: ["handpainted"],
    photo: U("1745195734388-db01e755ebb6"),
    photoAlt: "Folk painting of a decorated cow with lotus flowers",
    palette: ["#D9A441", "#B8352C", "#F5E6C8"],
    addedOn: "2026-07-26",
  },
  {
    id: "hoop-dreams-embroidery",
    name: "Hoop Dreams Embroidery",
    collection: "handmade",
    type: "art",
    price: 950,
    blurb: "A hand-embroidered hoop you can personalise with a name.",
    story:
      "Botanical embroidery in a 6-inch wooden hoop, stitched by hand in soft cotton thread. Ready to hang as it is.",
    note: "so pretty on a bare wall",
    details: [
      { label: "Material", value: "Cotton thread on linen" },
      { label: "Size", value: "6 inch hoop" },
    ],
    tags: [],
    photo: U("1570073141869-2b9947394c95"),
    photoAlt: "An embroidery hoop",
    palette: ["#D8B98C", "#C2456B", "#F5EEE4"],
    addedOn: "2026-05-29",
  },
  {
    id: "tote-ally-yours",
    name: "Tote-ally Yours",
    collection: "handmade",
    type: "bag",
    price: 650,
    blurb: "A canvas tote we hand-paint with whatever you like.",
    story:
      "Heavy natural canvas, painted by hand with fabric colours that last through washes. Big enough for a laptop, a lunchbox and a novel.",
    note: "every one is a little different",
    details: [
      { label: "Material", value: "12 oz cotton canvas" },
      { label: "Size", value: "38 × 42 cm, 10 cm gusset" },
      { label: "Paint", value: "Heat-set fabric colour" },
    ],
    tags: ["handpainted"],
    photo: U("1548863227-3af567fc3b27"),
    photoAlt: "A white canvas tote bag",
    palette: ["#EFE8DC", "#C2456B", "#6F8F72"],
    addedOn: "2026-08-30",
  },
  {
    id: "basket-case-weaves",
    name: "Basket Case Weaves",
    collection: "handmade",
    type: "bag",
    price: 890,
    blurb: "Hand-woven baskets for laundry, toys or too many scarves.",
    story:
      "Woven from natural fibre by artisan groups we work with. Sturdy handles, soft edges and room for everything.",
    details: [
      { label: "Material", value: "Natural fibre" },
      { label: "Size", value: "Medium, 30 cm across" },
      { label: "Handles", value: "Woven, reinforced" },
      { label: "Care", value: "Keep dry, dust off" },
    ],
    tags: [],
    photo: U("1679958854536-a1bb774ef8ab"),
    photoAlt: "A pile of woven baskets",
    palette: ["#C9A36B", "#8A6A3E", "#F3EADB"],
    addedOn: "2026-02-22",
  },
  {
    id: "cosy-crochet-rugs",
    name: "Cosy Crochet Rugs",
    collection: "handmade",
    type: "textile",
    price: 1290,
    blurb: "Round crochet rugs made from leftover cotton yarn.",
    story:
      "Crocheted in rounds from upcycled cotton yarn, so each rug has its own colour story. Soft underfoot and machine washable.",
    details: [
      { label: "Material", value: "Upcycled cotton yarn" },
      { label: "Size", value: "60 cm round" },
      { label: "Colours", value: "Each one is unique" },
      { label: "Care", value: "Machine wash gentle" },
    ],
    tags: [],
    photo: U("1683295550858-c89ee6eebfd9"),
    photoAlt: "A pile of multicoloured crocheted rugs",
    palette: ["#E58F7C", "#6FA8A0", "#F2D17A"],
    addedOn: "2026-04-18",
  },
  {
    id: "birdsong-cushion-covers",
    name: "Birdsong Cushion Covers",
    collection: "handmade",
    type: "textile",
    price: 1100,
    blurb: "Gold-embroidered birds perched among flowers.",
    story:
      "Cushion covers embroidered with little birds and blossoms in gold thread. They make even an old sofa look like it's been somewhere lovely.",
    details: [
      { label: "Material", value: "Cotton-silk, zari embroidery" },
      { label: "Size", value: "16 × 16 inch" },
      { label: "Sold as", value: "Pair of 2" },
      { label: "Care", value: "Dry clean" },
    ],
    tags: ["new"],
    photo: U("1785064038559-10e0ad8036de"),
    photoAlt: "Stacked cushions embroidered with gold birds and flowers",
    palette: ["#C99A3E", "#7A2E3A", "#F4E8D4"],
    addedOn: "2026-09-08",
  },

  /* ───────────────────────── Kalka Kotha ───────────────────────── */
  {
    id: "lal-paar-kalka-saree",
    name: "Lal Paar Kalka Saree",
    bn: "লাল পাড়",
    collection: "kalka",
    type: "saree",
    price: 4650,
    blurb: "The white-and-red Bengali classic, with kalkas along the pallu.",
    story:
      "A white handloom saree with the iconic red border — lal paar — and a row of woven kalkas dancing across the pallu. For Ashtami anjali, sindoor khela and every Boishakh.",
    note: "for anjali & sindoor khela",
    details: [
      { label: "Fabric", value: "Handloom cotton tant" },
      { label: "Motif", value: "Woven kalka pallu" },
      { label: "Care", value: "Starch & dry clean" },
    ],
    measurements: SAREE_MEASURE,
    tags: ["pujo", "bestseller"],
    photo: U("1729101143891-a8fed18023f2"),
    photoAlt: "A woman in a red and white sari",
    focus: "50% 25%",
    palette: ["#F7F2EA", "#B4202E", "#E3B24B"],
    addedOn: "2026-09-01",
  },
  {
    id: "shiuli-bela-saree",
    name: "Shiuli Bela Saree",
    bn: "শিউলি বেলা",
    collection: "kalka",
    type: "saree",
    price: 3950,
    blurb: "Red jamdani for the season when shiuli flowers fall.",
    story:
      "Shiuli blooms in autumn, right before pujo — and so does this saree. A red soft jamdani with small kalka buttis woven all over the body.",
    details: [
      { label: "Fabric", value: "Soft jamdani" },
      { label: "Motif", value: "Kalka buttis all over" },
      { label: "Care", value: "Dry clean only" },
    ],
    measurements: SAREE_MEASURE,
    tags: ["pujo"],
    stock: 3,
    photo: U("1727934404073-797950f15a76"),
    photoAlt: "A woman sitting on a bench wearing a red sari",
    focus: "50% 30%",
    palette: ["#B32434", "#F4C7B8", "#FBEDE7"],
    addedOn: "2026-08-25",
  },
  {
    id: "pujo-twirl-saree",
    name: "Pujo Parikrama Saree",
    collection: "kalka",
    type: "saree",
    price: 3600,
    blurb: "Rust and red, made for pandal-hopping till sunrise.",
    story:
      "A comfortable silk-cotton saree in rust red with a kalka border. Light enough to walk ten pandals in, pretty enough for every photo on the way.",
    details: [
      { label: "Fabric", value: "Silk-cotton" },
      { label: "Motif", value: "Kalka border" },
      { label: "Care", value: "Dry clean only" },
    ],
    measurements: SAREE_MEASURE,
    tags: ["pujo", "new"],
    photo: U("1771507057886-defc3e54aa8c"),
    photoAlt: "A woman in a red and brown sari twirling joyfully",
    focus: "50% 30%",
    palette: ["#A8392B", "#E08A4A", "#F8E3D2"],
    addedOn: "2026-09-16",
  },
  {
    id: "boishakhi-neel-saree",
    name: "Boishakhi Neel Saree",
    bn: "বৈশাখী",
    collection: "kalka",
    type: "saree",
    price: 4100,
    blurb: "Peacock blue and gold, woven for Poila Boishakh.",
    story:
      "Deep blue silk with a gold kalka border that glints in the New Year sun. Wear it with a big red bindi and a gajra.",
    details: [
      { label: "Fabric", value: "Katan silk blend" },
      { label: "Motif", value: "Gold kalka border" },
      { label: "Care", value: "Dry clean only" },
    ],
    measurements: SAREE_MEASURE,
    tags: [],
    photo: U("1732381917488-39f31539cd4f"),
    photoAlt: "A woman in a blue and gold sari",
    focus: "50% 25%",
    palette: ["#1F4E8C", "#D4AF37", "#E6EDF7"],
    addedOn: "2026-04-14",
  },
  {
    id: "golaper-ghor-saree",
    name: "Golaper Ghor Saree",
    bn: "গোলাপের ঘর",
    collection: "kalka",
    type: "saree",
    price: 3700,
    blurb: "A 'house of roses' in pink, with a painted kalka pallu.",
    story:
      "Soft pink silk-cotton with a hand-painted pallu: kalkas and roses curling together. No two pallus come out the same.",
    note: "every pallu is painted by hand",
    details: [
      { label: "Fabric", value: "Silk-cotton" },
      { label: "Motif", value: "Hand-painted kalka pallu" },
    ],
    measurements: SAREE_MEASURE,
    tags: ["handpainted"],
    photo: U("1732381917604-bc8f046965ee"),
    photoAlt: "A woman in a pink sari standing under a floral arch",
    focus: "50% 25%",
    palette: ["#E68AA6", "#F6CBD6", "#FCEFF2"],
    addedOn: "2026-07-30",
  },
  {
    id: "neel-kalka-dress",
    name: "Neel Kalka Dress",
    bn: "নীল কলকা",
    collection: "kalka",
    type: "dress",
    price: 2650,
    blurb: "An indigo dress printed all over with tiny kalkas.",
    story:
      "Our favourite way to wear kalka on a weekday — a navy cotton dress with an all-over paisley print, side pockets and a gathered waist.",
    note: "it has pockets!!",
    details: [
      { label: "Fabric", value: "Printed cotton" },
      { label: "Motif", value: "All-over kalka print" },
      { label: "Pockets", value: "Yes, two!" },
      { label: "Care", value: "Machine wash cold" },
    ],
    sizeChart: flared(45),
    colours: [
      { name: "Neel", hex: "#23305E" },
      { name: "Sindoor", hex: "#A8232F", palette: ["#A8232F", "#E3B24B", "#F8E3E1"] },
    ],
    tags: ["bestseller"],
    photo: U("1760287364219-160c234ded00"),
    photoAlt: "Dark blue dress with a paisley pattern on display",
    focus: "50% 30%",
    palette: ["#23305E", "#C4A15A", "#E9ECF4"],
    addedOn: "2026-06-08",
  },
  {
    id: "aam-kalka-dupatta",
    name: "Aam Kalka Dupatta",
    bn: "আম কলকা",
    collection: "kalka",
    type: "dupatta",
    price: 1490,
    blurb: "Sunset-warm kalkas, printed shoulder to shoulder.",
    story:
      "Kalka comes from the shape of a raw mango (aam). This dupatta is covered in them, in turmeric, rust and rose, printed by hand with wooden blocks.",
    note: "kalka = little raw mango",
    details: [
      { label: "Fabric", value: "Mulmul cotton" },
      { label: "Print", value: "Hand block, natural dyes" },
      { label: "Care", value: "Hand wash cold, separately" },
    ],
    colours: [
      { name: "Turmeric", hex: "#D9822B" },
      { name: "Indigo", hex: "#2E3F7F", palette: ["#2E3F7F", "#D9822B", "#E8ECF6"] },
    ],
    measurements: [{ label: "Length × width", value: "2.4 m × 1 m" }],
    tags: ["new"],
    photo: U("1770732940492-ec02987b3d4c"),
    photoAlt: "Close-up of a paisley pattern with warm colours",
    palette: ["#D9822B", "#B23A48", "#F6DFC2"],
    addedOn: "2026-09-09",
  },
  {
    id: "kalka-kalpana-stole",
    name: "Kalka Kalpana Stole",
    bn: "কল্পনা",
    collection: "kalka",
    type: "dupatta",
    price: 1150,
    blurb: "White-and-orange kalkas marching over soft grey.",
    story:
      "A lightweight stole block-printed with rows of white and orange kalkas. Wrap it over a kurta or tie it on your bag.",
    details: [
      { label: "Fabric", value: "Cotton-modal" },
      { label: "Print", value: "Hand block" },
      { label: "Care", value: "Hand wash cold" },
    ],
    measurements: [{ label: "Length × width", value: "2 m × 0.7 m" }],
    tags: [],
    photo: U("1783763624907-b9974ce1dbe3"),
    photoAlt: "Repeating white and orange paisley pattern on a grey background",
    palette: ["#8A8C91", "#EE8A3C", "#F4F1EC"],
    addedOn: "2026-05-15",
  },
  {
    id: "raater-kalka-shawl",
    name: "Raater Kalka Shawl",
    bn: "রাতের কলকা",
    collection: "kalka",
    type: "dupatta",
    price: 1350,
    blurb: "'Kalkas of the night' — fine paisleys on midnight blue.",
    story:
      "A soft wool-blend shawl covered edge to edge in intricate kalkas. Warm for December evenings at the Park Street lights.",
    details: [
      { label: "Fabric", value: "Wool-viscose blend" },
      { label: "Weave", value: "Jacquard kalka" },
      { label: "Care", value: "Dry clean only" },
    ],
    colours: [
      { name: "Midnight", hex: "#1D2B53" },
      { name: "Maroon", hex: "#5E1624", palette: ["#5E1624", "#D9A441", "#F3E6E3"] },
    ],
    measurements: [{ label: "Length × width", value: "2 m × 1 m" }],
    tags: [],
    photo: U("1779628924706-0dcfcf6af52e"),
    photoAlt: "Intricate paisley pattern on dark blue textile",
    palette: ["#1D2B53", "#B7462E", "#E4DCCB"],
    addedOn: "2026-02-02",
  },
  {
    id: "kalka-block-scarf-stack",
    name: "Kalka Scarf Surprise",
    collection: "kalka",
    type: "dupatta",
    price: 890,
    blurb: "A surprise kalka scarf, picked from our stack just for you.",
    story:
      "Tell us your favourite colours and we'll pick a block-printed kalka scarf from the stack. A lovely gift when you can't decide.",
    details: [
      { label: "Fabric", value: "Printed cotton" },
      { label: "Print", value: "Hand block, assorted" },
      { label: "Gift", value: "Comes wrapped with a note" },
    ],
    measurements: [{ label: "Length × width", value: "1.8 m × 0.5 m" }],
    tags: [],
    photo: U("1779470703519-05af825e87cd"),
    photoAlt: "Colourful patterned textiles and scarves stacked for sale",
    palette: ["#D35F5F", "#3F7C85", "#F0C76E"],
    addedOn: "2026-03-09",
  },
  {
    id: "nokshi-kantha-throw",
    name: "Nokshi Kantha Throw",
    bn: "নকশি কাঁথা",
    collection: "kalka",
    type: "textile",
    price: 5200,
    blurb: "A kantha throw with kalkas worked in running stitch.",
    story:
      "Nakshi kantha is Bengal's art of turning soft old saree layers into a quilt with thousands of tiny running stitches. This throw has kalkas, fish and flowers stitched in. It takes an artisan about three weeks.",
    note: "3 weeks of running stitch",
    details: [
      { label: "Craft", value: "Hand kantha stitch" },
      { label: "Layers", value: "Soft cotton, 3 layers" },
      { label: "Size", value: "150 × 220 cm" },
      { label: "Made in", value: "About 3 weeks" },
    ],
    tags: ["limited"],
    stock: 2,
    photo: U("1789841418052-78bcb32a614c"),
    photoAlt: "A woman holding a patterned quilt beside a sideboard",
    focus: "50% 40%",
    palette: ["#C24D3E", "#2C5E7A", "#F4E9D8"],
    addedOn: "2026-07-12",
  },
  {
    id: "kantha-kotha-quilt",
    name: "Sobuj Kantha Quilt",
    bn: "সবুজ কাঁথা",
    collection: "kalka",
    type: "textile",
    price: 4400,
    blurb: "Green-and-white kantha, stitched row after patient row.",
    story:
      "A lighter kantha quilt in sobuj (green) and white, with rows of running stitch and a kalka at every corner. Perfect as a bedspread or a picnic spread.",
    details: [
      { label: "Craft", value: "Hand kantha stitch" },
      { label: "Layers", value: "Soft cotton, 2 layers" },
      { label: "Size", value: "140 × 200 cm" },
      { label: "Care", value: "Gentle hand wash" },
    ],
    tags: [],
    photo: U("1695296495697-0f145e33d53a"),
    photoAlt: "Close-up of a green and white quilt",
    palette: ["#4F8A6B", "#E9F0E6", "#C3D8B9"],
    addedOn: "2026-01-10",
  },
];

export const collectionById = Object.fromEntries(collections.map((c) => [c.id, c])) as Record<CollectionId, Collection>;

export const productById = Object.fromEntries(products.map((p) => [p.id, p])) as Record<string, Product>;

export function typesIn(collection: CollectionId | "all"): ProductType[] {
  const seen = new Set<ProductType>();
  for (const p of products) if (collection === "all" || p.collection === collection) seen.add(p.type);
  return (Object.keys(typeLabels) as ProductType[]).filter((t) => seen.has(t));
}

export function priceFrom(collection: CollectionId): number {
  return Math.min(...products.filter((p) => p.collection === collection).map((p) => p.price));
}

/** What a visitor picks from: garment sizes from the size chart, or simple options like scents. */
export function optionsOf(p: Product): string[] | undefined {
  return p.sizeChart?.map((r) => r.size) ?? p.sizes;
}

/** The chosen colour, or the first (photographed) one. */
export function colourOf(p: Product, name?: string): Colour | undefined {
  if (!p.colours?.length) return undefined;
  return p.colours.find((c) => c.name === name) ?? p.colours[0];
}

/** Photo and drawing palette for a piece in a given colour. `photo` is undefined when that colour has no photo yet. */
export function lookOf(p: Product, colourName?: string) {
  const colour = colourOf(p, colourName);
  const isFirst = !colour || colour === p.colours?.[0];
  return {
    colour,
    photo: colour?.photo ?? (isFirst ? p.photo : undefined),
    photoAlt: colour?.photoAlt ?? (isFirst ? p.photoAlt : `${p.name} in ${colour?.name}`),
    palette: colour?.palette ?? p.palette,
  };
}

/** "Bust 34–42″" style summary of a size chart. */
export function sizeSummary(p: Product): string | undefined {
  const chart = p.sizeChart;
  if (!chart?.length) return undefined;
  const range = `${chart[0].size}–${chart[chart.length - 1].size}`;
  const busts = chart.map((r) => r.bust).filter((n): n is number => typeof n === "number");
  return busts.length ? `${range} · bust ${busts[0]}–${busts[busts.length - 1]}″` : range;
}
