import { useBarangayList } from "@/hooks/barangayHook";
import { useBarangayListStore } from "@/store/barangayStore";
import { useRouter } from "next/navigation";
import { FiEye, FiMapPin } from "react-icons/fi";

const BarangayItemList = () => {
  const { currentPage } = useBarangayListStore();
  const { barangays, isLoading, isRefreshing, error, refetch } =
    useBarangayList(currentPage);
  const router = useRouter();
  return (
    <div className="space-y-3">
      {barangays?.data && barangays.data.length > 0 ? (
        barangays.data.map((barangay) => (
          <div
            key={barangay.id}
            className="group p-4 rounded-xl border border-gray-100 hover:border-blue-100 bg-white hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-200">
                  <FiMapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                    {barangay.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {barangay.city}, {barangay.region}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  router.push(`/home/city-admin/${barangay.id}`);
                }}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 
                      bg-transparent hover:bg-blue-50 rounded-lg transition-colors duration-200
                      opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
              >
                <FiEye className="w-4 h-4 mr-1.5" />
                View Details
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12 px-4 rounded-xl border-2 border-dashed border-gray-200">
          <FiMapPin className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No Barangays Found
          </h3>
          <p className="text-sm text-gray-500">
            There are no barangays to display at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default BarangayItemList;
