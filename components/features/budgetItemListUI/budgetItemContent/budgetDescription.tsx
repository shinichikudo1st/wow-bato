import { BudgetItemList } from "@/types/budgetItemTypes";
import { FiFileText } from "react-icons/fi";

const BudgetItemDescription = ({ item }: { item: BudgetItemList }) => {
  return (
    <div
      className={`p-4 rounded-lg mb-4
                      ${
                        item.Status === "Approved"
                          ? "bg-green-50"
                          : item.Status === "Rejected"
                          ? "bg-gray-50"
                          : "bg-gray-50"
                      }`}
    >
      <div className="flex items-start">
        <FiFileText
          className={`w-4 h-4 mr-2 mt-1 flex-shrink-0
                          ${
                            item.Status === "Approved"
                              ? "text-green-500"
                              : item.Status === "Rejected"
                              ? "text-gray-500"
                              : "text-blue-500"
                          }`}
        />
        <p className="text-gray-600">{item.Description}</p>
      </div>
    </div>
  );
};

export default BudgetItemDescription;
