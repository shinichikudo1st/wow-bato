import { UpdateFeedback } from "@/libs/feedback";
import { useFeedbackStore } from "@/store/feedbackStore";
import { useMutation } from "@tanstack/react-query";

const EditFeedbackContent = ({
  GetFeedbacksData,
  feedback_id,
}: {
  GetFeedbacksData: () => void;
  feedback_id: number;
}) => {
  const { setEditingComment, setEditContent, editContent } = useFeedbackStore();

  const feedbackMutation = useMutation({
    mutationFn: async (feedbackID: number) => {
      const result = await UpdateFeedback(editContent, feedbackID);
      return result.message;
    },
    onSuccess: () => {
      setEditingComment(null);
      setEditContent("");
      GetFeedbacksData();
    },
  });

  return (
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
          onClick={() => feedbackMutation.mutate(feedback_id)}
          className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditFeedbackContent;
