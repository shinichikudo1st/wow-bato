import { NewItemData } from "@/types/budgetItemTypes";

export async function AddNewItem(projectID: number | null, itemData: NewItemData) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/budgetItem/add/${projectID}`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to add new item");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function GetBudgetItemsByProjectID(projectID: number | null, filter: string) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/budgetItem/getByProject/${projectID}?filter=${filter}`,
      {
        credentials: "include",
        method: "GET",
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to retrieve budget items");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

