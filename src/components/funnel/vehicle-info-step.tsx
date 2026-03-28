"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleInfoSchema, VehicleInfoData } from "@/lib/validations";
import { funnelStore } from "@/lib/funnel-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  CAR_BRANDS,
  FUEL_TYPES_I18N,
  TRANSMISSION_I18N,
  COLOR_I18N,
  ENGINE_SIZES,
  ENGINE_SIZE_OTHER_I18N,
  CITIES_BY_COUNTRY,
  getI18nOptions,
} from "@/lib/constants";
import { useLanguage } from "@/i18n/language-context";

interface Props {
  onNext: () => void;
}

export function VehicleInfoStep({ onNext }: Props) {
  const { t, locale } = useLanguage();
  const existing = funnelStore.getState().vehicleInfo;
  const preselectedCountry = funnelStore.getState().selectedCountry;

  const {
    register,
    handleSubmit,
    watch,
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
      city: "",
      customCity: "",
    },
  });

  const selectedCity = watch("city");

  const onSubmit = (data: VehicleInfoData) => {
    // Inject country from global context
    const country = preselectedCountry || "";
    // Resolve city: if "Other" was selected, use the custom city text
    const city = data.city === "__OTHER__" ? (data.customCity || "") : (data.city || "");
    funnelStore.setVehicleInfo({ ...data, country, city } as VehicleInfoData & { country: string });
    onNext();
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1989 }, (_, i) => ({
    value: String(currentYear - i),
    label: String(currentYear - i),
  }));

  // Build city options based on selected country
  const cityList = preselectedCountry ? CITIES_BY_COUNTRY[preselectedCountry] || [] : [];
  const otherLabel = t.vehicle.other;
  const cityOptions = [
    ...cityList.map((c) => ({ value: c, label: c })),
    { value: "__OTHER__", label: otherLabel },
  ];

  // Engine size options
  const engineOptions = [
    ...ENGINE_SIZES.map((s) => ({ value: s, label: s })),
    { value: "__OTHER__", label: ENGINE_SIZE_OTHER_I18N[locale] },
  ];

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
              options={getI18nOptions(FUEL_TYPES_I18N, locale)}
              placeholder={t.vehicle.selectFuelType}
            />
            {errors.fuelType && <p className="form-error">{errors.fuelType.message}</p>}
          </div>
          <div className="form-field">
            <Label>{t.vehicle.transmission} *</Label>
            <Select
              {...register("transmission")}
              options={getI18nOptions(TRANSMISSION_I18N, locale)}
              placeholder={t.vehicle.selectTransmission}
            />
            {errors.transmission && <p className="form-error">{errors.transmission.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="form-field">
            <Label>{t.vehicle.engineSize}</Label>
            <Select
              {...register("engineSize")}
              options={engineOptions}
              placeholder={t.vehicle.selectEngine}
            />
          </div>
          <div className="form-field">
            <Label>{t.vehicle.color}</Label>
            <Select
              {...register("color")}
              options={getI18nOptions(COLOR_I18N, locale)}
              placeholder={t.vehicle.selectColor}
            />
          </div>
        </div>

        <div className="form-field">
          <Label>{t.vehicle.registrationNo}</Label>
          <Input {...register("registrationNo")} placeholder={t.common.optional} />
        </div>

        {/* City — smart dropdown based on country */}
        <div className="form-field">
          <Label>{t.vehicle.city}</Label>
          <Select
            {...register("city")}
            options={cityOptions}
            placeholder={t.vehicle.selectCity}
          />
        </div>

        {/* Custom city text field when "Other" is selected */}
        {selectedCity === "__OTHER__" && (
          <div className="form-field">
            <Input {...register("customCity")} placeholder={t.vehicle.otherCity} />
          </div>
        )}

        <div className="pt-4">
          <Button type="submit" className="w-full" size="lg">
            {t.common.next}
          </Button>
        </div>
      </form>
    </div>
  );
}
