"use client";

import AuthBackground from "@/components/auth/authBackground";
import AddProjectForm from "@/components/barangay-admin/addProjectForm";
import ProjectList from "@/components/barangay-admin/projectList";
import Navbar from "@/components/reusable/navbar";
import { useProfileID } from "@/hooks/userHooks";
import { useRouter } from "next/navigation";
import { use } from "react";
import { FiArrowLeft } from "react-icons/fi";

const BudgetCategoryBarangayAdmin = ({
  params,
}: {
  params: Promise<{ budgetCategory: number }>;
}) => {
  const categoryID = use(params).budgetCategory;
  const router = useRouter();

  const { userRole } = useProfileID();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50/50 via-white to-white">
      <AuthBackground />
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center mb-6 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors duration-200"
        >
          <FiArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-white p-8 shadow-lg rounded-2xl border border-gray-100 backdrop-blur-xl bg-opacity-80 hover:shadow-xl transition-all duration-300">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Category Projects
              </h1>
              <p className="text-gray-600">
                Manage your barangay projects and track financial allocations
                from this central dashboard.
              </p>
            </div>

            {/* Add Project */}
            <AddProjectForm categoryID={categoryID} />
          </div>

          {/* Project List */}
          <ProjectList userRole={userRole} categoryID={categoryID} />
        </div>
      </main>
    </div>
  );
};

export default BudgetCategoryBarangayAdmin;
