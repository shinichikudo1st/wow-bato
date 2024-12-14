import AuthBackground from "@/components/auth/authBackground";
import AddProjectForm from "@/components/barangay-admin/addProjectForm";
import ProjectList from "@/components/barangay-admin/projectList";
import Navbar from "@/components/reusable/navbar";
import { use } from "react";

const BudgetCategoryBarangayAdmin = ({
  params,
}: {
  params: Promise<{ budgetCategory: number }>;
}) => {
  const categoryID = use(params).budgetCategory;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50/50 via-white to-white">
      <AuthBackground />
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
          <ProjectList categoryID={categoryID} />
        </div>
      </main>
    </div>
  );
};

export default BudgetCategoryBarangayAdmin;
