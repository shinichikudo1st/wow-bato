export interface replyData {
  feedback_reply: string;
}

export async function SubmitFeedbackReply(
  feedbackID: number | null,
  content: replyData
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
        body: JSON.stringify(content),
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

export async function GetFeedbackReply(feedbackID: number | null) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/feedbackReply/get/${feedbackID}`,
      {
        credentials: "include",
        method: "GET",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch replies");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function DeleteFeedbackReply(feedbackID: number | null) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/feedbackReply/delete/${feedbackID}`,
      {
        credentials: "include",
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to delete reply");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function EditFeedbackReply(replyID: number | null, content: string, userID: number | null) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/feedbackReply/edit/${replyID}`,
      {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, userID }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to edit reply");
    }

    return data;
  } catch (error) {
    throw error;
  }
}
