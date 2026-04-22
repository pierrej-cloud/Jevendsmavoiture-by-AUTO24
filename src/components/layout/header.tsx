"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/language-context";
import { cn } from "@/lib/utils";
import { Auto24Logo } from "@/components/ui/Auto24Logo";
import { funnelStore } from "@/lib/funnel-store";

const COUNTRY_TITLES: Record<string, string> = {
  CI: "VendezVotreVoiture.ci | par AUTO24",
  MA: "VendezVotreVoiture.ma | par AUTO24",
  SN: "VendezVotreVoiture.sn | par AUTO24",
  RW: "SellMyCar.rw | by AUTO24",
  ZA: "SellMyCarCash.co.za | by AUTO24",
};

const FALLBACK_DOMAIN = "jevendsmavoiturebyauto24.up.railway.app";
const FALLBACK_TITLE = "Jevendsmavoiture by AUTO24";

function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => setLocale("fr")}
        className={cn(
          "px-3 py-1 text-xs font-semibold transition-all",
          locale === "fr" ? "bg-white" : "bg-transparent hover:bg-white/10"
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
          locale === "en" ? "bg-white" : "bg-transparent hover:bg-white/10"
        )}
        style={{
          borderRadius: "20px",
          color: locale === "en" ? "#185ADB" : "rgba(255,255,255,0.6)",
        }}
      >
        EN
      </button>
    </div>
  );
}

export function Header() {
  const { locale } = useLanguage();
  const state = useSyncExternalStore(
    funnelStore.subscribe,
    funnelStore.getState,
    funnelStore.getState
  );

  const country = state.selectedCountry;
  const hasCountry = country && COUNTRY_TITLES[country];
  const title = hasCountry ? COUNTRY_TITLES[country] : FALLBACK_TITLE;
  const byLabel = locale === "fr" ? "par AUTO24" : "by AUTO24";

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = title;
    }
  }, [title]);

  // Country selected → full-width header PNG image
  if (hasCountry) {
    return (
      <header className="sticky top-0 z-50" style={{ position: "relative", width: "100%" }}>
        <Link href="/">
          <img
            src={`/branding/header-${country.toLowerCase()}.png`}
            alt="header"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </Link>
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 16,
            height: "100%",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <LanguageSwitcher />
        </div>
      </header>
    );
  }

  // Fallback → blue header with AUTO24 logo + text
  return (
    <header className="sticky top-0 z-50 h-[56px]" style={{ backgroundColor: "#185ADB" }}>
      <div className="max-w-[680px] mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Auto24Logo height={24} color="#FFFFFF" />
          <div className="flex flex-col leading-tight">
            <span className="text-white font-bold text-[15px]">{FALLBACK_DOMAIN}</span>
            <span className="text-white text-[11px]" style={{ opacity: 0.7 }}>
              {byLabel}
            </span>
          </div>
        </Link>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
