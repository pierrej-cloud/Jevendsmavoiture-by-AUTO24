"use client";

import { useState, useEffect } from "react";
import { funnelStore } from "@/lib/funnel-store";
import { Button } from "@/components/ui/button";
import { MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [showrooms, setShowrooms] = useState<Showroom[]>([]);
  const [selected, setSelected] = useState<string>(
    funnelStore.getState().appointment?.showroomId || ""
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/showrooms")
      .then((r) => r.json())
      .then((data) => {
        setShowrooms(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
        <div className="animate-pulse text-neutral-medium">Loading showrooms...</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="funnel-title">Choose a showroom</h2>
      <p className="funnel-subtitle">Select the AUTO24 showroom nearest to you</p>

      <div className="space-y-3 mb-6">
        {showrooms.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSelected(s.id)}
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
          Back
        </Button>
        <Button onClick={handleNext} className="flex-1" disabled={!selected}>
          Next
        </Button>
      </div>
    </div>
  );
}
