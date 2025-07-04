import tr from "./tr.json";
import en from "./en.json";

export const translations = {
  tr,
  en,
};

export type Language = "tr" | "en";
export type TranslationKey = keyof typeof tr;

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split(".");
  let translation: unknown = translations[lang];

  for (const k of keys) {
    if (
      typeof translation !== "object" ||
      translation === null ||
      !(k in translation)
    )
      return key;
    translation = (translation as Record<string, unknown>)[k];
  }

  return typeof translation === "string" ? translation : key;
}
