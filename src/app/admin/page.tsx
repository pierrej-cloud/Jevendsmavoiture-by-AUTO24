"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { LEAD_STATUSES } from "@/lib/constants";
import { LogOut, Eye, Car, Calendar, User } from "lucide-react";
import Link from "next/link";

interface Lead {
  id: string;
  status: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  estimateMin: number | null;
  estimateMax: number | null;
  createdAt: string;
  vehicle: {
    brand: string;
    model: string;
    year: number;
    mileage: number;
  } | null;
  appointment: {
    date: string;
    timeSlot: string;
    showroom: { name: string; city: string } | null;
  } | null;
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, page]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      params.set("page", String(page));

      const res = await fetch(`/api/admin/leads?${params}`);
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      setLeads(data.leads || []);
      setTotal(data.total || 0);
    } catch {
      router.push("/admin/login");
    }
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    const s = LEAD_STATUSES.find((ls) => ls.value === status);
    return s ? (
      <Badge className={s.color}>{s.label}</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-700">{status}</Badge>
    );
  };

  return (
    <div>
      {/* Admin header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/logo-auto24.svg" alt="AUTO24" className="h-7 w-auto" />
            <h1 className="font-bold text-neutral-dark">Lead Management</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              document.cookie = "admin_session=; path=/; max-age=0";
              router.push("/admin/login");
            }}
          >
            <LogOut className="w-4 h-4 mr-1" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-card">
            <p className="text-xs text-neutral-medium">Total Leads</p>
            <p className="text-2xl font-bold text-neutral-dark">{total}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-card">
            <p className="text-xs text-neutral-medium">New</p>
            <p className="text-2xl font-bold text-primary">
              {leads.filter((l) => l.status === "NEW").length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-card">
            <p className="text-xs text-neutral-medium">Appointments</p>
            <p className="text-2xl font-bold text-purple-600">
              {leads.filter((l) => l.status === "APPOINTMENT_BOOKED").length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-card">
            <p className="text-xs text-neutral-medium">Purchased</p>
            <p className="text-2xl font-bold text-success">
              {leads.filter((l) => l.status === "PURCHASED").length}
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl shadow-card p-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-neutral-dark">Filter:</span>
            <Select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              options={[
                { value: "", label: "All statuses" },
                ...LEAD_STATUSES.map((s) => ({ value: s.value, label: s.label })),
              ]}
              className="max-w-xs"
            />
          </div>
        </div>

        {/* Leads table */}
        {loading ? (
          <div className="text-center py-12 text-neutral-medium">Loading...</div>
        ) : leads.length === 0 ? (
          <div className="text-center py-12">
            <Car className="w-12 h-12 text-neutral-medium mx-auto mb-3" />
            <p className="text-neutral-medium">No leads found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {leads.map((lead) => (
              <Link key={lead.id} href={`/admin/leads/${lead.id}`}>
                <div className="bg-white rounded-xl shadow-card p-4 hover:shadow-card-hover transition-all cursor-pointer mb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-neutral-medium" />
                        <span className="font-semibold text-neutral-dark">
                          {lead.firstName} {lead.lastName}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-medium">{lead.email} &middot; {lead.phone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(lead.status)}
                      <Eye className="w-4 h-4 text-neutral-medium" />
                    </div>
                  </div>

                  {lead.vehicle && (
                    <div className="flex items-center gap-1.5 text-sm text-neutral-dark mb-1">
                      <Car className="w-3.5 h-3.5 text-primary" />
                      <span>
                        {lead.vehicle.brand} {lead.vehicle.model} {lead.vehicle.year} &middot;{" "}
                        {lead.vehicle.mileage?.toLocaleString()} km
                      </span>
                    </div>
                  )}

                  {lead.appointment && (
                    <div className="flex items-center gap-1.5 text-xs text-neutral-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {new Date(lead.appointment.date).toLocaleDateString()} at {lead.appointment.timeSlot}
                        {lead.appointment.showroom && ` - ${lead.appointment.showroom.name}`}
                      </span>
                    </div>
                  )}

                  {lead.estimateMin && lead.estimateMax && (
                    <p className="text-xs text-primary font-medium mt-1">
                      Estimate: {lead.estimateMin.toLocaleString()} - {lead.estimateMax.toLocaleString()} XOF
                    </p>
                  )}

                  <p className="text-[10px] text-neutral-medium mt-2">
                    Created: {new Date(lead.createdAt).toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {total > 20 && (
          <div className="flex justify-center gap-2 mt-6">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <span className="flex items-center text-sm text-neutral-medium px-3">
              Page {page}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={leads.length < 20}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
