import en from "./translations/en";
import es from "./translations/es";
export type { Translations } from "./translations/types";

export type Lang = "en" | "es";

const dictionaries = { en, es };

export function getDictionary(lang: Lang) {
  return dictionaries[lang] ?? dictionaries.en;
}

export function isValidLang(lang: string): lang is Lang {
  return lang === "en" || lang === "es";
}
