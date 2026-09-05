import Image from "next/image";
import BookButton from "@/components/booking/BookButton";
import type { Translations } from "@/lib/translations/types";
import type { Lang } from "@/lib/i18n";

type Props = { dict: Translations; lang: Lang };

export default function Hero({ dict, lang }: Props) {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Sunset photo background */}
      <div className="absolute inset-0">
        <Image
          src="/gallery/iphone5.jpeg"
          alt={lang === "en" ? "The Kailani fishing at sunrise in the Sea of Cortez" : "El Kailani pescando al amanecer en el Mar de Cortés"}
          fill
          sizes="100vw"
          priority
          quality={90}
          className="object-cover object-[68%_30%] sm:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/60" />
      </div>

      {/* Content — anchored to the bottom */}
      <div className="relative z-10 w-full text-white px-4 sm:px-6 pb-24">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <h1 className="rise-in-2 font-display text-3xl sm:text-4xl lg:text-5xl font-black leading-[1] uppercase tracking-tight max-w-xl"
              style={{ textShadow: "0 4px 40px rgba(0,0,0,0.6)" }}
            >
              {dict.hero.headline}
            </h1>
          </div>

          <div className="rise-in-3 shrink-0">
            <BookButton
              label={dict.hero.cta_primary}
              className="btn-cowhide font-black px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-all duration-200 shadow-2xl hover:shadow-black/30 hover:-translate-y-1"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="rise-in-3 absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1.5 pointer-events-none">
        <span className="pulse-soft text-white text-xs font-semibold uppercase tracking-[0.3em]">
          {lang === "en" ? "Scroll to explore" : "Desliza para explorar"}
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-white/70 flex justify-center pt-2">
          <div className="wheel-drop w-1.5 h-1.5 rounded-full bg-white" />
        </div>
        <div className="flex flex-col items-center -space-y-2.5">
          {["chev-bob", "chev-bob-2"].map((cls) => (
            <svg
              key={cls}
              className={`${cls} w-6 h-6 text-white`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          ))}
        </div>
      </div>
    </section>
  );
}
