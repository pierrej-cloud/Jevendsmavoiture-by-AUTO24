"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Locale, getTranslations, getLanguageForCountry } from "./index";
import { en } from "./en";

const STORAGE_KEY = "jevendsmavoiture_lang";

type Translations = typeof en;

interface LanguageContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
  setLocaleFromCountry: (countryCode: string) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLocale(): Locale {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "fr" || saved === "en") return saved;
  }
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(getInitialLocale());
    setMounted(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, newLocale);
    }
    document.documentElement.lang = newLocale;
  }, []);

  const setLocaleFromCountry = useCallback(
    (countryCode: string) => {
      const lang = getLanguageForCountry(countryCode);
      if (lang) {
        setLocale(lang);
      }
    },
    [setLocale]
  );

  const t = getTranslations(locale);

  // Don't render until we've read localStorage to avoid hydration mismatch
  if (!mounted) {
    return (
      <LanguageContext.Provider
        value={{ locale: "en", t: getTranslations("en"), setLocale, setLocaleFromCountry }}
      >
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ locale, t, setLocale, setLocaleFromCountry }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
