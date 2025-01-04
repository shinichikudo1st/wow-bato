export async function GetFeedbacks(projectID: number) {
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

export async function SubmitFeedback(
  projectID: number | null,
  content: string
) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/feedback/create/${projectID}`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to submit feedback");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function DeleteFeedback(feedbackID: number) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/feedback/delete/${feedbackID}`,
      {
        credentials: "include",
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to delete feedback");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function UpdateFeedback(content: string, feedbackID: number) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/feedback/update/${feedbackID}`,
      {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to update feedback");
    }

    return data;
  } catch (error) {
    throw error;
  }
}
