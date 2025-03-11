import { useFeedbackStore } from "@/store/feedbackStore";

const FeedbackKebabMenu = ({ feedback_id }: { feedback_id: number }) => {
  const { activeDropdown, setActiveDropdown } = useFeedbackStore();

  return (
    <button
      onClick={() =>
        setActiveDropdown(activeDropdown === feedback_id ? null : feedback_id)
      }
      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-500"
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
  );
};

export default FeedbackKebabMenu;
