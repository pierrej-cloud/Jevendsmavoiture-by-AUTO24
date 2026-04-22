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
      className="md:min-h-[160px]"
      style={{
        background: "#185ADB",
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        height: "auto",
        minHeight: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <img
        src={`/branding/header-${country.toLowerCase()}.png`}
        alt=""
        className="md:max-h-[140px]"
        style={{
          maxHeight: 100,
          maxWidth: "90%",
          width: "auto",
          height: "auto",
          objectFit: "contain",
          display: "block",
        }}
      />
    </header>
  );
}
