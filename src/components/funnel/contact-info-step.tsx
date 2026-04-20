"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactInfoSchema, ContactInfoData } from "@/lib/validations";
import { funnelStore } from "@/lib/funnel-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ALL_PHONE_PREFIXES, PHONE_PREFIXES } from "@/lib/constants";
import { useLanguage } from "@/i18n/language-context";

interface Props {
  onNext: () => void;
}

export function ContactInfoStep({ onNext }: Props) {
  const { t } = useLanguage();
  const existing = funnelStore.getState().contactInfo;
  const country = funnelStore.getState().selectedCountry;
  const defaultPrefix = country && PHONE_PREFIXES[country] ? PHONE_PREFIXES[country].prefix : "+212";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ContactInfoData>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: existing || {
      phonePrefix: defaultPrefix,
      phoneNumber: "",
      whatsappSame: true,
      whatsappPrefix: defaultPrefix,
      whatsappNumber: "",
      email: "",
      consentContact: false as unknown as true,
      consentPrivacy: false as unknown as true,
    },
  });

  const whatsappSame = watch("whatsappSame");

  const onSubmit = (data: ContactInfoData) => {
    funnelStore.setContactInfo(data);
    onNext();
  };

  return (
    <div>
      <h2 className="funnel-title">{t.contact.title}</h2>
      <p className="funnel-subtitle">{t.contact.subtitle}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Phone with prefix */}
        <div className="form-field">
          <Label>{t.contact.phone}</Label>
          <div className="flex gap-2">
            <div className="w-28 flex-shrink-0">
              <Select
                {...register("phonePrefix")}
                options={ALL_PHONE_PREFIXES}
              />
            </div>
            <Input
              {...register("phoneNumber")}
              type="tel"
              placeholder={t.contact.phoneNumber}
              className="flex-1"
            />
          </div>
          {errors.phoneNumber && <p className="form-error">{t.common.invalidPhone}</p>}
        </div>

        {/* WhatsApp same checkbox */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("whatsappSame")}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-neutral-dark">{t.contact.whatsappSame}</span>
        </label>

        {/* WhatsApp separate field */}
        {!whatsappSame && (
          <div className="form-field">
            <Label>{t.contact.whatsapp}</Label>
            <div className="flex gap-2">
              <div className="w-28 flex-shrink-0">
                <Select
                  {...register("whatsappPrefix")}
                  options={ALL_PHONE_PREFIXES}
                />
              </div>
              <Input
                {...register("whatsappNumber")}
                type="tel"
                placeholder={t.contact.phoneNumber}
                className="flex-1"
              />
            </div>
          </div>
        )}

        {/* Email optional */}
        <div className="form-field">
          <Label>{t.contact.email}</Label>
          <Input {...register("email")} type="email" placeholder="email@example.com" />
          {errors.email && <p className="form-error">{t.common.invalidEmail}</p>}
        </div>

        {/* Consent */}
        <div className="space-y-3 pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("consentContact")}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-xs text-neutral-medium">{t.contact.consentContact} *</span>
          </label>
          {errors.consentContact && <p className="form-error">{t.common.acceptTerms}</p>}

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("consentPrivacy")}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-xs text-neutral-medium">{t.contact.consentPrivacy} *</span>
          </label>
          {errors.consentPrivacy && <p className="form-error">{t.common.acceptTerms}</p>}
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
