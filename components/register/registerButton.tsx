import { FiArrowRight } from "react-icons/fi";

const RegisterFormButton = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="mt-6">
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full flex justify-center items-center px-4 py-3 
                          text-sm font-medium rounded-xl text-white 
                          bg-gradient-to-r from-blue-600 to-blue-500 
                          hover:from-blue-700 hover:to-blue-600 
                          transition-all duration-300 
                          shadow-sm hover:shadow-md
                          transform hover:-translate-y-0.5
                          disabled:opacity-50 disabled:cursor-not-allowed
                          disabled:hover:transform-none`}
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Creating account...
          </div>
        ) : (
          <>
            Create Account
            <FiArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </button>
    </div>
  );
};

export default RegisterFormButton;
