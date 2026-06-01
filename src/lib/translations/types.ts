export interface Translations {
  nav: {
    home: string;
    boat: string;
    captain: string;
    gallery: string;
    reviews: string;
    faq: string;
    contact: string;
    book: string;
  };
  hero: {
    tagline: string;
    headline: string;
    subheadline: string;
    cta_primary: string;
    cta_secondary: string;
    badge: string;
  };
  whyus: {
    title: string;
    subtitle: string;
    items: { title: string; body: string }[];
  };
  captain: {
    title: string;
    subtitle: string;
    body: string;
    stats: { value: string; label: string }[];
  };
  boat: {
    title: string;
    subtitle: string;
    specs: { label: string; value: string }[];
  };
  reviews: {
    title: string;
    subtitle: string;
    items: { name: string; stars: number; text: string }[];
  };
  faq: {
    title: string;
    items: { q: string; a: string }[];
  };
  contact: {
    title: string;
    subtitle: string;
    phone: string;
    email_reservations: string;
    email_info: string;
    location: string;
    form: {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
      submit: string;
    };
  };
  footer: {
    tagline: string;
    links_title: string;
    contact_title: string;
    rights: string;
    sponsored: string;
  };
}
