"use client";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/language-context";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function ProgressBar({ currentStep, totalSteps, className }: ProgressBarProps) {
  const { t } = useLanguage();
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between mb-2">
        <span className="text-xs font-medium text-neutral-medium">
          {t.common.step} {currentStep} {t.common.of} {totalSteps}
        </span>
        <span className="text-xs font-medium text-primary">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
