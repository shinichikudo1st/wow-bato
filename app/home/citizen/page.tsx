"use client";

import AuthBackground from "@/components/auth/authBackground";
import BudgetCategoryList from "@/components/barangay-admin/budgetCategoryList";
import Navbar from "@/components/reusable/navbar";
import { useProfileID } from "@/hooks/userHooks";

export default function BarangayCitizenPage() {
  const { barangayID, userRole } = useProfileID();

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
                Dashboard
              </h1>
              <p className="text-gray-600">
                View your barangay projects and track financial allocations
              </p>
            </div>
            <BudgetCategoryList barangayID={barangayID} userRole={userRole} />
          </div>
        </div>
      </main>
    </div>
  );
}
