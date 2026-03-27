"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleInfoSchema, VehicleInfoData } from "@/lib/validations";
import { funnelStore } from "@/lib/funnel-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CAR_BRANDS, FUEL_TYPES, TRANSMISSIONS, COUNTRIES } from "@/lib/constants";
import { useLanguage } from "@/i18n/language-context";

interface Props {
  onNext: () => void;
}

export function VehicleInfoStep({ onNext }: Props) {
  const { t, setLocaleFromCountry } = useLanguage();
  const existing = funnelStore.getState().vehicleInfo;
  const preselectedCountry = funnelStore.getState().selectedCountry;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleInfoData>({
    resolver: zodResolver(vehicleInfoSchema),
    defaultValues: existing || {
      brand: "",
      model: "",
      version: "",
      year: undefined as unknown as number,
      mileage: undefined as unknown as number,
      fuelType: undefined as unknown as VehicleInfoData["fuelType"],
      transmission: undefined as unknown as VehicleInfoData["transmission"],
      engineSize: "",
      color: "",
      registrationNo: "",
      country: preselectedCountry || "",
      city: "",
    },
  });

  const onSubmit = (data: VehicleInfoData) => {
    funnelStore.setVehicleInfo(data);
    onNext();
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1989 }, (_, i) => ({
    value: String(currentYear - i),
    label: String(currentYear - i),
  }));

  return (
    <div>
      <h2 className="funnel-title">{t.vehicle.title}</h2>
      <p className="funnel-subtitle">{t.vehicle.subtitle}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-field">
          <Label>{t.vehicle.brand} *</Label>
          <Select
            {...register("brand")}
            options={CAR_BRANDS.map((b) => ({ value: b, label: b }))}
            placeholder={t.vehicle.selectBrand}
          />
          {errors.brand && <p className="form-error">{errors.brand.message}</p>}
        </div>

        <div className="form-field">
          <Label>{t.vehicle.model} *</Label>
          <Input {...register("model")} placeholder="e.g. Corolla, Civic, Golf" />
          {errors.model && <p className="form-error">{errors.model.message}</p>}
        </div>

        <div className="form-field">
          <Label>{t.vehicle.version}</Label>
          <Input {...register("version")} placeholder="e.g. SE, Sport, Limited" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="form-field">
            <Label>{t.vehicle.year} *</Label>
            <Select {...register("year")} options={years} placeholder={t.vehicle.selectYear} />
            {errors.year && <p className="form-error">{errors.year.message}</p>}
          </div>
          <div className="form-field">
            <Label>{t.vehicle.mileage} *</Label>
            <Input {...register("mileage")} type="number" placeholder="e.g. 80000" />
            {errors.mileage && <p className="form-error">{errors.mileage.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="form-field">
            <Label>{t.vehicle.fuelType} *</Label>
            <Select
              {...register("fuelType")}
              options={FUEL_TYPES.map((f) => ({ value: f.value, label: f.label }))}
              placeholder={t.vehicle.selectFuelType}
            />
            {errors.fuelType && <p className="form-error">{errors.fuelType.message}</p>}
          </div>
          <div className="form-field">
            <Label>{t.vehicle.transmission} *</Label>
            <Select
              {...register("transmission")}
              options={TRANSMISSIONS.map((tr) => ({ value: tr.value, label: tr.label }))}
              placeholder={t.vehicle.selectTransmission}
            />
            {errors.transmission && <p className="form-error">{errors.transmission.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="form-field">
            <Label>{t.vehicle.engineSize}</Label>
            <Input {...register("engineSize")} placeholder="e.g. 1.6L" />
          </div>
          <div className="form-field">
            <Label>{t.vehicle.color}</Label>
            <Input {...register("color")} placeholder="e.g. Black" />
          </div>
        </div>

        <div className="form-field">
          <Label>{t.vehicle.registrationNo}</Label>
          <Input {...register("registrationNo")} placeholder={t.common.optional} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="form-field">
            <Label>{t.vehicle.country} *</Label>
            <Select
              {...register("country", {
                onChange: (e) => {
                  setLocaleFromCountry(e.target.value);
                },
              })}
              options={COUNTRIES.map((c) => ({ value: c.value, label: c.label }))}
              placeholder={t.vehicle.selectCountry}
            />
            {errors.country && <p className="form-error">{errors.country.message}</p>}
          </div>
          <div className="form-field">
            <Label>{t.vehicle.city} *</Label>
            <Input {...register("city")} placeholder="e.g. Abidjan" />
            {errors.city && <p className="form-error">{errors.city.message}</p>}
          </div>
        </div>

        <div className="pt-4">
          <Button type="submit" className="w-full" size="lg">
            {t.common.next}
          </Button>
        </div>
      </form>
    </div>
  );
}
