"use client";

import { useViewBarangay } from "@/hooks/barangayHook";
import { use, useState } from "react";
import { FiLoader, FiArrowLeft } from "react-icons/fi";
import Navbar from "@/components/reusable/navbar";
import AuthBackground from "@/components/auth/authBackground";
import { useRouter } from "next/navigation";
import { DeleteBarangay } from "@/libs/barangay";
import BarangayUpdateForm from "@/components/city-admin/barangayUI/updateForm";
import BarangayViewCard from "@/components/city-admin/barangayUI/barangayViewCard";
import BarangayQuickInfo from "@/components/city-admin/barangayUI/barangayQuickInfo";
import BarangayActionCard from "@/components/city-admin/barangayUI/barangayActionCard";
import BarangayDeleteModal from "@/components/city-admin/barangayUI/deleteBarangayModal";

const CityAdminBarangayViewPage = ({
  params,
}: {
  params: Promise<{ barangayID: string }>;
}) => {
  const router = useRouter();
  const barangayID = use(params).barangayID;
  const { barangay, isLoading, error, fetchBarangay } =
    useViewBarangay(barangayID);

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async (barangayID: string) => {
    try {
      const result = await DeleteBarangay(barangayID);

      console.log(result.message);
    } catch (error) {
      console.log(
        error instanceof Error ? error.message : "Unknown error occured"
      );
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50/50 via-white to-white">
      <AuthBackground />
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center mb-6 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors duration-200"
        >
          <FiArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Content - Takes up 2 columns */}
          <div className="md:col-span-2 space-y-6">
            {/* Barangay Details Card */}
            <div className="bg-white p-8 shadow-lg rounded-2xl border border-gray-100 backdrop-blur-xl bg-opacity-80">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                  <FiLoader className="w-8 h-8 text-blue-600 animate-spin" />
                  <p className="text-sm text-gray-500">
                    Loading barangay details...
                  </p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-600 mb-4">{error}</p>
                  <button
                    onClick={() => fetchBarangay()}
                    className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Barangay {barangay?.name} Details
                    </h2>
                  </div>

                  {isEditing ? (
                    <BarangayUpdateForm
                      barangayID={barangayID}
                      barangay={barangay}
                      setIsEditing={setIsEditing}
                    />
                  ) : (
                    <BarangayViewCard barangay={barangay} />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Takes up 1 column */}
          <div className="space-y-6">
            {/* Quick Stats Card */}
            <BarangayQuickInfo barangayID={barangay?.id} />

            {/* Actions Card */}
            <BarangayActionCard
              setIsEditing={setIsEditing}
              setShowDeleteModal={setShowDeleteModal}
            />
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <BarangayDeleteModal
          setShowDeleteModal={setShowDeleteModal}
          barangayID={barangayID}
          barangayName={barangay?.name}
          router={router}
        />
      )}
    </div>
  );
};

export default CityAdminBarangayViewPage;
