import { FeedbackReply } from "@/types/feedbackReplyTypes";
import { FeedbackListItem } from "@/types/feedbackTypes";
import { create } from "zustand";

type FeedbackStore = {
  activeDropdown: number | null;
  replyingTo: number | null;
  editingComment: number | null;
  editContent: string;
  showDeleteConfirm: number | null;
  replies: FeedbackReply[];
  activeFeedbackReplies: number | null;
  editingReplyFeedbackID: number | null;
  deleteConfirmationReply: FeedbackReply | null;

  setActiveDropdown: (feedbackID: number | null) => void;
  setReplyingTo: (feedbackID: number | null) => void;
  setEditingComment: (feedbackID: number | null) => void;
  setEditContent: (content: string) => void;
  setShowDeleteConfirm: (feedbackID: number | null) => void;
  setReplies: (replies: FeedbackReply[]) => void;
  setActiveFeedbackReplies: (feedbackID: number | null) => void;
  setEditingReplyFeedbackID: (feedbackID: number | null) => void;
  setDeleteConfirmationReply: (reply: FeedbackReply | null) => void;
};

type FeedbackQueryStore = {
  feedbacks: FeedbackListItem[] | null;
  refetch: () => void;
  error: string | "";
  isLoading: boolean;

  setFeedbackQueryData: (data: {
    feedbacks: FeedbackListItem[] | null;
    refetch: () => void;
    error: string | "";
    isLoading: boolean;
  }) => void;
};

export const useFeedbackStore = create<FeedbackStore>((set) => ({
  activeDropdown: null,
  replyingTo: null,
  editingComment: null,
  editContent: "",
  showDeleteConfirm: null,
  replies: [],
  activeFeedbackReplies: null,
  editingReplyFeedbackID: null,
  deleteConfirmationReply: null,

  setActiveDropdown: (feedbackID) =>
    set(() => ({ activeDropdown: feedbackID })),
  setReplyingTo: (feedbackID) => set(() => ({ replyingTo: feedbackID })),
  setEditingComment: (feedbackID) =>
    set(() => ({ editingComment: feedbackID })),
  setEditContent: (content) => set(() => ({ editContent: content })),
  setShowDeleteConfirm: (feedbackID) =>
    set(() => ({ showDeleteConfirm: feedbackID })),
  setReplies: (replies) => set(() => ({ replies })),
  setActiveFeedbackReplies: (feedbackID) =>
    set(() => ({ activeFeedbackReplies: feedbackID })),
  setEditingReplyFeedbackID: (feedbackID) =>
    set(() => ({ editingReplyFeedbackID: feedbackID })),
  setDeleteConfirmationReply: (reply) =>
    set(() => ({ deleteConfirmationReply: reply })),
}));

export const useFeedbackQueryStore = create<FeedbackQueryStore>((set) => ({
  feedbacks: [],
  refetch: () => {},
  isLoading: false,
  error: "",

  setFeedbackQueryData: ({ feedbacks, refetch, isLoading, error }) =>
    set({ feedbacks, refetch, isLoading, error }),
}));
