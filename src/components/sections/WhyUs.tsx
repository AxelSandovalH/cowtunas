import type { Translations } from "@/lib/translations/types";

const icons = [
  // Trophy
  <svg key="trophy" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
  </svg>,
  // Person
  <svg key="person" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>,
  // Map pin
  <svg key="map" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>,
  // Star
  <svg key="star" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>,
];

type Props = { dict: Translations };

export default function WhyUs({ dict }: Props) {
  return (
    <section id="why-us" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#d26e4b] font-semibold text-sm uppercase tracking-widest mb-3">
            The CowTunas Difference
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2b3c] mb-4">
            {dict.whyus.title}
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            {dict.whyus.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dict.whyus.items.map((item, i) => (
            <div
              key={i}
              className="group relative bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Number watermark */}
              <span className="absolute top-4 right-5 text-6xl font-black text-gray-50 select-none group-hover:text-[#446084]/5 transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Icon */}
              <div className="w-14 h-14 bg-[#446084]/10 rounded-xl flex items-center justify-center text-[#446084] mb-6 group-hover:bg-[#d26e4b]/10 group-hover:text-[#d26e4b] transition-colors">
                {icons[i]}
              </div>

              <h3 className="text-lg font-bold text-[#1a2b3c] mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <div className="mt-16 rounded-2xl bg-[#1a2b3c] px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white/60 text-sm uppercase tracking-widest mb-1">
              Promoted on Cabo Radio 96.3 FM
            </p>
            <p className="text-white text-xl font-bold">
              Ready for the trip of a lifetime?
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 bg-[#d26e4b] hover:bg-[#bc5e3d] text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg"
          >
            Book Your Charter →
          </a>
        </div>

      </div>
    </section>
  );
}
