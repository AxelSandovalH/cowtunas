import BookButton from "@/components/booking/BookButton";
import type { Lang } from "@/lib/i18n";

/** Sticky booking bar, phones only. */
export default function MobileBookBar({ lang }: { lang: Lang }) {
  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-gray-200 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
      <BookButton
        label={lang === "en" ? "Book Your Charter" : "Reserva tu charter"}
        className="w-full btn-cow text-white font-black py-3.5 rounded-xl text-sm uppercase tracking-wider text-center"
      />
    </div>
  );
}
