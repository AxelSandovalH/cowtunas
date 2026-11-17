import type { Metadata } from "next";
import { BUSINESS } from "@/lib/business";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.domain),
  title: "CowTunas Fishing Charters — Cabo San Lucas",
  description:
    "Tuna-specialized sportfishing charters in Cabo San Lucas, Mexico. Depart from the Cabo San Lucas Marina with our tournament-winning captain.",
  openGraph: {
    title: "CowTunas Fishing Charters — Cabo San Lucas",
    description: "Trophy tuna specialists — Dorado, Marlin & more on request. Cabo San Lucas Marina.",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.jpg"],
  },
};


const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BUSINESS.legalName,
  url: BUSINESS.domain,
  telephone: BUSINESS.contact.phoneDisplay,
  email: BUSINESS.contact.email,
  image: `${BUSINESS.domain}/og.jpg`,
  priceRange: BUSINESS.priceRange,
  address: {
    "@type": "PostalAddress",
    ...BUSINESS.location.address,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.location.geo.latitude,
    longitude: BUSINESS.location.geo.longitude,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "06:30",
    closes: "14:00",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${barlowCondensed.variable}`}>
      <body className="min-h-full flex flex-col antialiased">
        <noscript>
          <div style={{ background: "#16283a", color: "#fff", padding: "10px 16px", textAlign: "center", fontSize: 14 }}>
            Book by WhatsApp: {BUSINESS.contact.phoneDisplay} · {BUSINESS.contact.email}
          </div>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />{children}</body>
    </html>
  );
}
