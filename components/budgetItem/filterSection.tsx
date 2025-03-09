import { useStatusBudgetItemStore } from "@/store/budgetItemStore";
import { FiFilter } from "react-icons/fi";

const FilterSectionBudgetItem = () => {
  const { statusFilter, setStatusFilter, setCurrentPage } =
    useStatusBudgetItemStore();

  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <FiFilter className="w-4 h-4" />
        <span>Filter by status:</span>
      </div>
      <div className="flex space-x-2">
        {["All", "Pending", "Approved", "Rejected"].map((status) => (
          <button
            key={status}
            onClick={() => {
              setStatusFilter(status as any);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200 ${
              statusFilter === status
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterSectionBudgetItem;
