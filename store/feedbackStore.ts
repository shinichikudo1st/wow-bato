import { FeedbackReply } from "@/types/feedbackReplyTypes";
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
