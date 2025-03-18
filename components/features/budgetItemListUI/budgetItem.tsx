import { useStatusBudgetItemStore } from "@/store/budgetItemStore";
import { BudgetItemList } from "@/types/budgetItemTypes";
import ConfirmationBudgetItem from "./confirmationOverlay";
import {
  FiCalendar,
  FiCheck,
  FiClock,
  FiFileText,
  FiTag,
  FiX,
} from "react-icons/fi";
import { AiFillMoneyCollect } from "react-icons/ai";
import ActionButtonBudgetItem from "./actionButton";
import DeleteButtonBudgetItem from "./deleteButton";
import BudgetItemHeader from "./budgetItemHeader";

const BudgetItem = ({
  item,
  refetch,
}: {
  item: BudgetItemList;
  refetch: () => void;
}) => {
  const { confirmationState } = useStatusBudgetItemStore();
  return (
    <div
      className={`relative p-6 border rounded-xl transition-all duration-200 bg-white
              ${
                item.Status === "Approved"
                  ? "border-green-100 hover:border-green-200 hover:bg-green-50/10"
                  : item.Status === "Rejected"
                  ? "border-gray-100 hover:border-gray-200 hover:bg-gray-50/10"
                  : "border-gray-100 hover:border-blue-100 hover:bg-blue-50/10"
              }`}
    >
      {/* Confirmation Overlay */}
      {confirmationState.itemId === item.ID && (
        <ConfirmationBudgetItem refetch={refetch} />
      )}

      <BudgetItemHeader item={item} />

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

      {/* Budget Item Status */}
      <div className="flex items-center justify-between">
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

        <div className="flex items-center space-x-3">
          {/* Action Buttons - Only show for pending items */}
          {item.Status === "Pending" && !confirmationState.itemId && (
            <ActionButtonBudgetItem item_ID={item.ID} />
          )}

          {/* Delete Button - Always show unless confirmation is open */}
          {!confirmationState.itemId && (
            <DeleteButtonBudgetItem item_ID={item.ID} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetItem;
