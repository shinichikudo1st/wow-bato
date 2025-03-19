"use client";

import { AddNewProject } from "@/libs/project";
import {
  InitialProjectFormData,
  useAddProjectStore,
} from "@/store/projectStore";
import { ProjectFormData } from "@/types/projectTypes";
import { useMutation } from "@tanstack/react-query";
import AddProjectHeader from "./addProjectForm/addProjectHeader";
import AddProjectName from "./addProjectForm/addProjectName";
import AddProjectDate from "./addProjectForm/addProjectDate";
import AddProjectDescription from "./addProjectForm/addProjectDescription";
import AddProjectButton from "./addProjectForm/addProjectButton";

export default function AddProjectForm({
  categoryID,
}: {
  categoryID: number | null;
}) {
  const { formData, setFormData, setSuccess, setError } = useAddProjectStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    projectMutation.mutate(formData);
  };

  const projectMutation = useMutation({
    mutationFn: async (data: ProjectFormData) => {
      const result = await AddNewProject(data, categoryID);
      return result.message;
    },
    onSuccess: (success) => {
      setSuccess(success);
      setFormData(InitialProjectFormData);
      setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 2000);
    },
    onError: (error) =>
      setError(
        error instanceof Error ? error.message : "Unknown error occured"
      ),
  });

  return (
    <div className="bg-white p-8 shadow-lg rounded-2xl border border-gray-100 backdrop-blur-xl bg-opacity-80 hover:shadow-xl transition-all duration-300">
      <AddProjectHeader />

      <form onSubmit={handleSubmit} className="space-y-6">
        <AddProjectName />

        <AddProjectDate />

        <AddProjectDescription />

        <AddProjectButton isPending={projectMutation.isPending} />
      </form>
    </div>
  );
}
