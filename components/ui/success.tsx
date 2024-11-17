import { FiCheck, FiX } from "react-icons/fi";

const SuccessMessage = ({
  success,
  setSuccess,
}: {
  success: string;
  setSuccess: (success: string | null) => void;
}) => {
  return (
    <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-start">
        <FiCheck className="w-5 h-5 text-green-500 mt-0.5" />
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-green-800">Success</h3>
          <p className="text-sm text-green-700 mt-1">{success}</p>
        </div>
        <button onClick={() => setSuccess(null)} className="ml-auto mt-0.5">
          <FiX className="w-5 h-5 text-green-500 hover:text-green-700" />
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
