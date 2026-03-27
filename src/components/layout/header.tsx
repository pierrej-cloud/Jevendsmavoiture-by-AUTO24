"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/language-context";
import { cn } from "@/lib/utils";

export function Header() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 min-h-[56px]" style={{ overflow: "visible" }}>
      <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between" style={{ overflow: "visible" }}>
        <Link href="/" className="flex items-center gap-2" style={{ overflow: "visible", alignItems: "center" }}>
          <img src="/logo-auto24.png" alt="AUTO24" style={{ height: "36px", width: "auto", objectFit: "contain", display: "block" }} />
          <span className="text-sm">
            <span className="font-bold text-neutral-dark">{t.header.brandName}</span>
          </span>
        </Link>

        {/* Language switcher */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-full p-0.5">
          <button
            type="button"
            onClick={() => setLocale("fr")}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-base transition-all",
              locale === "fr"
                ? "bg-white shadow-sm scale-110"
                : "opacity-50 hover:opacity-80"
            )}
            title="Français"
          >
            <span role="img" aria-label="Français">🇫🇷</span>
          </button>
          <button
            type="button"
            onClick={() => setLocale("en")}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-base transition-all",
              locale === "en"
                ? "bg-white shadow-sm scale-110"
                : "opacity-50 hover:opacity-80"
            )}
            title="English"
          >
            <span role="img" aria-label="English">🇬🇧</span>
          </button>
        </div>
      </div>
    </header>
  );
}
