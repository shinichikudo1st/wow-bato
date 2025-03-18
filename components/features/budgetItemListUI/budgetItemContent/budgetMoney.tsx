import { BudgetItemList } from "@/types/budgetItemTypes";
import { AiFillMoneyCollect } from "react-icons/ai";

const BudgetMoney = ({ item }: { item: BudgetItemList }) => {
  return (
    <div
      className={`flex items-center text-gray-600 mb-3 rounded-lg p-3
                      ${
                        item.Status === "Approved"
                          ? "bg-green-50"
                          : item.Status === "Rejected"
                          ? "bg-gray-50"
                          : "bg-gray-50"
                      }`}
    >
      <AiFillMoneyCollect
        className={`w-5 h-5 mr-2 
                        ${
                          item.Status === "Approved"
                            ? "text-green-500"
                            : item.Status === "Rejected"
                            ? "text-gray-500"
                            : "text-blue-500"
                        }`}
      />
      <span className="font-medium text-lg">
        ₱
        {item.Amount_Allocated.toLocaleString("en-PH", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>
    </div>
  );
};

export default BudgetMoney;
