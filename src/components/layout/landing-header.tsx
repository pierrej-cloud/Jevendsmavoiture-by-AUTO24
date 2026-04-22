"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/i18n/language-context";
import { Auto24Logo } from "@/components/ui/Auto24Logo";

export function LandingHeader() {
  const { locale, setLocale } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header
      style={{
        background: "white",
        borderBottom: "1px solid #E5E7EB",
        position: "sticky",
        top: 0,
        zIndex: 50,
        padding: "0 16px",
        height: 56,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          height: "100%",
        }}
      >
        {/* Logo */}
        <Auto24Logo height={26} color="#185ADB" />

        {/* Text */}
        <div style={{ lineHeight: 1.2 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>
            {locale === "fr" ? "vendezvotrevoiture" : "sellyourcar"}
          </div>
          <div style={{ fontSize: 10, color: "#185ADB", fontWeight: 600 }}>
            {locale === "fr" ? "par AUTO24" : "by AUTO24"}
          </div>
        </div>

        {/* Language dropdown */}
        <div ref={ref} style={{ position: "relative" }}>
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "5px 10px",
              borderRadius: 20,
              border: "1px solid #E5E7EB",
              background: "white",
              fontSize: 13,
              fontWeight: 600,
              color: "#185ADB",
              cursor: "pointer",
            }}
          >
            🌐 {locale === "fr" ? "🇫🇷 FR" : "🇬🇧 EN"} ▼
          </button>

          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                left: "50%",
                transform: "translateX(-50%)",
                background: "white",
                borderRadius: 12,
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                padding: 6,
                minWidth: 140,
                zIndex: 100,
              }}
            >
              <button
                type="button"
                onClick={() => { setLocale("fr"); setDropdownOpen(false); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: 8,
                  background: locale === "fr" ? "#EEF3FC" : "transparent",
                  color: locale === "fr" ? "#185ADB" : "#111827",
                  fontWeight: locale === "fr" ? 600 : 400,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                🇫🇷 Français
              </button>
              <button
                type="button"
                onClick={() => { setLocale("en"); setDropdownOpen(false); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: 8,
                  background: locale === "en" ? "#EEF3FC" : "transparent",
                  color: locale === "en" ? "#185ADB" : "#111827",
                  fontWeight: locale === "en" ? 600 : 400,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                🇬🇧 English
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
