/**
 * Single source of truth for CowTunas business data.
 * Pricing, contact, schedule, policies and credentials all read from here —
 * change a value once and rates, FAQ facts, footer, checkout, metadata and
 * JSON-LD stay in sync.
 */

export const BUSINESS = {
  name: "CowTunas",
  legalName: "CowTunas Fishing Charters",
  domain: "https://www.cowtunas.com",

  contact: {
    phoneDisplay: "+52 314 122 2146",
    /** Digits only, for wa.me links */
    whatsapp: "523141222146",
    email: "reservations@cowtunas.com",
  },

  location: {
    marina: { en: "Cabo San Lucas Marina", es: "Marina de Cabo San Lucas" },
    address: {
      streetAddress: "Marina de Cabo San Lucas",
      addressLocality: "Cabo San Lucas",
      addressRegion: "Baja California Sur",
      addressCountry: "MX",
    },
    geo: { latitude: 22.8794, longitude: -109.911 },
    mapsUrl: "https://maps.google.com/?q=Marina+Cabo+San+Lucas",
  },

  boat: {
    name: "Kailani",
    model: "28 ft Mako",
    engines: "2 × Yamaha 200 hp",
    maxAnglers: 3,
  },

  schedule: {
    departure: "6:30 AM",
    /** PENDING OWNER CONFIRMATION: FAQ said 2:00 pm; an older source said 2:30 pm. */
    fullDayReturn: "2:00 PM",
  },

  trips: {
    half: {
      hours: 4,
      priceUsd: 700,
      name: { en: "Half Day", es: "Medio Día" },
    },
    full: {
      hours: 8,
      priceUsd: 1200,
      name: { en: "Full Day", es: "Día Completo" },
    },
  },

  booking: {
    /** Fraction of the trip price charged as online deposit */
    depositRate: 0.3,
    /** DRAFT — pending owner confirmation */
    cancellationPolicy: {
      en: "Full refund (minus $30 USD processing) with 15+ days notice. Full refund if the port captain closes the port for weather.",
      es: "Reembolso completo (menos $30 USD de procesamiento) con 15+ días de anticipación. Reembolso total si la capitanía cierra el puerto por clima.",
    },
  },

  /** PENDING OWNER CONFIRMATION: is bait included in the charter price? */
  bait: {
    included: false,
    note: {
      en: "Live bait runs ~$300 MXN (~$20 USD), paid at the dock.",
      es: "La carnada viva cuesta ~$300 MXN (~$20 USD), se paga en el muelle.",
    },
  },

  tunaMarket: {
    pricePerKgMxn: 350,
    minKg: 1,
    maxKg: 20,
  },

  /**
   * Real, verifiable reviews only — name, date (ISO), stars, text per language,
   * and optionally a Google Maps review URL. The Reviews section stays hidden
   * while this list is empty.
   */
  reviews: [] as Array<{
    name: string;
    date: string;
    stars: number;
    text: { en: string; es: string };
    url?: string;
  }>,

  /**
   * Shown in the trust block only when set (never invent these).
   * e.g. credentials.fishingPermit = { label: {...}, id: "PERMIT-123" }
   */
  credentials: {
    fishingPermit: null as null | { label: { en: string; es: string }; id?: string },
    insurance: null as null | { label: { en: string; es: string }; id?: string },
  },

  priceRange: "$700 – $1,200 USD",
} as const;

export type TripId = keyof typeof BUSINESS.trips;

export const waLink = (message: string) =>
  `https://wa.me/${BUSINESS.contact.whatsapp}?text=${encodeURIComponent(message)}`;

export const fmtUsd = (n: number) => `$${n.toLocaleString("en-US")} USD`;
export const fmtMxn = (n: number) => `$${n.toLocaleString("en-US")} MXN`;
