import { useRouter } from "next/navigation";
import { FiDollarSign, FiEye } from "react-icons/fi";

const ProjectViewButton = ({
  projectID,
  userRole,
  categoryID,
  setActiveProject,
}: {
  projectID: number;
  userRole: string | null;
  categoryID: number | null;
  setActiveProject: ((projectID: number) => void) | undefined;
}) => {
  const router = useRouter();

  const showBudgetItems = (projectID: number) => {
    if (userRole === "citizen") {
      router.push(`/home/citizen/projects/${projectID}`);
    } else if (userRole === "barangay admin") {
      router.push(`/home/barangay-admin/projects/${projectID}`);
    } else {
      router.push(`/home/city-admin/projects/${projectID}`);
    }
  };

  const viewDetails = (projectID: number) => {
    if (userRole === "citizen") {
      setActiveProject?.(projectID);
    } else if (userRole === "barangay admin") {
      router.push(`/home/barangay-admin/${categoryID}/${projectID}`);
    } else {
      return;
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <button
        onClick={() => viewDetails(projectID)}
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600
                              bg-transparent hover:bg-blue-50 rounded-lg transition-colors duration-200
                              opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
      >
        <FiEye className="w-4 h-4 mr-1.5" />
        View Details
      </button>
      <button
        onClick={() => showBudgetItems(projectID)}
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-emerald-600
                              bg-transparent hover:bg-emerald-50 rounded-lg transition-colors duration-200
                              opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
      >
        <FiDollarSign className="w-4 h-4 mr-1.5" />
        View Budget Items
      </button>
    </div>
  );
};

export default ProjectViewButton;
