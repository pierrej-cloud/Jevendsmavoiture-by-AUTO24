"use client";

import { Car, Camera, TrendingUp, Calendar } from "lucide-react";
import { useLanguage } from "@/i18n/language-context";

export function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    { icon: Car, title: t.landing.howItWorks.step1, description: t.landing.howItWorks.step1Desc },
    { icon: Camera, title: t.landing.howItWorks.step2, description: t.landing.howItWorks.step2Desc },
    { icon: TrendingUp, title: t.landing.howItWorks.step3, description: t.landing.howItWorks.step3Desc },
    { icon: Calendar, title: t.landing.howItWorks.step4, description: t.landing.howItWorks.step4Desc },
  ];

  return (
    <section id="how-it-works" className="py-12 bg-white">
      <div className="max-w-lg mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-neutral-dark mb-8">
          {t.landing.howItWorks.title}
        </h2>
        <div className="space-y-6">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <step.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {t.common.step} {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-neutral-dark">{step.title}</h3>
                <p className="text-sm text-neutral-medium">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
