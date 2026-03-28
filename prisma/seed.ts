import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.admin.upsert({
    where: { email: "admin@auto24.africa" },
    update: {},
    create: {
      email: "admin@auto24.africa",
      password: hashedPassword,
      name: "AUTO24 Admin",
    },
  });
  console.log("Admin user created: admin@auto24.africa / admin123");

  // Create showrooms
  const showrooms = [
    {
      name: "AUTO24 Abidjan",
      city: "Abidjan",
      address: "Zone 4, Boulevard de Marseille",
      country: "CI",
      phone: "+225 07 00 00 00",
      email: "abidjan@auto24.africa",
      openingHours: "Mon-Sat 8:00-18:00",
    },
    {
      name: "AUTO24 Dakar",
      city: "Dakar",
      address: "Route de l'Aéroport, Yoff",
      country: "SN",
      phone: "+221 33 00 00 00",
      email: "dakar@auto24.africa",
      openingHours: "Mon-Sat 8:00-18:00",
    },
    {
      name: "AUTO24 Casablanca",
      city: "Casablanca",
      address: "Boulevard de la Corniche, Ain Diab",
      country: "MA",
      phone: "+212 5 22 00 00 00",
      email: "casablanca@auto24.africa",
      openingHours: "Mon-Sat 9:00-19:00",
    },
    {
      name: "AUTO24 Kigali",
      city: "Kigali",
      address: "KG 7 Ave, Kigali Heights",
      country: "RW",
      phone: "+250 78 00 00 00",
      email: "kigali@auto24.africa",
      openingHours: "Mon-Sat 8:00-17:00",
    },
    {
      name: "AUTO24 Johannesburg",
      city: "Johannesburg",
      address: "Sandton City, Rivonia Road",
      country: "ZA",
      phone: "+27 11 000 0000",
      email: "johannesburg@auto24.africa",
      openingHours: "Mon-Sat 8:00-18:00",
    },
    {
      name: "AUTO24 Cape Town",
      city: "Cape Town",
      address: "V&A Waterfront, Dock Road",
      country: "ZA",
      phone: "+27 21 000 0000",
      email: "capetown@auto24.africa",
      openingHours: "Mon-Sat 8:00-18:00",
    },
  ];

  for (const showroom of showrooms) {
    await prisma.showroom.upsert({
      where: { id: showroom.name.toLowerCase().replace(/\s/g, "-") },
      update: showroom,
      create: {
        id: showroom.name.toLowerCase().replace(/\s/g, "-"),
        ...showroom,
      },
    });
  }
  console.log(`${showrooms.length} showrooms created`);

  console.log("Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
