import type { Translations } from "./types";

const en: Translations = {
  nav: {
    home: "Home",
    boat: "The Boat",
    captain: "Captain",
    gallery: "Gallery",
    reviews: "Reviews",
    faq: "FAQ",
    contact: "Contact",
    book: "Book Now",
  },
  hero: {
    tagline: "World-Class Sportfishing in Los Cabos",
    headline: "Chase the Biggest Tuna\nin Cabo San Lucas",
    subheadline:
      "Depart from La Playita Marina aboard the 28ft Kailani, skippered by tournament-winning Captain Nestor with 35 years on these waters.",
    cta_primary: "Book Your Charter",
    cta_secondary: "See Our Catches",
    badge: "Departing from Puerto Los Cabos Marina",
  },
  whyus: {
    title: "Why Fish With CowTunas?",
    subtitle:
      "We go above and beyond to put you on fish — every single trip.",
    items: [
      {
        title: "Tournament-Winning Captain",
        body: "Captain Nestor has 35 years on these waters and has won the 2022 Brisbe Tuna Off Shore Tournament. His local knowledge is unmatched.",
      },
      {
        title: "One-on-One Experience",
        body: "We keep it personal. You get the full attention of your captain and crew from first light until you're back at the dock.",
      },
      {
        title: "Secret Local Spots",
        body: "Our Lowrance fish finder holds coordinates to spots only locals know — Gordo Banks, Wahoo Banks, Cardon, Vinorama and more.",
      },
      {
        title: "Full-Service Charter",
        body: "We handle wrapping, vacuum-sealing and freezing your catch so you can fly it home. Smoking service also available.",
      },
    ],
  },
  captain: {
    title: "Meet Captain Nestor",
    subtitle: "Born and raised in La Playita — fishing is in his blood.",
    body: "With 35 years of experience navigating the waters of San Jose del Cabo, Captain Nestor will take you to the most productive fishing grounds Los Cabos has to offer. Fluent in English and Spanish, he will teach you everything he knows and give you the one-on-one experience of a true local expert.",
    stats: [
      { value: "35+", label: "Years Experience" },
      { value: "300lb+", label: "Biggest Tuna Caught" },
      { value: "2022", label: "Brisbe Tuna Tournament Winner" },
    ],
  },
  boat: {
    title: "The Kailani",
    subtitle: "28ft Mako — Built for these waters.",
    specs: [
      { label: "Length", value: "28 ft Mako" },
      { label: "Engines", value: "2 × Yamaha 200hp" },
      { label: "Range", value: "100 miles" },
      { label: "Capacity", value: "2–3 anglers" },
      { label: "Fish Finder", value: "Lowrance with secret spots" },
      { label: "Safety", value: "VHF radio + life vests" },
      { label: "Comfort", value: "T-Top shade + Porta-Potty" },
      { label: "Bait tank", value: "4 tuna tubes + full-day supply" },
    ],
  },
  reviews: {
    title: "Our Customers Love to Brag",
    subtitle: "Don't take our word for it.",
    items: [
      {
        name: "Bobby's Charter Guest",
        stars: 5,
        text: "I recently had the pleasure of going on a fishing charter with Cowtunas in San Jose del Cabo — it was an incredible experience, and the cost was lower than any other charter in Cabo we have booked! Bobby was an exceptional host and Captain Nestor consistently put us in the right place at the right time.",
      },
      {
        name: "Cabo Angler",
        stars: 5,
        text: "If you want a fishing trip of a lifetime, cowtunas.com is your destination. Baja's best — knowledgeable, capable, friendly captains who will put you on big game like Mahi-Mahi, Tuna and Wahoo. I was reeling fish after fish after fish. Truly second to none.",
      },
      {
        name: "Father & Son Trip",
        stars: 5,
        text: "I went on this charter with my son and it was a bonding experience we will cherish forever. The joy on his face as he reeled in his first catch will be etched in my memory. We created lifelong memories — all thanks to Cowtunas.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        q: "What time does the charter depart?",
        a: "We depart at first daylight, typically 6:30 am, and return around 2:00 pm or once you've got your catch.",
      },
      {
        q: "How many people can fish?",
        a: "The 28ft Mako accommodates 2–3 anglers. Mexican regulations require all passengers 12 and older to carry a valid fishing license regardless of whether they fish.",
      },
      {
        q: "Is equipment included?",
        a: "Yes — we supply all professional-level tournament Shimano reels, rods, and terminal tackle. You're welcome to bring your own gear too.",
      },
      {
        q: "Is bait included?",
        a: "Bait is not included in the charter price. It costs $300 pesos (~$20 USD) depending on type. We'll advise on the best bait the morning of your trip.",
      },
      {
        q: "What is the cancellation policy?",
        a: "Cancellations with 15+ days' notice receive a full refund minus a $30 admin fee. Less than 15 days forfeits the deposit. Bad weather = full refund.",
      },
      {
        q: "When is the best time to fish?",
        a: "Peak season is October through February. Yellowfin Tuna run from 50 to 300+ lbs during fall and winter. That said, we fish year-round — come when you can.",
      },
    ],
  },
  contact: {
    title: "Get in Touch",
    subtitle: "Ready to book or have questions? We'd love to hear from you.",
    phone: "949-294-6790",
    email_reservations: "reservations@cowtunas.com",
    email_info: "info@cowtunas.com",
    location: "Puerto Los Cabos Marina, La Playita, San Jose del Cabo, Mexico",
    form: {
      name: "Full Name",
      email: "Email",
      phone: "Phone Number",
      subject: "Reason for Contact",
      message: "Message",
      submit: "Send Message",
    },
  },
  footer: {
    tagline: "World-class sportfishing from Puerto Los Cabos Marina.",
    links_title: "Pages",
    contact_title: "Contact",
    rights: "All rights reserved.",
    sponsored: "Proudly sponsored by",
  },
};

export default en;
