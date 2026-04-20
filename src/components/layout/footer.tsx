"use client";

import { useLanguage } from "@/i18n/language-context";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-gray-100 py-6">
      <div className="max-w-[680px] mx-auto px-4 text-center">
        <p className="text-xs text-neutral-medium">
          &copy; {new Date().getFullYear()} AUTO24. {t.common.allRightsReserved}
        </p>
      </div>
    </footer>
  );
}
