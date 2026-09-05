"use client";

import { motion } from "framer-motion";
import BookButton from "@/components/booking/BookButton";
import type { Translations } from "@/lib/translations/types";
import type { Lang } from "@/lib/i18n";

type Props = { dict: Translations; lang: Lang };

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export default function Hero({ dict, lang }: Props) {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Sunset photo background */}
      <div className="absolute inset-0">
        <img
          src="/gallery/iphone5.jpeg"
          fetchPriority="high"
          alt={lang === "en" ? "The Kailani fishing at sunrise in the Sea of Cortez" : "El Kailani pescando al amanecer en el Mar de Cortés"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/60" />
      </div>

      {/* Content — anchored to the bottom */}
      <div className="relative z-10 w-full text-white px-4 sm:px-6 pb-24">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <motion.p {...fadeUp(0.2)} className="text-[#f7f3ed]/90 font-bold text-xs uppercase tracking-[0.25em] mb-3"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}>
              {dict.hero.tagline}
            </motion.p>
            <motion.h1 {...fadeUp(0.35)}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-black leading-[1] uppercase tracking-tight max-w-xl"
              style={{ textShadow: "0 4px 40px rgba(0,0,0,0.6)" }}
            >
              {dict.hero.headline}
            </motion.h1>
          </div>

          <motion.div {...fadeUp(0.5)} className="shrink-0">
            <BookButton
              label={dict.hero.cta_primary}
              className="btn-cow font-black px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-all duration-200 shadow-2xl hover:shadow-black/30 hover:-translate-y-1"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1.5 pointer-events-none"
      >
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-white text-xs font-semibold uppercase tracking-[0.3em]"
        >
          {lang === "en" ? "Scroll to explore" : "Desliza para explorar"}
        </motion.span>
        <div className="w-6 h-10 rounded-full border-2 border-white/70 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-white"
          />
        </div>
        <div className="flex flex-col items-center -space-y-2.5">
          {[0, 1].map((i) => (
            <motion.svg
              key={i}
              animate={{ y: [0, 6, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
              className="w-6 h-6 text-white"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </motion.svg>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
