export const projectTypes = [
  "business-website",
  "online-store",
  "web-application",
  "mobile-app",
  "custom-software",
  "not-sure",
] as const;

export const projectGoals = [
  "present-business",
  "generate-leads",
  "sell",
  "bookings",
  "customer-accounts",
  "operations",
  "automation",
  "intelligent-features",
  "something-else",
] as const;

export const paymentsNeeds = [
  "no-payments",
  "sell-products",
  "pay-for-bookings",
  "not-sure",
] as const;

export const productCounts = ["few", "dozens", "hundreds", "not-sure"] as const;

export const yesNoUnsure = ["yes", "no", "not-sure"] as const;

export const accountNeeds = [
  "no-accounts",
  "yes-accounts",
  "not-sure",
] as const;

export const accountFeatures = [
  "save-info",
  "track-orders",
  "documents",
  "other",
] as const;

export const contentManagement = [
  "mostly-static",
  "edit-text-images",
  "publish-articles",
  "manage-products",
  "not-sure",
] as const;

export const integrations = [
  "accounting",
  "crm",
  "email-marketing",
  "maps",
  "existing-software",
  "other",
  "nothing",
  "not-sure",
] as const;

export const budgetRanges = [
  "under-5000",
  "5000-15000",
  "15000-40000",
  "over-40000",
  "discuss",
] as const;

export const timelines = [
  "asap",
  "1-3-months",
  "3-6-months",
  "later",
  "flexible",
] as const;

export const inquirySteps = [
  "type",
  "description",
  "goals",
  "payments",
  "accounts",
  "content",
  "integrations",
  "budget",
  "contact",
  "review",
] as const;

export type ProjectType = (typeof projectTypes)[number];
export type ProjectGoal = (typeof projectGoals)[number];
export type PaymentsNeed = (typeof paymentsNeeds)[number];
export type ProductCount = (typeof productCounts)[number];
export type YesNoUnsure = (typeof yesNoUnsure)[number];
export type AccountNeed = (typeof accountNeeds)[number];
export type AccountFeature = (typeof accountFeatures)[number];
export type ContentManagement = (typeof contentManagement)[number];
export type Integration = (typeof integrations)[number];
export type BudgetRange = (typeof budgetRanges)[number];
export type Timeline = (typeof timelines)[number];
export type InquiryStep = (typeof inquirySteps)[number];

export type InquiryAnswers = {
  projectType: ProjectType | null;
  goals: ProjectGoal[];
  goalsOther: string;
  payments: PaymentsNeed | null;
  productCount: ProductCount | null;
  manageStore: YesNoUnsure | null;
  shipping: YesNoUnsure | null;
  accounts: AccountNeed | null;
  accountFeatures: AccountFeature[];
  contentManagement: ContentManagement | null;
  integrations: Integration[];
  integrationsOther: string;
  budgetRange: BudgetRange | null;
  timeline: Timeline | null;
  name: string;
  businessName: string;
  email: string;
  projectDescription: string;
  existingWebsite: string;
  consent: boolean;
};

export type InquiryApiResult =
  | { status: "received" }
  | { status: "invalid"; message: string }
  | { status: "unavailable"; message: string }
  | { status: "limited"; message: string }
  | { status: "error"; message: string };
