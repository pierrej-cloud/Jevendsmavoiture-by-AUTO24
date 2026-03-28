import { z } from "zod";

export const vehicleInfoSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  version: z.string().optional(),
  year: z.coerce
    .number()
    .min(1990, "Year must be 1990 or later")
    .max(new Date().getFullYear() + 1, "Invalid year"),
  mileage: z.coerce.number().min(0, "Mileage must be positive"),
  fuelType: z.enum(["PETROL", "DIESEL", "HYBRID", "ELECTRIC", "LPG", "OTHER"]),
  transmission: z.enum(["MANUAL", "AUTOMATIC", "SEMI_AUTOMATIC"]),
  engineSize: z.string().optional(),
  color: z.string().optional(),
  registrationNo: z.string().optional(),
  city: z.string().optional(),
  customCity: z.string().optional(),
});

export const vehicleConditionSchema = z.object({
  generalCondition: z.enum(["EXCELLENT", "GOOD", "FAIR", "POOR"]),
  accidentHistory: z.boolean(),
  bodyCondition: z.enum(["EXCELLENT", "GOOD", "FAIR", "POOR"]),
  interiorCondition: z.enum(["EXCELLENT", "GOOD", "FAIR", "POOR"]),
  mechanicalIssues: z.boolean(),
  maintenanceUpToDate: z.boolean(),
  isDrivable: z.boolean(),
  previousOwners: z.coerce.number().min(1).max(20),
  comments: z.string().optional(),
});

export const contactInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Phone number is required"),
  whatsapp: z.string().optional(),
  consentContact: z.literal(true, {
    errorMap: () => ({ message: "You must consent to be contacted" }),
  }),
  consentPrivacy: z.literal(true, {
    errorMap: () => ({ message: "You must accept the privacy policy" }),
  }),
});

export const appointmentSchema = z.object({
  showroomId: z.string().min(1, "Please select a showroom"),
  date: z.string().min(1, "Please select a date"),
  timeSlot: z.string().min(1, "Please select a time slot"),
});

export type VehicleInfoData = z.infer<typeof vehicleInfoSchema>;
export type VehicleConditionData = z.infer<typeof vehicleConditionSchema>;
export type ContactInfoData = z.infer<typeof contactInfoSchema>;
export type AppointmentData = z.infer<typeof appointmentSchema>;
