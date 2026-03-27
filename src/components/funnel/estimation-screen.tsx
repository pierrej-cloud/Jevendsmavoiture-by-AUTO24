"use client";

import { FunnelState } from "@/lib/funnel-store";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, Shield, ArrowRight, Edit } from "lucide-react";

interface Props {
  state: FunnelState;
  onNext: () => void;
  onEdit: () => void;
}

export function EstimationScreen({ state, onNext, onEdit }: Props) {
  const estimation = state.estimation;
  const vehicle = state.vehicleInfo;

  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <TrendingUp className="w-8 h-8 text-success" />
      </div>

      <h2 className="text-2xl font-bold text-neutral-dark mb-2">
        Your estimated value
      </h2>

      {vehicle && (
        <p className="text-sm text-neutral-medium mb-6">
          {vehicle.brand} {vehicle.model} {vehicle.year}
        </p>
      )}

      {estimation && (
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 mb-6">
          <p className="text-xs font-medium text-primary mb-2 uppercase tracking-wide">
            Estimated range
          </p>
          <p className="text-3xl font-extrabold text-primary">
            {formatCurrency(estimation.min)} — {formatCurrency(estimation.max)}
          </p>
          <p className="text-xs text-neutral-medium mt-2">
            {estimation.currency}
          </p>
        </div>
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
        <div className="flex gap-2">
          <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">
              Indicative estimate
            </p>
            <p className="text-xs text-amber-700 mt-1">
              This is an indicative estimate based on the information provided.
              The final offer will be confirmed after a physical inspection at our showroom.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-primary/5 rounded-xl p-3 mb-6 flex items-center gap-2 justify-center">
        <Shield className="w-4 h-4 text-primary" />
        <p className="text-xs font-medium text-primary">
          Final offer confirmed after physical inspection in showroom
        </p>
      </div>

      <div className="space-y-3">
        <Button onClick={onNext} className="w-full" size="lg">
          Get my final offer
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        <Button variant="ghost" onClick={onEdit} className="w-full">
          <Edit className="w-4 h-4 mr-2" />
          Edit my information
        </Button>
      </div>
    </div>
  );
}
