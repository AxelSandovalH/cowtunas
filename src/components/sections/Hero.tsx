import Image from "next/image";
import type { Translations } from "@/lib/translations/types";
import type { Lang } from "@/lib/i18n";

type Props = {
  dict: Translations;
  lang: Lang;
};

export default function Hero({ dict, lang }: Props) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.jpg"
          alt="Fishing in Cabo San Lucas"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-4xl mx-auto pt-24">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs sm:text-sm font-medium px-4 py-2 rounded-full mb-6">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          {dict.hero.badge}
        </div>

        {/* Tagline */}
        <p className="text-[#d26e4b] font-semibold text-sm sm:text-base uppercase tracking-widest mb-4">
          {dict.hero.tagline}
        </p>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 whitespace-pre-line drop-shadow-lg">
          {dict.hero.headline}
        </h1>

        {/* Subheadline */}
        <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
          {dict.hero.subheadline}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`/${lang}#contact`}
            className="bg-[#d26e4b] hover:bg-[#bc5e3d] text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            {dict.hero.cta_primary}
          </a>
          <a
            href={`/${lang}#gallery`}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all duration-200"
          >
            {dict.hero.cta_secondary}
          </a>
        </div>

        {/* Quick stats */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {[
            { value: "35+", label: lang === "en" ? "Years Experience" : "Años de Exp." },
            { value: "300lb+", label: lang === "en" ? "Biggest Tuna" : "Atún más grande" },
            { value: "5★", label: lang === "en" ? "Guest Rating" : "Calificación" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#d26e4b]">{stat.value}</div>
              <div className="text-white/70 text-xs sm:text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-6 h-6 text-white/60"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
