"use client";

import { Header } from "./header";
import { ProgressBar } from "../ui/progress-bar";

interface FunnelLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
}

export function FunnelLayout({ children, currentStep, totalSteps }: FunnelLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="max-w-[680px] mx-auto w-full px-4 pt-4">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>
      <main className="flex-1 max-w-[680px] mx-auto w-full px-4 py-6">
        {children}
      </main>
    </div>
  );
}
