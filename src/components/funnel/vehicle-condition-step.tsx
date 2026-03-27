"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleConditionSchema, VehicleConditionData } from "@/lib/validations";
import { funnelStore } from "@/lib/funnel-store";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { CONDITION_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

function BooleanSelector({
  value,
  onChange,
  trueLabel = "Yes",
  falseLabel = "No",
}: {
  value: boolean;
  onChange: (val: boolean) => void;
  trueLabel?: string;
  falseLabel?: string;
}) {
  return (
    <div className="flex gap-2">
      {[
        { val: true, label: trueLabel },
        { val: false, label: falseLabel },
      ].map((opt) => (
        <button
          key={String(opt.val)}
          type="button"
          onClick={() => onChange(opt.val)}
          className={cn(
            "flex-1 h-10 rounded-xl border-2 text-sm font-medium transition-all",
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
  const existing = funnelStore.getState().vehicleCondition;
  const condOpts = CONDITION_OPTIONS.map((c) => ({ value: c.value, label: c.label }));

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<VehicleConditionData>({
    resolver: zodResolver(vehicleConditionSchema),
    defaultValues: existing || {
      generalCondition: "GOOD" as VehicleConditionData["generalCondition"],
      accidentHistory: false,
      bodyCondition: "GOOD" as VehicleConditionData["bodyCondition"],
      interiorCondition: "GOOD" as VehicleConditionData["interiorCondition"],
      mechanicalIssues: false,
      maintenanceUpToDate: true,
      isDrivable: true,
      previousOwners: 1,
      comments: "",
    },
  });

  const onSubmit = (data: VehicleConditionData) => {
    funnelStore.setVehicleCondition(data);
    onNext();
  };

  return (
    <div>
      <h2 className="funnel-title">Vehicle condition</h2>
      <p className="funnel-subtitle">Help us assess your vehicle&apos;s state</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="form-field">
          <Label>General condition *</Label>
          <Select {...register("generalCondition")} options={condOpts} />
          {errors.generalCondition && <p className="form-error">{errors.generalCondition.message}</p>}
        </div>

        <div className="form-field">
          <Label>Has the vehicle been in an accident?</Label>
          <Controller
            control={control}
            name="accidentHistory"
            render={({ field }) => (
              <BooleanSelector value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        <div className="form-field">
          <Label>Body condition *</Label>
          <Select {...register("bodyCondition")} options={condOpts} />
        </div>

        <div className="form-field">
          <Label>Interior condition *</Label>
          <Select {...register("interiorCondition")} options={condOpts} />
        </div>

        <div className="form-field">
          <Label>Any mechanical issues?</Label>
          <Controller
            control={control}
            name="mechanicalIssues"
            render={({ field }) => (
              <BooleanSelector value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        <div className="form-field">
          <Label>Is maintenance up to date?</Label>
          <Controller
            control={control}
            name="maintenanceUpToDate"
            render={({ field }) => (
              <BooleanSelector value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        <div className="form-field">
          <Label>Is the vehicle drivable?</Label>
          <Controller
            control={control}
            name="isDrivable"
            render={({ field }) => (
              <BooleanSelector value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        <div className="form-field">
          <Label>Number of previous owners</Label>
          <Input {...register("previousOwners")} type="number" min={1} max={20} />
        </div>

        <div className="form-field">
          <Label>Additional comments</Label>
          <Textarea {...register("comments")} placeholder="Any details you'd like to share..." />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button type="submit" className="flex-1">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
