import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Jevendsmavoiture by AUTO24",
  description: "Lead management back-office",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
