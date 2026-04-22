"use client";

import { useSyncExternalStore } from "react";
import { funnelStore } from "@/lib/funnel-store";

const VALID_COUNTRIES = ["CI", "MA", "SN", "RW", "ZA"];

export function FunnelHeader() {
  const state = useSyncExternalStore(
    funnelStore.subscribe,
    funnelStore.getState,
    funnelStore.getState
  );

  const country = state.selectedCountry;
  if (!country || !VALID_COUNTRIES.includes(country)) return null;

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, width: "100%" }}>
      <img
        src={`/branding/header-${country.toLowerCase()}.png`}
        alt=""
        style={{ width: "100%", height: "auto", display: "block", maxHeight: 80 }}
      />
    </header>
  );
}
