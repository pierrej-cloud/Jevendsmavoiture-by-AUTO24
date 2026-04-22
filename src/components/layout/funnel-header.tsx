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
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#185ADB",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 16px",
        width: "100%",
      }}
    >
      <img
        src={`/branding/header-${country.toLowerCase()}.png`}
        alt=""
        style={{
          height: 52,
          width: "auto",
          objectFit: "contain",
          display: "block",
        }}
      />
    </header>
  );
}
