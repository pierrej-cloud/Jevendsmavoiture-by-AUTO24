import { Locale } from "@/i18n";

export const CAR_BRANDS = [
  "Audi", "BMW", "Citroen", "Dacia", "Fiat", "Ford", "Honda", "Hyundai",
  "Kia", "Mazda", "Mercedes", "Mitsubishi", "Nissan", "Opel", "Peugeot",
  "Renault", "Suzuki", "Toyota", "Volkswagen", "Volvo", "Other",
] as const;

export const FUEL_TYPES_I18N: Record<string, { en: string; fr: string }> = {
  PETROL:   { en: "Petrol",   fr: "Essence" },
  DIESEL:   { en: "Diesel",   fr: "Diesel" },
  HYBRID:   { en: "Hybrid",   fr: "Hybride" },
  ELECTRIC: { en: "Electric", fr: "Électrique" },
  LPG:      { en: "LPG",      fr: "GPL" },
  OTHER:    { en: "Other",    fr: "Autre" },
};

export const TRANSMISSION_I18N: Record<string, { en: string; fr: string }> = {
  MANUAL:         { en: "Manual",         fr: "Manuelle" },
  AUTOMATIC:      { en: "Automatic",      fr: "Automatique" },
  SEMI_AUTOMATIC: { en: "Semi-automatic", fr: "Semi-automatique" },
};

export const COLOR_I18N: Record<string, { en: string; fr: string }> = {
  WHITE:  { en: "White",  fr: "Blanc" },
  BLACK:  { en: "Black",  fr: "Noir" },
  GREY:   { en: "Grey",   fr: "Gris" },
  SILVER: { en: "Silver", fr: "Argent" },
  BLUE:   { en: "Blue",   fr: "Bleu" },
  RED:    { en: "Red",    fr: "Rouge" },
  GREEN:  { en: "Green",  fr: "Vert" },
  BROWN:  { en: "Brown",  fr: "Marron" },
  BEIGE:  { en: "Beige",  fr: "Beige" },
  ORANGE: { en: "Orange", fr: "Orange" },
  OTHER:  { en: "Other",  fr: "Autre" },
};

export const ENGINE_SIZES = [
  "1.0L", "1.2L", "1.4L", "1.5L", "1.6L", "1.8L",
  "2.0L", "2.2L", "2.4L", "2.5L", "3.0L+",
] as const;

export const ENGINE_SIZE_OTHER_I18N = { en: "Other", fr: "Autre" };

export function getI18nOptions(
  map: Record<string, { en: string; fr: string }>,
  locale: Locale
): { value: string; label: string }[] {
  return Object.entries(map).map(([value, labels]) => ({
    value,
    label: labels[locale],
  }));
}

// Legacy exports (still used by condition step)
export const FUEL_TYPES = [
  { value: "PETROL", label: "Petrol" },
  { value: "DIESEL", label: "Diesel" },
  { value: "HYBRID", label: "Hybrid" },
  { value: "ELECTRIC", label: "Electric" },
  { value: "LPG", label: "LPG" },
  { value: "OTHER", label: "Other" },
] as const;

export const TRANSMISSIONS = [
  { value: "MANUAL", label: "Manual" },
  { value: "AUTOMATIC", label: "Automatic" },
  { value: "SEMI_AUTOMATIC", label: "Semi-automatic" },
] as const;

export const CONDITION_OPTIONS = [
  { value: "EXCELLENT", label: "Excellent", description: "Like new, no visible wear" },
  { value: "GOOD", label: "Good", description: "Minor wear, well maintained" },
  { value: "FAIR", label: "Fair", description: "Normal wear, some issues" },
  { value: "POOR", label: "Poor", description: "Significant wear or damage" },
] as const;

export const COUNTRIES = [
  { value: "CI", label: "Ivory Coast" },
  { value: "SN", label: "Senegal" },
  { value: "MA", label: "Morocco" },
  { value: "RW", label: "Rwanda" },
  { value: "KE", label: "Kenya" },
  { value: "GH", label: "Ghana" },
  { value: "BJ", label: "Benin" },
  { value: "TG", label: "Togo" },
] as const;

export const CITIES_BY_COUNTRY: Record<string, string[]> = {
  MA: ["Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir", "Meknès", "Oujda", "Kénitra", "Tétouan"],
  SN: ["Dakar", "Thiès", "Saint-Louis", "Ziguinchor", "Kaolack", "Mbour", "Diourbel", "Touba", "Louga", "Rufisque"],
  CI: ["Abidjan", "Bouaké", "Daloa", "Yamoussoukro", "Korhogo", "San-Pédro", "Man", "Divo", "Gagnoa", "Abengourou"],
  ZA: ["Johannesburg", "Cape Town", "Durban", "Pretoria", "Port Elizabeth", "Bloemfontein", "East London", "Nelspruit", "Polokwane", "Kimberley"],
  RW: ["Kigali", "Butare", "Gisenyi", "Ruhengeri", "Gitarama", "Byumba", "Cyangugu", "Kibungo"],
};

export const PHOTO_CATEGORIES = [
  { id: "front", label: "Front view", required: true },
  { id: "rear", label: "Rear view", required: true },
  { id: "side", label: "Side view", required: true },
  { id: "interior", label: "Interior", required: true },
  { id: "dashboard", label: "Dashboard", required: false },
  { id: "damage", label: "Visible damage", required: false },
] as const;

export const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00",
] as const;

export const LEAD_STATUSES = [
  { value: "NEW", label: "New", color: "bg-blue-100 text-blue-700" },
  { value: "CONTACTED", label: "Contacted", color: "bg-yellow-100 text-yellow-700" },
  { value: "APPOINTMENT_BOOKED", label: "Appointment Booked", color: "bg-purple-100 text-purple-700" },
  { value: "INSPECTED", label: "Inspected", color: "bg-indigo-100 text-indigo-700" },
  { value: "OFFER_MADE", label: "Offer Made", color: "bg-orange-100 text-orange-700" },
  { value: "PURCHASED", label: "Purchased", color: "bg-green-100 text-green-700" },
  { value: "LOST", label: "Lost", color: "bg-gray-100 text-gray-700" },
  { value: "REJECTED", label: "Rejected", color: "bg-red-100 text-red-700" },
] as const;
