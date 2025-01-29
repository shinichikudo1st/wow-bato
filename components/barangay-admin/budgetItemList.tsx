"use client";

import { useState } from "react";
import {
  FiPackage,
  FiFilter,
  FiClock,
  FiCheck,
  FiX,
  FiCalendar,
  FiFileText,
  FiRefreshCw,
  FiChevronLeft,
  FiChevronRight,
  FiDollarSign,
  FiTag,
} from "react-icons/fi";

// Dummy data for demonstration
const dummyItems = [
  {
    id: 1,
    name: "Construction Materials",
    amount_allocated: 150000.00,
    description: "High-quality construction materials including cement, steel bars, and lumber for the main structure.",
    status: "approved",
    approval_date: "2025-01-15",
    category: "Materials",
  },
  {
    id: 2,
    name: "Labor Cost",
    amount_allocated: 75000.00,
    description: "Skilled labor workforce payment for the initial phase of construction.",
    status: "pending",
    approval_date: null,
    category: "Labor",
  },
  {
    id: 3,
    name: "Equipment Rental",
    amount_allocated: 25000.00,
    description: "Heavy equipment rental for site preparation and foundation work.",
    status: "rejected",
    approval_date: null,
    category: "Equipment",
  },
  {
    id: 4,
    name: "Site Survey Services",
    amount_allocated: 35000.00,
    description: "Professional surveying services for accurate site measurements and planning.",
    status: "approved",
    approval_date: "2025-01-20",
    category: "Services",
  },
  {
    id: 5,
    name: "Safety Equipment",
    amount_allocated: 45000.00,
    description: "Personal protective equipment and safety gear for construction workers.",
    status: "pending",
    approval_date: null,
    category: "Materials",
  },
];

const ITEMS_PER_PAGE = 3;

const BudgetItemList = ({ projectID }: { projectID: number }) => {
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-50 text-green-700 border-green-100";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-100";
      default:
        return "bg-yellow-50 text-yellow-700 border-yellow-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <FiCheck className="w-4 h-4" />;
      case "rejected":
        return <FiX className="w-4 h-4" />;
      default:
        return <FiClock className="w-4 h-4" />;
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const filteredItems = dummyItems.filter(
    (item) => statusFilter === "all" || item.status === statusFilter
  );

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="bg-white p-8 shadow-lg rounded-2xl border border-gray-100 backdrop-blur-xl bg-opacity-80 hover:shadow-xl transition-all duration-300">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-4">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-sm font-medium text-blue-600">
              Budget Items
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
            <FiPackage className="mr-2 text-blue-600" />
            Project Budget Items
          </h2>
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
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all duration-200"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <FiFilter className="w-4 h-4" />
          <span>Filter by status:</span>
        </div>
        <div className="flex space-x-2">
          {["all", "pending", "approved", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => {
                setStatusFilter(status as any);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200 ${
                statusFilter === status
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-4">
        {paginatedItems.map((item) => (
          <div
            key={item.id}
            className="p-6 border border-gray-100 rounded-xl hover:border-blue-100 transition-all duration-200 bg-white hover:bg-blue-50/10"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <FiTag className="w-4 h-4" />
                  <span>{item.category}</span>
                </div>
              </div>
              <div
                className={`px-3 py-1 rounded-full border flex items-center space-x-1 text-sm font-medium ${getStatusColor(
                  item.status
                )}`}
              >
                {getStatusIcon(item.status)}
                <span className="capitalize">{item.status}</span>
              </div>
            </div>
            
            <div className="flex items-center text-gray-600 mb-3 bg-gray-50 p-3 rounded-lg">
              <FiDollarSign className="w-5 h-5 mr-2 text-blue-500" />
              <span className="font-medium text-lg">
                ₱{item.amount_allocated.toLocaleString('en-PH', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex items-start">
                <FiFileText className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-blue-500" />
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
              <FiCalendar className="w-4 h-4 mr-2 text-blue-500" />
              {item.approval_date 
                ? `Approved on ${new Date(item.approval_date).toLocaleDateString('en-PH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}`
                : item.status === 'rejected'
                ? 'Rejected'
                : 'Pending Approval'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetItemList;