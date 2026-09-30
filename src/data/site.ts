/**
 * Shop-wide settings. Edit these to make the menu yours.
 * Everything on the page (contact buttons, footer, WhatsApp messages) reads from here.
 */
export const site = {
  name: "Angika",
  /** Shown under the wordmark and in the browser tab. */
  tagline: "Where Style Meets Art",
  bengaliTagline: "গল্পে বোনা, হাতে আঁকা",
  description:
    "Angika is a boutique of handpicked dresses, handcrafted art and Bengali kalka textiles. Every piece is chosen one by one and priced in rupees.",

  /**
   * WhatsApp number in international format, digits only (country code + number).
   * Example for an Indian number 98765 43210 → "919876543210".
   * TODO: replace with the shop's real number.
   */
  whatsappNumber: "+916295351954",

  instagram: {
    handle: "@angikafashion", // TODO: replace with the real handle
    url: "https://www.instagram.com/angikafashion/",
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
    "Handpicked, piece by piece",
    "Real measurements on every piece",
    "Pick a colour, send a chithi",
    "Every price in rupees",
    "Where style meets art",
  ],
} as const;

export type Site = typeof site;
