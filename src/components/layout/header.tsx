"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/language-context";
import { cn } from "@/lib/utils";
import { Auto24Logo } from "@/components/ui/Auto24Logo";
import { funnelStore } from "@/lib/funnel-store";

interface CountryBranding {
  domain: string;
  title: string;
}

const COUNTRY_BRANDING: Record<string, CountryBranding> = {
  CI: { domain: "vendezvotrevoiture.ci",    title: "VendezVotreVoiture.ci | par AUTO24" },
  MA: { domain: "vendezvotrevoiture.ma",    title: "VendezVotreVoiture.ma | par AUTO24" },
  SN: { domain: "vendezvotrevoiture.sn",    title: "VendezVotreVoiture.sn | par AUTO24" },
  RW: { domain: "sellmycar.rw",             title: "SellMyCar.rw | by AUTO24" },
  ZA: { domain: "sellmycarcash.co.za",      title: "SellMyCarCash.co.za | by AUTO24" },
};

const FALLBACK_DOMAIN = "jevendsmavoiturebyauto24.up.railway.app";
const FALLBACK_TITLE = "Jevendsmavoiture by AUTO24";

export function Header() {
  const { locale, setLocale } = useLanguage();
  const state = useSyncExternalStore(
    funnelStore.subscribe,
    funnelStore.getState,
    funnelStore.getState
  );

  const country = state.selectedCountry;
  const branding = country && COUNTRY_BRANDING[country] ? COUNTRY_BRANDING[country] : null;
  const domain = branding?.domain ?? FALLBACK_DOMAIN;
  const title = branding?.title ?? FALLBACK_TITLE;
  const byLabel = locale === "fr" ? "par AUTO24" : "by AUTO24";

  // Dynamic document title based on country
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = title;
    }
  }, [title]);

  return (
    <header
      className="sticky top-0 z-50 min-h-[56px]"
      style={{ backgroundColor: "#185ADB" }}
    >
      <div className="max-w-[680px] mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Auto24Logo height={24} color="#FFFFFF" />
          <div className="flex flex-col leading-tight">
            <span className="text-white font-bold text-[15px]">{domain}</span>
            <span className="text-white text-[11px]" style={{ opacity: 0.7 }}>
              {byLabel}
            </span>
          </div>
        </Link>

        {/* Language switcher */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setLocale("fr")}
            className={cn(
              "px-3 py-1 text-xs font-semibold transition-all",
              locale === "fr"
                ? "bg-white"
                : "bg-transparent hover:bg-white/10"
            )}
            style={{
              borderRadius: "20px",
              color: locale === "fr" ? "#185ADB" : "rgba(255,255,255,0.6)",
            }}
          >
            FR
          </button>
          <button
            type="button"
            onClick={() => setLocale("en")}
            className={cn(
              "px-3 py-1 text-xs font-semibold transition-all",
              locale === "en"
                ? "bg-white"
                : "bg-transparent hover:bg-white/10"
            )}
            style={{
              borderRadius: "20px",
              color: locale === "en" ? "#185ADB" : "rgba(255,255,255,0.6)",
            }}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}
