"use client";

import { addBudgetCategory } from "@/libs/budgetCategory";
import { useAddBudgetCategoryStore } from "@/store/budgetCategoryStore";
import { AddBudgetCategoryFormData } from "@/types/budgetCategoryTypes";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import AddCategoryButton from "./addBudgetCategoryForm/addCategoryButton";
import AddCategoryHeader from "./addBudgetCategoryForm/addCategoryHeader";
import AddCategoryName from "./addBudgetCategoryForm/addCategoryName";
import AddCategoryDescription from "./addBudgetCategoryForm/addCategoryDescription";

export default function AddBudgetCategoryForm({
  barangayID,
}: {
  barangayID: number | null;
}) {
  const { formData, error, success, setFormData, setError, setSuccess } =
    useAddBudgetCategoryStore();

  useEffect(() => {
    if (barangayID) {
      setFormData({ ...formData, barangay_ID: barangayID });
    }
  }, [barangayID]);

  const categoryMutation = useMutation({
    mutationFn: async (data: AddBudgetCategoryFormData) => {
      const result = await addBudgetCategory(data);
      return result;
    },
    onSuccess: (data) => {
      setSuccess(data.message);
      setFormData({
        name: "",
        description: "",
        barangay_ID: barangayID || 0,
      });
    },
    onError: (error) => {
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    },
    onSettled: () => {
      setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 3000);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    categoryMutation.mutate(formData);
  };

  return (
    <div className="bg-white p-8 shadow-lg rounded-2xl border border-gray-100 backdrop-blur-xl bg-opacity-80 hover:shadow-xl transition-all duration-300">
      <AddCategoryHeader />

      <form onSubmit={handleSubmit} className="space-y-6">
        <AddCategoryName />

        <AddCategoryDescription />

        <AddCategoryButton isPending={categoryMutation.isPending} />
      </form>
    </div>
  );
}
