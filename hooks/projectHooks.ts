import { GetAllProject, GetSingleProject } from "@/libs/project";
import {
  ViewReturnProjectList,
  ViewReturnSingleProject,
} from "@/types/projectTypes";
import { useQuery } from "@tanstack/react-query";

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
  const {
    data,
    error: queryError,
    isLoading,
  } = useQuery({
    queryKey: ["project"],
    queryFn: () => (projectID ? GetSingleProject(projectID) : null),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  const error = queryError
    ? queryError instanceof Error
      ? queryError.message
      : "Unknown error occured"
    : "";

  const project = data?.data;

  return {
    project,
    error,
    loading: isLoading,
  };
};
