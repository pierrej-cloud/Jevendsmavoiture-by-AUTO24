import { en } from "./en";
import { fr } from "./fr";

export const locales = { en, fr } as const;
export type Locale = keyof typeof locales;

export function getTranslations(locale: Locale) {
  return locales[locale];
}

// Country to language mapping
const COUNTRY_LANGUAGE_MAP: Record<string, Locale> = {
  MA: "fr", // Morocco
  SN: "fr", // Senegal
  CI: "fr", // Ivory Coast
  BJ: "fr", // Benin
  TG: "fr", // Togo
  ZA: "en", // South Africa
  RW: "en", // Rwanda
  KE: "en", // Kenya
  GH: "en", // Ghana
};

export function getLanguageForCountry(countryCode: string): Locale | null {
  return COUNTRY_LANGUAGE_MAP[countryCode] || null;
}
