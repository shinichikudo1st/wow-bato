import { GetFeedbacks } from "@/libs/feedback";
import { FeedbackListResponse } from "@/types/feedbackTypes";
import { useQuery } from "@tanstack/react-query";

export const useFeedbacks = (
  projectID: number | null
): FeedbackListResponse => {
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
    : "";

  return {
    feedbacks: data?.feedbacks,
    refetch,
    isLoading,
    error,
  };
};
