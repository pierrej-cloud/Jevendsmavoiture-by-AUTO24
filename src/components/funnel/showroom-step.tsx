"use client";

import { useState, useEffect } from "react";
import { funnelStore } from "@/lib/funnel-store";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/language-context";

interface Showroom {
  id: string;
  name: string;
  city: string;
  address: string;
  country: string;
  openingHours: string;
}

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export function ShowroomStep({ onNext, onBack }: Props) {
  const { t } = useLanguage();
  const [showrooms, setShowrooms] = useState<Showroom[]>([]);
  const [selected, setSelected] = useState<string>(
    funnelStore.getState().appointment?.showroomId || ""
  );
  const [loading, setLoading] = useState(true);
  const [autoSelected, setAutoSelected] = useState(false);

  const selectedCountry = funnelStore.getState().selectedCountry;

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCountry) params.set("country", selectedCountry);

    fetch(`/api/showrooms?${params}`)
      .then((r) => r.json())
      .then((data: Showroom[]) => {
        setShowrooms(data);

        // Auto-select if only one showroom for this country
        if (data.length === 1 && !selected) {
          setSelected(data[0].id);
          setAutoSelected(true);
        }

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedCountry]);

  const handleNext = () => {
    if (!selected) return;
    const existing = funnelStore.getState().appointment;
    funnelStore.setAppointment({
      showroomId: selected,
      date: existing?.date || "",
      timeSlot: existing?.timeSlot || "",
    });
    onNext();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-pulse text-neutral-medium">{t.common.loadingShowrooms}</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="funnel-title">{t.showroom.title}</h2>
      <p className="funnel-subtitle">{t.showroom.subtitle}</p>

      {/* Auto-selection message */}
      {autoSelected && showrooms.length === 1 && (
        <div className="flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-xl p-3 mb-4">
          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
          <p className="text-xs text-primary font-medium">{t.showroom.preselected}</p>
        </div>
      )}

      <div className="space-y-3 mb-6">
        {showrooms.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              setSelected(s.id);
              setAutoSelected(false);
            }}
            className={cn(
              "w-full text-left p-4 rounded-2xl border-2 transition-all",
              selected === s.id
                ? "border-primary bg-primary/5 shadow-card"
                : "border-gray-100 bg-white hover:border-gray-200"
            )}
          >
            <h3 className="font-semibold text-neutral-dark mb-1">{s.name}</h3>
            <div className="flex items-center gap-1.5 text-xs text-neutral-medium mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{s.address}, {s.city}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>{s.openingHours}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          {t.common.back}
        </Button>
        <Button onClick={handleNext} className="flex-1" disabled={!selected}>
          {t.common.next}
        </Button>
      </div>
    </div>
  );
}
