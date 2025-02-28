import { GetAllProject, GetSingleProject } from "@/libs/project";
import {
  ProjectListResponse,
  ViewReturnProjectList,
  ViewReturnSingleProject,
} from "@/types/projectTypes";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const UseViewProjectList = (
  categoryID: number | null,
  page: number
): ViewReturnProjectList => {
  const {
    data,
    isLoading,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: ["projectLists", categoryID, page],
    queryFn: () => (categoryID ? GetAllProject(categoryID, page) : null),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!categoryID,
  });

  const error = queryError
    ? queryError instanceof Error
      ? queryError.message
      : "Unknown error occured"
    : null;

  const categoryInfo = data?.category || { name: "", description: "" };
  const projectList = data?.projects || [];

  return {
    categoryInfo,
    projectList,
    error,
    isLoading,
    refetch,
  };
};

export const UseViewSingleProject = (
  projectID: number
): ViewReturnSingleProject => {
  const [project, setProject] = useState<ProjectListResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setIsLoading] = useState(false);

  const fetchProject = async () => {
    if (!projectID) return;

    setIsLoading(true);

    try {
      const result = await GetSingleProject(projectID);

      setProject(result.data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unknown error occured"
      );
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  return {
    project,
    error,
    loading,
  };
};
