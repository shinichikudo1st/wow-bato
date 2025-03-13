"use client";
import AuthBackground from "@/components/ui/authBackground";
import Navbar from "@/components/ui/navbar";
import { useRouter } from "next/navigation";
import { use } from "react";
import { FiArrowLeft } from "react-icons/fi";
import AddItemComponent from "@/components/barangay-admin-exclusive/addBudgetItem";
import BudgetItemList from "@/components/features/budgetItemList";
import { UseViewSingleProject } from "@/hooks/projectHooks";

const ProjectItemsBarangayAdmin = ({
  params,
}: {
  params: Promise<{ projectID: number }>;
}) => {
  const projectID = use(params).projectID;
  const router = useRouter();

  const { project } = UseViewSingleProject(projectID);

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
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Project Details
                </h2>
                <h1 className="text-4xl font-extrabold text-blue-600 mt-2 mb-1">
                  {project?.name}
                </h1>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">
                    Start Date
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {project?.startDate
                      ? new Date(project.startDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "Not set"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">
                    Estimated End Date
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {project?.endDate
                      ? new Date(project.endDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Not set"}
                  </p>
                </div>
              </div>
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
