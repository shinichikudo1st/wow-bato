import { AddBudgetCategoryFormData } from "@/types/budgetCategoryTypes";

export async function addBudgetCategory(formData: AddBudgetCategoryFormData) {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/budgetCategory/add",
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to add Budget Category");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getBarangayBudgetCategory(
  barangayID: number | null,
  page: number
) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/budgetCategory/all/${barangayID}?page=${page}&limit=${5}`,
      {
        credentials: "include",
        method: "GET",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch Budget Categories");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getBudgetCategoryOptions(barangayID: number | number) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/budgetCategory/options/${barangayID}`,
      {
        credentials: "include",
        method: "GET",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch category options");
    }

    return data;
  } catch (error) {
    throw error;
  }
}
