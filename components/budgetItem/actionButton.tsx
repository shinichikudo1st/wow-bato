import { useStatusBudgetItemStore } from "@/store/budgetItemStore";
import { FiCheck, FiX } from "react-icons/fi";

const ActionButtonBudgetItem = ({ item_ID }: { item_ID: number }) => {
  const { setConfirmationState } = useStatusBudgetItemStore();

  return (
    <>
      <button
        onClick={() =>
          setConfirmationState({
            itemId: item_ID,
            action: "approve",
          })
        }
        className="inline-flex items-center h-10 px-4 text-sm font-medium
                                bg-gradient-to-r from-blue-500 to-blue-600 text-white
                                hover:from-blue-600 hover:to-blue-700
                                shadow-sm hover:shadow whitespace-nowrap
                                rounded-lg transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <div className="bg-blue-400/30 rounded-md p-1.5 mr-2">
          <FiCheck className="w-4 h-4" />
        </div>
        Approve
      </button>
      <button
        onClick={() =>
          setConfirmationState({
            itemId: item_ID,
            action: "reject",
          })
        }
        className="inline-flex items-center h-10 px-4 text-sm font-medium
                                border-2 border-gray-200 bg-white text-gray-600
                                hover:bg-gray-50 hover:border-gray-300
                                shadow-sm hover:shadow whitespace-nowrap
                                rounded-lg transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <div className="bg-gray-100 rounded-md p-1.5 mr-2">
          <FiX className="w-4 h-4" />
        </div>
        Reject
      </button>
    </>
  );
};

export default ActionButtonBudgetItem;
