"use client";

import { Search, Users, Eye, Rocket } from "lucide-react";
import { useLanguage } from "@/i18n/language-context";

export function WhySellSection() {
  const { t } = useLanguage();

  const reasons = [
    { icon: Search, title: t.landing.whySell.inspection, description: t.landing.whySell.inspectionDesc },
    { icon: Users, title: t.landing.whySell.experts, description: t.landing.whySell.expertsDesc },
    { icon: Eye, title: t.landing.whySell.transparent, description: t.landing.whySell.transparentDesc },
    { icon: Rocket, title: t.landing.whySell.followUp, description: t.landing.whySell.followUpDesc },
  ];

  return (
    <section className="py-12 bg-background">
      <div className="max-w-lg mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-neutral-dark mb-8">
          {t.landing.whySell.title}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {reasons.map((r, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-card">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <r.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-sm text-neutral-dark mb-1">{r.title}</h3>
              <p className="text-xs text-neutral-medium">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
