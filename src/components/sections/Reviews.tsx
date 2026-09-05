import Reveal from "@/components/ui/Reveal";
import type { Translations } from "@/lib/translations/types";

type Props = { dict: Translations };

export default function Reviews({ dict }: Props) {
  return (
    <section id="reviews" className="py-24 bg-[#1a2b3c] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <p className="text-[#d26e4b] font-bold text-sm uppercase tracking-widest mb-3 text-center">
            Reviews
          </p>
          <h2 className="font-display text-5xl sm:text-6xl font-black text-white uppercase mb-3 text-center">
            {dict.reviews.title}
          </h2>
          <p className="text-white/50 text-lg italic mb-14 text-center">
            {dict.reviews.subtitle}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dict.reviews.items.map((review, i) => (
            <Reveal key={review.name} delay={i * 0.12}>
              <div className="h-full bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: review.stars }).map((_, s) => (
                    <svg key={s} className="w-5 h-5 text-[#d26e4b]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118l-3.366-2.445a1 1 0 00-1.176 0l-3.367 2.445c-.784.57-1.838-.196-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.958z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/80 leading-relaxed flex-1">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="text-white font-bold uppercase tracking-widest text-sm mt-6">
                  {review.name}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
