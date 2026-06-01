import Image from "next/image";
import type { Translations } from "@/lib/translations/types";

type Props = { dict: Translations };

export default function Captain({ dict }: Props) {
  return (
    <section id="captain" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text side */}
          <div className="order-2 lg:order-1">
            <p className="text-[#d26e4b] font-semibold text-sm uppercase tracking-widest mb-3">
              Your Captain
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2b3c] mb-3">
              {dict.captain.title}
            </h2>
            <p className="text-gray-400 text-lg italic mb-6">{dict.captain.subtitle}</p>
            <p className="text-gray-600 leading-relaxed mb-10">{dict.captain.body}</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {dict.captain.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center bg-[#f7f3ed] rounded-2xl py-5 px-3"
                >
                  <p className="text-2xl sm:text-3xl font-black text-[#446084]">{stat.value}</p>
                  <p className="text-gray-500 text-xs mt-1 leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#d26e4b] hover:bg-[#bc5e3d] text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg"
            >
              Fish With Captain Nestor
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>

          {/* Photo side */}
          <div className="order-1 lg:order-2 relative">
            {/* Background accent */}
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl bg-[#446084]/10" />

            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl">
              <Image
                src="/captain-nestor.jpg"
                alt="Captain Nestor"
                fill
                className="object-cover object-top"
              />
              {/* Gradient bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-white font-bold text-xl">Captain Nestor</p>
                <p className="text-white/70 text-sm">La Playita, San Jose del Cabo</p>
              </div>
            </div>

            {/* Tournament badge */}
            <div className="absolute -bottom-4 -left-4 bg-[#d26e4b] text-white rounded-2xl px-5 py-4 shadow-xl hidden sm:block">
              <p className="text-xs uppercase tracking-widest text-white/70 mb-0.5">Tournament Winner</p>
              <p className="font-bold text-sm">2022 Brisbe Tuna</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
