import { NextRequest, NextResponse } from "next/server";
import { calculateEstimation } from "@/lib/estimation";
import { ConditionRating } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = calculateEstimation({
      brand: body.brand || "Other",
      model: body.model || "",
      year: Number(body.year) || 2020,
      mileage: body.mileage || "50000-80000",
      fuelType: body.fuelType || "PETROL",
      country: body.country || "CI",
      generalCondition: (body.generalCondition as ConditionRating) || "GOOD",
      accidentHistory: Boolean(body.accidentHistory),
      mechanicalIssues: Boolean(body.mechanicalIssues),
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to calculate estimation" },
      { status: 500 }
    );
  }
}
