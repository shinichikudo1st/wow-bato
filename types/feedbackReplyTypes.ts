export interface FeedbackReply {
  ID: number | null;
  Content: string;
  FeedbackID: number | null;
  UserID: number | null;
}

export interface ReplyReturn {
  feedbackReplies: FeedbackReply[] | null;
  GetFeedbackReplyData: () => Promise<void>;
  error: string;
  isLoading: boolean;
}
