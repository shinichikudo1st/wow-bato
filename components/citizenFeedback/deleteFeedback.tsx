import { DeleteFeedback } from "@/libs/feedback";

const DeleteFeedbackModal = ({
  feedback_id,
  setShowDeleteConfirm,
  GetFeedbacksData,
}: {
  feedback_id: number | null;
  setShowDeleteConfirm: (feedback_id: number | null) => void;
  GetFeedbacksData: () => void;
}) => {
  const handleDelete = async (feedbackId: number | null) => {
    try {
      const response = await DeleteFeedback(feedbackId);

      console.log(response.message);
    } catch (error) {
      console.log(
        error instanceof Error ? error.message : "Unknown error occured"
      );
    } finally {
      console.log("Deleting comment:", feedbackId);
      setShowDeleteConfirm(null);
      GetFeedbacksData();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="relative w-full max-w-lg mx-auto">
        <div className="relative bg-white rounded-lg shadow-xl p-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-center mb-2">
            Delete Comment?
          </h3>
          <p className="text-gray-500 text-center mb-6">
            Are you sure you want to delete this comment? This action cannot be
            undone.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setShowDeleteConfirm(null)}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete(feedback_id)}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteFeedbackModal;
