import { GetFeedbacks } from "@/libs/feedback";
import { FeedbackListItem, FeedbackListResponse } from "@/types/feedbackTypes";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useFeedbacks = (
  projectID: number | null
): FeedbackListResponse => {
  const [feedbacks, setFeedbacks] = useState<FeedbackListItem[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const GetFeedbacksData = async () => {
    try {
      setIsLoading(true);
      if (!projectID) return;

      const result = await GetFeedbacks(projectID);
      setFeedbacks(result.feedbacks);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unknown error occured"
      );
    }
  };

  useEffect(() => {
    GetFeedbacksData();
  }, [projectID]);

  return { feedbacks, GetFeedbacksData, isLoading, error };
};

export const useFeedbackss = (projectID: number | null) => {
  const {
    data,
    refetch,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["feedbacks", projectID],
    queryFn: () => (projectID ? GetFeedbacks(projectID) : null),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!projectID,
  });

  const error = queryError
    ? queryError
      ? queryError.message
      : "Unknown error occured"
    : null;

  return {
    feedbacks: data?.feedbacks,
    refetch,
    isLoading,
    error,
  };
};
