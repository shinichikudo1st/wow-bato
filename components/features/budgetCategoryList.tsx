"use client";

import {
  FiSearch,
  FiRefreshCw,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useState } from "react";
import { useBudgetCategory } from "@/hooks/budgetCategoryHook";
import { useRouter } from "next/navigation";
import BudgetCategories from "./budgetCategoryListUI/budgetCategories";
import NoBudgetCategories from "./budgetCategoryListUI/noBudgetCategories";

export default function BudgetCategoryList({
  barangayID,
  userRole,
}: {
  barangayID: number | null;
  userRole: string | null;
}) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const { budgetCategories, isLoading, error, categoryCount, refetch } =
    useBudgetCategory(barangayID, currentPage);

  // Error state
  if (error) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
        </div>
      </div>
    );
  }

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300">
      {/* Main Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Budget Categories
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage and monitor budget allocations
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={refetch}
            disabled={isLoading}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            <FiRefreshCw
              className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
            />
          </button>
          <div className="flex items-center bg-gray-50 rounded-lg p-1">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="p-2 rounded-md hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all duration-200"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <span className="px-4 text-sm font-medium text-gray-700">
              Page {currentPage}
            </span>
            <button
              onClick={nextPage}
              disabled={
                !budgetCategories ||
                categoryCount <= 5 ||
                currentPage >= Math.ceil(categoryCount / 5)
              }
              className="p-2 rounded-md hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all duration-200"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search categories..."
          className="w-full px-4 py-2 pl-10 pr-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        {budgetCategories && budgetCategories.length > 0 ? (
          budgetCategories.map((category) => (
            <BudgetCategories category={category} userRole={userRole} />
          ))
        ) : (
          <NoBudgetCategories />
        )}
      </div>
    </div>
  );
}
