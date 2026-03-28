import { Locale } from "@/i18n";

export const CAR_BRANDS = [
  "Audi", "BMW", "Citroen", "Dacia", "Fiat", "Ford", "Honda", "Hyundai",
  "Kia", "Mazda", "Mercedes", "Mitsubishi", "Nissan", "Opel", "Peugeot",
  "Renault", "Suzuki", "Toyota", "Volkswagen", "Volvo", "Other",
] as const;

export const MODELS_BY_BRAND: Record<string, string[]> = {
  Toyota: ["Corolla", "Camry", "RAV4", "Hilux", "Land Cruiser", "Prado", "Yaris", "HiAce", "Fortuner"],
  Peugeot: ["206", "207", "208", "301", "308", "3008", "5008", "Partner", "Expert"],
  Renault: ["Clio", "Mégane", "Duster", "Sandero", "Logan", "Kadjar", "Captur", "Trafic"],
  Mercedes: ["Classe A", "Classe C", "Classe E", "Classe S", "GLC", "GLE", "GLS", "Vito", "Sprinter"],
  BMW: ["Série 1", "Série 3", "Série 5", "Série 7", "X1", "X3", "X5", "X6"],
  Honda: ["Civic", "Accord", "CR-V", "HR-V", "Jazz", "Pilot"],
  Nissan: ["Micra", "Note", "Juke", "Qashqai", "X-Trail", "Navara", "Patrol"],
  Hyundai: ["i10", "i20", "i30", "Tucson", "Santa Fe", "Accent", "Elantra", "H1"],
  Ford: ["Fiesta", "Focus", "Mondeo", "Kuga", "Ranger", "Transit"],
  Volkswagen: ["Golf", "Polo", "Passat", "Tiguan", "Touareg", "Caddy", "Transporter"],
  Kia: ["Picanto", "Rio", "Sportage", "Sorento", "Stinger"],
  Mitsubishi: ["Lancer", "Outlander", "Pajero", "L200", "Eclipse Cross"],
  Suzuki: ["Swift", "Vitara", "Jimny", "Baleno", "Grand Vitara"],
  Dacia: ["Sandero", "Duster", "Logan", "Lodgy", "Dokker"],
  Audi: ["A1", "A3", "A4", "A6", "Q3", "Q5", "Q7"],
  Citroen: ["C3", "C4", "C5", "Berlingo", "Jumpy"],
  Fiat: ["500", "Punto", "Panda", "Tipo", "Doblo"],
  Mazda: ["2", "3", "6", "CX-3", "CX-5"],
  Opel: ["Corsa", "Astra", "Mokka", "Grandland", "Vivaro"],
  Volvo: ["S40", "S60", "S90", "XC40", "XC60", "XC90"],
};

export const VERSION_I18N: Record<string, { en: string; fr: string }> = {
  ENTRY:        { en: "Entry",        fr: "Entrée de gamme" },
  COMFORT:      { en: "Comfort",      fr: "Confort" },
  BUSINESS:     { en: "Business",     fr: "Business" },
  SPORT:        { en: "Sport",        fr: "Sport" },
  LUXURY:       { en: "Luxury",       fr: "Luxe" },
  FULL_OPTIONS: { en: "Full options", fr: "Full options" },
  OTHER:        { en: "Other",        fr: "Autre" },
};

export const MILEAGE_RANGES_I18N: Record<string, { en: string; fr: string }> = {
  "0-10000":       { en: "Less than 10,000 km",    fr: "Moins de 10 000 km" },
  "10000-30000":   { en: "10,000 – 30,000 km",     fr: "10 000 – 30 000 km" },
  "30000-50000":   { en: "30,000 – 50,000 km",     fr: "30 000 – 50 000 km" },
  "50000-80000":   { en: "50,000 – 80,000 km",     fr: "50 000 – 80 000 km" },
  "80000-120000":  { en: "80,000 – 120,000 km",    fr: "80 000 – 120 000 km" },
  "120000-180000": { en: "120,000 – 180,000 km",   fr: "120 000 – 180 000 km" },
  "180000-250000": { en: "180,000 – 250,000 km",   fr: "180 000 – 250 000 km" },
  "250000+":       { en: "More than 250,000 km",    fr: "Plus de 250 000 km" },
};

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

export const ENGINE_SIZES_I18N: Record<string, { en: string; fr: string }> = {
  "1.0L":  { en: "1.0L", fr: "1.0L" },
  "1.2L":  { en: "1.2L", fr: "1.2L" },
  "1.4L":  { en: "1.4L", fr: "1.4L" },
  "1.5L":  { en: "1.5L", fr: "1.5L" },
  "1.6L":  { en: "1.6L", fr: "1.6L" },
  "1.8L":  { en: "1.8L", fr: "1.8L" },
  "2.0L":  { en: "2.0L", fr: "2.0L" },
  "2.2L":  { en: "2.2L", fr: "2.2L" },
  "2.4L":  { en: "2.4L", fr: "2.4L" },
  "2.5L":  { en: "2.5L", fr: "2.5L" },
  "3.0L":  { en: "3.0L", fr: "3.0L" },
  "3.5L":  { en: "3.5L", fr: "3.5L" },
  "4.0L+": { en: "4.0L and more", fr: "4.0L et plus" },
  OTHER:   { en: "Other", fr: "Autre" },
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

export const COLOR_SWATCHES: Record<string, string> = {
  WHITE: "#FFFFFF", BLACK: "#000000", GREY: "#808080", SILVER: "#C0C0C0",
  BLUE: "#2563EB", RED: "#DC2626", GREEN: "#16A34A", BROWN: "#92400E",
  BEIGE: "#D4B896", ORANGE: "#EA580C", OTHER: "",
};

export function getI18nOptions(
  map: Record<string, { en: string; fr: string }>,
  locale: Locale
): { value: string; label: string }[] {
  return Object.entries(map).map(([value, labels]) => ({
    value,
    label: labels[locale],
  }));
}

export const CITIES_BY_COUNTRY: Record<string, string[]> = {
  MA: ["Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir", "Meknès", "Oujda", "Kénitra", "Tétouan"],
  SN: ["Dakar", "Thiès", "Saint-Louis", "Ziguinchor", "Kaolack", "Mbour", "Diourbel", "Touba", "Louga", "Rufisque"],
  CI: ["Abidjan", "Bouaké", "Daloa", "Yamoussoukro", "Korhogo", "San-Pédro", "Man", "Divo", "Gagnoa", "Abengourou"],
  ZA: ["Johannesburg", "Cape Town", "Durban", "Pretoria", "Port Elizabeth", "Bloemfontein", "East London", "Nelspruit", "Polokwane", "Kimberley"],
  RW: ["Kigali", "Butare", "Gisenyi", "Ruhengeri", "Gitarama", "Byumba", "Cyangugu", "Kibungo"],
};

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
