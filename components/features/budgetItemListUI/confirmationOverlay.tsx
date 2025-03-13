import { DeleteBudgetItem, UpdateItemStatus } from "@/libs/budgetItem";
import { useStatusBudgetItemStore } from "@/store/budgetItemStore";
import { useMutation } from "@tanstack/react-query";
import { FiAlertCircle, FiCheck, FiTrash2, FiX } from "react-icons/fi";

const ConfirmationBudgetItem = ({ refetch }: { refetch: () => void }) => {
  const { confirmationState, setConfirmationState, setSuccess, setError } =
    useStatusBudgetItemStore();

  const budgetItemMutation = useMutation({
    mutationFn: async (itemID: number | null) => {
      if (confirmationState.action === "delete") {
        const result = await DeleteBudgetItem(itemID);
        return result.message;
      }

      const result = await UpdateItemStatus(
        confirmationState.itemId,
        confirmationState.action
      );
      return result.message;
    },
    onSuccess: (success) => {
      setSuccess(success);
      setConfirmationState({ itemId: null, action: null });
      refetch();
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
    },
    onError: (error) =>
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      ),
  });

  return (
    <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center justify-center space-y-4 z-10">
      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2">
        {confirmationState.action === "approve" ? (
          <div className="bg-blue-100 p-3 rounded-full">
            <FiCheck className="w-6 h-6 text-blue-600" />
          </div>
        ) : confirmationState.action === "delete" ? (
          <div className="bg-red-100 p-3 rounded-full">
            <FiTrash2 className="w-6 h-6 text-red-600" />
          </div>
        ) : (
          <div className="bg-gray-100 p-3 rounded-full">
            <FiAlertCircle className="w-6 h-6 text-gray-600" />
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-900">
        {confirmationState.action === "approve"
          ? "Approve this budget item?"
          : confirmationState.action === "delete"
          ? "Delete this budget item?"
          : "Reject this budget item?"}
      </h3>

      <p className="text-sm text-gray-500 text-center max-w-sm">
        {confirmationState.action === "approve"
          ? "This action will approve the budget item and notify relevant stakeholders."
          : confirmationState.action === "delete"
          ? "This action cannot be undone. The budget item will be permanently removed."
          : "This action will reject the budget item and notify relevant stakeholders."}
      </p>

      <div className="flex items-center space-x-3 mt-4">
        <button
          onClick={() => budgetItemMutation.mutate(confirmationState.itemId)}
          className={`inline-flex items-center px-4 py-2 text-sm font-medium
                      ${
                        confirmationState.action === "approve"
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                          : confirmationState.action === "delete"
                          ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
                          : "bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700"
                      }
                      shadow-sm hover:shadow
                      rounded-lg transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        confirmationState.action === "approve"
                          ? "focus:ring-blue-500"
                          : confirmationState.action === "delete"
                          ? "focus:ring-red-500"
                          : "focus:ring-gray-500"
                      }`}
        >
          <div
            className={`${
              confirmationState.action === "approve"
                ? "bg-blue-400/30"
                : confirmationState.action === "delete"
                ? "bg-red-400/30"
                : "bg-gray-400/30"
            } rounded-md p-1 mr-2`}
          >
            {confirmationState.action === "approve" ? (
              <FiCheck className="w-4 h-4" />
            ) : confirmationState.action === "delete" ? (
              <FiTrash2 className="w-4 h-4" />
            ) : (
              <FiX className="w-4 h-4" />
            )}
          </div>
          Confirm{" "}
          {confirmationState.action === "approve"
            ? "Approval"
            : confirmationState.action === "delete"
            ? "Delete"
            : "Rejection"}
        </button>
        <button
          onClick={() => setConfirmationState({ itemId: null, action: null })}
          className="inline-flex items-center px-4 py-2 text-sm font-medium
                      border-2 border-gray-200 bg-white text-gray-600
                      hover:bg-gray-50 hover:border-gray-300
                      shadow-sm hover:shadow
                      rounded-lg transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmationBudgetItem;
