import { GetAllProject } from "@/libs/project";
import { ProjectListResponse } from "@/types/projectTypes";
import { useState } from "react";

export const UseViewProjectList = (categoryID: number | null) => {
  const [projectList, setProjectList] = useState<ProjectListResponse[]>([]);

  const fetchProjectList = async () => {
    if (!categoryID) return;

    try {
      const result = await GetAllProject(categoryID);
    } catch (error) {}
  };
};
