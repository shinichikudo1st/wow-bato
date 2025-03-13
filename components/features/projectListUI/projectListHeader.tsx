import { FiFolder } from "react-icons/fi";

const ProjectListHeader = ({
  status,
  name,
}: {
  name: string;
  status: string;
}) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-200">
        <FiFolder className="w-5 h-5 text-blue-600" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
          {name}
        </h3>
        <p className="text-sm text-gray-500">{status}</p>
      </div>
    </div>
  );
};

export default ProjectListHeader;
