import { NewItemData } from "@/types/budgetItemTypes";
import { create } from "zustand";

type AddBudgetItemStore = {
  formData: NewItemData;
  success: string | null;
  error: string | null;
  setFormData: (formData: NewItemData) => void;
  setSuccess: (success: string | null) => void;
  setError: (error: string | null) => void;
};

export const useAddBudgetItemStore = create<AddBudgetItemStore>((set) => ({
  formData: {
    name: "",
    description: "",
    amount_allocated: 0,
    status: "Pending",
  },
  success: null,
  error: null,
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  setSuccess: (success) => set(() => ({ success })),
  setError: (error) => set(() => ({ error })),
}));

export const InitialBudgetItemFormData = {
  name: "",
  description: "",
  amount_allocated: 0,
  status: "Pending",
};
