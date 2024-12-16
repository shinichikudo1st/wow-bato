"use client";

import { UseViewProjectList } from "@/hooks/projectHooks";
import { useState } from "react";
import {
  FiFolder,
  FiDollarSign,
  FiCalendar,
  FiEye,
  FiTrendingUp,
} from "react-icons/fi";

export default function ProjectList({
  categoryID,
}: {
  categoryID: number | null;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const { projectList, error, loading } = UseViewProjectList(
    categoryID,
    currentPage
  );

  const NextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const PreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Current Projects
          </h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <FiFolder className="w-4 h-4" />
            <span>{projectList && projectList.length} Projects</span>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full px-4 py-2 pl-10 pr-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          <FiFolder className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projectList &&
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
                      <p className="text-sm text-gray-500">{project.status}</p>
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
          ))}
      </div>

      {/* Empty State (when no projects) */}
      {projectList && projectList.length === 0 && (
        <div className="bg-white p-8 rounded-xl border border-gray-100 text-center">
          <div className="flex justify-center mb-4">
            <FiFolder className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Projects Yet
          </h3>
          <p className="text-gray-500">
            Create your first project to get started.
          </p>
        </div>
      )}
    </div>
  );
}
