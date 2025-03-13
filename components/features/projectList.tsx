"use client";

import { UseViewProjectList } from "@/hooks/projectHooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FiFolder,
  FiDollarSign,
  FiCalendar,
  FiEye,
  FiTrendingUp,
  FiRefreshCw,
  FiChevronLeft,
  FiChevronRight,
  FiMapPin,
  FiSearch,
} from "react-icons/fi";
import ProjectListError from "./projectListUI/projectListError";

export default function ProjectList({
  userRole,
  categoryID,
  setActiveProject,
}: {
  userRole: string | null;
  categoryID: number | null;
  setActiveProject?: (projectID: number) => void;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const { categoryInfo, projectList, error, isLoading, refetch } =
    UseViewProjectList(categoryID, currentPage);
  const router = useRouter();

  const showBudgetItems = (projectID: number) => {
    if (userRole === "citizen") {
      router.push(`/home/citizen/projects/${projectID}`);
    } else if (userRole === "barangay admin") {
      router.push(`/home/barangay-admin/projects/${projectID}`);
    } else {
      router.push(`/home/city-admin/projects/${projectID}`);
    }
  };

  const viewDetails = (projectID: number) => {
    if (userRole === "citizen") {
      setActiveProject?.(projectID);
    } else if (userRole === "barangay admin") {
      router.push(`/home/barangay-admin/${categoryID}/${projectID}`);
    } else {
      return;
    }
  };

  if (error) {
    return <ProjectListError refetch={refetch} error={error} />;
  }

  return (
    <div className="bg-white p-6 shadow-lg rounded-2xl border border-gray-100 backdrop-blur-xl bg-opacity-80 hover:shadow-xl transition-all duration-300">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {categoryInfo.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {categoryInfo.description}
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
              disabled={isLoading || !projectList || projectList.length < 5}
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
          placeholder="Search projects..."
          className="w-full px-4 py-2 pl-10 pr-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>

      {/* Content Section */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-sm text-gray-500">isLoading barangays...</p>
        </div>
      ) : (
        <div className="space-y-3">
          {projectList && projectList.length > 0 ? (
            projectList.map((project) => (
              <div
                key={project.id}
                className="group bg-white p-6 rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-4 flex-1">
                    {/* Project Header */}
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-200">
                        <FiFolder className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                          {project.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {project.status}
                        </p>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <FiDollarSign className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">₱100,000</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FiCalendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {new Date(project.startDate).toLocaleDateString()} -{" "}
                          {new Date(project.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FiTrendingUp className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          60% Complete
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `60%` }}
                      ></div>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => viewDetails(project.id)}
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600
                      bg-transparent hover:bg-blue-50 rounded-lg transition-colors duration-200
                      opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
                    >
                      <FiEye className="w-4 h-4 mr-1.5" />
                      View Details
                    </button>
                    <button
                      onClick={() => showBudgetItems(project.id)}
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-emerald-600
                      bg-transparent hover:bg-emerald-50 rounded-lg transition-colors duration-200
                      opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
                    >
                      <FiDollarSign className="w-4 h-4 mr-1.5" />
                      View Budget Items
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 px-4 rounded-xl border-2 border-dashed border-gray-200">
              <FiMapPin className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No Projects Found
              </h3>
              <p className="text-sm text-gray-500">
                There are no projects to display at the moment.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
