"use client";

import { useEffect, useSyncExternalStore } from "react";
import { funnelStore } from "@/lib/funnel-store";

const VALID_COUNTRIES = ["CI", "MA", "SN", "RW", "ZA"];

const COUNTRY_TITLES: Record<string, string> = {
  CI: "VendezVotreVoiture.ci | par AUTO24",
  MA: "VendezVotreVoiture.ma | par AUTO24",
  SN: "VendezVotreVoiture.sn | par AUTO24",
  RW: "SellMyCar.rw | by AUTO24",
  ZA: "SellMyCarCash.co.za | by AUTO24",
};

export function FunnelHeader() {
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

  if (!hasCountry) return null;

  return (
    <header
      style={{
        background: "#185ADB",
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px 16px",
        minHeight: 72,
      }}
    >
      <img
        src={`/branding/header-${country.toLowerCase()}.png`}
        alt=""
        style={{
          maxHeight: 48,
          maxWidth: "85%",
          width: "auto",
          height: "auto",
          objectFit: "contain",
          display: "block",
        }}
      />
    </header>
  );
}
