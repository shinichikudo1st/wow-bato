import { FiAlertCircle, FiX } from "react-icons/fi";

const ErrorMessage = ({
  error,
  setError,
}: {
  error: string;
  setError: (error: string | null) => void;
}) => {
  return (
    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-start">
        <FiAlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <p className="text-sm text-red-700 mt-1">{error}</p>
        </div>
        <button onClick={() => setError(null)} className="ml-auto mt-0.5">
          <FiX className="w-5 h-5 text-red-500 hover:text-red-700" />
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
