export async function SubmitFeedbackReply(
  feedbackID: number | null,
  content: string
) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/feedbackReply/create/${feedbackID}`,
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
      throw new Error(data.error || "Failed to submit reply");
    }

    return data;
  } catch (error) {
    throw error;
  }
}
