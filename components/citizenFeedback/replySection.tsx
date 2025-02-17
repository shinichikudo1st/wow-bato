import { replyData, SubmitFeedbackReply } from "@/libs/feedbackReply";
import Image from "next/image";
import { useState } from "react";

const ReplySection = ({
  setReplyingTo,
  GetFeedbacksData,
  feedbackID,
}: {
  setReplyingTo: (feedbackId: number | null) => void;
  GetFeedbacksData: () => void;
  feedbackID: number | null;
}) => {
  const [replyContent, setReplyContent] = useState<replyData>({
    feedback_reply: "",
  });

  const submitReply = async (feedbackId: number | null) => {
    console.log("Submitting reply to feedback:", feedbackId, replyContent);
    try {
      const data = await SubmitFeedbackReply(feedbackId, replyContent);
      console.log(data.message);
    } catch (error) {
      console.log(
        error instanceof Error ? error.message : "Unknown Error Occured"
      );
    } finally {
      setReplyingTo(null);
      setReplyContent({
        feedback_reply: "",
      });
      GetFeedbacksData();
    }
  };

  return (
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
            value={replyContent.feedback_reply}
            onChange={(e) =>
              setReplyContent({ feedback_reply: e.target.value })
            }
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
              onClick={() => submitReply(feedbackID)}
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Submit Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReplySection;
