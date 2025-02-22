import {
  FiChevronLeft,
  FiChevronRight,
  FiPackage,
  FiRefreshCcw,
} from "react-icons/fi";

const ControlSectionBudgetItem = ({
  FetchBudgetItems,
  setIsRefreshing,
  isRefreshing,
  setCurrentPage,
  currentPage,
  totalPages,
}: {
  FetchBudgetItems: () => void;
  setIsRefreshing: (refreshing: boolean) => void;
  isRefreshing: boolean;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  currentPage: number;
  totalPages: number;
}) => {
  const handleRefresh = () => {
    setIsRefreshing(true);
    FetchBudgetItems();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
      <div>
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-4">
          <span className="flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-sm font-medium text-blue-600">
            Budget Items
          </span>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
          <FiPackage className="mr-2 text-blue-600" />
          Project Budget Items
        </h2>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-3">
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
        >
          <FiRefreshCcw
            className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`}
          />
        </button>
        <div className="flex items-center bg-gray-50 rounded-lg p-1">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-md hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all duration-200"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <span className="px-4 text-sm font-medium text-gray-700">
            Page {currentPage}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className="p-2 rounded-md hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all duration-200"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlSectionBudgetItem;
