export async function GetFeedbacks(projectID: string) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/feedback/all/${projectID}`,
      {
        credentials: "include",
        method: "GET",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch Feedbacks");
    }

    return data;
  } catch (error) {
    throw error;
  }
}
