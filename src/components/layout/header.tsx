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
      style={{
        background: "#185ADB",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Logo white badge */}
      <Link href="/" style={{ flexShrink: 0 }}>
        <div style={{ background: "white", borderRadius: 8, padding: "5px 10px", display: "flex", alignItems: "center" }}>
          <Auto24Logo height={24} color="#185ADB" />
        </div>
      </Link>

      {/* Country PNG or fallback text */}
      {hasCountry ? (
        <img
          src={`/branding/header-${country.toLowerCase()}.png`}
          alt={title}
          style={{ height: 48, width: "auto", objectFit: "contain", display: "block", flexShrink: 0 }}
        />
      ) : (
        <span style={{ color: "white", fontWeight: 700, fontSize: 15, whiteSpace: "nowrap", flexShrink: 0 }}>
          Jevendsmavoiture
        </span>
      )}

      {/* FR | EN */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
        <button
          type="button"
          onClick={() => setLocale("fr")}
          style={{
            color: "white",
            fontWeight: 700,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 14,
            opacity: locale === "fr" ? 1 : 0.5,
            padding: "4px 2px",
          }}
        >
          FR
        </button>
        <span style={{ color: "rgba(255,255,255,0.4)" }}>|</span>
        <button
          type="button"
          onClick={() => setLocale("en")}
          style={{
            color: "white",
            fontWeight: 700,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 14,
            opacity: locale === "en" ? 1 : 0.5,
            padding: "4px 2px",
          }}
        >
          EN
        </button>
      </div>
    </header>
  );
}
