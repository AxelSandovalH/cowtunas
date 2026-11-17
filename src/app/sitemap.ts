import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number) =>
    (["en", "es"] as const).map((lang) => ({
      url: `${BUSINESS.domain}/${lang}${path}`,
      lastModified: now,
      priority,
      alternates: {
        languages: {
          en: `${BUSINESS.domain}/en${path}`,
          es: `${BUSINESS.domain}/es${path}`,
        },
      },
    }));

  return [...page("", 1), ...page("/tuna", 0.8), ...page("/gallery", 0.6)];
}
