"use client";

import { useState, useSyncExternalStore } from "react";
import { FunnelLayout } from "@/components/layout/funnel-layout";
import { ContactInfoStep } from "@/components/funnel/contact-info-step";
import { PhotoUploadStep } from "@/components/funnel/photo-upload-step";
import { VehicleInfoStep } from "@/components/funnel/vehicle-info-step";
import { VehicleConditionStep } from "@/components/funnel/vehicle-condition-step";
import { VehicleOptionsStep } from "@/components/funnel/vehicle-options-step";
import { AnalysisScreen } from "@/components/funnel/analysis-screen";
import { EstimationScreen } from "@/components/funnel/estimation-screen";
import { ShowroomStep } from "@/components/funnel/showroom-step";
import { AppointmentStep } from "@/components/funnel/appointment-step";
import { ConfirmationScreen } from "@/components/funnel/confirmation-screen";
import { funnelStore } from "@/lib/funnel-store";

const TOTAL_STEPS = 9;

export default function SellPage() {
  const [step, setStep] = useState(1);
  const state = useSyncExternalStore(
    funnelStore.subscribe,
    funnelStore.getState,
    funnelStore.getState
  );

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS + 1));
  const back = () => setStep((s) => Math.max(s - 1, 1));
  const goTo = (s: number) => setStep(s);

  // Step 10: Confirmation (beyond TOTAL_STEPS)
  if (step > TOTAL_STEPS) {
    return <ConfirmationScreen state={state} onReset={() => { funnelStore.reset(); setStep(1); }} />;
  }

  // Step 6: Analysis (auto-advance, no user interaction)
  if (step === 6) {
    return (
      <FunnelLayout currentStep={step} totalSteps={TOTAL_STEPS}>
        <AnalysisScreen onComplete={next} state={state} />
      </FunnelLayout>
    );
  }

  return (
    <FunnelLayout currentStep={step} totalSteps={TOTAL_STEPS}>
      {step === 1 && <ContactInfoStep onNext={next} />}
      {step === 2 && <PhotoUploadStep onNext={next} onBack={back} />}
      {step === 3 && <VehicleInfoStep onNext={next} onBack={back} />}
      {step === 4 && <VehicleConditionStep onNext={next} onBack={back} />}
      {step === 5 && <VehicleOptionsStep onNext={next} onBack={back} />}
      {step === 7 && (
        <EstimationScreen
          state={state}
          onNext={next}
          onEdit={() => goTo(3)}
        />
      )}
      {step === 8 && <ShowroomStep onNext={next} onBack={() => goTo(7)} />}
      {step === 9 && <AppointmentStep onNext={next} onBack={back} state={state} />}
    </FunnelLayout>
  );
}
