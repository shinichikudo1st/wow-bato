import { FiCalendar, FiDollarSign, FiTrendingUp } from "react-icons/fi";

const ProjectAdditionalDetails = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="flex items-center space-x-2">
        <FiDollarSign className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-600">₱100,000</span>
      </div>
      <div className="flex items-center space-x-2">
        <FiCalendar className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-600">
          {new Date(startDate).toLocaleDateString()} -{" "}
          {new Date(endDate).toLocaleDateString()}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <FiTrendingUp className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-600">60% Complete</span>
      </div>
    </div>
  );
};

export default ProjectAdditionalDetails;
