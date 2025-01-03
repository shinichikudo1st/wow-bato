export interface FeedbackListItem {
  feedback_id: number;
  project_id: number;
  user_id: number;
  content: string;
  role: string;
  first_name: string;
  last_name: string;
}

export interface FeedbackListResponse {
  feedbacks: FeedbackListItem[] | null;
  GetFeedbacksData: () => Promise<void>;
  error: string;
  isLoading: boolean;
}
