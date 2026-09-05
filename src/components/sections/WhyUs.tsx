import Image from "next/image";
import BookButton from "@/components/booking/BookButton";
import Reveal from "@/components/ui/Reveal";
import type { Translations } from "@/lib/translations/types";

type Props = { dict: Translations };

export default function WhyUs({ dict }: Props) {
  return (
    <section id="why-us" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#14a3c7] font-bold text-sm uppercase tracking-widest mb-3">
            The CowTunas Difference
          </p>
          <h2 className="font-display text-5xl sm:text-6xl font-black text-[#1a2b3c] uppercase mb-4">
            {dict.whyus.title}
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            {dict.whyus.subtitle}
          </p>
        </Reveal>

        {/* Feature rows — scales flood in on hover */}
        <div className="border-t border-[#1a2b3c]/15 mb-4">
          {dict.whyus.items.map((item, i) => (
            <div key={i} className="group relative border-b border-[#1a2b3c]/15 overflow-hidden">
              {/* texture flood */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(10,20,30,0.45), rgba(10,20,30,0.45)), url(/texturatuna.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center 35%",
                }}
              />
              <div className="relative flex flex-col md:flex-row md:items-center gap-1 md:gap-10 py-7 md:py-9 px-1 md:px-4">
                <span className="w-10 shrink-0 font-mono text-sm text-[#14a3c7] group-hover:text-white/70 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="flex-1 font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-none text-[#1a2b3c] group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="md:w-72 text-sm md:text-base text-gray-500 group-hover:text-white/90 transition-colors">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* The Kailani at the marina — collage */}
        <Reveal className="relative mt-16">
          {/* Wide marina shot */}
          <div className="relative rounded-3xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] shadow-xl">
            <Image
          src="/cowtunas-lateral-sunset.jpg"
          alt="The Kailani at the Cabo San Lucas marina at dusk"
          fill
          sizes="(max-width: 640px) 100vw, 1200px"
          className="object-cover"
        />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-5 left-6 right-6 sm:right-96">
              <p className="text-white/70 text-xs uppercase tracking-widest mb-1">Our home port</p>
              <p className="text-white font-display font-black text-2xl sm:text-3xl uppercase">
                Cabo San Lucas Marina
              </p>
            </div>
          </div>

          {/* Vertical bow shot pinned like a snapshot (desktop) */}
          <div className="hidden sm:block absolute -bottom-10 right-8 md:right-14 w-52 md:w-64 rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="rounded-2xl overflow-hidden border-8 border-white shadow-2xl aspect-[3/4]">
              <Image
          src="/gallery/iphone3.jpeg"
          alt="Angler with a yellowfin tuna aboard the Kailani"
          fill
          sizes="(max-width: 640px) 100vw, 256px"
          className="object-cover"
        />
            </div>
          </div>

          {/* Stacked on mobile */}
          <div className="sm:hidden mt-6 rounded-2xl overflow-hidden shadow-lg aspect-[3/4]">
            <Image
          src="/gallery/iphone3.jpeg"
          alt="Angler with a yellowfin tuna aboard the Kailani"
          fill
          sizes="(max-width: 640px) 100vw, 256px"
          className="object-cover"
        />
          </div>
        </Reveal>

        {/* Bottom CTA banner */}
        <div className="mt-24 rounded-2xl bg-[#1a2b3c] px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white/60 text-sm uppercase tracking-widest mb-1">
              Promoted on Cabo Radio 96.3 FM
            </p>
            <p className="text-white text-xl font-bold">
              Ready for the trip of a lifetime?
            </p>
          </div>
          <BookButton
            label="Book Your Charter →"
            className="shrink-0 btn-cow text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg"
          />
        </div>

      </div>
    </section>
  );
}
