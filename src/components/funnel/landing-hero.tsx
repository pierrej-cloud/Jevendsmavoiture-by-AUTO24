"use client";

import { useRouter } from "next/navigation";
import { Zap, CheckCircle, Shield } from "lucide-react";
import { useLanguage } from "@/i18n/language-context";
import { funnelStore } from "@/lib/funnel-store";

const FLAG_COUNTRIES = [
  { value: "CI", flag: "🇨🇮", label: "Côte d'Ivoire" },
  { value: "MA", flag: "🇲🇦", label: "Maroc" },
  { value: "SN", flag: "🇸🇳", label: "Sénégal" },
  { value: "RW", flag: "🇷🇼", label: "Rwanda" },
  { value: "ZA", flag: "🇿🇦", label: "Afrique du Sud" },
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
        <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-dark leading-tight mb-3">
          {t.landing.heroTitle}
        </h1>
        <p className="text-neutral-medium text-sm mb-8 max-w-md mx-auto">
          {t.landing.heroSubtitle}
        </p>

        {/* Flag country selector */}
        <p style={{ fontSize: 14, color: "#6B7280", textAlign: "center", marginBottom: 16 }}>
          {t.landing.countryQuestion}
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
          {FLAG_COUNTRIES.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => handleCountryClick(c.value)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "center" }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  border: "2px solid transparent",
                  background: "#F9FAFB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                  transition: "all 0.2s",
                  margin: "0 auto",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#185ADB";
                  e.currentTarget.style.background = "#EEF3FC";
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.background = "#F9FAFB";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {c.flag}
              </div>
              <span style={{ fontSize: 10, color: "#6B7280", marginTop: 4, display: "block" }}>
                {c.label}
              </span>
            </button>
          ))}
        </div>

        {/* Reassurance badges */}
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
