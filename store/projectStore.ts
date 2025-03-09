import { ProjectFormData } from "@/types/projectTypes";
import { create } from "zustand";

type AddProjectStore = {
  formData: ProjectFormData;
  success: string | null;
  error: string | null;
  setFormData: (formData: ProjectFormData) => void;
  setSuccess: (success: string | null) => void;
  setError: (error: string | null) => void;
};

export const useAddProjectStore = create<AddProjectStore>((set) => ({
  formData: {
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Pending",
  },
  success: null,
  error: null,
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  setSuccess: (success) => set(() => ({ success })),
  setError: (error) => set(() => ({ error })),
}));
