import { GetFeedbackReply } from "@/libs/feedbackReply";
import { FeedbackListItem } from "@/types/feedbackTypes";
import Image from "next/image";
import ReplySection from "../citizenFeedback/replySection";
import RepliesSection from "../citizenFeedback/repliesSection";
import DeleteReplyModal from "../citizenFeedback/deleteReply";
import DeleteFeedbackModal from "../citizenFeedback/deleteFeedback";
import FeedbackBox from "../citizenFeedback/feedbackBox";
import NoProjectSelected from "../citizenFeedback/notSelected";
import FeedbackDropdown from "../citizenFeedback/feedbackDropdown";
import FeedbackKebabMenu from "../citizenFeedback/kebabMenu";
import EditFeedbackContent from "../citizenFeedback/editFeedback";
import { useFeedbackStore } from "@/store/feedbackStore";
import FeedbackContent from "../citizenFeedback/feedbackContent";

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
      </div>

      {/* Floating Comment Box */}
      <FeedbackBox projectID={projectID} GetFeedbacksData={GetFeedbacksData} />
    </>
  );
};

export default CitizenCommentFeedback;
