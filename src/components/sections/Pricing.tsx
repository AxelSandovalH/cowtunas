"use client";

import Reveal from "@/components/ui/Reveal";
import BookButton from "@/components/booking/BookButton";
import type { Lang } from "@/lib/i18n";

type Props = { lang: Lang };

const plans = [
  {
    id: "half",
    badge: null,
    name: "Half Day",
    nameEs: "Medio Día",
    hours: "4 hrs",
    price: 700,
    desc: "Perfect for first-timers or a quick morning on the water.",
    descEs: "Perfecto para principiantes o una mañana rápida en el mar.",
    includes: [
      "Departs 6:30 AM · Returns ~11:00 AM",
      "Up to 3 anglers",
      "All tackle & equipment",
      "Bait included",
      "Fish cleaning service",
    ],
    includesEs: [
      "Sale 6:30 AM · Regresa ~11:00 AM",
      "Hasta 3 pescadores",
      "Todo el equipo de pesca",
      "Carnada incluida",
      "Servicio de limpieza de pescado",
    ],
    cta: "Book Half Day",
    ctaEs: "Reservar Medio Día",
    highlight: false,
  },
  {
    id: "full",
    badge: "Most Popular",
    badgeEs: "Más Popular",
    name: "Full Day",
    nameEs: "Día Completo",
    hours: "8 hrs",
    price: 1200,
    desc: "The full experience. Go further, stay longer, catch more.",
    descEs: "La experiencia completa. Más lejos, más tiempo, más peces.",
    includes: [
      "Departs 6:30 AM · Returns ~2:30 PM",
      "Up to 3 anglers",
      "All tackle & equipment",
      "Live & artificial bait",
      "Fish cleaning + vacuum packing",
      "Cooler with ice for drinks",
    ],
    includesEs: [
      "Sale 6:30 AM · Regresa ~2:30 PM",
      "Hasta 3 pescadores",
      "Todo el equipo de pesca",
      "Carnada viva y artificial",
      "Limpieza + empaque al vacío",
      "Hielera para bebidas",
    ],
    cta: "Book Full Day",
    ctaEs: "Reservar Día Completo",
    highlight: true,
  },
  {
    id: "custom",
    badge: null,
    name: "Custom",
    nameEs: "Personalizado",
    hours: "Your call",
    price: null,
    desc: "Groups, special occasions, or multi-day trips. Let's talk.",
    descEs: "Grupos, ocasiones especiales o viajes de varios días.",
    includes: [
      "Flexible departure times",
      "Custom trip length",
      "Smoking & freezing service",
      "Priority booking",
      "Everything negotiable",
    ],
    includesEs: [
      "Horario flexible",
      "Duración personalizada",
      "Servicio de ahumado y congelado",
      "Reserva prioritaria",
      "Todo negociable",
    ],
    cta: "Get a Quote",
    ctaEs: "Pedir Cotización",
    highlight: false,
  },
];

const notIncluded = [
  "Mexican fishing license (~$20 USD)",
  "Food & beverages",
  "Crew gratuity (15–20% recommended)",
  "Transportation to La Playita",
];

const notIncludedEs = [
  "Licencia de pesca mexicana (~$20 USD)",
  "Comida y bebidas",
  "Propina a la tripulación (15–20% recomendado)",
  "Transporte a La Playita",
];

export default function Pricing({ lang }: Props) {
  const en = lang === "en";

  return (
    <section id="pricing" className="py-24 bg-[#1a2b3c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#d26e4b] font-bold text-sm uppercase tracking-widest mb-3">
            {en ? "Transparent Pricing" : "Precios Transparentes"}
          </p>
          <h2 className="font-display text-5xl sm:text-6xl font-black text-white uppercase mb-4">
            {en ? "Charter Rates" : "Tarifas del Charter"}
          </h2>
          <p className="text-white/50 text-lg">
            {en
              ? "All rates are per boat, not per person. Split the cost with your crew."
              : "Todas las tarifas son por barco, no por persona. Divídelo con tu grupo."}
          </p>
        </Reveal>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.1}>
              <div className={`relative rounded-3xl overflow-hidden h-full flex flex-col transition-transform duration-300 hover:-translate-y-1 ${
                plan.highlight
                  ? "bg-[#d26e4b] shadow-2xl shadow-[#d26e4b]/30 ring-2 ring-[#d26e4b]"
                  : "bg-white/5 border border-white/10"
              }`}>

                {/* Popular badge */}
                {plan.badge && (
                  <div className="absolute top-4 right-4 bg-white text-[#d26e4b] text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    {en ? plan.badge : plan.badgeEs}
                  </div>
                )}

                <div className="p-8 flex flex-col flex-1">
                  {/* Plan name */}
                  <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${plan.highlight ? "text-white/70" : "text-white/40"}`}>
                    {plan.hours}
                  </p>
                  <h3 className={`font-display text-3xl font-black uppercase mb-2 ${plan.highlight ? "text-white" : "text-white"}`}>
                    {en ? plan.name : plan.nameEs}
                  </h3>
                  <p className={`text-sm mb-6 leading-relaxed ${plan.highlight ? "text-white/80" : "text-white/50"}`}>
                    {en ? plan.desc : plan.descEs}
                  </p>

                  {/* Price */}
                  <div className="mb-8">
                    {plan.price ? (
                      <div className="flex items-end gap-1">
                        <span className={`font-display text-5xl font-black leading-none ${plan.highlight ? "text-white" : "text-white"}`}>
                          ${plan.price.toLocaleString()}
                        </span>
                        <span className={`text-sm mb-1 ${plan.highlight ? "text-white/70" : "text-white/40"}`}>
                          {en ? "/ boat" : "/ barco"}
                        </span>
                      </div>
                    ) : (
                      <div className={`font-display text-4xl font-black ${plan.highlight ? "text-white" : "text-white"}`}>
                        {en ? "Contact us" : "Contáctanos"}
                      </div>
                    )}
                    {plan.price && (
                      <p className={`text-xs mt-1 ${plan.highlight ? "text-white/60" : "text-white/30"}`}>
                        {en ? `~$${Math.round(plan.price / 2).toLocaleString()}–$${Math.round(plan.price / 1).toLocaleString()} per person with 2–3 anglers`
                             : `~$${Math.round(plan.price / 2).toLocaleString()}–$${Math.round(plan.price / 1).toLocaleString()} por persona con 2–3 pescadores`}
                      </p>
                    )}
                  </div>

                  {/* Includes */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {(en ? plan.includes : plan.includesEs).map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <svg className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlight ? "text-white" : "text-[#d26e4b]"}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span className={`text-sm ${plan.highlight ? "text-white/90" : "text-white/60"}`}>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <BookButton
                    label={en ? plan.cta : plan.ctaEs}
                    className={`w-full py-4 rounded-2xl font-black uppercase tracking-wider text-sm transition-all duration-200 hover:-translate-y-0.5 ${
                      plan.highlight
                        ? "bg-white text-[#d26e4b] hover:bg-white/90 shadow-lg"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    }`}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Not included */}
        <Reveal>
          <div className="bg-white/5 border border-white/10 rounded-2xl px-8 py-6">
            <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-4">
              {en ? "Not included in charter price" : "No incluido en el precio del charter"}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(en ? notIncluded : notIncludedEs).map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <svg className="w-3.5 h-3.5 text-white/30 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-white/40 text-xs leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
