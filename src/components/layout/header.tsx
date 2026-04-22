"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/language-context";
import { Auto24Logo } from "@/components/ui/Auto24Logo";
import { funnelStore } from "@/lib/funnel-store";

const COUNTRY_TITLES: Record<string, string> = {
  CI: "VendezVotreVoiture.ci | par AUTO24",
  MA: "VendezVotreVoiture.ma | par AUTO24",
  SN: "VendezVotreVoiture.sn | par AUTO24",
  RW: "SellMyCar.rw | by AUTO24",
  ZA: "SellMyCarCash.co.za | by AUTO24",
};

const VALID_COUNTRIES = ["CI", "MA", "SN", "RW", "ZA"];

export function Header() {
  const { locale, setLocale } = useLanguage();
  const state = useSyncExternalStore(
    funnelStore.subscribe,
    funnelStore.getState,
    funnelStore.getState
  );

  const country = state.selectedCountry;
  const hasCountry = country && VALID_COUNTRIES.includes(country);
  const title = hasCountry ? COUNTRY_TITLES[country] : "Jevendsmavoiture by AUTO24";

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        height: "56px",
        background: "#FFFFFF",
        borderBottom: "1px solid #E5E7EB",
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Left — Logo */}
      <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center" }}>
        <Link href="/">
          <Auto24Logo height={28} color="#185ADB" />
        </Link>
      </div>

      {/* Center — Country header PNG or fallback text */}
      <div style={{ flex: "1 1 auto", display: "flex", justifyContent: "center", alignItems: "center", minWidth: 0 }}>
        {hasCountry ? (
          <img
            src={`/branding/header-${country.toLowerCase()}.png`}
            alt={title}
            style={{ height: "40px", width: "auto", objectFit: "contain", display: "block" }}
          />
        ) : (
          <span style={{ color: "#185ADB", fontWeight: 700, fontSize: "14px", whiteSpace: "nowrap" }}>
            Jevendsmavoiture
          </span>
        )}
      </div>

      {/* Right — Language switcher */}
      <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: "2px", fontSize: "13px" }}>
        <button
          type="button"
          onClick={() => setLocale("fr")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px 6px",
            fontWeight: locale === "fr" ? 700 : 400,
            color: locale === "fr" ? "#185ADB" : "#9CA3AF",
          }}
        >
          FR
        </button>
        <span style={{ color: "#D1D5DB" }}>|</span>
        <button
          type="button"
          onClick={() => setLocale("en")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px 6px",
            fontWeight: locale === "en" ? 700 : 400,
            color: locale === "en" ? "#185ADB" : "#9CA3AF",
          }}
        >
          EN
        </button>
      </div>
    </header>
  );
}
