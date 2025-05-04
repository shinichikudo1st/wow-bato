import { useBarangayList } from "@/hooks/barangayHook";
import { useBarangayListStore } from "@/store/barangayStore";
import { FiChevronLeft, FiChevronRight, FiRefreshCcw } from "react-icons/fi";

const BarangayListControl = () => {
  const { currentPage, setCurrentPage } = useBarangayListStore();
  const { barangays, isLoading, isRefreshing, refetch } =
    useBarangayList(currentPage);
  const LIMIT = 5;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Barangay List</h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage and view all barangays in Toledo City
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => refetch()}
          disabled={isRefreshing}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
        >
          <FiRefreshCcw
            className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`}
          />
        </button>
        <div className="flex items-center bg-gray-50 rounded-lg p-1">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1 || isLoading}
            className="p-2 rounded-md hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all duration-200"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <span className="px-4 text-sm font-medium text-gray-700">
            Page {currentPage}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={isLoading || !barangays || barangays.data.length < LIMIT}
            className="p-2 rounded-md hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all duration-200"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BarangayListControl;
