"use client";
import AuthBackground from "@/components/auth/authBackground";
import Navbar from "@/components/reusable/navbar";
import { useRouter } from "next/navigation";
import { use } from "react";
import { FiArrowLeft } from "react-icons/fi";
import AddItemComponent from "@/components/barangay-admin/addBudgetItem";
import BudgetItemList from "@/components/barangay-admin/budgetItemList";

const ProjectItemsBarangayAdmin = ({
  params,
}: {
  params: Promise<{ projectID: number }>;
}) => {
  const projectID = use(params).projectID;
  const router = useRouter();

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
          Back to Projects
        </button>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-white p-8 shadow-lg rounded-2xl border border-gray-100 backdrop-blur-xl bg-opacity-80 hover:shadow-xl transition-all duration-300">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Project Items - Barangay Admin
              </h1>
              <p className="text-gray-600">
                View and Add Items to be used in the project from this central
                dashboard.
              </p>
            </div>

            {/* Add Budget Item Form */}
            <AddItemComponent projectID={projectID} />
          </div>

          <div className="space-y-8">
            {/* Budget Item List */}
            <BudgetItemList projectID={projectID} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectItemsBarangayAdmin;
