"use client";

import { FiHome } from "react-icons/fi";
import ErrorMessage from "../ui/error";
import SuccessMessage from "../ui/success";
import { AddBarangayFormData } from "@/types/barangayTypes";
import { addBarangay } from "@/libs/barangay";
import { useMutation } from "@tanstack/react-query";
import { useAddBarangayStore } from "@/store/barangayStore";
import AddBarangayName from "./addBarangayForm/addBarangayName";
import AddBarangayCity from "./addBarangayForm/addBarangayCity";
import AddBarangayRegion from "./addBarangayForm/addBarangayRegion";
import AddBarangayButton from "./addBarangayForm/addBarangayButton";

export default function AddBarangayForm() {
  const { formData, error, success, setFormData, setError, setSuccess } =
    useAddBarangayStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    barangayMutation.mutate(formData);
  };

  const barangayMutation = useMutation({
    mutationFn: async (data: AddBarangayFormData) => {
      const result = await addBarangay(data);
      return result.message;
    },
    onSuccess: (data) => {
      setSuccess(data);
      setFormData({
        name: "",
        city: "",
        region: "",
      });
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    },
    onError: (error) => {
      setError(
        error instanceof Error ? error.message : "Failed to add barangay"
      );
      setTimeout(() => {
        setError(null);
      }, 3000);
    },
  });

  return (
    <div className="bg-white p-8 shadow-lg rounded-2xl border border-gray-100 backdrop-blur-xl bg-opacity-80 hover:shadow-xl transition-all duration-300">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
        <FiHome className="mr-2 text-blue-600" />
        Add New Barangay
      </h2>

      {error && <ErrorMessage error={error} setError={setError} />}

      {success && <SuccessMessage success={success} setSuccess={setSuccess} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        <AddBarangayName />

        <AddBarangayCity />

        <AddBarangayRegion />

        <AddBarangayButton isPending={barangayMutation.isPending} />
      </form>
    </div>
  );
}
