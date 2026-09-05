"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
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

  // As the user scrolls: fullscreen video shrinks into a framed card
  // and cross-fades into a photo of the boat.
  const frameScale = useTransform(scrollYProgress, [0, 0.85], [1, 0.86]);
  const frameRadius = useTransform(scrollYProgress, [0, 0.85], [0, 28]);
  const videoOpacity = useTransform(scrollYProgress, [0.2, 0.7], [1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Once the cross-fade to the photo is done, unmount the video entirely so it
  // can never repaint on top of the photo (Safari repaints opacity-0 videos).
  const [videoDone, setVideoDone] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setVideoDone(p >= 0.72);
  });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, [videoDone]);

  return (
    <section ref={sectionRef} className="relative h-[180vh] bg-[#0e1621]">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

        {/* Media frame: shrinks + rounds as you scroll */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{ scale: frameScale, borderRadius: frameRadius }}
        >
          {/* Boat photo (revealed underneath the video) */}
          <img
            src="/gallery/DJI_0182-scaled.jpg"
            alt="The Kailani — Cowtunas fishing charter boat"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Video (fades out on scroll, unmounts once the photo takes over) */}
          {!videoDone && (
            <motion.video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              poster="/hero-bg.jpg"
              style={{ opacity: videoOpacity }}
            >
              <source src="/gallery/VIDEO-2024-02-01-20-27-13.mp4" type="video/mp4" />
            </motion.video>
          )}

          {/* Gradients for legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
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
                className="bg-[#d26e4b] hover:bg-[#bc5e3d] text-white font-black px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-all duration-200 shadow-2xl hover:shadow-[#d26e4b]/40 hover:-translate-y-1"
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
        </motion.div>
      </div>
    </section>
  );
}
