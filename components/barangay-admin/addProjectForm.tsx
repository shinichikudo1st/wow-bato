"use client";

import { AddNewProject } from "@/libs/project";
import { ProjectFormData } from "@/types/projectTypes";
import { useState } from "react";
import {
  FiFolder,
  FiCalendar,
  FiFileText,
  FiCheck,
  FiTrendingUp,
} from "react-icons/fi";

export default function AddProjectForm({
  categoryID,
}: {
  categoryID: number | null;
}) {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
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
      const result = await AddNewProject(formData, categoryID);

      setSuccess(result.message);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unknown error occured"
      );
    } finally {
      setIsSubmitting(false);
      setFormData({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "Pending",
      })
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
              New Project
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
            <FiFolder className="mr-2 text-blue-600" />
            Create New Project
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Project Name
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiFolder className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                hover:border-blue-300 transition-all duration-200
                bg-white hover:bg-blue-50/30"
              placeholder="Enter project name"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Start Date
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCalendar className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                  hover:border-blue-300 transition-all duration-200
                  bg-white hover:bg-blue-50/30"
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              End Date
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCalendar className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                  hover:border-blue-300 transition-all duration-200
                  bg-white hover:bg-blue-50/30"
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Project Description
          </label>
          <div className="relative group">
            <div className="absolute top-3 left-3 pointer-events-none">
              <FiFileText className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                hover:border-blue-300 transition-all duration-200
                bg-white hover:bg-blue-50/30 resize-none"
              placeholder="Enter project description"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-6 py-3 text-white font-medium rounded-xl
            ${isSubmitting 
              ? 'bg-blue-400 cursor-not-allowed opacity-75' 
              : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600'
            }
            transition-all duration-300 
            shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.1)]
            hover:shadow-[0_1px_3px_rgba(0,0,0,0.12),0_8px_24px_rgba(0,0,0,0.12)]
            transform hover:-translate-y-0.5
            flex items-center justify-center space-x-2
            relative overflow-hidden group`}
        >
          <div className="relative flex items-center gap-2">
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Creating Project...</span>
              </>
            ) : (
              <>
                <FiCheck className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                <span className="relative">
                  Create Project
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white/20 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </span>
                <FiTrendingUp className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </div>

          {/* Hover Effect Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
            transform -translate-x-full transition-transform duration-700 
            ${!isSubmitting && 'group-hover:translate-x-full'}`}
          />
        </button>
      </form>
    </div>
  );
}
