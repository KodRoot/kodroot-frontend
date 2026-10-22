import type {
  AccountFeature,
  AccountNeed,
  ContentManagement,
  Integration,
  PaymentsNeed,
  ProductCount,
  ProjectGoal,
  ProjectType,
  Timeline,
  YesNoUnsure,
} from "@/types/inquiry";

export type Choice<T extends string> = {
  value: T;
  label: string;
  description: string;
};

export const projectTypeOptions: Choice<ProjectType>[] = [
  {
    value: "business-website",
    label: "A business website",
    description: "",
  },
  {
    value: "online-store",
    label: "An online store",
    description: "",
  },
  {
    value: "web-application",
    label: "A web application",
    description: "A tool people use in the browser, not only a public site.",
  },
  {
    value: "mobile-app",
    label: "A mobile app",
    description: "",
  },
  {
    value: "custom-software",
    label: "A custom software solution",
    description: "",
  },
  {
    value: "not-sure",
    label: "I’m not sure yet",
    description: "",
  },
];

export const projectGoalOptions: Choice<ProjectGoal>[] = [
  {
    value: "present-business",
    label: "Present my business and services",
    description: "",
  },
  {
    value: "generate-leads",
    label: "Generate leads or inquiries",
    description: "",
  },
  {
    value: "sell",
    label: "Sell products or services",
    description: "",
  },
  {
    value: "bookings",
    label: "Accept bookings or appointments",
    description: "",
  },
  {
    value: "customer-accounts",
    label: "Let customers sign in and manage their information",
    description: "",
  },
  {
    value: "operations",
    label: "Manage business operations",
    description: "",
  },
  {
    value: "automation",
    label: "Automate repetitive tasks",
    description: "",
  },
  {
    value: "intelligent-features",
    label: "Give the product useful intelligent features",
    description: "",
  },
  {
    value: "something-else",
    label: "Something else",
    description: "",
  },
];

export const paymentsOptions: Choice<PaymentsNeed>[] = [
  {
    value: "no-payments",
    label: "No, I only need to present my business",
    description: "",
  },
  {
    value: "sell-products",
    label: "Yes, customers should be able to buy products or services",
    description: "",
  },
  {
    value: "pay-for-bookings",
    label: "I need to accept payments for bookings or other services",
    description: "",
  },
  {
    value: "not-sure",
    label: "I’m not sure yet",
    description: "",
  },
];

export const productCountOptions: Choice<ProductCount>[] = [
  {
    value: "few",
    label: "A small number",
    description: "Up to about 20.",
  },
  {
    value: "dozens",
    label: "Dozens",
    description: "More than a handful.",
  },
  {
    value: "hundreds",
    label: "Hundreds or more",
    description: "A large catalogue.",
  },
  {
    value: "not-sure",
    label: "I’m not sure yet",
    description: "",
  },
];

export const yesNoUnsureOptions: Choice<YesNoUnsure>[] = [
  {
    value: "yes",
    label: "Yes",
    description: "",
  },
  {
    value: "no",
    label: "No",
    description: "",
  },
  {
    value: "not-sure",
    label: "I’m not sure",
    description: "",
  },
];

export const accountOptions: Choice<AccountNeed>[] = [
  {
    value: "no-accounts",
    label: "No, visitors can use the website without signing in",
    description: "",
  },
  {
    value: "yes-accounts",
    label: "Yes, customers should be able to sign in",
    description: "",
  },
  {
    value: "not-sure",
    label: "I’m not sure",
    description: "",
  },
];

export const accountFeatureOptions: Choice<AccountFeature>[] = [
  {
    value: "save-info",
    label: "Save their information",
    description: "",
  },
  {
    value: "track-orders",
    label: "Track orders or requests",
    description: "",
  },
  {
    value: "documents",
    label: "Access documents or files",
    description: "",
  },
  {
    value: "other",
    label: "Other account features",
    description: "",
  },
];

export const contentOptions: Choice<ContentManagement>[] = [
  {
    value: "mostly-static",
    label: "No, the information can stay mostly as it is",
    description: "",
  },
  {
    value: "edit-text-images",
    label: "Yes, I want to edit text and images",
    description: "",
  },
  {
    value: "publish-articles",
    label: "Yes, I want to publish articles or updates",
    description: "",
  },
  {
    value: "manage-products",
    label: "Yes, I want to manage products or other content",
    description: "",
  },
  {
    value: "not-sure",
    label: "I’m not sure",
    description: "",
  },
];

export const integrationOptions: Choice<Integration>[] = [
  {
    value: "accounting",
    label: "Accounting or invoicing software",
    description: "",
  },
  {
    value: "crm",
    label: "Customer management tools",
    description: "",
  },
  {
    value: "email-marketing",
    label: "Email marketing",
    description: "",
  },
  {
    value: "maps",
    label: "Maps or location services",
    description: "",
  },
  {
    value: "existing-software",
    label: "Existing business software",
    description: "",
  },
  {
    value: "other",
    label: "Other integrations",
    description: "",
  },
  {
    value: "nothing",
    label: "Nothing specific",
    description: "",
  },
  {
    value: "not-sure",
    label: "I’m not sure",
    description: "",
  },
];

export const timelineOptions: Choice<Timeline>[] = [
  {
    value: "asap",
    label: "As soon as reasonably possible",
    description: "",
  },
  {
    value: "1-3-months",
    label: "Within 1–3 months",
    description: "",
  },
  {
    value: "3-6-months",
    label: "Within 3–6 months",
    description: "",
  },
  {
    value: "later",
    label: "Later than 6 months",
    description: "",
  },
  {
    value: "flexible",
    label: "I’m flexible",
    description: "",
  },
];
