import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CowTunas Fishing Charters — Cabo San Lucas",
  description:
    "World-class sportfishing charters in Los Cabos, Mexico. Depart from Puerto Los Cabos Marina with tournament-winning Captain Nestor.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
