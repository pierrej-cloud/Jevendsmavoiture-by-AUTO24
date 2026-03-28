import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const dataStr = formData.get("data") as string;
    const data = JSON.parse(dataStr);

    const { vehicleInfo, vehicleCondition, contactInfo, estimation, appointment } = data;

    // Save photos to local storage (replace with S3 in production)
    const photoEntries: { category: string; url: string; filename: string; size: number }[] = [];

    for (const [key, value] of formData.entries()) {
      if (key.startsWith("photo_") && value instanceof File) {
        const category = key.replace("photo_", "");
        const buffer = Buffer.from(await value.arrayBuffer());
        const filename = `${Date.now()}-${category}-${value.name}`;
        const uploadDir = join(process.cwd(), "public", "uploads");

        try {
          await mkdir(uploadDir, { recursive: true });
          await writeFile(join(uploadDir, filename), buffer);
          photoEntries.push({
            category,
            url: `/uploads/${filename}`,
            filename: value.name,
            size: value.size,
          });
        } catch (err) {
          console.error("Photo upload error:", err);
        }
      }
    }

    // Create lead with all relations
    const lead = await prisma.lead.create({
      data: {
        firstName: contactInfo.firstName,
        lastName: contactInfo.lastName,
        email: contactInfo.email,
        phone: contactInfo.phone,
        whatsapp: contactInfo.whatsapp || null,
        consentContact: contactInfo.consentContact,
        consentPrivacy: contactInfo.consentPrivacy,
        estimateMin: estimation?.min || null,
        estimateMax: estimation?.max || null,
        status: "APPOINTMENT_BOOKED",
        vehicle: {
          create: {
            brand: vehicleInfo.brand,
            model: vehicleInfo.model,
            version: vehicleInfo.version || null,
            year: Number(vehicleInfo.year),
            mileage: Number(vehicleInfo.mileage),
            fuelType: vehicleInfo.fuelType,
            transmission: vehicleInfo.transmission,
            engineSize: vehicleInfo.engineSize || null,
            color: vehicleInfo.color || null,
            registrationNo: vehicleInfo.registrationNo || null,
            country: vehicleInfo.country || "",
            city: vehicleInfo.city || "",
            condition: vehicleCondition
              ? {
                  create: {
                    generalCondition: vehicleCondition.generalCondition,
                    accidentHistory: vehicleCondition.accidentHistory,
                    bodyCondition: vehicleCondition.bodyCondition,
                    interiorCondition: vehicleCondition.interiorCondition,
                    mechanicalIssues: vehicleCondition.mechanicalIssues,
                    maintenanceUpToDate: vehicleCondition.maintenanceUpToDate,
                    isDrivable: vehicleCondition.isDrivable,
                    previousOwners: Number(vehicleCondition.previousOwners),
                    comments: vehicleCondition.comments || null,
                  },
                }
              : undefined,
            photos: {
              create: photoEntries.map((p) => ({
                category: p.category,
                url: p.url,
                filename: p.filename,
                size: p.size,
              })),
            },
          },
        },
        appointment: appointment?.showroomId
          ? {
              create: {
                showroomId: appointment.showroomId,
                date: new Date(appointment.date),
                timeSlot: appointment.timeSlot,
              },
            }
          : undefined,
        statusHistory: {
          create: {
            toStatus: "APPOINTMENT_BOOKED",
          },
        },
      },
      include: {
        vehicle: true,
        appointment: true,
      },
    });

    return NextResponse.json({ id: lead.id, status: lead.status });
  } catch (error) {
    console.error("Lead creation error:", error);
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 }
    );
  }
}
