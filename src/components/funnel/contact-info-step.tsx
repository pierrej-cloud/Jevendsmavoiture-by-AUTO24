"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactInfoSchema, ContactInfoData } from "@/lib/validations";
import { funnelStore } from "@/lib/funnel-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export function ContactInfoStep({ onNext, onBack }: Props) {
  const existing = funnelStore.getState().contactInfo;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInfoData>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: existing || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      whatsapp: "",
      consentContact: false as unknown as true,
      consentPrivacy: false as unknown as true,
    },
  });

  const onSubmit = (data: ContactInfoData) => {
    funnelStore.setContactInfo(data);
    onNext();
  };

  return (
    <div>
      <h2 className="funnel-title">Your contact details</h2>
      <p className="funnel-subtitle">So we can get in touch with you</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="form-field">
            <Label>First name *</Label>
            <Input {...register("firstName")} placeholder="John" />
            {errors.firstName && <p className="form-error">{errors.firstName.message}</p>}
          </div>
          <div className="form-field">
            <Label>Last name *</Label>
            <Input {...register("lastName")} placeholder="Doe" />
            {errors.lastName && <p className="form-error">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="form-field">
          <Label>Email *</Label>
          <Input {...register("email")} type="email" placeholder="john@example.com" />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>

        <div className="form-field">
          <Label>Phone *</Label>
          <Input {...register("phone")} type="tel" placeholder="+225 07 XX XX XX" />
          {errors.phone && <p className="form-error">{errors.phone.message}</p>}
        </div>

        <div className="form-field">
          <Label>WhatsApp number</Label>
          <Input {...register("whatsapp")} type="tel" placeholder="Same as phone or different" />
        </div>

        <div className="space-y-3 pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("consentContact")}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-xs text-neutral-medium">
              I agree to be contacted by AUTO24 regarding my vehicle sale *
            </span>
          </label>
          {errors.consentContact && <p className="form-error">{errors.consentContact.message}</p>}

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("consentPrivacy")}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-xs text-neutral-medium">
              I accept the privacy policy and terms of use *
            </span>
          </label>
          {errors.consentPrivacy && <p className="form-error">{errors.consentPrivacy.message}</p>}
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
