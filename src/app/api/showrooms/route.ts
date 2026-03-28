import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const country = searchParams.get("country");

  try {
    const where: Record<string, unknown> = { isActive: true };
    if (country) where.country = country;

    const showrooms = await prisma.showroom.findMany({
      where,
      orderBy: { city: "asc" },
    });
    return NextResponse.json(showrooms);
  } catch {
    // Fallback showrooms filtered by country
    const fallback = [
      { id: "auto24-abidjan", name: "AUTO24 Abidjan", city: "Abidjan", address: "Zone 4, Boulevard de Marseille", country: "CI", openingHours: "Mon-Sat 8:00-18:00" },
      { id: "auto24-dakar", name: "AUTO24 Dakar", city: "Dakar", address: "Route de l'Aéroport, Yoff", country: "SN", openingHours: "Mon-Sat 8:00-18:00" },
      { id: "auto24-casablanca", name: "AUTO24 Casablanca", city: "Casablanca", address: "Boulevard de la Corniche, Ain Diab", country: "MA", openingHours: "Mon-Sat 9:00-19:00" },
      { id: "auto24-kigali", name: "AUTO24 Kigali", city: "Kigali", address: "KG 7 Ave, Kigali Heights", country: "RW", openingHours: "Mon-Sat 8:00-17:00" },
      { id: "auto24-johannesburg", name: "AUTO24 Johannesburg", city: "Johannesburg", address: "Sandton City, Rivonia Road", country: "ZA", openingHours: "Mon-Sat 8:00-18:00" },
      { id: "auto24-cape-town", name: "AUTO24 Cape Town", city: "Cape Town", address: "V&A Waterfront, Dock Road", country: "ZA", openingHours: "Mon-Sat 8:00-18:00" },
    ];

    const filtered = country ? fallback.filter((s) => s.country === country) : fallback;
    return NextResponse.json(filtered);
  }
}
