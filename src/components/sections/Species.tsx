import Reveal from "@/components/ui/Reveal";
import BookButton from "@/components/booking/BookButton";
import type { Lang } from "@/lib/i18n";

type Props = { lang: Lang };

const species = [
  {
    emoji: "🐟",
    name: "Yellowfin Tuna",
    nameEs: "Atún Aleta Amarilla",
    season: "Year-round · Peak Oct – Feb",
    seasonEs: "Todo el año · Pico Oct – Feb",
    blurb: "Our specialty. Cow-class fish over 200 lb run these waters every season.",
    blurbEs: "Nuestra especialidad. Atunes clase 'cow' de más de 200 lb corren estas aguas cada temporada.",
    highlight: true,
  },
  {
    emoji: "🎣",
    name: "Dorado / Mahi-Mahi",
    nameEs: "Dorado",
    season: "Jul – Nov",
    seasonEs: "Jul – Nov",
    blurb: "Acrobatic, aggressive and delicious — the crowd favorite.",
    blurbEs: "Acrobático, agresivo y delicioso — el favorito de todos.",
    highlight: false,
  },
  {
    emoji: "⚡",
    name: "Wahoo",
    nameEs: "Wahoo",
    season: "Sep – Dec",
    seasonEs: "Sep – Dic",
    blurb: "The fastest bite in the Sea of Cortez. Blistering runs, razor teeth.",
    blurbEs: "La picada más rápida del Mar de Cortés. Corridas explosivas, dientes de navaja.",
    highlight: false,
  },
  {
    emoji: "🗡️",
    name: "Marlin",
    nameEs: "Marlín",
    season: "Jun – Oct",
    seasonEs: "Jun – Oct",
    blurb: "Striped, blue and black. The bucket-list billfish, released healthy.",
    blurbEs: "Rayado, azul y negro. El pez de la lista de deseos, liberado sano.",
    highlight: false,
  },
];

export default function Species({ lang }: Props) {
  const en = lang === "en";

  return (
    <section id="species" className="py-24 bg-[#f7f3ed] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#14a3c7] font-bold text-sm uppercase tracking-widest mb-3">
            {en ? "What You'll Catch" : "Qué Vas a Pescar"}
          </p>
          <h2 className="font-display text-5xl sm:text-6xl font-black text-[#1a2b3c] uppercase mb-4">
            {en ? "The Catch" : "La Pesca"}
          </h2>
          <p className="text-gray-500 text-lg">
            {en
              ? "We specialize in big tuna — but tell us what you want to chase and we'll make it happen."
              : "Nos especializamos en atún grande — pero dinos qué quieres pescar y lo hacemos posible."}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {species.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.1}>
              <div
                className={`h-full rounded-2xl p-8 flex flex-col transition-transform duration-300 hover:-translate-y-1 ${
                  s.highlight
                    ? "bg-[#1a2b3c] text-white shadow-2xl"
                    : "bg-white text-[#1a2b3c] shadow-sm border border-gray-100"
                }`}
              >
                <span className="text-4xl mb-4">{s.emoji}</span>
                <h3 className="font-display text-2xl font-black uppercase leading-tight mb-1">
                  {en ? s.name : s.nameEs}
                </h3>
                <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${s.highlight ? "text-[#14a3c7]" : "text-[#14a3c7]"}`}>
                  {en ? s.season : s.seasonEs}
                </p>
                <p className={`text-sm leading-relaxed ${s.highlight ? "text-white/80" : "text-gray-500"}`}>
                  {en ? s.blurb : s.blurbEs}
                </p>
                {s.highlight && (
                  <span className="mt-4 inline-block self-start bg-[#14a3c7] text-white text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    {en ? "Our Specialty" : "Nuestra Especialidad"}
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center">
          <BookButton
            label={en ? "Chase Your Trophy" : "Persigue Tu Trofeo"}
            className="btn-cow text-white font-black px-10 py-4 rounded-xl text-sm uppercase tracking-wider shadow-xl hover:-translate-y-1 transition-all duration-200"
          />
        </Reveal>
      </div>
    </section>
  );
}
