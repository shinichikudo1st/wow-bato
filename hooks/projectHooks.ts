import { GetAllProject, GetSingleProject } from "@/libs/project";
import {
  DisplayCategory,
  ProjectListResponse,
  ViewReturnProjectList,
  ViewReturnSingleProject,
} from "@/types/projectTypes";
import { useEffect, useState } from "react";

export const UseViewProjectList = (
  categoryID: number | null,
  page: number
): ViewReturnProjectList => {
  const [projectList, setProjectList] = useState<ProjectListResponse[]>([]);
  const [categoryInfo, setCategoryInfo] = useState<DisplayCategory>({
    name: "",
    description: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setIsLoading] = useState(false);

  const fetchProjectList = async () => {
    if (!categoryID) return;

    setIsLoading(true);

    try {
      const result = await GetAllProject(categoryID, page);

      setProjectList(result.projects);
      setCategoryInfo(result.category);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectList();
  }, [categoryID, page]);

  return {
    categoryInfo,
    projectList,
    error,
    loading,
    fetchProjectList,
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
