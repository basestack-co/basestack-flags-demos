import type {
  FeatureFlagModalsConfig,
  SDKConfig,
} from "@basestack/flags-react/client";

// Change this to use env variables
export const flagsConfig: SDKConfig = {
  baseURL: "http://localhost:4000/v1",
  projectKey: "cmlgz0k5a0001tz8oejdaqjsv",
  environmentKey: "cmlgz0k5d0003tz8oaatruirp",
};

export const flagsWcConfig: FeatureFlagModalsConfig = {
  preview: {
    theme: "light",
    heading: "Feature Preview",
    subtitle: "Select and enable previews that fit your workflow.",
    selectionPrompt: "Choose a preview to view",
    selectionPlaceholder: "Select a feature to see details.",
    enableLabel: "Enable",
    enabledLabel: "Disable",
    loadingLabel: "Loading feature previews...",
    emptyLabel: "No feature previews are currently available.",
    previewBadgeLabel: "Preview",
    expiresSoonLabel: "Expiring soon",
    learnMoreLabel: "Learn more",
  },
  feedback: {
    theme: "light",
    heading: "Feedback",
    moodPrompt: "How did this feature make you feel?",
    ratingPrompt: "How would you rate this feature?",
    feedbackLabel: "Your feedback",
    feedbackPlaceholder: "Share your thoughts...",
    submitLabel: "Submit Feedback",
    privacyPolicyUrl: "https://basestack.co/legal/privacy",
    privacyPolicyLabel: "Please avoid adding sensitive/personal information.",
    privacyPolicyLinkLabel: "More details",
  },
};
