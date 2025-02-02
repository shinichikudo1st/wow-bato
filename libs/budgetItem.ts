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

export async function GetBudgetItems(projectID: number | null, filter: string, page: number) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/budgetItem/all/${projectID}?filter=${filter}&page=${page}`,
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

export async function UpdateItemStatus(itemID: number | null, status: string | null) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/budgetItem/update-status/${itemID}`,
      {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Failed to ${status} status`); // Approve or Reject
    }

    return data;
  } catch (error) {
    throw error;
  }
}

