"use client";

import { AddNewItem } from "@/libs/budgetItem";
import {
  InitialBudgetItemFormData,
  useAddBudgetItemStore,
} from "@/store/budgetItemStore";
import { NewItemData } from "@/types/budgetItemTypes";
import { useMutation } from "@tanstack/react-query";
import AddBudgetItemHeader from "./addBudgetItem/addBudgetItemHeader";
import AddBudgetItemName from "./addBudgetItem/addBudgetItemName";
import AddBudgetItemAmount from "./addBudgetItem/addBudgetItemAmount";
import AddBudgetItemDescription from "./addBudgetItem/addBudgetItemDescription";
import AddBudgetItemButton from "./addBudgetItem/addBudgetItemButton";
import ErrorMessage from "../ui/error";
import SuccessMessage from "../ui/success";

const AddItemComponent = ({ projectID }: { projectID: number | null }) => {
  const { formData, success, error, setFormData, setSuccess, setError } =
    useAddBudgetItemStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    budgetItemMutation.mutate(formData);
  };

  const budgetItemMutation = useMutation({
    mutationFn: async (data: NewItemData) => {
      const result = await AddNewItem(projectID, data);
      return result.message;
    },
    onSuccess: (success) => {
      setSuccess(success);
      setFormData(InitialBudgetItemFormData);
      setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 2000);
    },
    onError: (error) =>
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      ),
  });

  return (
    <div className="bg-white p-8 shadow-lg rounded-2xl border border-gray-100 backdrop-blur-xl bg-opacity-80 hover:shadow-xl transition-all duration-300">
      <AddBudgetItemHeader />

      <form onSubmit={handleSubmit} className="space-y-6">
        <AddBudgetItemName />

        <AddBudgetItemAmount />

        <AddBudgetItemDescription />

        <AddBudgetItemButton isPending={budgetItemMutation.isPending} />

        {error && <ErrorMessage error={error} setError={setError} />}

        {success && (
          <SuccessMessage success={success} setSuccess={setSuccess} />
        )}
      </form>
    </div>
  );
};

export default AddItemComponent;
