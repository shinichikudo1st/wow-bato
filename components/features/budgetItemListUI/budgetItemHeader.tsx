import { BudgetItemList } from "@/types/budgetItemTypes";
import { FiCheck, FiClock, FiTag, FiX } from "react-icons/fi";

const BudgetItemHeader = ({ item }: { item: BudgetItemList }) => {
  return (
    <div className="flex justify-between items-start mb-4">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-gray-900">{item.Name}</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <FiTag className="w-4 h-4" />
        </div>
      </div>
      <div
        className={`px-3 py-1 rounded-full border flex items-center space-x-1 text-sm font-medium 
                          ${
                            item.Status === "Approved"
                              ? "bg-green-50 border-green-200 text-green-700"
                              : item.Status === "Rejected"
                              ? "bg-gray-50 border-gray-200 text-gray-700"
                              : "bg-blue-50 border-blue-100 text-blue-700"
                          }`}
      >
        {item.Status === "Approved" ? (
          <FiCheck className="w-4 h-4" />
        ) : item.Status === "Rejected" ? (
          <FiX className="w-4 h-4" />
        ) : (
          <FiClock className="w-4 h-4" />
        )}
        <span>{item.Status}</span>
      </div>
    </div>
  );
};

export default BudgetItemHeader;
