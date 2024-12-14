import { ProjectFormData } from "@/types/projectTypes";

export async function AddNewProject(
  projectData: ProjectFormData,
  categoryID: number | null
) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/project/add/${categoryID}`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unable to add new project");
    }

    return data;
  } catch (error) {
    throw error;
  }
}
