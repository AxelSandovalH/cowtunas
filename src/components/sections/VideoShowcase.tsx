"use client";

import { useEffect, useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import type { Lang } from "@/lib/i18n";

type Props = { lang: Lang };

export default function VideoShowcase({ lang }: Props) {
  const en = lang === "en";
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Land's End canvas background */}
      <div className="absolute inset-0">
        <img
          src="/hero-canvas.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0e1621]/60" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <Reveal>
          <p className="text-[#14a3c7] font-bold text-sm uppercase tracking-widest mb-3">
            {en ? "Straight from the water" : "Directo desde el mar"}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-white uppercase mb-10">
            {en ? "Live the Action" : "Vive la Acción"}
          </h2>

          {/* Compact video card — near native size so it stays sharp */}
          <div className="relative max-w-3xl mx-auto aspect-video overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
