"use client";

import { useEffect, useState } from "react";
import { FunnelState } from "@/lib/funnel-store";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, Shield, ArrowRight, Edit, CheckCircle, Lightbulb, Loader2 } from "lucide-react";
import { useLanguage } from "@/i18n/language-context";

interface Props {
  state: FunnelState;
  onNext: () => void;
  onEdit: () => void;
}

interface AiReport {
  strengths: string[];
  priceJustification: string;
  sellerTip: string;
}

export function EstimationScreen({ state, onNext, onEdit }: Props) {
  const { t, locale } = useLanguage();
  const estimation = state.estimation;
  const vehicle = state.vehicleInfo;
  const [report, setReport] = useState<AiReport | null>(null);
  const [reportLoading, setReportLoading] = useState(false);

  useEffect(() => {
    if (!state.vehicleInfo || !state.estimation) return;

    setReportLoading(true);
    fetch("/api/ai/generate-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vehicleInfo: state.vehicleInfo,
        vehicleCondition: state.vehicleCondition,
        vehicleOptions: state.vehicleOptions,
        estimation: state.estimation,
        locale,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data && data.strengths) setReport(data);
      })
      .catch(() => {})
      .finally(() => setReportLoading(false));
  }, []);

  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <TrendingUp className="w-8 h-8 text-success" />
      </div>

      <h2 className="text-2xl font-bold text-neutral-dark mb-2">
        {t.estimation.title}
      </h2>

      {vehicle && (
        <p className="text-sm text-neutral-medium mb-6">
          {vehicle.brand} {vehicle.model} {vehicle.year}
        </p>
      )}

      {estimation && (
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 mb-6">
          <p className="text-xs font-medium text-primary mb-2 uppercase tracking-wide">
            {t.estimation.range}
          </p>
          <p className="text-3xl font-extrabold text-primary">
            {formatCurrency(estimation.min)} — {formatCurrency(estimation.max)}
          </p>
          <p className="text-xs text-neutral-medium mt-2">{estimation.currency}</p>
        </div>
      )}

      {/* AI Report */}
      {reportLoading && (
        <div className="flex items-center justify-center gap-2 mb-6 text-neutral-medium">
          <Loader2 className="w-4 h-4 animate-spin" />
          <p className="text-xs">{t.estimation.aiReportLoading}</p>
        </div>
      )}

      {report && (
        <div className="text-left mb-6 space-y-4">
          {/* Strengths */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="text-sm font-semibold text-neutral-dark mb-3">
              {t.estimation.aiStrengths}
            </h3>
            <div className="space-y-2">
              {report.strengths.map((s, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-neutral-dark">{s}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Price justification */}
          {report.priceJustification && (
            <p className="text-sm text-neutral-medium italic px-2">
              {report.priceJustification}
            </p>
          )}

          {/* Seller tip */}
          {report.sellerTip && (
            <div className="bg-primary/5 border border-primary/10 rounded-xl p-3 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-primary mb-0.5">{t.estimation.aiTip}</p>
                <p className="text-xs text-neutral-dark">{report.sellerTip}</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
        <div className="flex gap-2">
          <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">{t.estimation.indicativeEstimate}</p>
            <p className="text-xs text-amber-700 mt-1">{t.estimation.disclaimer}</p>
          </div>
        </div>
      </div>

      <div className="bg-primary/5 rounded-xl p-3 mb-6 flex items-center gap-2 justify-center">
        <Shield className="w-4 h-4 text-primary" />
        <p className="text-xs font-medium text-primary">{t.estimation.reassurance}</p>
      </div>

      <div className="space-y-3">
        <Button onClick={onNext} className="w-full" size="lg">
          {t.estimation.ctaPrimary}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        <Button variant="ghost" onClick={onEdit} className="w-full">
          <Edit className="w-4 h-4 mr-2" />
          {t.estimation.ctaSecondary}
        </Button>
      </div>
    </div>
  );
}
