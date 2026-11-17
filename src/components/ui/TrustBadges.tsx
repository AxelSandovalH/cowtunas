import { BUSINESS } from "@/lib/business";
import type { Lang } from "@/lib/i18n";

/**
 * Sport-fishing permit & insurance badges.
 * Renders nothing until the owner confirms the credentials in business.ts —
 * we never display licenses or insurance we can't verify.
 */
export default function TrustBadges({ lang }: { lang: Lang }) {
  const creds = [BUSINESS.credentials.fishingPermit, BUSINESS.credentials.insurance].filter(
    (c): c is NonNullable<typeof c> => c !== null
  );
  if (creds.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-3 py-6 bg-[#f7f3ed]">
      {creds.map((c) => (
        <span
          key={c.label.en}
          className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-[#1a2b3c]"
        >
          <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {lang === "es" ? c.label.es : c.label.en}
          {c.id && <span className="text-gray-400 font-normal">· {c.id}</span>}
        </span>
      ))}
    </div>
  );
}
