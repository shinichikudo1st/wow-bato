"use client";

import { useViewBarangay } from "@/hooks/barangayHook";
import { use, useState } from "react";
import {
  FiMapPin,
  FiHome,
  FiGlobe,
  FiLoader,
  FiCalendar,
  FiImage,
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
  })

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

  const handleUpdate = async() => {
    try {
      const result = await UpdateBarangay(updateBarangay, barangayID);
    } catch (error) {
      console.log(
        error instanceof Error ? error.message : "Unknown error occured"
      );
    } finally {
      setUpdateBarangay({
        name: "",
        city: "",
        region: "",
      })
    }
  }

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
                <div className="space-y-8">
                  {/* Header */}
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <FiMapPin className="w-7 h-7 text-blue-600" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">
                        {barangay?.name}
                      </h1>
                      <p className="text-gray-500 mt-1">
                        Barangay Information Details
                      </p>
                    </div>
                  </div>

                  {/* Image Placeholder */}
                  <div className="relative group">
                    <div className="aspect-video rounded-2xl bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-200 group-hover:border-blue-200 transition-colors duration-200">
                      <div className="text-center p-8">
                        <FiImage className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                        <p className="text-sm font-medium text-gray-500">
                          No barangay image available
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Upload an image to showcase the barangay
                        </p>
                      </div>
                    </div>
                    <button className="absolute inset-0 w-full h-full bg-blue-600 bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="px-4 py-2 bg-white rounded-lg shadow-lg text-sm font-medium text-blue-600">
                        Upload Image
                      </span>
                    </button>
                  </div>

                  {/* Info Grid */}
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
                <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Edit Barangay
                </button>
                <button className="w-full px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200">
                  Delete Barangay
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CityAdminBarangayViewPage;
