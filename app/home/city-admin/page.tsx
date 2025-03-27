"use client";

import AuthBackground from "@/components/ui/authBackground";
import Navbar from "@/components/ui/navbar";
import AddBarangayForm from "@/components/city-admin-exclusive/addBarangayForm";
import BarangayList from "@/components/city-admin-exclusive/barangayList";
import WelcomeSectionBarangayAdmin from "@/components/city-admin-exclusive/ui/welcome";

export default function CityAdminPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50/50 via-white to-white">
      <AuthBackground />
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-8">
            {/* Welcome Section */}
            <WelcomeSectionBarangayAdmin />

            {/* Add Barangay Form */}
            <AddBarangayForm />
          </div>

          {/* Barangay List */}
          <BarangayList />
        </div>
      </main>
    </div>
  );
}
