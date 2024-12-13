import { ProjectFormData } from "@/types/projectTypes";

export async function AddNewProject(projectData: ProjectFormData) {
  try {
    const response = await fetch(``, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unable to add new project");
    }

    return data;
  } catch (error) {
    throw error;
  }
}
