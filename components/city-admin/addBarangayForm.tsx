"use client";

import { useState } from "react";
import { FiMapPin, FiHome, FiGlobe, FiCheck, FiLoader } from "react-icons/fi";
import ErrorMessage from "../ui/error";
import SuccessMessage from "../ui/success";
import { AddBarangayFormData } from "@/types/barangayTypes";
import { addBarangay } from "@/libs/barangay";
import { useMutation } from "@tanstack/react-query";

export default function AddBarangayForm() {
  const [formData, setFormData] = useState<AddBarangayFormData>({
    name: "",
    city: "",
    region: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    barangayMutation.mutate(formData);
  };

  const resetMessages = () => {
    setError(null);
    setSuccess(null);
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

      {/* Error Message */}
      {error && <ErrorMessage error={error} setError={setError} />}

      {/* Success Message */}
      {success && <SuccessMessage success={success} setSuccess={setSuccess} />}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        onChange={resetMessages}
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Barangay Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter barangay name"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            City
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiHome className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter city name"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="region"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Region
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiGlobe className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="region"
              name="region"
              value={formData.region}
              onChange={(e) =>
                setFormData({ ...formData, region: e.target.value })
              }
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter region"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={barangayMutation.isPending}
          className="w-full px-4 py-2 text-white font-medium rounded-lg
            bg-gradient-to-r from-blue-600 to-blue-500 
            hover:from-blue-700 hover:to-blue-600 
            transition-all duration-300 
            shadow-sm hover:shadow-md
            transform hover:-translate-y-0.5
            disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center justify-center space-x-2"
        >
          {barangayMutation.isPending ? (
            <>
              <FiLoader className="w-5 h-5 animate-spin" />
              <span>Adding Barangay...</span>
            </>
          ) : (
            <>
              <FiCheck className="w-5 h-5" />
              <span>Add Barangay</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
