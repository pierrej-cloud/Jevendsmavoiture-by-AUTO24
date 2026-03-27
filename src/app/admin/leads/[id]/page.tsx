"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { LEAD_STATUSES } from "@/lib/constants";
import { ArrowLeft, User, Car, Calendar, MapPin, MessageSquare, History, Image } from "lucide-react";
import Link from "next/link";

interface LeadDetail {
  id: string;
  status: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whatsapp: string | null;
  estimateMin: number | null;
  estimateMax: number | null;
  createdAt: string;
  vehicle: {
    brand: string;
    model: string;
    version: string | null;
    year: number;
    mileage: number;
    fuelType: string;
    transmission: string;
    engineSize: string | null;
    color: string | null;
    country: string;
    city: string;
    condition: {
      generalCondition: string;
      accidentHistory: boolean;
      bodyCondition: string;
      interiorCondition: string;
      mechanicalIssues: boolean;
      maintenanceUpToDate: boolean;
      isDrivable: boolean;
      previousOwners: number;
      comments: string | null;
    } | null;
    photos: { id: string; category: string; url: string }[];
  } | null;
  appointment: {
    date: string;
    timeSlot: string;
    showroom: { name: string; city: string; address: string } | null;
  } | null;
  notes: { id: string; content: string; createdAt: string; admin: { name: string } }[];
  statusHistory: { id: string; fromStatus: string | null; toStatus: string; changedBy: string | null; createdAt: string }[];
}

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [lead, setLead] = useState<LeadDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState("");
  const [newNote, setNewNote] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchLead();
  }, [params.id]);

  const fetchLead = async () => {
    try {
      const res = await fetch(`/api/admin/leads/${params.id}`);
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setLead(data);
        setNewStatus(data.status);
      }
    } catch {
      router.push("/admin");
    }
    setLoading(false);
  };

  const handleUpdate = async () => {
    if (!lead) return;
    setSaving(true);

    const body: Record<string, string> = {};
    if (newStatus !== lead.status) body.status = newStatus;
    if (newNote.trim()) body.note = newNote.trim();

    if (Object.keys(body).length > 0) {
      await fetch(`/api/admin/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setNewNote("");
      await fetchLead();
    }

    setSaving(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-neutral-medium">Loading...</div>;
  }

  if (!lead) {
    return <div className="flex items-center justify-center min-h-screen text-neutral-medium">Lead not found</div>;
  }

  const statusInfo = LEAD_STATUSES.find((s) => s.value === lead.status);

  return (
    <div>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/admin">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          </Link>
          <img src="/logo-auto24.png" alt="AUTO24" style={{ height: "32px", width: "auto", objectFit: "contain", display: "block" }} />
          <h1 className="font-bold text-neutral-dark">Lead Detail</h1>
          {statusInfo && <Badge className={statusInfo.color}>{statusInfo.label}</Badge>}
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact */}
          <div className="bg-white rounded-xl shadow-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-primary" />
              <h2 className="font-bold text-neutral-dark">Contact</h2>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="text-neutral-medium">Name:</span> {lead.firstName} {lead.lastName}</p>
              <p><span className="text-neutral-medium">Email:</span> {lead.email}</p>
              <p><span className="text-neutral-medium">Phone:</span> {lead.phone}</p>
              {lead.whatsapp && <p><span className="text-neutral-medium">WhatsApp:</span> {lead.whatsapp}</p>}
              {lead.estimateMin && lead.estimateMax && (
                <p className="text-primary font-semibold">
                  Estimate: {lead.estimateMin.toLocaleString()} - {lead.estimateMax.toLocaleString()} XOF
                </p>
              )}
            </div>
          </div>

          {/* Vehicle */}
          {lead.vehicle && (
            <div className="bg-white rounded-xl shadow-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Car className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-neutral-dark">Vehicle</h2>
              </div>
              <div className="space-y-2 text-sm">
                <p className="font-semibold">{lead.vehicle.brand} {lead.vehicle.model} {lead.vehicle.version || ""} {lead.vehicle.year}</p>
                <p><span className="text-neutral-medium">Mileage:</span> {lead.vehicle.mileage.toLocaleString()} km</p>
                <p><span className="text-neutral-medium">Fuel:</span> {lead.vehicle.fuelType} &middot; {lead.vehicle.transmission}</p>
                {lead.vehicle.color && <p><span className="text-neutral-medium">Color:</span> {lead.vehicle.color}</p>}
                <p><span className="text-neutral-medium">Location:</span> {lead.vehicle.city}, {lead.vehicle.country}</p>
              </div>
            </div>
          )}

          {/* Condition */}
          {lead.vehicle?.condition && (
            <div className="bg-white rounded-xl shadow-card p-5">
              <h2 className="font-bold text-neutral-dark mb-4">Condition</h2>
              <div className="space-y-2 text-sm">
                <p><span className="text-neutral-medium">General:</span> {lead.vehicle.condition.generalCondition}</p>
                <p><span className="text-neutral-medium">Body:</span> {lead.vehicle.condition.bodyCondition}</p>
                <p><span className="text-neutral-medium">Interior:</span> {lead.vehicle.condition.interiorCondition}</p>
                <p><span className="text-neutral-medium">Accident:</span> {lead.vehicle.condition.accidentHistory ? "Yes" : "No"}</p>
                <p><span className="text-neutral-medium">Mechanical issues:</span> {lead.vehicle.condition.mechanicalIssues ? "Yes" : "No"}</p>
                <p><span className="text-neutral-medium">Drivable:</span> {lead.vehicle.condition.isDrivable ? "Yes" : "No"}</p>
                <p><span className="text-neutral-medium">Owners:</span> {lead.vehicle.condition.previousOwners}</p>
                {lead.vehicle.condition.comments && (
                  <p><span className="text-neutral-medium">Comments:</span> {lead.vehicle.condition.comments}</p>
                )}
              </div>
            </div>
          )}

          {/* Appointment */}
          {lead.appointment && (
            <div className="bg-white rounded-xl shadow-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-neutral-dark">Appointment</h2>
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="text-neutral-medium">Date:</span> {new Date(lead.appointment.date).toLocaleDateString()} at {lead.appointment.timeSlot}</p>
                {lead.appointment.showroom && (
                  <>
                    <p className="font-semibold">{lead.appointment.showroom.name}</p>
                    <div className="flex items-center gap-1 text-neutral-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{lead.appointment.showroom.address}, {lead.appointment.showroom.city}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Photos */}
          {lead.vehicle?.photos && lead.vehicle.photos.length > 0 && (
            <div className="bg-white rounded-xl shadow-card p-5 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Image className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-neutral-dark">Photos</h2>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {lead.vehicle.photos.map((photo) => (
                  <div key={photo.id} className="relative">
                    <img
                      src={photo.url}
                      alt={photo.category}
                      className="w-full h-32 object-cover rounded-xl"
                    />
                    <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                      {photo.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Update status / add note */}
          <div className="bg-white rounded-xl shadow-card p-5 md:col-span-2">
            <h2 className="font-bold text-neutral-dark mb-4">Update Lead</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-neutral-dark block mb-1.5">Status</label>
                <Select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  options={LEAD_STATUSES.map((s) => ({ value: s.value, label: s.label }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-dark block mb-1.5">Add note</label>
                <Textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Internal note..."
                  className="min-h-[80px]"
                />
              </div>
            </div>
            <div className="mt-4">
              <Button onClick={handleUpdate} disabled={saving}>
                {saving ? "Saving..." : "Update"}
              </Button>
            </div>
          </div>

          {/* Notes history */}
          {lead.notes.length > 0 && (
            <div className="bg-white rounded-xl shadow-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-neutral-dark">Notes</h2>
              </div>
              <div className="space-y-3">
                {lead.notes.map((note) => (
                  <div key={note.id} className="border-l-2 border-primary/30 pl-3">
                    <p className="text-sm text-neutral-dark">{note.content}</p>
                    <p className="text-[10px] text-neutral-medium mt-1">
                      {note.admin.name} &middot; {new Date(note.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Status history */}
          {lead.statusHistory.length > 0 && (
            <div className="bg-white rounded-xl shadow-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <History className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-neutral-dark">Status History</h2>
              </div>
              <div className="space-y-2">
                {lead.statusHistory.map((h) => (
                  <div key={h.id} className="flex items-center gap-2 text-xs">
                    {h.fromStatus && (
                      <>
                        <Badge className="bg-gray-100 text-gray-600">{h.fromStatus}</Badge>
                        <span className="text-neutral-medium">&rarr;</span>
                      </>
                    )}
                    <Badge className="bg-primary/10 text-primary">{h.toStatus}</Badge>
                    <span className="text-neutral-medium ml-auto">
                      {h.changedBy || "System"} &middot; {new Date(h.createdAt).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
