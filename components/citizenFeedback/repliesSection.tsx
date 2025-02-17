import { FeedbackReply } from "@/types/feedbackReplyTypes";
import { useState } from "react";

const RepliesSection = ({
  replies,
  editingReplyFeedbackID,
  setEditingReplyFeedbackID,
  setDeleteConfirmationReply,
}: {
  replies: FeedbackReply[];
  editingReplyFeedbackID: number | null;
  setEditingReplyFeedbackID: (FeedbackID: number | null) => void;
  setDeleteConfirmationReply: (reply: FeedbackReply | null) => void;
}) => {
  const [editReplyContent, setEditReplyContent] = useState<string>("");

  return (
    <div className="mt-4 pl-6 border-l-2 border-gray-100">
      {replies.length > 0 ? (
        <div className="space-y-4">
          {replies.map((reply, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-lg relative group"
            >
              {editingReplyFeedbackID === reply.FeedbackID ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editReplyContent}
                    onChange={(e) => setEditReplyContent(e.target.value)}
                    className="w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Edit your reply"
                  />
                  <div className="flex space-x-2">
                    <button
                      className="px-3 py-1 text-xs text-white bg-blue-600 rounded-md hover:bg-blue-700"
                      onClick={() => {
                        // Placeholder for save logic
                        console.log("Save edited reply", editReplyContent);
                        setEditingReplyFeedbackID(null);
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="px-3 py-1 text-xs text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                      onClick={() => {
                        setEditingReplyFeedbackID(null);
                        setEditReplyContent("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-700 flex-grow">
                      {reply.Content}
                    </p>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        className="text-blue-500 hover:text-blue-700 text-xs"
                        onClick={() => {
                          setEditingReplyFeedbackID(reply.FeedbackID);
                          setEditReplyContent(reply.Content);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 text-xs"
                        onClick={() => {
                          setDeleteConfirmationReply(reply);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    User ID: {reply.UserID}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No replies yet</p>
      )}
    </div>
  );
};

export default RepliesSection;
