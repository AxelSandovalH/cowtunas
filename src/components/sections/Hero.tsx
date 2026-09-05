"use client";

import { useEffect, useRef } from "react";
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      </div>

      {/* Content — anchored to the bottom so the video stays the protagonist */}
      <div className="absolute inset-x-0 bottom-0 z-10 text-white px-4 sm:px-6 pb-24">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <motion.p {...fadeUp(0.2)} className="text-[#d26e4b] font-bold text-xs uppercase tracking-[0.25em] mb-3">
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
              className="bg-[#d26e4b] hover:bg-[#bc5e3d] text-white font-black px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-all duration-200 shadow-2xl hover:shadow-[#d26e4b]/40 hover:-translate-y-1"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href={`/${lang}#why-us`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
      >
        <span className="text-white/60 text-[11px] uppercase tracking-widest">
          {lang === "en" ? "Scroll to explore" : "Desliza para explorar"}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.a>
    </section>
  );
}
