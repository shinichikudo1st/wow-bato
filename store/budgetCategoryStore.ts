import { AddBudgetCategoryFormData } from "@/types/budgetCategoryTypes";
import { create } from "zustand";

type AddBudgetCategoryStore = {
  formData: AddBudgetCategoryFormData;
  error: string | null;
  success: string | null;
  setFormData: (formData: AddBudgetCategoryFormData) => void;
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
};

export const useAddBudgetCategoryStore = create<AddBudgetCategoryStore>(
  (set) => ({
    formData: {
      name: "",
      description: "",
      barangay_ID: 0,
    },
    error: null,
    success: null,
    setFormData: (data) =>
      set((state) => ({ formData: { ...state.formData, ...data } })),
    setError: (error) => set(() => ({ error })),
    setSuccess: (success) => set(() => ({ success })),
  })
);
