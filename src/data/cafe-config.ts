/**
 * Central Configuration for EMBER & OAK Specialty Coffee Roastery
 * All business details are isolated here so they can easily be customized
 * for a real client without touching component code.
 */

export const CAFE_CONFIG = {
  brand: {
    name: "EMBER & OAK",
    tagline: "Coffee, slowly made.",
    subtagline: "The journey from fire to table.",
    concept: "Ember represents the heat, fire, and kinetic energy of the roast. Oak represents patience, barrel aging, and quiet craftsmanship.",
    established: 2024,
    roasterSpecs: "San Franciscan SF-25 Cast Iron Roaster",
    batchSize: "12kg micro-batches",
    caskRestDuration: "72 hours in French Oak charred barrels",
  },
  contact: {
    address: {
      street: "18 Ironworks Lane, Old Foundry Quarter",
      city: "London",
      postcode: "EC2A 4NE",
      country: "United Kingdom",
      mapCoordinates: { lat: 51.5236, lng: -0.0815 },
      transit: "Old Street Station (Northern Line) — 4 min walk",
    },
    email: "hello@emberandoak.com",
    reservationsEmail: "tables@emberandoak.com",
    wholesaleEmail: "wholesale@emberandoak.com",
    phone: "+44 (0) 20 7946 0831",
  },
  hours: [
    { days: "Monday – Friday", times: "07:00 — 17:30", note: "Full Kitchen & Espresso Bar" },
    { days: "Saturday", times: "08:00 — 18:30", note: "Cupping Sessions at 10:00" },
    { days: "Sunday", times: "08:30 — 17:00", note: "Slow Brew & Pastry Service" },
    { days: "Thursday & Friday Evenings", times: "18:00 — 22:00", note: "Oak Hour: Smoked Coffee & Vinyl" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com", handle: "@emberandoak" },
    { label: "Substack", href: "https://substack.com", handle: "Ember & Oak Dispatches" },
    { label: "YouTube", href: "https://youtube.com", handle: "Slow Roast Chronicles" },
  ],
  stats: [
    { value: "12kg", label: "Micro-Batch Roast Limit", detail: "Uniform thermodynamic precision" },
    { value: "72h", label: "Oak Cask Maturation", detail: "Mellows citric acids into caramel" },
    { value: "100%", label: "Direct Origin Trade", detail: "Single-estate farmgate contracts" },
    { value: "88+", label: "Q-Grade Specialty Floor", detail: "Rigorous cupping threshold" },
  ],
  legal: {
    isDemonstrationData: true,
    disclaimer: "Ember & Oak is a fictional demonstration specialty roastery concept built for portfolio presentation.",
  },
};
