import { GetFeedbackReply } from "@/libs/feedbackReply";
import { useFeedbackStore } from "@/store/feedbackStore";
import { FeedbackListItem } from "@/types/feedbackTypes";

const FeedbackContent = ({ feedback }: { feedback: FeedbackListItem }) => {
  const {
    activeFeedbackReplies,
    setActiveFeedbackReplies,
    setReplies,
    replyingTo,
    setReplyingTo,
    setActiveDropdown,
    replies,
  } = useFeedbackStore();

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

  return (
    <>
      <p className="text-gray-700 mt-3 leading-relaxed">{feedback.content}</p>
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
          onClick={() => handleShowReplies(feedback.feedback_id)}
          className="text-gray-600 hover:text-gray-700 text-sm font-medium flex items-center space-x-1"
        >
          <span>
            {activeFeedbackReplies === feedback.feedback_id ? "Hide" : "Show"}{" "}
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
  );
};

export default FeedbackContent;
