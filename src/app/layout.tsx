import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jevendsmavoiture by AUTO24",
  description:
    "Sell your car in a few simple steps. Get an estimated value, book an inspection, and receive your final offer from AUTO24.",
  keywords: ["sell car", "AUTO24", "car valuation", "vehicle inspection", "Africa"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
