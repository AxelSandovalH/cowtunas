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
              <img
                src="/gallery/IMG_9496-1.jpeg"
                alt={en ? "Trophy yellowfin tuna hung at the dock" : "Atún aleta amarilla de trofeo colgado en el muelle"}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </div>
          </Reveal>
          <Reveal direction="right">
            <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-[#446084] mb-6">
              {en ? "A Day of Fishing" : "Un Día de Pesca"}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {en
                ? "The best part about being on the ocean is that every day is different. Fishing with Cowtunas you can be sure we are prepared to adapt to changing conditions and do everything we can to give you the best experience possible. Whether you are a first-time angler or a seasoned fisherman, we look forward to having you on board."
                : "Lo mejor de estar en el mar es que cada día es diferente. Pescando con Cowtunas puedes estar seguro de que estamos preparados para adaptarnos a las condiciones y hacer todo lo posible por darte la mejor experiencia. Seas pescador primerizo o experimentado, nos encantará tenerte a bordo."}
            </p>
            <a href="#faq" className="inline-flex items-center gap-2 text-[#d26e4b] font-bold text-lg hover:gap-3 transition-all">
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
            <p className="text-[#d26e4b] font-bold text-lg mb-6">
              {en
                ? "A panga made for adventure"
                : "Una panga hecha para la aventura"}
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {en
                ? "We are a family-run operation out of La Playita that follows all Mexican safety requirements and laws. Fully equipped with top-of-the-line tackle, live bait and safety gear, we deliver top-quality service to every client — and we clean and vacuum-pack your catch at the end of the day."
                : "Somos una operación familiar de La Playita que cumple todos los requisitos y leyes de seguridad mexicanas. Totalmente equipados con equipo de primera, carnada viva y equipo de seguridad, damos un servicio de calidad a cada cliente — y al final del día limpiamos y empacamos al vacío tu captura."}
            </p>
            <a href="#boat" className="inline-flex items-center gap-2 text-[#d26e4b] font-bold text-lg hover:gap-3 transition-all">
              {en ? "Meet the Boat" : "Conoce la Lancha"}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </Reveal>
          <Reveal direction="right">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
              <img
                src="/gallery/iphone14-scaled.jpeg"
                alt={en ? "Happy anglers showing off their mahi-mahi catch" : "Pescadores felices mostrando sus dorados"}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
