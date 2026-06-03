"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { Translations } from "@/lib/translations/types";
import type { Lang } from "@/lib/i18n";

type Props = { dict: Translations; lang: Lang };

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero({ dict, lang }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Video background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/hero-bg.jpg"
        >
          <source src="/gallery/VIDEO-2024-02-01-20-27-13.mp4" type="video/mp4" />
        </video>

        {/* Layered overlays for drama */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-5xl mx-auto pt-28">

        {/* Badge */}
        <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs sm:text-sm font-medium px-4 py-2 rounded-full mb-6">
          <span className="w-2 h-2 bg-[#d26e4b] rounded-full animate-pulse" />
          {dict.hero.badge}
        </motion.div>

        {/* Tagline */}
        <motion.p {...fadeUp(0.2)} className="text-[#d26e4b] font-bold text-sm sm:text-base uppercase tracking-[0.25em] mb-5">
          {dict.hero.tagline}
        </motion.p>

        {/* Main headline — big, aggressive, impactful */}
        <motion.h1 {...fadeUp(0.3)}
          className="font-display text-6xl sm:text-7xl lg:text-[7rem] xl:text-[8rem] font-black leading-[0.9] uppercase tracking-tight mb-8 drop-shadow-2xl"
          style={{ textShadow: "0 4px 40px rgba(0,0,0,0.5)" }}
        >
          {dict.hero.headline}
        </motion.h1>

        {/* Subheadline */}
        <motion.p {...fadeUp(0.45)} className="text-white/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
          {dict.hero.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.55)} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`/${lang}#contact`}
            className="group relative bg-[#d26e4b] hover:bg-[#bc5e3d] text-white font-black px-10 py-5 rounded-2xl text-base uppercase tracking-wider transition-all duration-200 shadow-2xl hover:shadow-[#d26e4b]/40 hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10">{dict.hero.cta_primary}</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a
            href={`/${lang}#gallery`}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold px-10 py-5 rounded-2xl text-base uppercase tracking-wider transition-all duration-200 hover:-translate-y-1"
          >
            {dict.hero.cta_secondary}
          </a>
        </motion.div>

        {/* Quick stats */}
        <motion.div {...fadeUp(0.7)} className="mt-20 grid grid-cols-3 gap-6 max-w-lg mx-auto border-t border-white/10 pt-8">
          {[
            { value: "35+", label: lang === "en" ? "Years on the Water" : "Años en el Mar" },
            { value: "300lb", label: lang === "en" ? "Biggest Tuna" : "Atún más grande" },
            { value: "5★", label: lang === "en" ? "Guest Rating" : "Calificación" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl sm:text-4xl font-black text-[#d26e4b] leading-none">{stat.value}</div>
              <div className="text-white/60 text-xs sm:text-sm mt-2 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
