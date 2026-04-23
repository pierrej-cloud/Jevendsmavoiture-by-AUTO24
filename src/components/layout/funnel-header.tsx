"use client";

import { useEffect, useSyncExternalStore } from "react";
import { funnelStore } from "@/lib/funnel-store";
import { useLanguage } from "@/i18n/language-context";
import { Auto24Logo } from "@/components/ui/Auto24Logo";

const VALID_COUNTRIES = ["CI", "MA", "SN", "RW", "ZA"];

const COUNTRY_DOMAINS: Record<string, string> = {
  CI: "vendezvotrevoiture.ci",
  MA: "vendezvotrevoiture.ma",
  SN: "vendezvotrevoiture.sn",
  RW: "sellmycar.rw",
  ZA: "sellmycarcash.co.za",
};

const COUNTRY_TITLES: Record<string, string> = {
  CI: "VendezVotreVoiture.ci | par AUTO24",
  MA: "VendezVotreVoiture.ma | par AUTO24",
  SN: "VendezVotreVoiture.sn | par AUTO24",
  RW: "SellMyCar.rw | by AUTO24",
  ZA: "SellMyCarCash.co.za | by AUTO24",
};

export function FunnelHeader() {
  const { locale } = useLanguage();
  const state = useSyncExternalStore(
    funnelStore.subscribe,
    funnelStore.getState,
    funnelStore.getState
  );

  const country = state.selectedCountry;
  const hasCountry = country && VALID_COUNTRIES.includes(country);
  const domain = hasCountry ? COUNTRY_DOMAINS[country] : null;
  const byLabel = locale === "fr" ? "par AUTO24" : "by AUTO24";
  const title = hasCountry ? COUNTRY_TITLES[country] : "Jevendsmavoiture by AUTO24";

  useEffect(() => {
    document.title = title;
  }, [title]);

  if (!hasCountry) return null;

  return (
    <header
      style={{
        background: "#185ADB",
        height: 56,
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          padding: "0 16px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <Auto24Logo height={24} color="#FFFFFF" />
        <div style={{ lineHeight: 1.15 }}>
          <div style={{ color: "white", fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em" }}>
            {domain}
          </div>
          <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, fontWeight: 500 }}>
            {byLabel}
          </div>
        </div>
      </div>
    </header>
  );
}
