import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import type { Translations } from "@/lib/translations/types";

type Props = { dict: Translations };

export default function Boat({ dict }: Props) {
  return (
    <section id="boat" className="py-24 bg-[#f7f3ed]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#d26e4b] font-bold text-sm uppercase tracking-widest mb-3">Your Vessel</p>
          <h2 className="font-display text-5xl sm:text-6xl font-black text-[#1a2b3c] uppercase mb-4">
            {dict.boat.title}
          </h2>
          <p className="text-gray-500 text-lg">{dict.boat.subtitle}</p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Photo side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
              <Image
                src="/boat-kailani.jpg"
                alt="The Kailani — 28ft Mako"
                fill
                className="object-cover"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-5 py-3 shadow">
                <p className="text-[#1a2b3c] font-bold text-lg">The Kailani</p>
                <p className="text-gray-500 text-sm">28ft Mako · 400hp</p>
              </div>
            </div>

            {/* Floating stat card */}
            <div className="absolute -top-4 -right-4 bg-[#446084] text-white rounded-2xl px-6 py-4 shadow-xl text-center hidden sm:block">
              <p className="text-3xl font-black">100</p>
              <p className="text-xs text-white/70 uppercase tracking-widest">Mile Range</p>
            </div>
          </div>

          {/* Specs side */}
          <div>
            <p className="text-gray-600 leading-relaxed mb-8">
              Built for speed and range, the Kailani gets you to the fish fast.
              With a full bait tank, 4 tuna tubes, professional-grade Shimano tackle,
              and a Lowrance fish finder loaded with secret coordinates only locals know —
              every detail is dialed in for one purpose: putting you on fish.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dict.boat.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-start gap-4 bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100"
                >
                  <div className="w-2 h-2 rounded-full bg-[#d26e4b] mt-2 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">
                      {spec.label}
                    </p>
                    <p className="text-[#1a2b3c] font-semibold text-sm">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 bg-[#1a2b3c] hover:bg-[#446084] text-white font-bold px-8 py-4 rounded-xl transition-colors"
            >
              Reserve the Kailani
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
