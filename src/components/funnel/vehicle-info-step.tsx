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
  MODELS_BY_BRAND,
  VERSION_I18N,
  MILEAGE_RANGES_I18N,
  FUEL_TYPES_I18N,
  TRANSMISSION_I18N,
  ENGINE_SIZES_I18N,
  COLOR_I18N,
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
      mileage: "",
      fuelType: undefined as unknown as VehicleInfoData["fuelType"],
      transmission: undefined as unknown as VehicleInfoData["transmission"],
      engineSize: "",
      color: "",
      registrationNo: "",
      city: "",
      customCity: "",
    },
  });

  const selectedBrand = watch("brand");
  const selectedCity = watch("city");

  const onSubmit = (data: VehicleInfoData) => {
    const country = preselectedCountry || "";
    const city = data.city === "__OTHER__" ? (data.customCity || "") : (data.city || "");
    funnelStore.setVehicleInfo({ ...data, country, city } as VehicleInfoData & { country: string });
    onNext();
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1989 }, (_, i) => ({
    value: String(currentYear - i),
    label: String(currentYear - i),
  }));

  // Models based on selected brand
  const otherLabel = locale === "fr" ? "Autre" : "Other";
  const brandModels = selectedBrand && MODELS_BY_BRAND[selectedBrand]
    ? [...MODELS_BY_BRAND[selectedBrand].map((m) => ({ value: m, label: m })), { value: "__OTHER__", label: otherLabel }]
    : [{ value: "__OTHER__", label: otherLabel }];

  // City options based on country
  const cityList = preselectedCountry ? CITIES_BY_COUNTRY[preselectedCountry] || [] : [];
  const cityOptions = [
    ...cityList.map((c) => ({ value: c, label: c })),
    { value: "__OTHER__", label: otherLabel },
  ];

  return (
    <div>
      <h2 className="funnel-title">{t.vehicle.title}</h2>
      <p className="funnel-subtitle">{t.vehicle.subtitle}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Brand */}
        <div className="form-field">
          <Label>{t.vehicle.brand} *</Label>
          <Select
            {...register("brand")}
            options={CAR_BRANDS.map((b) => ({ value: b, label: b }))}
            placeholder={t.vehicle.selectBrand}
          />
          {errors.brand && <p className="form-error">{errors.brand.message}</p>}
        </div>

        {/* Model — dynamic based on brand */}
        <div className="form-field">
          <Label>{t.vehicle.model} *</Label>
          <Select
            {...register("model")}
            options={brandModels}
            placeholder={t.vehicle.selectModel}
          />
          {errors.model && <p className="form-error">{errors.model.message}</p>}
        </div>

        {/* Version / Trim — optional */}
        <div className="form-field">
          <Label>{t.vehicle.version}</Label>
          <Select
            {...register("version")}
            options={getI18nOptions(VERSION_I18N, locale)}
            placeholder={t.vehicle.selectVersion}
          />
        </div>

        {/* Year + Mileage */}
        <div className="grid grid-cols-2 gap-3">
          <div className="form-field">
            <Label>{t.vehicle.year} *</Label>
            <Select {...register("year")} options={years} placeholder={t.vehicle.selectYear} />
            {errors.year && <p className="form-error">{errors.year.message}</p>}
          </div>
          <div className="form-field">
            <Label>{t.vehicle.mileage} *</Label>
            <Select
              {...register("mileage")}
              options={getI18nOptions(MILEAGE_RANGES_I18N, locale)}
              placeholder={t.vehicle.selectMileage}
            />
            {errors.mileage && <p className="form-error">{errors.mileage.message}</p>}
          </div>
        </div>

        {/* Fuel type + Transmission */}
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

        {/* Engine size + Color */}
        <div className="grid grid-cols-2 gap-3">
          <div className="form-field">
            <Label>{t.vehicle.engineSize}</Label>
            <Select
              {...register("engineSize")}
              options={getI18nOptions(ENGINE_SIZES_I18N, locale)}
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

        {/* Registration number — free text, optional */}
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
