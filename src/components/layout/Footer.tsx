import Link from "next/link";
import Image from "next/image";
import type { Lang } from "@/lib/i18n";
import type { Translations } from "@/lib/translations/types";

type Props = {
  dict: Translations;
  lang: Lang;
};

export default function Footer({ dict, lang }: Props) {
  const year = new Date().getFullYear();
  const links = [
    { href: `/${lang}#boat`, label: dict.nav.boat },
    { href: `/${lang}#captain`, label: dict.nav.captain },
    { href: `/${lang}#gallery`, label: dict.nav.gallery },
    { href: `/${lang}#reviews`, label: dict.nav.reviews },
    { href: `/${lang}#faq`, label: dict.nav.faq },
    { href: `/${lang}#contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="bg-[#1a2b3c] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image src="/ct-logo.png" alt="CowTunas" width={44} height={44} className="rounded-full" />
            <span className="font-bold text-xl">CowTunas</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">{dict.footer.tagline}</p>
          <div className="flex gap-4 mt-5">
            <a
              href={`https://wa.me/19492946790`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-widest text-gray-400 mb-4">
            {dict.footer.links_title}
          </h4>
          <ul className="space-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-gray-300 hover:text-white text-sm transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-widest text-gray-400 mb-4">
            {dict.footer.contact_title}
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href={`tel:${dict.contact.phone}`} className="hover:text-white transition-colors">
                📞 {dict.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${dict.contact.email_reservations}`} className="hover:text-white transition-colors">
                ✉️ {dict.contact.email_reservations}
              </a>
            </li>
            <li className="leading-relaxed">📍 {dict.contact.location}</li>
          </ul>

          <div className="mt-5">
            <p className="text-xs text-gray-500 mb-2">{dict.footer.sponsored}</p>
            <div className="flex flex-wrap gap-2 text-xs text-gray-400">
              <span className="border border-gray-600 px-2 py-1 rounded">Pelagic</span>
              <span className="border border-gray-600 px-2 py-1 rounded">Fresh One Lures</span>
              <span className="border border-gray-600 px-2 py-1 rounded">Bloody Decks</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-gray-500">
        © {year} CowTunas Fishing Charters. {dict.footer.rights}
        <span className="mx-2">·</span>
        <Link href={lang === "en" ? "/es" : "/en"} className="hover:text-white">
          {lang === "en" ? "Español" : "English"}
        </Link>
      </div>
    </footer>
  );
}
