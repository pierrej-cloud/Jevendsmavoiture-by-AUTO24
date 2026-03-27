"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, CheckCircle, Shield } from "lucide-react";
import { useLanguage } from "@/i18n/language-context";

export function LandingHero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />

      <div className="relative max-w-lg mx-auto px-4 pt-12 pb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-dark leading-tight mb-4">
          {t.landing.heroTitle}
        </h1>
        <p className="text-neutral-medium text-base mb-8 max-w-md mx-auto">
          {t.landing.heroSubtitle}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center mb-10">
          <Link href="/sell">
            <Button size="lg" className="w-full sm:w-auto">
              {t.landing.ctaStart}
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              {t.landing.ctaHow}
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm text-neutral-dark">{t.landing.reassurance.fast}</p>
              <p className="text-xs text-neutral-medium">{t.landing.reassurance.fastDesc}</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm text-neutral-dark">{t.landing.reassurance.simple}</p>
              <p className="text-xs text-neutral-medium">{t.landing.reassurance.simpleDesc}</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm text-neutral-dark">{t.landing.reassurance.trusted}</p>
              <p className="text-xs text-neutral-medium">{t.landing.reassurance.trustedDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
