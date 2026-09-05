"use client";

import { useState } from "react";
import type { Translations } from "@/lib/translations/types";
import type { Lang } from "@/lib/i18n";

type Props = { dict: Translations; lang: Lang };

export default function FAQ({ dict, lang }: Props) {
  const en = lang === "en";
  const [open, setOpen] = useState<number | null>(0);

  const facts = en
    ? [
        ["⏰", "Depart 6:30 AM"],
        ["🎣", "Max 3 anglers"],
        ["🪝", "All tackle included"],
        ["🧊", "Catch cleaned & packed"],
      ]
    : [
        ["⏰", "Salida 6:30 AM"],
        ["🎣", "Máx 3 pescadores"],
        ["🪝", "Equipo incluido"],
        ["🧊", "Captura limpia y empacada"],
      ];

  return (
    <section id="faq" className="py-24 bg-[#f7f3ed]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-5 gap-12">

        {/* Left: header + quick facts */}
        <div className="lg:col-span-2">
          <p className="text-[#14a3c7] font-bold text-sm uppercase tracking-widest mb-3">
            {en ? "Need to Know" : "Lo Esencial"}
          </p>
          <h2 className="font-display text-5xl sm:text-6xl font-black text-[#1a2b3c] uppercase leading-[0.95] mb-8">
            {dict.faq.title}
          </h2>

          <div className="grid grid-cols-2 gap-3 mb-8">
            {facts.map(([icon, label]) => (
              <div key={label} className="bg-white rounded-xl px-4 py-3 flex items-center gap-2.5 shadow-sm">
                <span className="text-lg">{icon}</span>
                <span className="text-sm font-semibold text-[#1a2b3c] leading-tight">{label}</span>
              </div>
            ))}
          </div>

          <p className="text-gray-500 text-sm mb-3">
            {en ? "Something else on your mind?" : "¿Algo más que quieras saber?"}
          </p>
          <a
            href={`https://wa.me/526241616011?text=${encodeURIComponent(
              en ? "Hi! I have a question about the charter." : "Hola! Tengo una pregunta sobre el charter."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#0f89a8] font-bold hover:gap-3 transition-all"
          >
            {en ? "Ask us on WhatsApp" : "Pregúntanos por WhatsApp"} →
          </a>
        </div>

        {/* Right: divider-list accordion */}
        <div className="lg:col-span-3 border-t border-[#1a2b3c]/15">
          {dict.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-[#1a2b3c]/15">
                <button
                  className="w-full flex items-baseline gap-4 py-5 text-left group"
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className={`font-mono text-xs pt-1 transition-colors ${isOpen ? "text-[#14a3c7]" : "text-gray-400"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`flex-1 font-display text-xl sm:text-2xl font-black uppercase leading-tight transition-colors ${
                    isOpen ? "text-[#0f89a8]" : "text-[#1a2b3c] group-hover:text-[#0f89a8]"
                  }`}>
                    {item.q}
                  </span>
                  <span className={`shrink-0 text-2xl font-light leading-none transition-transform duration-200 ${
                    isOpen ? "rotate-45 text-[#14a3c7]" : "text-gray-400"
                  }`}>
                    +
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="pb-6 pl-10 pr-8 text-gray-500 leading-relaxed max-w-xl">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
