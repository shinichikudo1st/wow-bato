import { AddBarangayFormData } from "@/types/barangayTypes";
import { create } from "zustand";

type AddBarangayStore = {
  formData: AddBarangayFormData;
  error: string | null;
  success: string | null;
  setFormData: (data: AddBarangayFormData) => void;
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
};

type UpdateBarangayStore = {
  updateBarangay: AddBarangayFormData;
  setUpdateBarangay: (data: AddBarangayFormData) => void;
};

export const useAddBarangayStore = create<AddBarangayStore>((set) => ({
  formData: { name: "", city: "", region: "" },
  error: null,
  success: null,
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  setError: (data) => set(() => ({ error: data })),
  setSuccess: (data) => set(() => ({ success: data })),
}));

export const useUpdateBarangayStore = create<UpdateBarangayStore>((set) => ({
  updateBarangay: { name: "", city: "", region: "" },
  setUpdateBarangay: (data) =>
    set((state) => ({ updateBarangay: { ...state.updateBarangay, ...data } })),
}));
