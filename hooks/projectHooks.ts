import { GetAllProject } from "@/libs/project";
import {
  ProjectListResponse,
  ViewReturnProjectList,
} from "@/types/projectTypes";
import { useEffect, useState } from "react";

export const UseViewProjectList = (
  categoryID: number | null,
  page: number
): ViewReturnProjectList => {
  const [projectList, setProjectList] = useState<ProjectListResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setIsLoading] = useState(false);

  const fetchProjectList = async () => {
    if (!categoryID) return;

    setIsLoading(true);

    try {
      const result = await GetAllProject(categoryID, page);

      setProjectList(result.projects);
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
    projectList,
    error,
    loading,
    fetchProjectList,
  };
};
