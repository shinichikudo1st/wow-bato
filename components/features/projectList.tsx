"use client";

import { UseViewProjectList } from "@/hooks/projectHooks";
import { useState } from "react";
import {
  FiRefreshCw,
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
} from "react-icons/fi";
import ProjectListError from "./projectListUI/projectListError";
import ProjectViewButton from "./projectListUI/projectListViewButton";
import ProjectAdditionalDetails from "./projectListUI/projectAdditionalDetail";
import ProjectListHeader from "./projectListUI/projectListHeader";
import NoProjectsFound from "./projectListUI/NoProjectsFound";

export default function ProjectList({
  userRole,
  categoryID,
}: {
  userRole: string | null;
  categoryID: number | null;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const { categoryInfo, projectList, error, isLoading, refetch } =
    UseViewProjectList(categoryID, currentPage);

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
                    <ProjectListHeader
                      status={project.status}
                      name={project.name}
                    />

                    {/* Project Details */}
                    <ProjectAdditionalDetails
                      startDate={project.startDate}
                      endDate={project.endDate}
                    />

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `60%` }}
                      ></div>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <ProjectViewButton
                    projectID={project.id}
                    userRole={userRole}
                    categoryID={categoryID}
                  />
                </div>
              </div>
            ))
          ) : (
            <NoProjectsFound />
          )}
        </div>
      )}
    </div>
  );
}
