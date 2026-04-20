"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleConditionSchema, VehicleConditionData } from "@/lib/validations";
import { funnelStore } from "@/lib/funnel-store";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/language-context";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

function TwoOptionSelector({
  value,
  onChange,
  optionA,
  optionB,
}: {
  value: boolean;
  onChange: (val: boolean) => void;
  optionA: { val: boolean; label: string };
  optionB: { val: boolean; label: string };
}) {
  return (
    <div className="flex flex-col gap-2">
      {[optionA, optionB].map((opt) => (
        <button
          key={String(opt.val)}
          type="button"
          onClick={() => onChange(opt.val)}
          className={cn(
            "w-full h-10 rounded-xl border-2 text-sm font-medium transition-all text-left px-4",
            value === opt.val
              ? "border-primary bg-primary/5 text-primary"
              : "border-gray-200 text-neutral-medium hover:border-gray-300"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function VehicleConditionStep({ onNext, onBack }: Props) {
  const { t } = useLanguage();
  const existing = funnelStore.getState().vehicleCondition;

  const conditionOptions = [
    { value: "EXCELLENT", label: t.condition.conditionExcellent },
    { value: "GOOD", label: t.condition.conditionGood },
    { value: "FAIR", label: t.condition.conditionFair },
    { value: "POOR", label: t.condition.conditionPoor },
  ];

  const maintenanceOptions = [
    { value: "true", label: t.condition.maintenanceUpToDateOption },
    { value: "partial", label: t.condition.maintenancePartial },
    { value: "unknown", label: t.condition.maintenanceUnknown },
    { value: "false", label: t.condition.maintenanceOverdue },
  ];

  const ownerOptions = [
    { value: "1", label: t.condition.owners1 },
    { value: "2", label: t.condition.owners2 },
    { value: "3", label: t.condition.owners3 },
    { value: "4", label: t.condition.owners4 },
    { value: "5", label: t.condition.owners5 },
  ];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<VehicleConditionData>({
    resolver: zodResolver(vehicleConditionSchema),
    defaultValues: existing || {
      generalCondition: undefined as unknown as VehicleConditionData["generalCondition"],
      accidentHistory: false,
      bodyCondition: undefined as unknown as VehicleConditionData["bodyCondition"],
      interiorCondition: undefined as unknown as VehicleConditionData["interiorCondition"],
      mechanicalIssues: false,
      maintenanceUpToDate: false,
      isDrivable: true,
      previousOwners: undefined as unknown as number,
      comments: "",
    },
  });

  const onSubmit = (data: VehicleConditionData) => {
    funnelStore.setVehicleCondition(data);
    onNext();
  };

  return (
    <div>
      <h2 className="funnel-title">{t.condition.title}</h2>
      <p className="funnel-subtitle">{t.condition.subtitle}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="form-field">
          <Label>{t.condition.generalCondition}</Label>
          <Select {...register("generalCondition")} options={conditionOptions} placeholder={t.condition.selectCondition} />
          {errors.generalCondition && <p className="form-error">{errors.generalCondition.message}</p>}
        </div>

        <div className="form-field">
          <Label>{t.condition.accidentHistory}</Label>
          <Controller
            control={control}
            name="accidentHistory"
            render={({ field }) => (
              <TwoOptionSelector
                value={field.value}
                onChange={field.onChange}
                optionA={{ val: true, label: t.condition.accidentYes }}
                optionB={{ val: false, label: t.condition.accidentNo }}
              />
            )}
          />
        </div>

        <div className="form-field">
          <Label>{t.condition.bodyCondition}</Label>
          <Select {...register("bodyCondition")} options={conditionOptions} placeholder={t.condition.selectCondition} />
        </div>

        <div className="form-field">
          <Label>{t.condition.interiorCondition}</Label>
          <Select {...register("interiorCondition")} options={conditionOptions} placeholder={t.condition.selectCondition} />
        </div>

        <div className="form-field">
          <Label>{t.condition.mechanicalIssues}</Label>
          <Controller
            control={control}
            name="mechanicalIssues"
            render={({ field }) => (
              <TwoOptionSelector
                value={field.value}
                onChange={field.onChange}
                optionA={{ val: true, label: t.condition.mechanicalYes }}
                optionB={{ val: false, label: t.condition.mechanicalNo }}
              />
            )}
          />
        </div>

        <div className="form-field">
          <Label>{t.condition.maintenanceUpToDate}</Label>
          <Select
            {...register("maintenanceUpToDate", {
              setValueAs: (v: string) => v === "true",
            })}
            options={maintenanceOptions}
            placeholder={t.condition.selectCondition}
          />
        </div>

        <div className="form-field">
          <Label>{t.condition.isDrivable}</Label>
          <Controller
            control={control}
            name="isDrivable"
            render={({ field }) => (
              <TwoOptionSelector
                value={field.value}
                onChange={field.onChange}
                optionA={{ val: true, label: t.condition.drivableYes }}
                optionB={{ val: false, label: t.condition.drivableNo }}
              />
            )}
          />
        </div>

        <div className="form-field">
          <Label>{t.condition.previousOwners}</Label>
          <Select
            {...register("previousOwners")}
            options={ownerOptions}
            placeholder={t.condition.selectOwners}
          />
        </div>

        <div className="form-field">
          <Label>{t.condition.comments}</Label>
          <Textarea {...register("comments")} placeholder={t.condition.commentsPlaceholder} />
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
