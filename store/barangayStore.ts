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

type ViewBarangayStore = {
  isEditing: boolean;
  showDeleteModal: boolean;
  setIsEditing: (data: boolean) => void;
  setShowDeleteModal: (data: boolean) => void;
};

{
  /* -----------------Zustand Barangay Store ----------------------------------*/
}
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

export const useViewBarangayStore = create<ViewBarangayStore>((set) => ({
  isEditing: false,
  showDeleteModal: false,
  setIsEditing: (data) => set((state) => ({ isEditing: data })),
  setShowDeleteModal: (data) => set((state) => ({ showDeleteModal: data })),
}));
