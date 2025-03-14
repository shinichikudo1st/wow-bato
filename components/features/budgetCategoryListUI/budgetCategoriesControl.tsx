import { useBudgetCategory } from "@/hooks/budgetCategoryHook";
import { useBudgetCategoryListStore } from "@/store/budgetCategoryStore";
import { FiChevronLeft, FiChevronRight, FiRefreshCcw } from "react-icons/fi";

const BudgetCategoriesControl = ({
  barangayID,
}: {
  barangayID: number | null;
}) => {
  const { currentPage, setCurrentPage } = useBudgetCategoryListStore();
  const { refetch, isLoading, categoryCount, budgetCategories } =
    useBudgetCategory(barangayID, currentPage);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={refetch}
        disabled={isLoading}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
      >
        <FiRefreshCcw
          className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
        />
      </button>
      <div className="flex items-center bg-gray-50 rounded-lg p-1">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="p-2 rounded-md hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all duration-200"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>
        <span className="px-4 text-sm font-medium text-gray-700">
          Page {currentPage}
        </span>
        <button
          onClick={nextPage}
          disabled={
            !budgetCategories ||
            categoryCount <= 5 ||
            currentPage >= Math.ceil(categoryCount / 5)
          }
          className="p-2 rounded-md hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all duration-200"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default BudgetCategoriesControl;
