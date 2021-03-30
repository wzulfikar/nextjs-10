import { FeedbackFish } from '@feedback-fish/react';

/**
 * @description
 * Headless component that triggers a feedback handler (eg. FeedbackFish).
 *
 * @example
 * <SendFeedback userId={currentUser?.email} metadata={{ channel: 'Landing Page / Footer' }}>
 *  <button>Send Feedback</button>
 * </SendFeedback>
 */
export default function SendFeedback({
  userId = undefined,
  metadata = {},
  children,
}) {
  return (
    <FeedbackFish
      projectId={process.env.NEXT_PUBLIC_FEEDBACK_FISH_PROJECT_ID}
      userId={userId}
      metadata={metadata}
    >
      {children}
    </FeedbackFish>
  );
}
