"use client";

import { useState, useSyncExternalStore } from "react";
import { FunnelLayout } from "@/components/layout/funnel-layout";
import { VehicleInfoStep } from "@/components/funnel/vehicle-info-step";
import { VehicleConditionStep } from "@/components/funnel/vehicle-condition-step";
import { PhotoUploadStep } from "@/components/funnel/photo-upload-step";
import { AnalysisScreen } from "@/components/funnel/analysis-screen";
import { EstimationScreen } from "@/components/funnel/estimation-screen";
import { ContactInfoStep } from "@/components/funnel/contact-info-step";
import { ShowroomStep } from "@/components/funnel/showroom-step";
import { AppointmentStep } from "@/components/funnel/appointment-step";
import { ConfirmationScreen } from "@/components/funnel/confirmation-screen";
import { funnelStore } from "@/lib/funnel-store";

const TOTAL_STEPS = 8;

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

  // Confirmation screen (no progress bar)
  if (step > TOTAL_STEPS) {
    return <ConfirmationScreen state={state} onReset={() => { funnelStore.reset(); setStep(1); }} />;
  }

  // Analysis screen (no progress bar)
  if (step === 4) {
    return (
      <FunnelLayout currentStep={step} totalSteps={TOTAL_STEPS}>
        <AnalysisScreen onComplete={next} state={state} />
      </FunnelLayout>
    );
  }

  return (
    <FunnelLayout currentStep={step} totalSteps={TOTAL_STEPS}>
      {step === 1 && <VehicleInfoStep onNext={next} />}
      {step === 2 && <VehicleConditionStep onNext={next} onBack={back} />}
      {step === 3 && <PhotoUploadStep onNext={next} onBack={back} />}
      {step === 5 && (
        <EstimationScreen
          state={state}
          onNext={next}
          onEdit={() => goTo(1)}
        />
      )}
      {step === 6 && <ContactInfoStep onNext={next} onBack={back} />}
      {step === 7 && <ShowroomStep onNext={next} onBack={back} />}
      {step === 8 && <AppointmentStep onNext={next} onBack={back} state={state} />}
    </FunnelLayout>
  );
}
