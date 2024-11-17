import { AddBarangayFormData } from "@/types/barangayTypes";

export async function addBarangay(formData: AddBarangayFormData) {
  try {
    const response = await fetch("http://localhost:8080/api/v1/barangay/add", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to add barangay");
    }

    return data;
  } catch (error) {
    throw error;
  }
}
