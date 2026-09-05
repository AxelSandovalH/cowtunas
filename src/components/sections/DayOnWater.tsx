import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import type { Lang } from "@/lib/i18n";

type Props = { lang: Lang };

export default function DayOnWater({ lang }: Props) {
  const en = lang === "en";

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-24">

        {/* Block 1 — image left, text right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal direction="left">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
              <Image
          src="/gallery/IMG_9499-1.jpeg"
          alt={en ? "Trophy yellowfin tuna hung at the dock" : "Atún aleta amarilla de trofeo colgado en el muelle"}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-top"
        />
            </div>
          </Reveal>
          <Reveal direction="right">
            <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-[#446084] mb-6">
              {en ? "A Day of Fishing" : "Un Día de Pesca"}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {en
                ? "Every day out here is different. First trip or fiftieth — we put you on fish."
                : "Cada día en el mar es diferente. Sea tu primer viaje o el cincuenta — te ponemos sobre los peces."}
            </p>
            <a href="#faq" className="inline-flex items-center gap-2 text-[#14a3c7] font-bold text-lg hover:gap-3 transition-all">
              {en ? "Learn More" : "Saber Más"}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </Reveal>
        </div>

        {/* Block 2 — text left, image right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal direction="left">
            <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-[#446084] mb-3">
              {en ? "About Cowtunas" : "Sobre Cowtunas"}
            </h2>
            <p className="text-[#14a3c7] font-bold text-lg mb-6">
              {en
                ? "A panga made for adventure"
                : "Una panga hecha para la aventura"}
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {en
                ? "Family-run, tuna-specialized, fully equipped. Your catch comes home cleaned and vacuum-packed."
                : "Operación familiar, especializada en atún, totalmente equipada. Tu captura llega a casa limpia y empacada al vacío."}
            </p>
            <a href="#boat" className="inline-flex items-center gap-2 text-[#14a3c7] font-bold text-lg hover:gap-3 transition-all">
              {en ? "Meet the Boat" : "Conoce la Lancha"}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </Reveal>
          <Reveal direction="right">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
              <Image
          src="/gallery/iphone14-scaled.jpeg"
          alt={en ? "Happy anglers showing off their mahi-mahi catch" : "Pescadores felices mostrando sus dorados"}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
