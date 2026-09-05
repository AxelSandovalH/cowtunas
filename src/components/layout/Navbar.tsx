"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import BookButton from "@/components/booking/BookButton";
import type { Lang } from "@/lib/i18n";
import type { Translations } from "@/lib/translations/types";

type Props = {
  dict: Translations;
  lang: Lang;
};

export default function Navbar({ dict, lang }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const other = lang === "en" ? "es" : "en";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: `/${lang}#boat`, label: dict.nav.boat },
    { href: `/${lang}/gallery`, label: dict.nav.gallery },
    { href: `/${lang}#reviews`, label: dict.nav.reviews },
    { href: `/${lang}#faq`, label: dict.nav.faq },
    { href: `/${lang}#contact`, label: dict.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-3"
      }`}
    >
      <div className="w-full px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-3">
          <Image
            src="/ct-logo.png"
            alt="CowTunas"
            width={152}
            height={112}
            className="h-20 w-auto md:h-28"
          />
          <span
            className={`font-display font-black uppercase text-3xl md:text-4xl tracking-tight transition-colors ${
              scrolled ? "text-[#334862]" : "text-white"
            }`}
          >
            <span className="word-cow">Cow</span>
            <span className="word-tuna">Tunas</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-[#14a3c7] ${
                scrolled ? "text-[#334862]" : "text-white/90"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Lang toggle */}
          <Link
            href={`/${other}`}
            className={`text-xs font-semibold uppercase tracking-widest border px-2 py-1 rounded transition-colors ${
              scrolled
                ? "border-[#446084] text-[#446084] hover:bg-[#446084] hover:text-white"
                : "border-white/60 text-white hover:bg-white/20"
            }`}
          >
            {other}
          </Link>

          {/* Book CTA */}
          <BookButton
            label={dict.nav.book}
            className="btn-cow text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden p-2 ${scrolled ? "text-[#334862]" : "text-white"}`}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <nav className="flex flex-col px-4 py-4 gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-[#334862] font-medium py-1 border-b border-gray-100"
              >
                {l.label}
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <Link
                href={`/${other}`}
                className="text-xs font-semibold uppercase border border-[#446084] text-[#446084] px-3 py-2 rounded"
              >
                {other.toUpperCase()}
              </Link>
              <BookButton
                label={dict.nav.book}
                className="flex-1 btn-cow text-sm font-semibold px-4 py-2 rounded-lg text-center"
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
