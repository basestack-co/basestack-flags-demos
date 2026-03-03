import type {
  FeatureFlagModalsConfig,
  SDKConfig,
} from "@basestack/flags-react/client";

export type ThemeMode = "light" | "dark";

export const flagsConfig: SDKConfig = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
  projectKey: process.env.NEXT_PUBLIC_PROJECT_KEY!,
  environmentKey: process.env.NEXT_PUBLIC_ENVIRONMENT_KEY!,
};

export const flagsWcConfig = (theme: ThemeMode): FeatureFlagModalsConfig => ({
  preview: {
    theme,
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
    theme,
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
});
