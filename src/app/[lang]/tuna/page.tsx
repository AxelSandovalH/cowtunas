import Image from "next/image";
import { notFound } from "next/navigation";
import { isValidLang, type Lang } from "@/lib/i18n";
import TunaOrder from "@/components/tuna/TunaOrder";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  return {
    title:
      lang === "es"
        ? "Atún Fresco por Kilo — CowTunas"
        : "Fresh Tuna by the Kilo — CowTunas",
    description:
      lang === "es"
        ? "Atún aleta amarilla empacado al vacío, directo de nuestras salidas en Cabo San Lucas."
        : "Vacuum-packed yellowfin tuna, straight off our Cabo San Lucas charters.",
  };
}

const steps = [
  {
    emoji: "🎣",
    en: ["Caught today", "Line-caught yellowfin from our own charters in the Sea of Cortez."],
    es: ["Pescado hoy", "Aleta amarilla capturado con caña en nuestras propias salidas en el Mar de Cortés."],
  },
  {
    emoji: "🔪",
    en: ["Cleaned at the dock", "Filleted by the crew the moment we're back at the marina."],
    es: ["Limpio en el muelle", "Fileteado por la tripulación en cuanto regresamos a la marina."],
  },
  {
    emoji: "📦",
    en: ["Vacuum-packed", "Sealed in portions the same day — sashimi-grade, freezer-ready."],
    es: ["Empacado al vacío", "Sellado en porciones el mismo día — calidad sashimi, listo para congelar."],
  },
];

export default async function TunaPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  const en = lang === "en";

  return (
    <div className="bg-[#0e1621]">
      {/* Hero: flesh texture + loin */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0">
          {/* Mobile: flesh texture still */}
          <Image
            src="/texturacarnetuna.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-30 sm:hidden"
          />
          {/* Desktop: Bisbee's fleet video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/posters/hero-bisbees.jpg"
            className="absolute inset-0 w-full h-full object-cover hidden sm:block opacity-60"
          >
            <source src="/hero-bisbees.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e1621]/70 via-[#0e1621]/40 to-[#0e1621]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <p className="text-[#14a3c7] font-bold text-sm uppercase tracking-[0.3em] mb-4">
              {en ? "From our deck to your table" : "De nuestra cubierta a tu mesa"}
            </p>
            <h1 className="font-display text-5xl sm:text-7xl font-black uppercase leading-[0.95] mb-6">
              {en ? "Fresh Tuna by the Kilo" : "Atún Fresco por Kilo"}
            </h1>
            <p className="text-white/70 text-lg max-w-md mb-8">
              {en
                ? "The same cow-class yellowfin our anglers fight — cleaned, portioned and vacuum-packed the day it's caught. Delivered to your door in Los Cabos."
                : "El mismo aleta amarilla clase 'cow' que pelean nuestros pescadores — limpio, porcionado y empacado al vacío el día de su captura. Te lo llevamos a tu puerta en Los Cabos."}
            </p>
            <div className="max-w-md">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl mb-3">
                <Image
                  src="/tuna-vacuum.jpg"
                  alt={en ? "Vacuum-packed yellowfin tuna steaks on ice" : "Medallones de atún aleta amarilla empacados al vacío sobre hielo"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 448px"
                  priority
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {["/gallery/cw/cw-42.jpg", "/gallery/cw/cw-56.jpg", "/gallery/cw/cw-45.jpg"].map((src) => (
                  <div key={src} className="relative aspect-square rounded-xl overflow-hidden">
                    <Image src={src} alt="" fill sizes="160px" className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-md w-full lg:ml-auto">
            <TunaOrder lang={lang as Lang} />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#f7f3ed] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-4xl sm:text-5xl font-black text-[#1a2b3c] uppercase text-center mb-14">
            {en ? "Boat to Bag in One Day" : "Del Barco a la Bolsa en un Día"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {steps.map((s, i) => {
              const [title, body] = en ? s.en : s.es;
              return (
                <div key={i} className="bg-white rounded-2xl p-8 text-center shadow-sm">
                  <span className="text-4xl">{s.emoji}</span>
                  <p className="font-mono text-xs text-[#14a3c7] font-bold mt-4 mb-1">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-2xl font-black text-[#1a2b3c] uppercase mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <WhatsAppButton />
    </div>
  );
}
