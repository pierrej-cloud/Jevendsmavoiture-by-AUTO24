import { en } from "./en";
import { fr } from "./fr";

export const locales = { en, fr } as const;
export type Locale = keyof typeof locales;

// Default locale
const DEFAULT_LOCALE: Locale = "en";

let currentLocale: Locale = DEFAULT_LOCALE;

export function setLocale(locale: Locale) {
  currentLocale = locale;
}

export function getLocale(): Locale {
  return currentLocale;
}

export function t<
  S extends keyof typeof en,
  K extends keyof (typeof en)[S],
>(section: S, key: K): (typeof en)[S][K] {
  const translations = locales[currentLocale];
  return (translations[section] as Record<string, unknown>)[key as string] as (typeof en)[S][K];
}

export function useTranslations() {
  return locales[currentLocale];
}
