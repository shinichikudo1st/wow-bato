import { SubmitFeedback } from "@/libs/feedback";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

const FeedbackBox = ({
  projectID,
  GetFeedbacksData,
}: {
  projectID: number | null;
  GetFeedbacksData: () => void;
}) => {
  interface FeedbackForm {
    content: string;
  }
  const [formData, setFormData] = useState<FeedbackForm>({
    content: "",
  });

  const submitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectID) return;

    feedbackMutation.mutate(formData)
  };

  const feedbackMutation = useMutation({
    mutationFn: async (data: FeedbackForm) => {
      const response = await SubmitFeedback(projectID, data.content);
      return response.message
    },
    onSuccess: (successMessage) => {
      console.log(successMessage)
    },
    onError: (errorMessage) => {
      console.log(errorMessage)
    },
    onSettled: () => {
      setFormData({ content: "" });
      GetFeedbacksData();
    }
  })

  return (
    <div className="bg-white border-t shadow-sm p-4 rounded-lg mt-6">
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
              disabled={feedbackMutation.isPending}
              className="px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 
                        transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {feedbackMutation.isPending ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Posting...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  <span>Post Comment</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FeedbackBox;
