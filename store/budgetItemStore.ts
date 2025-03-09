import { NewItemData } from "@/types/budgetItemTypes";
import { create } from "zustand";

type ConfirmationStateData = {
  itemId: number | null;
  action: "approve" | "reject" | "delete" | null;
};

type AddBudgetItemStore = {
  formData: NewItemData;
  success: string | null;
  error: string | null;
  setFormData: (formData: NewItemData) => void;
  setSuccess: (success: string | null) => void;
  setError: (error: string | null) => void;
};

type StatusBudgetItemStore = {
  statusFilter: "all" | "pending" | "approved" | "rejected";
  currentPage: number;
  confirmationState: ConfirmationStateData;
  success: string;
  error: string;
  setStatusFilter: (
    filter: "all" | "pending" | "approved" | "rejected"
  ) => void;
  setCurrentPage: (page: any) => void;
  setConfirmationState: (data: ConfirmationStateData) => void;
  setSuccess: (success: string) => void;
  setError: (error: string) => void;
};

export const useStatusBudgetItemStore = create<StatusBudgetItemStore>(
  (set) => ({
    statusFilter: "all",
    currentPage: 1,
    confirmationState: { itemId: null, action: null },
    success: "",
    error: "",
    setStatusFilter: (filter) => set(() => ({ statusFilter: filter })),
    setCurrentPage: (page) => set(() => ({ currentPage: page })),
    setConfirmationState: (newState) =>
      set(() => ({
        confirmationState: { itemId: newState.itemId, action: newState.action },
      })),
    setSuccess: (success) => set(() => ({ success })),
    setError: (error) => set(() => ({ error })),
  })
);

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
