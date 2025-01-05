import {
  DeleteFeedback,
  SubmitFeedback,
  UpdateFeedback,
} from "@/libs/feedback";
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

  const submitReply = async (feedbackId: number) => {
    // TODO: Implement reply submission logic
    console.log("Submitting reply to feedback:", feedbackId, replyContent);
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
      <div className="w-full bg-white rounded-lg border p-1 md:p-3">
        <h3 className="font-semibold p-1">Project Discussion</h3>
        <div className="flex flex-col gap-5 m-3">
          {/* <!-- Comment Container --> */}
          <div>
            {feedbacks &&
              feedbacks.map((feedback) => (
                <div key={feedback.feedback_id}>
                  <div className="flex w-full justify-between border rounded-md mt-5 hover:border-emerald-400 transition-colors">
                    <div className="p-3 w-full">
                      <div className="flex gap-3 items-center">
                        <Image
                          src="/sawako.jpeg"
                          width={40}
                          height={40}
                          alt="User 1"
                          className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400 shadow-emerald-400"
                        />
                        <h3 className="font-bold">
                          {feedback.first_name + " " + feedback.last_name}
                          <br />
                          <span className="text-sm text-gray-400 font-bold">
                            {feedback.role.charAt(0).toUpperCase() +
                              feedback.role.slice(1).toLowerCase()}
                          </span>
                        </h3>
                      </div>
                      {editingComment === feedback.feedback_id ? (
                        <div className="mt-2">
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                            rows={2}
                          />
                          <div className="flex justify-end gap-2 mt-2">
                            <button
                              onClick={() => setEditingComment(null)}
                              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => submitEdit(feedback.feedback_id)}
                              className="px-3 py-1 text-sm bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-600 mt-2">{feedback.content}</p>
                      )}
                      {!editingComment && (
                        <button
                          onClick={() => handleReply(feedback.feedback_id)}
                          className="text-blue-500 hover:text-blue-700 transition-colors mt-2 text-sm font-medium"
                        >
                          Reply
                        </button>
                      )}
                    </div>
                    {!editingComment && (
                      <div className="relative p-3">
                        <button
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === feedback.feedback_id
                                ? null
                                : feedback.feedback_id
                            )
                          }
                          className="text-gray-500 hover:text-gray-700 transition-colors px-2 rounded-md"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
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
                          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                            <div className="py-1">
                              <button
                                onClick={() =>
                                  handleEdit(
                                    feedback.feedback_id,
                                    feedback.content
                                  )
                                }
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Edit Comment
                              </button>
                              <button
                                onClick={() =>
                                  setShowDeleteConfirm(feedback.feedback_id)
                                }
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              >
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
                      <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
                        <h3 className="text-lg font-medium mb-4">
                          Delete Comment?
                        </h3>
                        <p className="text-gray-500 mb-4">
                          Are you sure you want to delete this comment? This
                          action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => setShowDeleteConfirm(null)}
                            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleDelete(feedback.feedback_id)}
                            className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {replyingTo === feedback.feedback_id && (
                    <div className="ml-12 mt-2">
                      <div className="flex gap-2">
                        <Image
                          src="/sawako.jpeg"
                          width={32}
                          height={32}
                          alt="User reply"
                          className="object-cover w-8 h-8 rounded-full border-2 border-emerald-400"
                        />
                        <div className="flex-1">
                          <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Write a reply..."
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                            rows={2}
                          />
                          <div className="flex justify-end gap-2 mt-2">
                            <button
                              onClick={() => setReplyingTo(null)}
                              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => submitReply(feedback.feedback_id)}
                              className="px-3 py-1 text-sm bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
                            >
                              Submit Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            {/* <!-- Reply Container  --> */}
            <div className="text-gray-300 font-bold pl-14">|</div>
            <div className="flex justify-between border ml-5  rounded-md">
              <div className="p-3">
                <div className="flex gap-3 items-center">
                  <Image
                    src="/sawako.jpeg"
                    width={40}
                    height={40}
                    alt="User 2 reply"
                    className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400"
                  />
                  <h3 className="font-bold">
                    User 2
                    <br />
                    <span className="text-sm text-gray-400 font-normal">
                      Level 1
                    </span>
                  </h3>
                </div>
                <p className="text-gray-600 mt-2">this is sample commnent</p>
              </div>

              <div className="flex flex-col gap-3 pr-3 py-3">
                <div>
                  <svg
                    className="w-6 h-6 text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 15.75l7.5-7.5 7.5 7.5"
                    />
                  </svg>
                </div>
                <div>
                  <svg
                    className="w-6 h-6 text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {/* <!-- END Reply Container  --> */}
          </div>
          {/* <!-- END Comment Container  --> */}

          <div className="flex w-full justify-between border rounded-md">
            <div className="p-3">
              <div className="flex gap-3 items-center">
                <Image
                  src="/sawako.jpeg"
                  width={40}
                  height={40}
                  alt="User 4"
                  className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400"
                />

                <h3 className="font-bold">
                  User 4
                  <br />
                  <span className="text-sm text-gray-400 font-normal">
                    Level 1
                  </span>
                </h3>
              </div>
              <p className="text-gray-600 mt-2">this is sample commnent</p>
              <button className="text-right text-blue-500">Reply</button>
            </div>

            <div className="flex flex-col gap-3 p-3">
              <div>
                <svg
                  className="w-6 h-6 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
              </div>
              <div>
                <svg
                  className="w-6 h-6 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={submitFeedback}>
          <div className="w-full px-3 mb-2 mt-6">
            <textarea
              className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
              name="content"
              placeholder="Comment"
              value={formData.content}
              onChange={(e) => {
                setFormData({ ...formData, content: e.target.value });
              }}
              required
            ></textarea>
          </div>

          <div className="w-full flex justify-end px-3 my-3">
            <button
              type="submit"
              className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500 cursor-pointer"
            >
              Post Comment
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CitizenCommentFeedback;
