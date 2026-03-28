"use client";

import { FunnelState } from "@/lib/funnel-store";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/i18n/language-context";
import { MILEAGE_RANGES_I18N } from "@/lib/constants";
import { Locale } from "@/i18n";

function getMileageLabel(mileage: string | number | undefined, locale: Locale): string {
  if (!mileage) return "";
  if (typeof mileage === "number") return `${mileage.toLocaleString()} km`;
  const range = MILEAGE_RANGES_I18N[mileage];
  return range ? range[locale] : String(mileage);
}

interface Props {
  state: FunnelState;
  onReset: () => void;
}

export function ConfirmationScreen({ state, onReset }: Props) {
  const { t, locale } = useLanguage();
  const { vehicleInfo, contactInfo, appointment, estimation } = state;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-8">
        <div className="text-center mb-8">
          {/* AUTO24 Logo */}
          <div className="flex justify-center mb-4" style={{ overflow: "visible", alignItems: "center" }}>
            <img src="/logo-auto24.png" alt="AUTO24" style={{ height: "52px", width: "auto", objectFit: "contain", display: "block" }} />
          </div>
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-dark mb-2">
            {t.confirmation.title}
          </h2>
          <p className="text-sm text-neutral-medium">
            {t.confirmation.subtitle}
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {vehicleInfo && (
            <div className="bg-white rounded-2xl p-4 shadow-card">
              <h3 className="text-xs font-semibold text-neutral-medium uppercase tracking-wide mb-2">
                {t.confirmation.vehicleSummary}
              </h3>
              <p className="font-semibold text-neutral-dark">
                {vehicleInfo.brand} {vehicleInfo.model} {vehicleInfo.year}
              </p>
              <p className="text-sm text-neutral-medium">
                {getMileageLabel(vehicleInfo.mileage, locale)} &middot; {vehicleInfo.fuelType} &middot; {vehicleInfo.transmission}
              </p>
            </div>
          )}

          {estimation && (
            <div className="bg-white rounded-2xl p-4 shadow-card">
              <h3 className="text-xs font-semibold text-neutral-medium uppercase tracking-wide mb-2">
                {t.confirmation.estimatedRange}
              </h3>
              <p className="font-semibold text-primary">
                {estimation.min?.toLocaleString()} — {estimation.max?.toLocaleString()} {estimation.currency}
              </p>
              <p className="text-xs text-neutral-medium mt-1">
                {t.estimation.finalOfferAfterInspection}
              </p>
            </div>
          )}

          {appointment && (
            <div className="bg-white rounded-2xl p-4 shadow-card">
              <h3 className="text-xs font-semibold text-neutral-medium uppercase tracking-wide mb-2">
                {t.confirmation.appointmentDetails}
              </h3>
              <p className="font-semibold text-neutral-dark">
                {appointment.date} {t.common.at} {appointment.timeSlot}
              </p>
            </div>
          )}

          {contactInfo && (
            <div className="bg-white rounded-2xl p-4 shadow-card">
              <h3 className="text-xs font-semibold text-neutral-medium uppercase tracking-wide mb-2">
                {t.confirmation.contactDetails}
              </h3>
              <p className="font-semibold text-neutral-dark">
                {contactInfo.firstName} {contactInfo.lastName}
              </p>
              <p className="text-sm text-neutral-medium">
                {contactInfo.email} &middot; {contactInfo.phone}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Link href="/" onClick={onReset}>
            <Button variant="outline" className="w-full" size="lg">
              <Home className="w-4 h-4 mr-2" />
              {t.confirmation.ctaHome}
            </Button>
          </Link>
          <a
            href="https://wa.me/message/AUTO24"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" className="w-full mt-3" size="lg">
              <MessageCircle className="w-4 h-4 mr-2" />
              {t.confirmation.ctaWhatsApp}
            </Button>
          </a>
        </div>
      </main>
    </div>
  );
}
