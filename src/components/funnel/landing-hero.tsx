"use client";

import { useRouter } from "next/navigation";
import { Zap, CheckCircle, Shield } from "lucide-react";
import { useLanguage } from "@/i18n/language-context";
import { funnelStore } from "@/lib/funnel-store";

const FLAG_COUNTRIES = [
  { value: "MA", flag: "🇲🇦", label: "Maroc" },
  { value: "CI", flag: "🇨🇮", label: "Côte d'Ivoire" },
  { value: "SN", flag: "🇸🇳", label: "Sénégal" },
  { value: "ZA", flag: "🇿🇦", label: "Afrique du Sud" },
  { value: "RW", flag: "🇷🇼", label: "Rwanda" },
] as const;

export function LandingHero() {
  const { t, setLocaleFromCountry } = useLanguage();
  const router = useRouter();

  const handleCountryClick = (code: string) => {
    funnelStore.setSelectedCountry(code);
    setLocaleFromCountry(code);
    router.push("/sell");
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />

      <div className="relative max-w-[680px] mx-auto px-4 pt-10 pb-8 text-center">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-dark leading-tight mb-3">
          {t.landing.heroTitle}
        </h1>
        <p className="text-neutral-medium text-sm mb-8 max-w-md mx-auto">
          {t.landing.heroSubtitle}
        </p>

        {/* Flag country selector */}
        <p style={{ fontSize: 15, fontWeight: 600, color: "#111827", textAlign: "center", marginBottom: 16 }}>
          {t.landing.countryQuestion}
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {FLAG_COUNTRIES.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => handleCountryClick(c.value)}
              style={{
                width: 72,
                padding: "10px 4px",
                borderRadius: 16,
                border: "2px solid transparent",
                background: "#F9FAFB",
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#185ADB";
                e.currentTarget.style.background = "#EEF3FC";
                e.currentTarget.style.transform = "scale(1.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.background = "#F9FAFB";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <span style={{ fontSize: 40, lineHeight: 1 }}>{c.flag}</span>
              <span style={{ fontSize: 10, color: "#6B7280", textAlign: "center", maxWidth: 60, lineHeight: 1.2 }}>
                {c.label}
              </span>
            </button>
          ))}
        </div>

        {/* How it works link */}
        <a href="#how-it-works" style={{ fontSize: 12, color: "#9CA3AF", textDecoration: "underline" }}>
          {t.landing.ctaHow}
        </a>

        {/* Reassurance badges */}
        <div className="grid grid-cols-3 gap-4 mt-8">
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
