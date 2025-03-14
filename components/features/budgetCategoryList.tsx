"use client";

import { FiSearch } from "react-icons/fi";
import { useBudgetCategory } from "@/hooks/budgetCategoryHook";
import BudgetCategories from "./budgetCategoryListUI/budgetCategories";
import NoBudgetCategories from "./budgetCategoryListUI/noBudgetCategories";
import { useBudgetCategoryListStore } from "@/store/budgetCategoryStore";
import BudgetCategoriesControl from "./budgetCategoryListUI/budgetCategoriesControl";

export default function BudgetCategoryList({
  barangayID,
  userRole,
}: {
  barangayID: number | null;
  userRole: string | null;
}) {
  const { currentPage } = useBudgetCategoryListStore();
  const { budgetCategories, error } = useBudgetCategory(
    barangayID,
    currentPage
  );

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
        <BudgetCategoriesControl barangayID={barangayID} />
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
            <BudgetCategories
              key={category.id}
              category={category}
              userRole={userRole}
            />
          ))
        ) : (
          <NoBudgetCategories />
        )}
      </div>
    </div>
  );
}
