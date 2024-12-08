"use client";

import {
  FiFolderPlus,
  FiFileText,
  FiEye,
  FiTrendingUp,
  FiSearch,
  FiRefreshCw,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useState } from "react";
import { useBudgetCategory } from "@/hooks/budgetCategoryHook";

export default function BudgetCategoryList({
  barangayID,
}: {
  barangayID: number | null;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { budgetCategories, isLoading, success, error } =
    useBudgetCategory(barangayID);

  // Dummy data for UI demonstration
  const dummyCategories = [
    {
      id: 1,
      name: "Infrastructure Development",
      description:
        "Budget allocation for infrastructure projects and maintenance",
      totalProjects: 3,
      totalBudget: 1500000,
      activeProjects: 2,
    },
    {
      id: 2,
      name: "Social Services",
      description:
        "Funds for community welfare and social development programs",
      totalProjects: 2,
      totalBudget: 800000,
      activeProjects: 1,
    },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Add your refresh logic here
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
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
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            <FiRefreshCw
              className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`}
            />
          </button>
          <div className="flex items-center bg-gray-50 rounded-lg p-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all duration-200"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <span className="px-4 text-sm font-medium text-gray-700">
              Page {currentPage}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={dummyCategories.length < 5} // Assuming 5 is the page limit
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
        {dummyCategories.map((category) => (
          <div
            key={category.id}
            className="group bg-white p-6 rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-4 flex-1">
                {/* Category Header */}
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-200">
                    <FiFolderPlus className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Category Details */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <FiFolderPlus className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {category.totalProjects} Projects
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiTrendingUp className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      ₱{category.totalBudget.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiFileText className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {category.activeProjects} Active
                    </span>
                  </div>
                </div>
              </div>

              {/* View Details Button */}
              <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-transparent hover:bg-blue-50 rounded-lg transition-colors duration-200 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0">
                <FiEye className="w-4 h-4 mr-1.5" />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {dummyCategories.length === 0 && (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <FiFolderPlus className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Budget Categories Yet
          </h3>
          <p className="text-gray-500">
            Create your first budget category to get started.
          </p>
        </div>
      )}
    </div>
  );
}
