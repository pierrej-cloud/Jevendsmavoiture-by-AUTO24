"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, CheckCircle, Shield } from "lucide-react";
import { useLanguage } from "@/i18n/language-context";
import { funnelStore } from "@/lib/funnel-store";

const LANDING_COUNTRIES = [
  { value: "MA", flag: "🇲🇦", label: "Maroc" },
  { value: "SN", flag: "🇸🇳", label: "Sénégal" },
  { value: "CI", flag: "🇨🇮", label: "Côte d'Ivoire" },
  { value: "ZA", flag: "🇿🇦", labelFr: "Afrique du Sud", labelEn: "South Africa" },
  { value: "RW", flag: "🇷🇼", label: "Rwanda" },
] as const;

export function LandingHero() {
  const { t, locale, setLocaleFromCountry } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setLocaleFromCountry(value);
    funnelStore.setSelectedCountry(value);
  };

  const getCountryLabel = (c: typeof LANDING_COUNTRIES[number]) => {
    if ("labelFr" in c) {
      return locale === "fr" ? c.labelFr : c.labelEn;
    }
    return c.label;
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />

      <div className="relative max-w-lg mx-auto px-4 pt-12 pb-8 text-center">
        {/* Logo */}
        <div style={{ overflow: "visible", paddingTop: "8px" }}>
          <img
            src="/images/logo-auto24.svg"
            alt="AUTO24"
            style={{ height: "48px", width: "auto", objectFit: "contain", paddingTop: "4px" }}
            className="mx-auto mb-4"
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-dark leading-tight mb-4">
          {t.landing.heroTitle}
        </h1>
        <p className="text-neutral-medium text-base mb-6 max-w-md mx-auto">
          {t.landing.heroSubtitle}
        </p>

        {/* Country selector */}
        <div className="max-w-[320px] mx-auto mb-8">
          <p className="text-sm font-medium text-neutral-dark mb-2">
            {t.landing.countryQuestion}
          </p>
          <select
            value={selectedCountry}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="w-full h-12 rounded-xl border-2 border-gray-200 bg-white px-4 text-sm transition-colors appearance-none text-center focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="" disabled>
              {t.landing.countryPlaceholder}
            </option>
            {LANDING_COUNTRIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.flag}  {getCountryLabel(c)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center mb-10">
          <Link href="/sell" aria-disabled={!selectedCountry} tabIndex={selectedCountry ? undefined : -1}>
            <Button
              size="lg"
              className="w-full sm:w-auto"
              disabled={!selectedCountry}
            >
              {t.landing.ctaStart}
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              {t.landing.ctaHow}
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm text-neutral-dark">{t.landing.reassurance.fast}</p>
              <p className="text-xs text-neutral-medium">{t.landing.reassurance.fastDesc}</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm text-neutral-dark">{t.landing.reassurance.simple}</p>
              <p className="text-xs text-neutral-medium">{t.landing.reassurance.simpleDesc}</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm text-neutral-dark">{t.landing.reassurance.trusted}</p>
              <p className="text-xs text-neutral-medium">{t.landing.reassurance.trustedDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
