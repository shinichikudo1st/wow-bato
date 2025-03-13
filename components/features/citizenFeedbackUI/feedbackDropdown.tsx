import { useFeedbackStore } from "@/store/feedbackStore";

const FeedbackDropdown = ({
  feedback_id,
  content,
}: {
  feedback_id: number;
  content: string;
}) => {
  const {
    setShowDeleteConfirm,
    setEditingComment,
    setEditContent,
    setActiveDropdown,
  } = useFeedbackStore();

  const handleEdit = (feedbackId: number, content: string) => {
    setEditingComment(feedbackId);
    setEditContent(content);
    setActiveDropdown(null);
  };

  return (
    <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
      <div className="py-1">
        <button
          onClick={() => handleEdit(feedback_id, content)}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Edit Comment
        </button>
        <button
          onClick={() => setShowDeleteConfirm(feedback_id)}
          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete Comment
        </button>
      </div>
    </div>
  );
};

export default FeedbackDropdown;
