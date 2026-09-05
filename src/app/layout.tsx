import type { Metadata } from "next";
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
  metadataBase: new URL("https://cowtunas.vercel.app"),
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${barlowCondensed.variable}`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
