"use client";

import { useState } from "react";
import {
  FiMapPin,
  FiChevronLeft,
  FiChevronRight,
  FiRefreshCw,
  FiEye,
} from "react-icons/fi";
import { useBarangayList } from "@/hooks/barangayHook";

export default function BarangayList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { barangays, isLoading, isRefreshing, error, fetchBarangays } =
    useBarangayList(currentPage);
  const limit = 5;

  if (error) {
    return (
      <div className="bg-white p-6 shadow-lg rounded-2xl border border-gray-100 backdrop-blur-xl bg-opacity-80">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => fetchBarangays()}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
          >
            <FiRefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 shadow-lg rounded-2xl border border-gray-100 backdrop-blur-xl bg-opacity-80 hover:shadow-xl transition-all duration-300">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Barangay List</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage and view all barangays in Toledo City
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => fetchBarangays(true)}
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
              disabled={currentPage === 1 || isLoading}
              className="p-2 rounded-md hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all duration-200"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <span className="px-4 text-sm font-medium text-gray-700">
              Page {currentPage}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={
                isLoading || !barangays || barangays.data.length < limit
              }
              className="p-2 rounded-md hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all duration-200"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-sm text-gray-500">Loading barangays...</p>
        </div>
      ) : (
        <div className="space-y-3">
          {barangays?.data && barangays.data.length > 0 ? (
            barangays.data.map((barangay) => (
              <div
                key={barangay.id}
                className="group p-4 rounded-xl border border-gray-100 hover:border-blue-100 bg-white hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-200">
                      <FiMapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                        {barangay.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {barangay.city}, {barangay.region}
                      </p>
                    </div>
                  </div>
                  <button
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 
                      bg-transparent hover:bg-blue-50 rounded-lg transition-colors duration-200
                      opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
                  >
                    <FiEye className="w-4 h-4 mr-1.5" />
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 px-4 rounded-xl border-2 border-dashed border-gray-200">
              <FiMapPin className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No Barangays Found
              </h3>
              <p className="text-sm text-gray-500">
                There are no barangays to display at the moment.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
