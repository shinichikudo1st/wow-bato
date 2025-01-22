import {
  DeleteFeedback,
  SubmitFeedback,
  UpdateFeedback,
} from "@/libs/feedback";
import { GetFeedbackReply, SubmitFeedbackReply } from "@/libs/feedbackReply";
import { FeedbackReply } from "@/types/feedbackReplyTypes";
import { FeedbackListItem } from "@/types/feedbackTypes";
import Image from "next/image";
import { useState } from "react";

const CitizenCommentFeedback = ({
  projectID,
  feedbacks,
  GetFeedbacksData,
  isLoading,
  error,
}: {
  projectID: number | null;
  feedbacks: FeedbackListItem[] | null;
  GetFeedbacksData: () => void;
  isLoading: boolean;
  error: string;
}) => {
  interface FeedbackForm {
    content: string;
  }

  const [formData, setFormData] = useState<FeedbackForm>({
    content: "",
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState<string>("");
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(
    null
  );
  const [deleteError, setDeleteError] = useState<string>("");
  const [replies, setReplies] = useState<FeedbackReply[]>([]);
  const [activeFeedbackReplies, setActiveFeedbackReplies] = useState<number | null>(null);

  const getReplies = async(feedbackId: number) => {
    try {
      const result = await GetFeedbackReply(feedbackId);

      console.log(result.data);

      if (result && result.data) {
        setReplies(result.data);
      } else {
        setReplies([]);
      }
    } catch (error) {
      console.log(
        error instanceof Error ? error.message : "Unknown error occured"
      );
      setReplies([]);
    }
  }

  const handleShowReplies = async (feedbackId: number) => {
    if (activeFeedbackReplies === feedbackId) {
      // If clicking on the same feedback, close it
      setActiveFeedbackReplies(null);
      setReplies([]);
    } else {
      // If clicking on a different feedback, close the previous one and open the new one
      setActiveFeedbackReplies(feedbackId);
      setReplies([]); // Clear existing replies before loading new ones
      await getReplies(feedbackId);
    }
  };

  const submitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectID) return;

    try {
      setSubmitting(true);
      const result = await SubmitFeedback(projectID, formData.content);
      console.log(result.message);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setSubmitting(false);
    } finally {
      setSubmitting(false);
      setFormData({ content: "" });
      GetFeedbacksData();
    }
  };

  const handleReply = (feedbackId: number) => {
    if (replyingTo === feedbackId) {
      setReplyingTo(null);
      setReplyContent("");
    } else {
      setReplyingTo(feedbackId);
      setReplyContent("");
    }
    setActiveDropdown(null);
  };

  const handleEdit = (feedbackId: number, content: string) => {
    setEditingComment(feedbackId);
    setEditContent(content);
    setActiveDropdown(null);
  };

  const submitEdit = async (feedbackId: number) => {
    try {
      const response = await UpdateFeedback(editContent, feedbackId);

      console.log(response.message);
    } catch (error) {
      console.log(
        error instanceof Error ? error.message : "Unknown error occured"
      );
    } finally {
      console.log("Editing comment:", feedbackId, editContent);
      setEditingComment(null);
      setEditContent("");
      GetFeedbacksData();
    }
  };

  const handleDelete = async (feedbackId: number) => {
    try {
      const response = await DeleteFeedback(feedbackId);

      console.log(response.message);
    } catch (error) {
      setDeleteError(
        error instanceof Error ? error.message : "Unknown error occured"
      );
    } finally {
      console.log("Deleting comment:", feedbackId);
      setShowDeleteConfirm(null);
      GetFeedbacksData();
    }
  };

  const submitReply = async (feedbackId: number | null) => {
    console.log("Submitting reply to feedback:", feedbackId, replyContent);
    try {
      const data = await SubmitFeedbackReply(feedbackId, replyContent);
      console.log(data.message);
    } catch (error) {
      console.log(
        error instanceof Error ? error.message : "Unknown Error Occured"
      );
    }
    setReplyingTo(null);
    setReplyContent("");
  };

  if (!projectID) {
    return (
      <div className="w-full bg-white rounded-lg border p-6 text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Project Selected
        </h3>
        <p className="text-sm text-gray-500">
          Please select a project to view and participate in the discussion.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full bg-white rounded-lg border p-4 md:p-6 relative min-h-[500px]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Project Discussion</h3>
          <div className="text-sm text-gray-500">{feedbacks?.length || 0} comments</div>
        </div>

        <div className="space-y-6 mb-32">
          {/* Comment Container */}
          {feedbacks &&
            feedbacks.map((feedback) => (
              <div key={feedback.feedback_id} className="animate-fadeIn">
                <div className="flex w-full justify-between bg-white border rounded-xl p-4 hover:border-emerald-400 hover:shadow-sm transition-all duration-200">
                  <div className="w-full">
                    <div className="flex gap-4 items-center">
                      <Image
                        src="/sawako.jpeg"
                        width={48}
                        height={48}
                        alt={feedback.first_name}
                        className="object-cover w-12 h-12 rounded-full border-2 border-emerald-400 shadow-sm"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {feedback.first_name + " " + feedback.last_name}
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          {feedback.role.charAt(0).toUpperCase() + feedback.role.slice(1).toLowerCase()}
                        </span>
                      </div>
                    </div>

                    {editingComment === feedback.feedback_id ? (
                      <div className="mt-4">
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none bg-gray-50"
                          rows={3}
                        />
                        <div className="flex justify-end gap-2 mt-3">
                          <button
                            onClick={() => setEditingComment(null)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => submitEdit(feedback.feedback_id)}
                            className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-700 mt-3 leading-relaxed">{feedback.content}</p>
                        <div className="mt-4 flex items-center space-x-4">
                          <button
                            onClick={() => handleReply(feedback.feedback_id)}
                            className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                            </svg>
                            Reply
                          </button>
                          <button
                            onClick={() => handleShowReplies(feedback.feedback_id)}
                            className="text-gray-600 hover:text-gray-700 text-sm font-medium flex items-center space-x-1"
                          >
                            <span>{activeFeedbackReplies === feedback.feedback_id ? 'Hide' : 'Show'} Replies</span>
                            {activeFeedbackReplies === feedback.feedback_id && replies.length > 0 && (
                              <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">
                                {replies.length}
                              </span>
                            )}
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {!editingComment && (
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === feedback.feedback_id
                              ? null
                              : feedback.feedback_id
                          )
                        }
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          />
                        </svg>
                      </button>
                      {activeDropdown === feedback.feedback_id && (
                        <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                          <div className="py-1">
                            <button
                              onClick={() =>
                                handleEdit(
                                  feedback.feedback_id,
                                  feedback.content
                                )
                              }
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                              </svg>
                              Edit Comment
                            </button>
                            <button
                              onClick={() =>
                                setShowDeleteConfirm(feedback.feedback_id)
                              }
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                            >
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                              </svg>
                              Delete Comment
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm === feedback.feedback_id && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-sm mx-4 animate-fadeIn">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-center mb-2">Delete Comment?</h3>
                      <p className="text-gray-500 text-center mb-6">
                        Are you sure you want to delete this comment? This action cannot be undone.
                      </p>
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => setShowDeleteConfirm(null)}
                          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleDelete(feedback.feedback_id)}
                          className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reply Section */}
                {replyingTo === feedback.feedback_id && (
                  <div className="ml-14 mt-4 animate-fadeIn">
                    <div className="flex gap-4">
                      <Image
                        src="/sawako.jpeg"
                        width={40}
                        height={40}
                        alt="User reply"
                        className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400"
                      />
                      <div className="flex-1">
                        <textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="Write a reply..."
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none bg-gray-50"
                          rows={3}
                        />
                        <div className="flex justify-end gap-2 mt-3">
                          <button
                            onClick={() => setReplyingTo(null)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => submitReply(feedback.feedback_id)}
                            className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors"
                          >
                            Submit Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Replies Section */}
                {activeFeedbackReplies === feedback.feedback_id && (
                  <div className="mt-4 pl-6 border-l-2 border-gray-100">
                    {replies.length > 0 ? (
                      <div className="space-y-4">
                        {replies.map((reply, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-700">{reply.Content}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              User ID: {reply.UserID}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No replies yet</p>
                    )}
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* Floating Comment Box */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-40">
          <div className="max-w-7xl mx-auto">
            <form onSubmit={submitFeedback} className="flex gap-4 items-start">
              <Image
                src="/sawako.jpeg"
                width={40}
                height={40}
                alt="Your avatar"
                className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400"
              />
              <div className="flex-1">
                <textarea
                  className="w-full p-3 bg-gray-50 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                  name="content"
                  placeholder="Write a comment..."
                  value={formData.content}
                  onChange={(e) => {
                    setFormData({ ...formData, content: e.target.value });
                  }}
                  rows={2}
                  required
                ></textarea>
                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 
                    transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Posting...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                        </svg>
                        <span>Post Comment</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CitizenCommentFeedback;
