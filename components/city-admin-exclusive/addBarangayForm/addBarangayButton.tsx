import { FiCheck, FiLoader } from "react-icons/fi";

const AddBarangayButton = ({ isPending }: { isPending: boolean }) => {
  return (
    <button
      type="submit"
      disabled={isPending}
      className="w-full px-4 py-2 text-white font-medium rounded-lg
                    bg-gradient-to-r from-blue-600 to-blue-500 
                    hover:from-blue-700 hover:to-blue-600 
                    transition-all duration-300 
                    shadow-sm hover:shadow-md
                    transform hover:-translate-y-0.5
                    disabled:opacity-50 disabled:cursor-not-allowed
                    flex items-center justify-center space-x-2"
    >
      {isPending ? (
        <>
          <FiLoader className="w-5 h-5 animate-spin" />
          <span>Adding Barangay...</span>
        </>
      ) : (
        <>
          <FiCheck className="w-5 h-5" />
          <span>Add Barangay</span>
        </>
      )}
    </button>
  );
};

export default AddBarangayButton;
