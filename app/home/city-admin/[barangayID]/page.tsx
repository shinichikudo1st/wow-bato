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

  const handleUpdate = async () => {
    try {
      const result = await UpdateBarangay(updateBarangay, barangayID);

      console.log(result.message);
    } catch (error) {
      console.log(
        error instanceof Error ? error.message : "Unknown error occured"
      );
    } finally {
      setUpdateBarangay({
        name: "",
        city: "",
        region: "",
      });
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
                    <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Barangay Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={updateBarangay.name}
                          onChange={(e) =>
                            setUpdateBarangay({
                              ...updateBarangay,
                              name: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          value={updateBarangay.city}
                          onChange={(e) =>
                            setUpdateBarangay({
                              ...updateBarangay,
                              city: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="region"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Region
                        </label>
                        <input
                          type="text"
                          id="region"
                          value={updateBarangay.region}
                          onChange={(e) =>
                            setUpdateBarangay({
                              ...updateBarangay,
                              region: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="flex space-x-4 pt-4">
                        <button
                          onClick={handleUpdate}
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setUpdateBarangay({
                              name: "",
                              city: "",
                              region: "",
                            });
                          }}
                          className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <FiHome className="w-5 h-5 text-indigo-600" />
                          <h2 className="text-sm font-medium text-gray-500">
                            City
                          </h2>
                        </div>
                        <p className="text-lg font-semibold text-gray-900 ml-8">
                          {barangay?.city}
                        </p>
                      </div>

                      <div className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <FiGlobe className="w-5 h-5 text-purple-600" />
                          <h2 className="text-sm font-medium text-gray-500">
                            Region
                          </h2>
                        </div>
                        <p className="text-lg font-semibold text-gray-900 ml-8">
                          {barangay?.region}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Takes up 1 column */}
          <div className="space-y-6">
            {/* Quick Stats Card */}
            <div className="bg-white p-6 shadow-lg rounded-2xl border border-gray-100 backdrop-blur-xl bg-opacity-80">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <FiCalendar className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-500">ID Number</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    #{barangay?.id}
                  </span>
                </div>
                {/* Add more quick stats here */}
              </div>
            </div>

            {/* Actions Card */}
            <div className="bg-white p-6 shadow-lg rounded-2xl border border-gray-100 backdrop-blur-xl bg-opacity-80">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Actions
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setUpdateBarangay({
                      name: barangay?.name || "",
                      city: barangay?.city || "",
                      region: barangay?.region || "",
                    });
                  }}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Edit Barangay
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="w-full px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
                >
                  Delete Barangay
                </button>
              </div>
            </div>
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
