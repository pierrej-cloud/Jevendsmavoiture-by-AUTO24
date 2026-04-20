import { z } from "zod";

export const contactInfoSchema = z.object({
  phonePrefix: z.string().min(1),
  phoneNumber: z.string().min(6, "Invalid phone number"),
  whatsappSame: z.boolean(),
  whatsappPrefix: z.string().optional(),
  whatsappNumber: z.string().optional(),
  email: z.string().email("Invalid email").or(z.literal("")),
  consentContact: z.literal(true, {
    errorMap: () => ({ message: "Please accept the terms" }),
  }),
  consentPrivacy: z.literal(true, {
    errorMap: () => ({ message: "Please accept the terms" }),
  }),
});

export const vehicleInfoSchema = z.object({
  brand: z.string().min(1, "This field is required"),
  model: z.string().min(1, "This field is required"),
  version: z.string().optional(),
  year: z.coerce
    .number()
    .min(1990, "This field is required")
    .max(new Date().getFullYear() + 1, "This field is required"),
  mileage: z.string().min(1, "This field is required"),
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

export const vehicleOptionsSchema = z.object({
  keys: z.string().optional(),
  serviceBook: z.string().optional(),
  technicalInspection: z.string().optional(),
  warranty: z.string().optional(),
  accessories: z.array(z.string()),
});

export const appointmentSchema = z.object({
  showroomId: z.string().min(1, "This field is required"),
  date: z.string().min(1, "This field is required"),
  timeSlot: z.string().min(1, "This field is required"),
});

export type ContactInfoData = z.infer<typeof contactInfoSchema>;
export type VehicleInfoData = z.infer<typeof vehicleInfoSchema>;
export type VehicleConditionData = z.infer<typeof vehicleConditionSchema>;
export type VehicleOptionsData = z.infer<typeof vehicleOptionsSchema>;
export type AppointmentData = z.infer<typeof appointmentSchema>;
