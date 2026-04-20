"use client";

import { VehicleInfoData, VehicleConditionData, VehicleOptionsData, ContactInfoData, AppointmentData } from "./validations";

export interface PhotoFile {
  category: string;
  file: File;
  preview: string;
}

export interface FunnelState {
  selectedCountry: string | null;
  contactInfo: ContactInfoData | null;
  vehicleInfo: VehicleInfoData | null;
  vehicleCondition: VehicleConditionData | null;
  vehicleOptions: VehicleOptionsData | null;
  photos: PhotoFile[];
  estimation: { min: number; max: number; currency: string } | null;
  appointment: AppointmentData | null;
  leadId: string | null;
}

const INITIAL_STATE: FunnelState = {
  selectedCountry: null,
  contactInfo: null,
  vehicleInfo: null,
  vehicleCondition: null,
  vehicleOptions: null,
  photos: [],
  estimation: null,
  appointment: null,
  leadId: null,
};

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

  setSelectedCountry: (country: string) => {
    state = { ...state, selectedCountry: country };
    notify();
  },

  setContactInfo: (data: ContactInfoData) => {
    state = { ...state, contactInfo: data };
    notify();
  },

  setVehicleInfo: (data: VehicleInfoData & { country?: string }) => {
    state = { ...state, vehicleInfo: data as VehicleInfoData };
    notify();
  },

  setVehicleCondition: (data: VehicleConditionData) => {
    state = { ...state, vehicleCondition: data };
    notify();
  },

  setVehicleOptions: (data: VehicleOptionsData) => {
    state = { ...state, vehicleOptions: data };
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
