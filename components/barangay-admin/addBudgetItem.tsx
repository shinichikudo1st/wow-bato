"use client";

import { NewItemData } from "@/types/budgetItemTypes";
import { useState } from "react";
import {
  FiDollarSign,
  FiFileText,
  FiCheck,
  FiPackage,
  FiAlertCircle,
} from "react-icons/fi";

const AddItemComponent = ({
  projectID,
}: {
  projectID: number | null;
}) => {
  const [formData, setFormData] = useState<NewItemData>({
    name: "",
    description: "",
    amount_allocated: 0,
    status: "Pending",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(null);
    setError(null);

    try {
      // TODO: Add API call here
      setSuccess("Budget item added successfully!");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 2000);
    }
  };

  return (
    <div className="bg-white p-8 shadow-lg rounded-2xl border border-gray-100 backdrop-blur-xl bg-opacity-80 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-4">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-sm font-medium text-blue-600">
              New Budget Item
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
            <FiPackage className="mr-2 text-blue-600" />
            Add Budget Item
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Item Name
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiPackage className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                hover:border-blue-300 transition-all duration-200
                bg-white hover:bg-blue-50/30"
              placeholder="Enter item name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Amount Allocated (₱)
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 group-hover:text-blue-500 transition-colors">₱</span>
            </div>
            <input
              type="text"
              id="amount"
              name="amount"
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                hover:border-blue-300 transition-all duration-200
                bg-white hover:bg-blue-50/30"
              placeholder="0.00"
              value={formData.amount_allocated === 0 ? "" : formData.amount_allocated.toLocaleString('en-PH', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.]/g, '');
                const amount = parseFloat(value) || 0;
                if (!isNaN(amount)) {
                  setFormData({
                    ...formData,
                    amount_allocated: amount
                  });
                }
              }}
              onBlur={(e) => {
                const amount = parseFloat(e.target.value) || 0;
                setFormData({
                  ...formData,
                  amount_allocated: amount
                });
              }}
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">Enter amount in Philippine Peso (₱)</p>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <div className="relative group">
            <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
              <FiFileText className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                hover:border-blue-300 transition-all duration-200
                bg-white hover:bg-blue-50/30"
              placeholder="Enter a detailed description of the budget item..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">Provide details about how this budget will be utilized</p>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-6 py-3 border border-transparent 
              text-base font-medium rounded-md shadow-sm text-white 
              bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-blue-500 transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <FiAlertCircle className="mr-2 h-5 w-5 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <FiCheck className="mr-2 h-5 w-5" />
                Add Item
              </>
            )}
          </button>
        </div>

        {success && (
          <div className="mt-4 p-4 bg-green-50 border border-green-100 rounded-lg">
            <p className="text-green-700 text-sm">{success}</p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddItemComponent;
