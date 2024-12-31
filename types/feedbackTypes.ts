export interface FeedbackListItem {
  id: number;
  project_id: number;
  user_id: number;
  content: string;
  role: string;
}

export interface FeedbackListResponse {
  feedbacks: FeedbackListItem[] | null;
  GetFeedbacksData: () => Promise<void>;
  error: string;
  isLoading: boolean;
}
