import { ConditionRating } from "@prisma/client";

interface EstimationInput {
  brand: string;
  model: string;
  year: number;
  mileage: number | string;
  fuelType: string;
  country: string;
  generalCondition: ConditionRating;
  accidentHistory: boolean;
  mechanicalIssues: boolean;
}

// Convert mileage range string to midpoint number
function parseMileage(mileage: number | string): number {
  if (typeof mileage === "number") return mileage;
  const rangeMap: Record<string, number> = {
    "0-10000": 5_000,
    "10000-30000": 20_000,
    "30000-50000": 40_000,
    "50000-80000": 65_000,
    "80000-120000": 100_000,
    "120000-180000": 150_000,
    "180000-250000": 215_000,
    "250000+": 300_000,
  };
  return rangeMap[mileage] ?? 80_000;
}

interface EstimationResult {
  min: number;
  max: number;
  currency: string;
}

// Base prices by brand tier (in XOF)
const BRAND_TIERS: Record<string, number> = {
  toyota: 8_000_000,
  honda: 7_000_000,
  nissan: 6_500_000,
  hyundai: 6_000_000,
  kia: 5_500_000,
  ford: 5_500_000,
  volkswagen: 7_000_000,
  mercedes: 12_000_000,
  bmw: 11_000_000,
  audi: 10_000_000,
  peugeot: 5_000_000,
  renault: 4_500_000,
  citroen: 4_500_000,
  mitsubishi: 6_000_000,
  suzuki: 5_000_000,
  mazda: 6_000_000,
  default: 6_000_000,
};

// Country multiplier
const COUNTRY_MULTIPLIERS: Record<string, number> = {
  CI: 1.0,  // Ivory Coast
  SN: 0.95, // Senegal
  MA: 1.1,  // Morocco
  RW: 0.85, // Rwanda
  KE: 0.9,  // Kenya
  GH: 0.9,  // Ghana
  default: 1.0,
};

const CONDITION_MULTIPLIERS: Record<ConditionRating, number> = {
  EXCELLENT: 1.15,
  GOOD: 1.0,
  FAIR: 0.8,
  POOR: 0.55,
};

export function calculateEstimation(input: EstimationInput): EstimationResult {
  const brandKey = input.brand.toLowerCase();
  const basePrice = BRAND_TIERS[brandKey] ?? BRAND_TIERS.default;

  // Year depreciation: ~7% per year from current year
  const currentYear = new Date().getFullYear();
  const age = currentYear - input.year;
  const yearFactor = Math.max(0.2, 1 - age * 0.07);

  // Mileage factor: decrease value for high mileage
  const mileageNum = parseMileage(input.mileage);
  const mileageFactor =
    mileageNum < 50_000
      ? 1.1
      : mileageNum < 100_000
        ? 1.0
        : mileageNum < 150_000
          ? 0.85
          : mileageNum < 200_000
            ? 0.7
            : 0.55;

  // Condition
  const conditionFactor = CONDITION_MULTIPLIERS[input.generalCondition];

  // Accident / mechanical penalty
  const accidentPenalty = input.accidentHistory ? 0.85 : 1.0;
  const mechanicalPenalty = input.mechanicalIssues ? 0.9 : 1.0;

  // Country
  const countryMultiplier =
    COUNTRY_MULTIPLIERS[input.country] ?? COUNTRY_MULTIPLIERS.default;

  // Calculate
  const estimated =
    basePrice *
    yearFactor *
    mileageFactor *
    conditionFactor *
    accidentPenalty *
    mechanicalPenalty *
    countryMultiplier;

  // Return a range (±15%)
  const min = Math.round(estimated * 0.85 / 100_000) * 100_000;
  const max = Math.round(estimated * 1.15 / 100_000) * 100_000;

  return {
    min: Math.max(min, 500_000),
    max: Math.max(max, 1_000_000),
    currency: "XOF",
  };
}
