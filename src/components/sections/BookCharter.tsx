import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import BookButton from "@/components/booking/BookButton";
import type { Lang } from "@/lib/i18n";

type Props = { lang: Lang };

export default function BookCharter({ lang }: Props) {
  const en = lang === "en";

  return (
    <section id="book-charter" className="relative overflow-hidden">
      {/* Full-bleed photo */}
      <div className="absolute inset-0">
        <Image
          src="/gallery/G0041568-scaled.jpg"
          alt={en ? "Happy angler holding a mahi-mahi aboard the Kailani" : "Pescador feliz sosteniendo un dorado a bordo del Kailani"}
          fill
          sizes="100vw"
          className="object-cover object-[35%_30%]"
        />
        {/* Darken the right side where the text sits */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/30 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-28 sm:py-36 flex justify-end">
        <div className="max-w-xl text-center sm:text-right text-white">
          <Reveal>
            <h2 className="font-display text-4xl sm:text-5xl font-black uppercase leading-tight mb-6"
                style={{ textShadow: "0 4px 30px rgba(0,0,0,0.6)" }}>
              {en
                ? "Book the Fishing Charter Experience You've Dreamed Of!"
                : "¡Reserva la Experiencia de Pesca que Siempre Soñaste!"}
            </h2>
            <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-10">
              {en ? (
                <>From the world-famous <span className="italic">Gordo Banks</span> to the secret grounds up north.</>
              ) : (
                <>Del mundialmente famoso <span className="italic">Gordo Banks</span> a los bancos secretos del norte.</>
              )}
            </p>
            <BookButton
              label={en ? "Book Charter" : "Reservar Charter"}
              className="btn-tuna font-black px-10 py-4 rounded-full text-sm uppercase tracking-wider transition-all duration-200 shadow-2xl hover:-translate-y-1"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
