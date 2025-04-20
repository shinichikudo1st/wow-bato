import { FiCheck, FiTrendingUp } from "react-icons/fi";

const AddCategoryButton = ({ isPending }: { isPending: boolean }) => {
  return (
    <button
      type="submit"
      disabled={isPending}
      className={`w-full px-6 py-3 text-white font-medium rounded-xl
                    ${
                      isPending
                        ? "bg-blue-400 cursor-not-allowed opacity-75"
                        : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                    }
                    transition-all duration-300 
                    shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.1)]
                    hover:shadow-[0_1px_3px_rgba(0,0,0,0.12),0_8px_24px_rgba(0,0,0,0.12)]
                    transform hover:-translate-y-0.5
                    flex items-center justify-center space-x-2
                    relative overflow-hidden group`}
    >
      <div className="relative flex items-center gap-2">
        {isPending ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Creating Category...</span>
          </>
        ) : (
          <>
            <FiCheck className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
            <span className="relative">
              Create Category
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white/20 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </span>
            <FiTrendingUp className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </div>

      <div
        className={`absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                    transform -translate-x-full transition-transform duration-700 
                    ${!isPending && "group-hover:translate-x-full"}`}
      />
    </button>
  );
};

export default AddCategoryButton;
