"use client";

import { useViewBarangay } from "@/hooks/barangayHook";
import { use, useState } from "react";
import {
  FiHome,
  FiGlobe,
  FiLoader,
  FiCalendar,
  FiArrowLeft,
} from "react-icons/fi";
import Navbar from "@/components/reusable/navbar";
import AuthBackground from "@/components/auth/authBackground";
import { useRouter } from "next/navigation";
import { DeleteBarangay, UpdateBarangay } from "@/libs/barangay";
import { AddBarangayFormData } from "@/types/barangayTypes";
import BarangayUpdateForm from "@/components/city-admin/barangayUI/updateForm";
import BarangayViewCard from "@/components/city-admin/barangayUI/barangayViewCard";
import BarangayQuickInfo from "@/components/city-admin/barangayUI/barangayQuickInfo";
import BarangayActionCard from "@/components/city-admin/barangayUI/barangayActionCard";

const CityAdminBarangayViewPage = ({
  params,
}: {
  params: Promise<{ barangayID: string }>;
}) => {
  const router = useRouter();
  const barangayID = use(params).barangayID;
  const { barangay, isLoading, error, fetchBarangay } =
    useViewBarangay(barangayID);

  const [updateBarangay, setUpdateBarangay] = useState<AddBarangayFormData>({
    name: "",
    city: "",
    region: "",
  });
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
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" 
              onClick={() => setShowDeleteModal(false)}
            />

            {/* Modal panel */}
            <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Delete Barangay
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete {barangay?.name}? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={async () => {
                    await handleDelete(barangayID);
                    setShowDeleteModal(false);
                    router.push('/home/city-admin'); // Redirect after delete
                  }}
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CityAdminBarangayViewPage;
