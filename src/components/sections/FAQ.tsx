"use client";

import { useState } from "react";
import type { Translations } from "@/lib/translations/types";

type Props = { dict: Translations };

export default function FAQ({ dict }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-[#f7f3ed]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#d26e4b] font-semibold text-sm uppercase tracking-widest mb-3">
            Need to Know
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2b3c]">
            {dict.faq.title}
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {dict.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-[#446084] bg-white shadow-md"
                    : "border-gray-200 bg-white hover:border-[#446084]/40"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className={`font-semibold text-base ${isOpen ? "text-[#446084]" : "text-[#1a2b3c]"}`}>
                    {item.q}
                  </span>
                  <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                    isOpen ? "bg-[#446084] text-white" : "bg-gray-100 text-gray-400"
                  }`}>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </span>
                </button>

                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-gray-500 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-4">
            {open !== null ? "Still have questions?" : "¿Tienes más preguntas?"}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#1a2b3c] hover:bg-[#446084] text-white font-semibold px-7 py-3 rounded-xl transition-colors"
          >
            Contact Us
          </a>
        </div>

      </div>
    </section>
  );
}
