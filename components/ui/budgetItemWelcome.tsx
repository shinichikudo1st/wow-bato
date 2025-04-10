import { UseViewSingleProject } from "@/hooks/projectHooks";

const BudgetItemWelcome = ({ projectID }: { projectID: number }) => {
  const { project } = UseViewSingleProject(projectID);

  return (
    <div className="bg-white p-8 shadow-lg rounded-2xl border border-gray-100 backdrop-blur-xl bg-opacity-80 hover:shadow-xl transition-all duration-300">
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          Project Details
        </h2>
        <h1 className="text-4xl font-extrabold text-blue-600 mt-2 mb-1">
          {project?.name}
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">Start Date</p>
          <p className="text-lg font-semibold text-gray-900">
            {project?.startDate
              ? new Date(project.startDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Not set"}
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">
            Estimated End Date
          </p>
          <p className="text-lg font-semibold text-gray-900">
            {project?.endDate
              ? new Date(project.endDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Not set"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BudgetItemWelcome;
