import Reveal from "@/components/ui/Reveal";
import type { Lang } from "@/lib/i18n";

type Props = { lang: Lang };

export default function KailaniHero({ lang }: Props) {
  const en = lang === "en";

  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed boat photo */}
      <div className="absolute inset-0">
        <img
          src="/gallery/DJI_0182-scaled.jpg"
          alt={en ? "The Kailani off the coast of San Jose del Cabo" : "El Kailani frente a la costa de San José del Cabo"}
          className="w-full h-full object-cover object-[70%_60%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
        <Reveal>
          <h2
            className="font-display text-4xl sm:text-6xl font-black uppercase text-white leading-[1.05] max-w-3xl mb-10"
            style={{ textShadow: "0 4px 30px rgba(0,0,0,0.55)" }}
          >
            {en
              ? "The Kailani — Your Cow Tuna Machine"
              : "El Kailani — Tu Máquina de Atunes Vaca"}
          </h2>

          {/* Navy info box */}
          <div className="bg-[#1a2b3c]/95 text-white max-w-2xl p-8 sm:p-10 rounded-sm leading-relaxed text-base sm:text-lg mb-8 shadow-2xl">
            {en ? (
              <>
                The Kailani is not just a panga; she is a 28ft Mako built to chase
                the biggest tuna in the Sea of Cortez. While big cruisers troll the
                same crowded lanes, the Kailani is fast and nimble — we follow the
                bite, running to Gordo Banks or north to Vinorama with twin Yamaha
                200s, tuna tubes full of live bait, and a fish finder loaded with
                35 years of secret spots.
              </>
            ) : (
              <>
                El Kailani no es solo una panga; es un Mako de 28 pies construido
                para perseguir los atunes más grandes del Mar de Cortés. Mientras
                los cruceros grandes trolean las mismas rutas saturadas, el Kailani
                es rápido y ágil — seguimos la picada, corriendo a Gordo Banks o al
                norte hasta Vinorama con dos Yamaha 200, tubos con carnada viva y
                una sonda cargada con 35 años de puntos secretos.
              </>
            )}
          </div>

          <a
            href="#boat"
            className="inline-block btn-tuna font-bold px-10 py-4 text-base sm:text-lg transition-colors shadow-xl"
          >
            {en ? "Explore the Kailani" : "Conoce el Kailani"}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
