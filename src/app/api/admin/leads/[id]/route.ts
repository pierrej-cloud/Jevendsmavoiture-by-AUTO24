import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { LeadStatus } from "@prisma/client";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await getSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const lead = await prisma.lead.findUnique({
    where: { id: params.id },
    include: {
      vehicle: {
        include: {
          condition: true,
          photos: true,
        },
      },
      appointment: {
        include: { showroom: true },
      },
      notes: {
        include: { admin: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
      },
      statusHistory: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json(lead);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await getSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const lead = await prisma.lead.findUnique({
    where: { id: params.id },
    select: { status: true },
  });

  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  const updates: Record<string, unknown> = {};

  if (body.status && body.status !== lead.status) {
    updates.status = body.status as LeadStatus;

    // Track status change
    await prisma.leadStatusHistory.create({
      data: {
        leadId: params.id,
        fromStatus: lead.status,
        toStatus: body.status as LeadStatus,
        changedBy: admin.name,
      },
    });
  }

  // Add note if provided
  if (body.note) {
    await prisma.leadNote.create({
      data: {
        leadId: params.id,
        adminId: admin.id,
        content: body.note,
      },
    });
  }

  const updated = await prisma.lead.update({
    where: { id: params.id },
    data: updates,
  });

  return NextResponse.json(updated);
}
