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
  title: "CowTunas Fishing Charters — Cabo San Lucas",
  description:
    "World-class sportfishing charters in Los Cabos, Mexico. Depart from Puerto Los Cabos Marina with tournament-winning Captain Nestor.",
  openGraph: {
    title: "CowTunas Fishing Charters — Cabo San Lucas",
    description: "Trophy tuna, Dorado & Marlin. Captain Nestor. Puerto Los Cabos Marina.",
    images: ["/gallery/033A0454-scaled.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${barlowCondensed.variable}`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
