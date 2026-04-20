"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleOptionsSchema, VehicleOptionsData } from "@/lib/validations";
import { funnelStore } from "@/lib/funnel-store";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/i18n/language-context";
import { cn } from "@/lib/utils";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const ACCESSORY_KEYS = [
  "accAC", "accGPS", "accSunroof", "accLeather",
  "accCamera", "accAlloy", "accTowBar", "accTinted",
] as const;

export function VehicleOptionsStep({ onNext, onBack }: Props) {
  const { t } = useLanguage();
  const existing = funnelStore.getState().vehicleOptions;

  const {
    register,
    handleSubmit,
    control,
  } = useForm<VehicleOptionsData>({
    resolver: zodResolver(vehicleOptionsSchema),
    defaultValues: existing || {
      keys: "",
      serviceBook: "",
      technicalInspection: "",
      warranty: "",
      accessories: [],
    },
  });

  const onSubmit = (data: VehicleOptionsData) => {
    funnelStore.setVehicleOptions(data);
    onNext();
  };

  const keysOptions = [
    { value: "1", label: t.options.keys1 },
    { value: "2", label: t.options.keys2 },
    { value: "3+", label: t.options.keys3 },
    { value: "unknown", label: t.options.keysUnknown },
  ];

  const serviceOptions = [
    { value: "complete", label: t.options.serviceComplete },
    { value: "partial", label: t.options.servicePartial },
    { value: "missing", label: t.options.serviceMissing },
    { value: "unknown", label: t.options.serviceUnknown },
  ];

  const inspectionOptions = [
    { value: "valid", label: t.options.inspectionValid },
    { value: "expired", label: t.options.inspectionExpired },
    { value: "not_done", label: t.options.inspectionNotDone },
    { value: "na", label: t.options.inspectionNA },
  ];

  const warrantyOptions = [
    { value: "active", label: t.options.warrantyActive },
    { value: "expired", label: t.options.warrantyExpired },
    { value: "none", label: t.options.warrantyNone },
  ];

  return (
    <div>
      <h2 className="funnel-title">{t.options.title}</h2>
      <p className="funnel-subtitle">{t.options.subtitle}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-field">
            <Label>{t.options.keys}</Label>
            <Select {...register("keys")} options={keysOptions} placeholder={t.options.select} />
          </div>
          <div className="form-field">
            <Label>{t.options.serviceBook}</Label>
            <Select {...register("serviceBook")} options={serviceOptions} placeholder={t.options.select} />
          </div>
          <div className="form-field">
            <Label>{t.options.technicalInspection}</Label>
            <Select {...register("technicalInspection")} options={inspectionOptions} placeholder={t.options.select} />
          </div>
          <div className="form-field">
            <Label>{t.options.warranty}</Label>
            <Select {...register("warranty")} options={warrantyOptions} placeholder={t.options.select} />
          </div>
        </div>

        <div className="form-field">
          <Label>{t.options.accessories}</Label>
          <Controller
            control={control}
            name="accessories"
            render={({ field }) => (
              <div className="grid grid-cols-2 gap-2">
                {ACCESSORY_KEYS.map((key) => {
                  const label = t.options[key];
                  const checked = field.value.includes(key);
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        const next = checked
                          ? field.value.filter((v: string) => v !== key)
                          : [...field.value, key];
                        field.onChange(next);
                      }}
                      className={cn(
                        "px-3 py-2.5 rounded-xl border-2 text-xs font-medium text-left transition-all",
                        checked
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-gray-200 text-neutral-medium hover:border-gray-300"
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1">
            {t.common.back}
          </Button>
          <Button type="submit" className="flex-1">
            {t.common.next}
          </Button>
        </div>
      </form>
    </div>
  );
}
