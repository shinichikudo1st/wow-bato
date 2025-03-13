import { FiMapPin } from "react-icons/fi";

const NoProjectsFound = () => {
  return (
    <div className="text-center py-12 px-4 rounded-xl border-2 border-dashed border-gray-200">
      <FiMapPin className="w-8 h-8 text-gray-400 mx-auto mb-3" />
      <h3 className="text-lg font-medium text-gray-900 mb-1">
        No Projects Found
      </h3>
      <p className="text-sm text-gray-500">
        There are no projects to display at the moment.
      </p>
    </div>
  );
};

export default NoProjectsFound;
