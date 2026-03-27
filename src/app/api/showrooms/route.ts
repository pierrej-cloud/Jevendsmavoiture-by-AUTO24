import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const showrooms = await prisma.showroom.findMany({
      where: { isActive: true },
      orderBy: { city: "asc" },
    });
    return NextResponse.json(showrooms);
  } catch {
    // Return fallback showrooms if DB is not available
    return NextResponse.json([
      {
        id: "sr-1",
        name: "AUTO24 Abidjan",
        city: "Abidjan",
        address: "Zone 4, Boulevard de Marseille",
        country: "CI",
        openingHours: "Mon-Sat 8:00-18:00",
      },
      {
        id: "sr-2",
        name: "AUTO24 Dakar",
        city: "Dakar",
        address: "Route de l'Aéroport, Yoff",
        country: "SN",
        openingHours: "Mon-Sat 8:00-18:00",
      },
      {
        id: "sr-3",
        name: "AUTO24 Casablanca",
        city: "Casablanca",
        address: "Boulevard de la Corniche, Ain Diab",
        country: "MA",
        openingHours: "Mon-Sat 9:00-19:00",
      },
      {
        id: "sr-4",
        name: "AUTO24 Kigali",
        city: "Kigali",
        address: "KG 7 Ave, Kigali Heights",
        country: "RW",
        openingHours: "Mon-Sat 8:00-17:00",
      },
    ]);
  }
}
