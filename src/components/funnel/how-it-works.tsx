"use client";

import { useEffect, useState } from "react";
import { Car, Camera, TrendingUp, Calendar, Banknote } from "lucide-react";
import { useLanguage } from "@/i18n/language-context";

export function HowItWorks() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState<boolean[]>([false, false, false, false, false]);

  useEffect(() => {
    const timers = [0, 1, 2, 3, 4].map((i) =>
      setTimeout(() => {
        setVisible((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 200 + i * 180)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const steps = [
    { icon: Car, title: t.landing.howItWorks.step1, desc: t.landing.howItWorks.step1Desc },
    { icon: Camera, title: t.landing.howItWorks.step2, desc: t.landing.howItWorks.step2Desc },
    { icon: TrendingUp, title: t.landing.howItWorks.step3, desc: t.landing.howItWorks.step3Desc },
    { icon: Calendar, title: t.landing.howItWorks.step4, desc: t.landing.howItWorks.step4Desc },
    { icon: Banknote, title: t.landing.howItWorks.step5, desc: t.landing.howItWorks.step5Desc },
  ];

  return (
    <section id="how-it-works" className="py-14 bg-white">
      <div className="max-w-[680px] mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-neutral-dark mb-10">
          {t.landing.howItWorks.title}
        </h2>

        {/* Orbital / staggered grid */}
        <div className="relative">
          {/* Row 1 — step 1 centered */}
          <div className="flex justify-center mb-4">
            <StepCard step={steps[0]} index={0} show={visible[0]} />
          </div>

          {/* Row 2 — steps 5 & 2 */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <StepCard step={steps[4]} index={4} show={visible[4]} />
            <StepCard step={steps[1]} index={1} show={visible[1]} />
          </div>

          {/* Row 3 — steps 4 & 3 */}
          <div className="grid grid-cols-2 gap-4">
            <StepCard step={steps[3]} index={3} show={visible[3]} />
            <StepCard step={steps[2]} index={2} show={visible[2]} />
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  index,
  show,
}: {
  step: { icon: React.ElementType; title: string; desc: string };
  index: number;
  show: boolean;
}) {
  const Icon = step.icon;

  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0) scale(1)" : "translateY(16px) scale(0.95)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
      className="bg-background rounded-2xl p-4 border border-gray-100 text-center"
    >
      <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center mx-auto mb-2">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <span className="inline-block text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full mb-1.5">
        {index + 1}
      </span>
      <h3 className="font-semibold text-sm text-neutral-dark mb-0.5">{step.title}</h3>
      <p className="text-xs text-neutral-medium leading-relaxed">{step.desc}</p>
    </div>
  );
}
