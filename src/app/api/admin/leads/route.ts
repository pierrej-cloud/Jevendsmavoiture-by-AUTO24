import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { LeadStatus } from "@prisma/client";

export async function GET(req: NextRequest) {
  const admin = await getSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") as LeadStatus | null;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  const where = status ? { status } : {};

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      include: {
        vehicle: true,
        appointment: {
          include: { showroom: true },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.lead.count({ where }),
  ]);

  return NextResponse.json({
    leads,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
