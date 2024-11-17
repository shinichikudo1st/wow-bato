"use client";

import AuthBackground from "@/components/auth/authBackground";
import Navbar from "@/components/reusable/navbar";
import AddBarangayForm from "@/components/city-admin/addBarangayForm";
import BarangayList from "@/components/city-admin/barangayList";
import { useEffect } from "react";

export default function CityAdminPage() {
  useEffect(() => {
    const debugSession = async () => {
      const response = await fetch(
        "http://localhost:8080/api/v1/user/checkAuth",
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
    };

    debugSession();
  }, []);
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
                Welcome to Your Dashboard
              </h1>
              <p className="text-gray-600">
                Manage barangays and other administrative tasks from this
                central dashboard.
              </p>
            </div>

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
