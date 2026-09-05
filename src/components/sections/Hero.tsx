"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // As the user scrolls the video card eases back slightly
  // and cross-fades into a photo of the boat.
  const frameScale = useTransform(scrollYProgress, [0, 0.85], [1, 0.94]);
  const videoOpacity = useTransform(scrollYProgress, [0.2, 0.7], [1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Safari can repaint an opacity-0 <video> over the photo, so once the fade
  // completes we also hide it with visibility (kept mounted so scrolling back
  // up restores it seamlessly).
  const videoVisibility = useTransform(scrollYProgress, (p) =>
    p >= 0.72 ? "hidden" : "visible"
  );

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[180vh] bg-[#0e1621]">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

        {/* Canvas background (swap /hero-canvas.jpg for the final photo) */}
        <div className="absolute inset-0">
          <img
            src="/hero-canvas.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0e1621]/55" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Media card: the video stays near its native size so it looks sharp */}
        <motion.div
          className="relative w-[94%] max-w-6xl aspect-video overflow-hidden rounded-2xl shadow-2xl mt-4"
          style={{ scale: frameScale }}
        >
          {/* Boat photo (revealed underneath the video) */}
          <img
            src="/gallery/DJI_0182-scaled.jpg"
            alt="The Kailani — Cowtunas fishing charter boat"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Video (fades out on scroll; hidden entirely once the photo takes over) */}
          <motion.video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/hero-bg.jpg"
            style={{ opacity: videoOpacity, visibility: videoVisibility }}
          >
            <source src="/gallery/VIDEO-2024-02-01-20-27-13.mp4" type="video/mp4" />
          </motion.video>
        </motion.div>

        {/* Content — anchored to the bottom so the video stays the protagonist */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-10 text-white px-4 sm:px-6 pb-24"
          style={{ opacity: textOpacity }}
        >
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
                className="btn-cow text-white font-black px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-all duration-200 shadow-2xl hover:shadow-black/30 hover:-translate-y-1"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ opacity: scrollCueOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 pointer-events-none"
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-white text-xs font-semibold uppercase tracking-[0.3em]"
          >
            {lang === "en" ? "Scroll to explore" : "Desliza para explorar"}
          </motion.span>
          {/* Mouse outline with animated wheel dot */}
          <div className="w-6 h-10 rounded-full border-2 border-white/70 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-white"
            />
          </div>
          {/* Cascading chevrons */}
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
      </div>
    </section>
  );
}
