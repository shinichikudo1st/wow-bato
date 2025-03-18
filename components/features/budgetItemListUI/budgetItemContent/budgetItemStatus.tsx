import { BudgetItemList } from "@/types/budgetItemTypes";
import { FiCalendar } from "react-icons/fi";

const BudgetItemStatus = ({ item }: { item: BudgetItemList }) => {
  return (
    <div
      className={`flex items-center text-sm text-gray-500 px-3 py-2 rounded-lg
                        ${
                          item.Status === "Approved"
                            ? "bg-green-50"
                            : item.Status === "Rejected"
                            ? "bg-gray-50"
                            : "bg-gray-50"
                        }`}
    >
      <FiCalendar
        className={`w-4 h-4 mr-2
                          ${
                            item.Status === "Approved"
                              ? "text-green-500"
                              : item.Status === "Rejected"
                              ? "text-gray-500"
                              : "text-blue-500"
                          }`}
      />
      {item.Approval_Date
        ? `Approved on ${new Date(item.Approval_Date).toLocaleDateString(
            "en-PH",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}`
        : item.Status === "Rejected"
        ? "Rejected"
        : "Pending Approval"}
    </div>
  );
};

export default BudgetItemStatus;
