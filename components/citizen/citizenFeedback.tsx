import { UpdateFeedback } from "@/libs/feedback";
import { GetFeedbackReply } from "@/libs/feedbackReply";
import { FeedbackReply } from "@/types/feedbackReplyTypes";
import { FeedbackListItem } from "@/types/feedbackTypes";
import Image from "next/image";
import { useState } from "react";
import ReplySection from "../citizenFeedback/replySection";
import RepliesSection from "../citizenFeedback/repliesSection";
import DeleteReplyModal from "../citizenFeedback/deleteReply";
import DeleteFeedbackModal from "../citizenFeedback/deleteFeedback";
import FeedbackBox from "../citizenFeedback/feedbackBox";
import NoProjectSelected from "../citizenFeedback/notSelected";
import FeedbackDropdown from "../citizenFeedback/feedbackDropdown";

const CitizenCommentFeedback = ({
  userID,
  projectID,
  feedbacks,
  GetFeedbacksData,
  isLoading,
  error,
}: {
  userID: number | null;
  projectID: number | null;
  feedbacks: FeedbackListItem[] | null;
  GetFeedbacksData: () => void;
  isLoading: boolean;
  error: string;
}) => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(
    null
  );

  const [replies, setReplies] = useState<FeedbackReply[]>([]);
  const [activeFeedbackReplies, setActiveFeedbackReplies] = useState<
    number | null
  >(null);
  const [editingReplyFeedbackID, setEditingReplyFeedbackID] = useState<
    number | null
  >(null);
  const [deleteConfirmationReply, setDeleteConfirmationReply] =
    useState<FeedbackReply | null>(null);

  const getReplies = async (feedbackId: number) => {
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
  };

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

  const handleReply = (feedbackId: number) => {
    if (replyingTo === feedbackId) {
      setReplyingTo(null);
    } else {
      setReplyingTo(feedbackId);
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

  if (!projectID) {
    return <NoProjectSelected />;
  }

  return (
    <>
      <div className="w-full bg-white rounded-lg border p-4 md:p-6 relative min-h-[500px]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Project Discussion
          </h3>
          <div className="text-sm text-gray-500">
            {feedbacks?.length || 0} comments
          </div>
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
                          {feedback.role.charAt(0).toUpperCase() +
                            feedback.role.slice(1).toLowerCase()}
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
                        <p className="text-gray-700 mt-3 leading-relaxed">
                          {feedback.content}
                        </p>
                        <div className="mt-4 flex items-center space-x-4">
                          <button
                            onClick={() => handleReply(feedback.feedback_id)}
                            className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700"
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                              />
                            </svg>
                            Reply
                          </button>
                          <button
                            onClick={() =>
                              handleShowReplies(feedback.feedback_id)
                            }
                            className="text-gray-600 hover:text-gray-700 text-sm font-medium flex items-center space-x-1"
                          >
                            <span>
                              {activeFeedbackReplies === feedback.feedback_id
                                ? "Hide"
                                : "Show"}{" "}
                              Replies
                            </span>
                            {activeFeedbackReplies === feedback.feedback_id &&
                              replies.length > 0 && (
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
                      {feedback.user_id === userID && (
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
                      )}
                      {activeDropdown === feedback.feedback_id && (
                        <FeedbackDropdown
                          feedback_id={feedback.feedback_id}
                          content={feedback.content}
                          handleEdit={handleEdit}
                          setShowDeleteConfirm={setShowDeleteConfirm}
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm === feedback.feedback_id && (
                  <DeleteFeedbackModal
                    feedback_id={feedback.feedback_id}
                    setShowDeleteConfirm={setShowDeleteConfirm}
                    GetFeedbacksData={GetFeedbacksData}
                  />
                )}

                {/* Reply Section */}
                {replyingTo === feedback.feedback_id && (
                  <ReplySection
                    setReplyingTo={setReplyingTo}
                    GetFeedbacksData={GetFeedbacksData}
                    feedbackID={feedback.feedback_id}
                  />
                )}

                {/* Replies Section */}
                {activeFeedbackReplies === feedback.feedback_id && (
                  <RepliesSection
                    replies={replies}
                    editingReplyFeedbackID={editingReplyFeedbackID}
                    setEditingReplyFeedbackID={setEditingReplyFeedbackID}
                    setDeleteConfirmationReply={setDeleteConfirmationReply}
                  />
                )}
              </div>
            ))}
        </div>

        {/* Delete Reply Confirmation Modal */}
        {deleteConfirmationReply && (
          <DeleteReplyModal
            deleteConfirmationReply={deleteConfirmationReply}
            setDeleteConfirmationReply={setDeleteConfirmationReply}
          />
        )}
      </div>

      {/* Floating Comment Box */}
      <FeedbackBox projectID={projectID} GetFeedbacksData={GetFeedbacksData} />
    </>
  );
};

export default CitizenCommentFeedback;
