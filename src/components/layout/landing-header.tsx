"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/i18n/language-context";
import { Auto24Logo } from "@/components/ui/Auto24Logo";

export function LandingHeader() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const brandText = locale === "fr" ? "vendezvotrevoiture" : "sellyourcar";
  const byText = locale === "fr" ? "par AUTO24" : "by AUTO24";

  return (
    <header
      style={{
        height: 56,
        background: "#FFFFFF",
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
      {/* LEFT spacer */}
      <div style={{ flex: 1 }} />

      {/* CENTER — logo */}
      <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
        <Auto24Logo height={28} color="#185ADB" />
      </div>

      {/* RIGHT — brand text + lang dropdown */}
      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 10 }}>
        {/* Brand text */}
        <div style={{ textAlign: "right", lineHeight: 1.2 }}>
          <div style={{ color: "#185ADB", fontSize: 11, fontWeight: 600 }}>{brandText}</div>
          <div style={{ color: "#9CA3AF", fontSize: 10 }}>{byText}</div>
        </div>

        {/* Language dropdown */}
        <div ref={ref} style={{ position: "relative" }}>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              background: "white",
              border: "1px solid #E5E7EB",
              borderRadius: 20,
              padding: "4px 10px",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              color: "#185ADB",
            }}
          >
            🌐 {locale === "fr" ? "🇫🇷 FR" : "🇬🇧 EN"} ▾
          </button>

          {open && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                right: 0,
                background: "white",
                borderRadius: 12,
                boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                padding: 8,
                zIndex: 100,
                minWidth: 140,
              }}
            >
              <button
                type="button"
                onClick={() => { setLocale("fr"); setOpen(false); }}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  background: locale === "fr" ? "#EEF3FC" : "transparent",
                  color: locale === "fr" ? "#185ADB" : "#374151",
                  fontWeight: locale === "fr" ? 600 : 400,
                }}
                onMouseEnter={(e) => { if (locale !== "fr") e.currentTarget.style.background = "#F3F4F6"; }}
                onMouseLeave={(e) => { if (locale !== "fr") e.currentTarget.style.background = "transparent"; }}
              >
                🇫🇷 Français
              </button>
              <button
                type="button"
                onClick={() => { setLocale("en"); setOpen(false); }}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  background: locale === "en" ? "#EEF3FC" : "transparent",
                  color: locale === "en" ? "#185ADB" : "#374151",
                  fontWeight: locale === "en" ? 600 : 400,
                }}
                onMouseEnter={(e) => { if (locale !== "en") e.currentTarget.style.background = "#F3F4F6"; }}
                onMouseLeave={(e) => { if (locale !== "en") e.currentTarget.style.background = "transparent"; }}
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
