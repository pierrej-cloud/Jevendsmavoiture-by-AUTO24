"use client";

import { useState } from "react";
import { funnelStore, FunnelState } from "@/lib/funnel-store";
import { Button } from "@/components/ui/button";
import { TIME_SLOTS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { format, addDays, isWeekend } from "date-fns";
import { useLanguage } from "@/i18n/language-context";

interface Props {
  onNext: () => void;
  onBack: () => void;
  state: FunnelState;
}

function getAvailableDates(): Date[] {
  const dates: Date[] = [];
  let day = addDays(new Date(), 1);
  while (dates.length < 10) {
    if (!isWeekend(day)) {
      dates.push(day);
    }
    day = addDays(day, 1);
  }
  return dates;
}

export function AppointmentStep({ onNext, onBack, state }: Props) {
  const { t } = useLanguage();
  const appointment = state.appointment;
  const [selectedDate, setSelectedDate] = useState(appointment?.date || "");
  const [selectedTime, setSelectedTime] = useState(appointment?.timeSlot || "");
  const [submitting, setSubmitting] = useState(false);

  const dates = getAvailableDates();

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !appointment?.showroomId) return;

    setSubmitting(true);

    funnelStore.setAppointment({
      showroomId: appointment.showroomId,
      date: selectedDate,
      timeSlot: selectedTime,
    });

    try {
      const currentState = funnelStore.getState();
      const formData = new FormData();
      formData.append("data", JSON.stringify({
        vehicleInfo: currentState.vehicleInfo,
        vehicleCondition: currentState.vehicleCondition,
        contactInfo: currentState.contactInfo,
        estimation: currentState.estimation,
        appointment: {
          showroomId: appointment.showroomId,
          date: selectedDate,
          timeSlot: selectedTime,
        },
      }));

      currentState.photos.forEach((photo) => {
        formData.append(`photo_${photo.category}`, photo.file);
      });

      const res = await fetch("/api/leads", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const result = await res.json();
        funnelStore.setLeadId(result.id);
      }
    } catch (error) {
      console.error("Failed to submit lead:", error);
    }

    setSubmitting(false);
    onNext();
  };

  return (
    <div>
      <h2 className="funnel-title">{t.appointment.title}</h2>
      <p className="funnel-subtitle">{t.appointment.subtitle}</p>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-neutral-dark mb-3">{t.appointment.selectDate}</h3>
        <div className="grid grid-cols-2 gap-2">
          {dates.map((date) => {
            const dateStr = format(date, "yyyy-MM-dd");
            return (
              <button
                key={dateStr}
                type="button"
                onClick={() => setSelectedDate(dateStr)}
                className={cn(
                  "p-3 rounded-xl border-2 text-center transition-all",
                  selectedDate === dateStr
                    ? "border-primary bg-primary/5"
                    : "border-gray-100 hover:border-gray-200"
                )}
              >
                <p className="text-xs text-neutral-medium">
                  {format(date, "EEE")}
                </p>
                <p className="font-semibold text-sm text-neutral-dark">
                  {format(date, "MMM d")}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-neutral-dark mb-3">{t.appointment.selectTime}</h3>
        <div className="grid grid-cols-4 gap-2">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setSelectedTime(slot)}
              className={cn(
                "py-2 px-2 rounded-xl border-2 text-xs font-medium transition-all",
                selectedTime === slot
                  ? "border-primary bg-primary text-white"
                  : "border-gray-100 text-neutral-medium hover:border-gray-200"
              )}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          {t.common.back}
        </Button>
        <Button
          onClick={handleSubmit}
          className="flex-1"
          disabled={!selectedDate || !selectedTime || submitting}
        >
          {submitting ? t.common.submitting : t.common.confirmAppointment}
        </Button>
      </div>
    </div>
  );
}
