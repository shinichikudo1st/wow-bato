import { GetFeedbackReply } from "@/libs/feedbackReply";
import { FeedbackReply, ReplyReturn } from "@/types/feedbackReplyTypes";
import { useState } from "react";

export const useFeedbackReply = (feedbackID: number | null): ReplyReturn => {
  const [feedbackReplies, setFeedbackReplies] = useState<FeedbackReply[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const GetFeedbackReplyData = async () => {
    try {
      if (!feedbackID) return;
      setIsLoading(true);

      const result = await GetFeedbackReply(feedbackID);

      setFeedbackReplies(result.data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unknown Error Occured"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    feedbackReplies,
    GetFeedbackReplyData,
    isLoading,
    error,
  };
};
