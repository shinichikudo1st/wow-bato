import { FiTrash2 } from "react-icons/fi";

const DeleteButtonBudgetItem = ({
  setConfirmationState,
  item_ID,
}: {
  setConfirmationState: (state: {
    itemId: number | null;
    action: "approve" | "reject" | "delete" | null;
  }) => void;
  item_ID: number;
}) => {
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
