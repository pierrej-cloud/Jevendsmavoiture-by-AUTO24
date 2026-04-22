"use client";

import { useLanguage } from "@/i18n/language-context";

export function LandingHeader() {
  const { locale, setLocale } = useLanguage();

  return (
    <header
      style={{
        background: "#FFFFFF",
        height: 56,
        borderBottom: "1px solid #E5E7EB",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Left — brand text */}
      <div style={{ lineHeight: 1.2 }}>
        <div style={{ color: "#111827", fontWeight: 700, fontSize: 16 }}>
          {locale === "fr" ? "vendez votre voiture" : "sell your car"}
        </div>
        <div style={{ color: "#185ADB", fontWeight: 600, fontSize: 12 }}>
          {locale === "fr" ? "par AUTO24" : "by AUTO24"}
        </div>
      </div>

      {/* Right — FR | EN */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <button
          type="button"
          onClick={() => setLocale("fr")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: locale === "fr" ? 700 : 400,
            color: locale === "fr" ? "#185ADB" : "#9CA3AF",
            padding: "4px 2px",
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
            fontSize: 13,
            fontWeight: locale === "en" ? 700 : 400,
            color: locale === "en" ? "#185ADB" : "#9CA3AF",
            padding: "4px 2px",
          }}
        >
          EN
        </button>
      </div>
    </header>
  );
}
