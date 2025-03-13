import { FiRefreshCcw } from "react-icons/fi";

const ProjectListError = ({
  refetch,
  error,
}: {
  refetch: () => void;
  error: string | null;
}) => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-2xl border border-gray-100 backdrop-blur-xl bg-opacity-80">
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={refetch}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
        >
          <FiRefreshCcw className="w-4 h-4 mr-2" />
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ProjectListError;
