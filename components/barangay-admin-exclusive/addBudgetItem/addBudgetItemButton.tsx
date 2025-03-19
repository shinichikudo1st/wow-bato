import { FiAlertCircle, FiCheck } from "react-icons/fi";

const AddBudgetItemButton = ({ isPending }: { isPending: boolean }) => {
  return (
    <div className="flex justify-end space-x-4">
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center px-6 py-3 border border-transparent 
              text-base font-medium rounded-md shadow-sm text-white 
              bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-blue-500 transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <FiAlertCircle className="mr-2 h-5 w-5 animate-spin" />
            Adding...
          </>
        ) : (
          <>
            <FiCheck className="mr-2 h-5 w-5" />
            Add Item
          </>
        )}
      </button>
    </div>
  );
};

export default AddBudgetItemButton;
