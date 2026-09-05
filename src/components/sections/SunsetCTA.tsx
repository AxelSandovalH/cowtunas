import Reveal from "@/components/ui/Reveal";
import BookButton from "@/components/booking/BookButton";
import type { Lang } from "@/lib/i18n";

type Props = { lang: Lang };

export default function SunsetCTA({ lang }: Props) {
  const en = lang === "en";

  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed sunrise photo */}
      <div className="absolute inset-0">
        <img loading="lazy" decoding="async"
          src="/gallery/033A0454-scaled.jpg"
          alt={en ? "Anglers with a giant yellowfin tuna aboard the Kailani" : "Pescadores con un atún aleta amarilla gigante a bordo del Kailani"}
          className="w-full h-full object-cover object-[50%_25%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-32 sm:py-44 text-center text-white">
        <Reveal>
          <p className="text-[#f7f3ed]/90 font-bold text-xs sm:text-sm uppercase tracking-[0.3em] mb-4"
             style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            {en ? "Your day starts before sunrise" : "Tu día empieza antes del amanecer"}
          </p>
          <h2
            className="font-display text-4xl sm:text-6xl font-black uppercase leading-[1.05] mb-10"
            style={{ textShadow: "0 4px 40px rgba(0,0,0,0.6)" }}
          >
            {en
              ? "The Bite Is On. Are You Coming?"
              : "La Picada Está Encendida. ¿Vienes?"}
          </h2>
          <BookButton
            label={en ? "Book Your Charter" : "Reserva Tu Charter"}
            className="btn-cow text-white font-black px-12 py-5 rounded-xl text-base uppercase tracking-wider transition-all duration-200 shadow-2xl hover:shadow-black/30 hover:-translate-y-1"
          />
        </Reveal>
      </div>
    </section>
  );
}
