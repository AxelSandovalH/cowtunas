"use client";

import { useState } from "react";
import Image from "next/image";
import type { Translations } from "@/lib/translations/types";
import type { Lang } from "@/lib/i18n";

const photos = [
  { src: "/gallery/033A0454-scaled.jpg",      alt: "Fishing action on the Kailani",        span: "col-span-2 row-span-2" },
  { src: "/gallery/iphone16.jpeg",            alt: "Catch of the day",                     span: "" },
  { src: "/gallery/G0041568-scaled.jpg",      alt: "Big tuna catch",                       span: "" },
  { src: "/gallery/033A0479-1-scaled.jpg",    alt: "Charter guests with their catch",      span: "" },
  { src: "/gallery/iphone3.jpeg",             alt: "Yellowfin tuna",                       span: "" },
  { src: "/gallery/DJI_0182-scaled.jpg",      alt: "Aerial view departing La Playita",     span: "col-span-2" },
  { src: "/gallery/033A0479-scaled.jpg",      alt: "Trophy fish on deck",                  span: "" },
  { src: "/gallery/iphone5.jpeg",             alt: "Happy anglers",                        span: "" },
  { src: "/gallery/IMG_9499-1.jpeg",          alt: "Wahoo catch",                          span: "" },
  { src: "/gallery/IMG_9503-1.jpeg",          alt: "Mahi-mahi aboard",                     span: "" },
  { src: "/gallery/IMG_9498-1.jpeg",          alt: "Fighting a big one",                   span: "" },
  { src: "/gallery/iphone14-scaled.jpeg",     alt: "Sunset on the water",                  span: "" },
];

type Props = { dict: Translations; lang: Lang };

export default function Gallery({ dict, lang }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () => setLightbox((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  const next = () => setLightbox((i) => (i === null ? null : (i + 1) % photos.length));

  return (
    <section id="gallery" className="py-24 bg-[#1a2b3c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[#d26e4b] font-semibold text-sm uppercase tracking-widest mb-3">
            {lang === "en" ? "On the Water" : "En el Agua"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {lang === "en" ? "Charter Pictures & Video" : "Fotos y Video del Charter"}
          </h2>
          <p className="text-white/50 text-lg">
            {lang === "en"
              ? "Real catches from real guests. Every trip tells a story."
              : "Capturas reales de clientes reales. Cada salida cuenta una historia."}
          </p>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px]">
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              className={`relative overflow-hidden rounded-xl cursor-pointer group ${photo.span}`}
              onClick={() => setLightbox(i)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Video CTA */}
        <div className="mt-10 text-center">
          <p className="text-white/40 text-sm mb-4">
            {lang === "en" ? "Want to see the action?" : "¿Quieres ver la acción?"}
          </p>
          <a
            href="/gallery/VIDEO-2024-02-01-20-27-13.mp4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5 text-[#d26e4b]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            {lang === "en" ? "Watch the Charter Video" : "Ver el video del charter"}
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
            onClick={() => setLightbox(null)}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-4xl max-h-[85vh] aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          {/* Next */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            {lightbox + 1} / {photos.length}
          </div>
        </div>
      )}
    </section>
  );
}
