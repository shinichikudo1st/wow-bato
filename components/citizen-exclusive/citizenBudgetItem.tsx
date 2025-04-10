import { BudgetItemList } from "@/types/budgetItemTypes";
import ConfirmationBudgetItem from "../features/budgetItemListUI/confirmationOverlay";
import BudgetItemHeader from "../features/budgetItemListUI/budgetItemContent/budgetItemHeader";
import BudgetMoney from "../features/budgetItemListUI/budgetItemContent/budgetMoney";
import BudgetItemDescription from "../features/budgetItemListUI/budgetItemContent/budgetDescription";
import BudgetItemStatus from "../features/budgetItemListUI/budgetItemContent/budgetItemStatus";
import { useStatusBudgetItemStore } from "@/store/budgetItemStore";

const CitizenBudgetItem = ({
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

      <BudgetMoney item={item} />

      <BudgetItemDescription item={item} />

      <div className="flex items-center justify-between">
        <BudgetItemStatus item={item} />
      </div>
    </div>
  );
};

export default CitizenBudgetItem;
