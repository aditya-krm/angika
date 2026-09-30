/**
 * Shop-wide settings. Edit these to make the menu yours.
 * Everything on the page (contact buttons, footer, WhatsApp messages) reads from here.
 */
export const site = {
  name: "Angika",
  /** Shown under the wordmark and in the browser tab. */
  tagline: "Dresses, handmade art & Bengali kalka",
  bengaliTagline: "গল্পে বোনা, হাতে আঁকা",
  description:
    "Angika is a boutique menu of hand-picked dresses, handcrafted art pieces and Bengali kalka (paisley) textiles — every price in rupees, every piece chosen with love.",

  /**
   * WhatsApp number in international format, digits only (country code + number).
   * Example for an Indian number 98765 43210 → "919876543210".
   * TODO: replace with the shop's real number.
   */
  whatsappNumber: "+916295351954",

  instagram: {
    handle: "@angika.studio", // TODO: replace with the real handle
    url: "https://www.instagram.com/",
  },

  visit: {
    title: "Studio visits by appointment",
    note: "Message us on WhatsApp and we'll share the address and a slot that suits you.",
    hours: [
      { days: "Mon – Sat", time: "11:00 am – 8:00 pm" },
      { days: "Sunday", time: "By appointment" },
    ],
  },

  /** Printed along the measuring tape under the almirah. */
  tape: [
    "Pujo edit is here",
    "Made-to-order in 7 – 10 days",
    "Free fall & pico on every saree",
    "Hand-painted, never printed",
    "Pan-India shipping",
    "One free alteration on your first fitting",
  ],
} as const;

export type Site = typeof site;
