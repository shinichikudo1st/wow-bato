import { useStatusBudgetItemStore } from "@/store/budgetItemStore";
import { FiTrash2 } from "react-icons/fi";

const DeleteButtonBudgetItem = ({ item_ID }: { item_ID: number }) => {
  const { setConfirmationState } = useStatusBudgetItemStore();

  return (
    <button
      onClick={() =>
        setConfirmationState({
          itemId: item_ID,
          action: "delete",
        })
      }
      className="inline-flex items-center justify-center h-10 w-10 text-sm font-medium
                          text-red-600 hover:bg-red-50
                          rounded-lg transition-all duration-200
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      title="Delete Item"
    >
      <FiTrash2 className="w-5 h-5" />
    </button>
  );
};

export default DeleteButtonBudgetItem;
