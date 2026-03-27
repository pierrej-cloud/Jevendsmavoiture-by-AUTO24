"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { funnelStore, FunnelState } from "@/lib/funnel-store";
import { cn } from "@/lib/utils";

interface Props {
  onComplete: () => void;
  state: FunnelState;
}

const analysisSteps = [
  { key: "checking", label: "Vehicle details checked" },
  { key: "processing", label: "Photos processed" },
  { key: "preparing", label: "Estimate prepared" },
];

export function AnalysisScreen({ onComplete, state }: Props) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Simulate analysis steps
    timers.push(setTimeout(() => setCurrentStep(1), 1200));
    timers.push(setTimeout(() => setCurrentStep(2), 2400));
    timers.push(
      setTimeout(async () => {
        setCurrentStep(3);

        // Call estimation API
        if (state.vehicleInfo && state.vehicleCondition) {
          try {
            const res = await fetch("/api/estimation", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...state.vehicleInfo,
                ...state.vehicleCondition,
              }),
            });
            const data = await res.json();
            funnelStore.setEstimation(data);
          } catch {
            // Fallback estimation
            funnelStore.setEstimation({ min: 3_000_000, max: 5_000_000, currency: "XOF" });
          }
        }

        setTimeout(onComplete, 800);
      }, 3600)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete, state.vehicleInfo, state.vehicleCondition]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>

      <h2 className="text-xl font-bold text-neutral-dark mb-2">
        Analyzing your vehicle
      </h2>
      <p className="text-sm text-neutral-medium mb-8">
        Please wait while we prepare your estimate...
      </p>

      <div className="space-y-4 w-full max-w-xs">
        {analysisSteps.map((step, i) => (
          <div
            key={step.key}
            className={cn(
              "flex items-center gap-3 transition-all duration-500",
              i < currentStep ? "opacity-100" : "opacity-30"
            )}
          >
            {i < currentStep ? (
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0" />
            )}
            <span
              className={cn(
                "text-sm",
                i < currentStep ? "text-neutral-dark font-medium" : "text-neutral-medium"
              )}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
