"use client";

import { VehicleInfoData, VehicleConditionData, ContactInfoData, AppointmentData } from "./validations";

export interface PhotoFile {
  category: string;
  file: File;
  preview: string;
}

export interface FunnelState {
  vehicleInfo: VehicleInfoData | null;
  vehicleCondition: VehicleConditionData | null;
  photos: PhotoFile[];
  estimation: { min: number; max: number; currency: string } | null;
  contactInfo: ContactInfoData | null;
  appointment: AppointmentData | null;
  leadId: string | null;
}

const INITIAL_STATE: FunnelState = {
  vehicleInfo: null,
  vehicleCondition: null,
  photos: [],
  estimation: null,
  contactInfo: null,
  appointment: null,
  leadId: null,
};

// Simple in-memory store for the funnel (single page session)
let state: FunnelState = { ...INITIAL_STATE };
let listeners: (() => void)[] = [];

function notify() {
  listeners.forEach((l) => l());
}

export const funnelStore = {
  getState: () => state,

  subscribe: (listener: () => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },

  setVehicleInfo: (data: VehicleInfoData) => {
    state = { ...state, vehicleInfo: data };
    notify();
  },

  setVehicleCondition: (data: VehicleConditionData) => {
    state = { ...state, vehicleCondition: data };
    notify();
  },

  setPhotos: (photos: PhotoFile[]) => {
    state = { ...state, photos };
    notify();
  },

  setEstimation: (estimation: FunnelState["estimation"]) => {
    state = { ...state, estimation };
    notify();
  },

  setContactInfo: (data: ContactInfoData) => {
    state = { ...state, contactInfo: data };
    notify();
  },

  setAppointment: (data: AppointmentData) => {
    state = { ...state, appointment: data };
    notify();
  },

  setLeadId: (id: string) => {
    state = { ...state, leadId: id };
    notify();
  },

  reset: () => {
    state = { ...INITIAL_STATE };
    notify();
  },
};
