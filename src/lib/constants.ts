export const CAR_BRANDS = [
  "Audi", "BMW", "Citroen", "Dacia", "Fiat", "Ford", "Honda", "Hyundai",
  "Kia", "Mazda", "Mercedes", "Mitsubishi", "Nissan", "Opel", "Peugeot",
  "Renault", "Suzuki", "Toyota", "Volkswagen", "Volvo", "Other",
] as const;

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
