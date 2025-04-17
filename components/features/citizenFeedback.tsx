import { FeedbackListItem } from "@/types/feedbackTypes";
import Image from "next/image";
import ReplySection from "./citizenFeedbackUI/replySection";
import RepliesSection from "./citizenFeedbackUI/repliesSection";
import DeleteReplyModal from "./citizenFeedbackUI/deleteReply";
import DeleteFeedbackModal from "./citizenFeedbackUI/deleteFeedback";
import FeedbackBox from "./citizenFeedbackUI/feedbackBox";
import NoProjectSelected from "./citizenFeedbackUI/notSelected";
import FeedbackDropdown from "./citizenFeedbackUI/feedbackDropdown";
import FeedbackKebabMenu from "./citizenFeedbackUI/kebabMenu";
import EditFeedbackContent from "./citizenFeedbackUI/editFeedback";
import { useFeedbackStore } from "@/store/feedbackStore";
import FeedbackContent from "./citizenFeedbackUI/feedbackContent";

const CitizenCommentFeedback = ({
  userID,
  projectID,
  feedbacks,
  GetFeedbacksData,
}: {
  userID: number | null;
  projectID: number | null;
  feedbacks: FeedbackListItem[] | null;
  GetFeedbacksData: () => void;
  isLoading?: boolean;
  error?: string;
}) => {
  const {
    activeDropdown,
    replyingTo,
    editingComment,
    showDeleteConfirm,
    activeFeedbackReplies,
    deleteConfirmationReply,
  } = useFeedbackStore();

  if (!projectID) {
    return <NoProjectSelected />;
  }

  return (
    <>
      <div className="w-full bg-white rounded-lg border p-4 md:p-6 relative h-[800px] flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Project Discussion
          </h3>
          <div className="text-sm text-gray-500">
            {feedbacks?.length || 0} comments
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
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
                      <EditFeedbackContent
                        GetFeedbacksData={GetFeedbacksData}
                        feedback_id={feedback.feedback_id}
                      />
                    ) : (
                      <FeedbackContent feedback={feedback} />
                    )}
                  </div>

                  {!editingComment && (
                    <div className="relative">
                      {feedback.user_id === userID && (
                        <FeedbackKebabMenu feedback_id={feedback.feedback_id} />
                      )}
                      {activeDropdown === feedback.feedback_id && (
                        <FeedbackDropdown
                          feedback_id={feedback.feedback_id}
                          content={feedback.content}
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm === feedback.feedback_id && (
                  <DeleteFeedbackModal
                    feedback_id={feedback.feedback_id}
                    GetFeedbacksData={GetFeedbacksData}
                  />
                )}

                {/* Reply Section */}
                {replyingTo === feedback.feedback_id && (
                  <ReplySection
                    GetFeedbacksData={GetFeedbacksData}
                    feedbackID={feedback.feedback_id}
                  />
                )}

                {/* Replies Section */}
                {activeFeedbackReplies === feedback.feedback_id && (
                  <RepliesSection />
                )}
              </div>
            ))}
        </div>

        {/* Delete Reply Confirmation Modal */}
        {deleteConfirmationReply && <DeleteReplyModal />}

        <div className="mt-6 border-t pt-6">
          <FeedbackBox projectID={projectID} GetFeedbacksData={GetFeedbacksData} />
        </div>
      </div>
    </>
  );
};

export default CitizenCommentFeedback;
