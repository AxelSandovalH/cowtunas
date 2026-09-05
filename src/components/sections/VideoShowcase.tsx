import Reveal from "@/components/ui/Reveal";
import LazyVideo from "@/components/ui/LazyVideo";
import type { Lang } from "@/lib/i18n";

type Props = { lang: Lang };

export default function VideoShowcase({ lang }: Props) {
  const en = lang === "en";

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Land's End canvas background */}
      <div className="absolute inset-0">
        <img
          src="/hero-canvas.jpg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0e1621]/60" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <Reveal>
          <p className="text-[#14a3c7] font-bold text-sm uppercase tracking-widest mb-3">
            {en ? "Straight from the water" : "Directo desde el mar"}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-white uppercase mb-10">
            {en ? "Live the Action" : "Vive la Acción"}
          </h2>

          {/* Video mosaic: equal-height grid, vertical video spans both rows */}
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-5 md:h-[680px]">
            <div className="relative md:col-span-2 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 aspect-video md:aspect-auto">
              <LazyVideo
                src="/gallery/VIDEO-2024-02-01-20-27-13.mp4"
                poster="/posters/video-main.jpg"
                playbackRate={0.75}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="relative md:row-span-2 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 aspect-[9/16] md:aspect-auto">
              <LazyVideo
                src="/videovertical.mp4"
                poster="/posters/video-vertical.jpg"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="relative md:col-span-2 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 aspect-video md:aspect-auto">
              <LazyVideo
                src="/AIgenerated.mp4"
                poster="/posters/video-ai.jpg"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
