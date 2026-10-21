import type {
  AccountFeature,
  AccountNeed,
  BudgetStance,
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
    description: "A public site that presents your company, services, or work.",
  },
  {
    value: "online-store",
    label: "An online store",
    description: "A site where people can browse and buy products.",
  },
  {
    value: "web-application",
    label: "A web application",
    description:
      "A tool people use in the browser to get work done, not only to read about you.",
  },
  {
    value: "mobile-app",
    label: "A mobile app",
    description: "An app designed for phones and tablets.",
  },
  {
    value: "custom-software",
    label: "A custom software solution",
    description: "Software built around a specific way your business works.",
  },
  {
    value: "not-sure",
    label: "I’m not sure yet",
    description: "We’ll help you work out the right starting point.",
  },
];

export const projectGoalOptions: Choice<ProjectGoal>[] = [
  {
    value: "present-business",
    label: "Present my business and services",
    description: "Help people understand who you are and what you offer.",
  },
  {
    value: "generate-leads",
    label: "Generate leads or inquiries",
    description: "Make it easy for people to get in touch.",
  },
  {
    value: "sell",
    label: "Sell products or services",
    description: "Let people buy from you online.",
  },
  {
    value: "bookings",
    label: "Accept bookings or appointments",
    description: "Let people reserve a time or service.",
  },
  {
    value: "customer-accounts",
    label: "Let customers sign in and manage their information",
    description:
      "Give people a place of their own on the site or in the product.",
  },
  {
    value: "operations",
    label: "Manage business operations",
    description: "Support day-to-day work inside the company.",
  },
  {
    value: "automation",
    label: "Automate repetitive tasks",
    description: "Reduce work that currently happens by hand.",
  },
  {
    value: "intelligent-features",
    label: "Give the product useful intelligent features",
    description:
      "Help people find answers, complete tasks, or work with information more easily.",
  },
  {
    value: "something-else",
    label: "Something else",
    description: "Tell us in your own words on the next screens.",
  },
];

export const paymentsOptions: Choice<PaymentsNeed>[] = [
  {
    value: "no-payments",
    label: "No, I only need to present my business",
    description:
      "People should be able to learn about you without paying online.",
  },
  {
    value: "sell-products",
    label: "Yes, customers should be able to buy products or services",
    description: "People will pay you for things they choose.",
  },
  {
    value: "pay-for-bookings",
    label: "I need to accept payments for bookings or other services",
    description: "People will pay when they book or request work.",
  },
  {
    value: "not-sure",
    label: "I’m not sure yet",
    description:
      "We can help you decide whether payments belong in the first version.",
  },
];

export const productCountOptions: Choice<ProductCount>[] = [
  {
    value: "few",
    label: "A small number",
    description: "Up to around 20 products.",
  },
  {
    value: "dozens",
    label: "Dozens",
    description: "A growing catalogue, but still manageable by hand.",
  },
  {
    value: "hundreds",
    label: "Hundreds or more",
    description: "A larger catalogue that needs clearer organisation.",
  },
  {
    value: "not-sure",
    label: "I’m not sure yet",
    description: "We can start from a rough range later.",
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
    description: "People can find what they need without creating an account.",
  },
  {
    value: "yes-accounts",
    label: "Yes, customers should be able to sign in",
    description: "People will have their own login.",
  },
  {
    value: "not-sure",
    label: "I’m not sure",
    description: "We can decide this once the main purpose is clearer.",
  },
];

export const accountFeatureOptions: Choice<AccountFeature>[] = [
  {
    value: "save-info",
    label: "Save their information",
    description: "Keep details so they do not have to start over each time.",
  },
  {
    value: "track-orders",
    label: "Track orders or requests",
    description: "See what they have bought or asked for.",
  },
  {
    value: "documents",
    label: "Access documents or files",
    description: "Download or view material that belongs to them.",
  },
  {
    value: "other",
    label: "Other account features",
    description: "You can describe these in the project notes.",
  },
];

export const contentOptions: Choice<ContentManagement>[] = [
  {
    value: "mostly-static",
    label: "No, the information can stay mostly as it is",
    description: "Updates will be occasional, and can be handled when needed.",
  },
  {
    value: "edit-text-images",
    label: "Yes, I want to edit text and images",
    description:
      "You should be able to change pages without waiting on a developer.",
  },
  {
    value: "publish-articles",
    label: "Yes, I want to publish articles or updates",
    description: "News, writing, or a regular stream of new pages.",
  },
  {
    value: "manage-products",
    label: "Yes, I want to manage products or other content",
    description: "You will add, change, or remove items yourself.",
  },
  {
    value: "not-sure",
    label: "I’m not sure",
    description:
      "We can keep the first version simple and leave room to add this later.",
  },
];

export const integrationOptions: Choice<Integration>[] = [
  {
    value: "accounting",
    label: "Accounting or invoicing software",
    description: "Tools you already use for money and invoices.",
  },
  {
    value: "crm",
    label: "Customer management tools",
    description: "A place where you keep client or customer records.",
  },
  {
    value: "email-marketing",
    label: "Email marketing",
    description: "Newsletters or automated email to customers.",
  },
  {
    value: "maps",
    label: "Maps or location services",
    description: "Directions, a map, or location-based information.",
  },
  {
    value: "existing-software",
    label: "Existing business software",
    description: "Systems you already rely on day to day.",
  },
  {
    value: "other",
    label: "Other integrations",
    description: "Anything else the project should connect to.",
  },
  {
    value: "nothing",
    label: "Nothing specific",
    description: "No other tools need to be connected for now.",
  },
  {
    value: "not-sure",
    label: "I’m not sure",
    description: "We can come back to this once the main work is clearer.",
  },
];

export const budgetOptions: Choice<BudgetStance>[] = [
  {
    value: "have-budget",
    label: "I have a budget in mind",
    description: "You can note an amount in whatever currency you use.",
  },
  {
    value: "need-help",
    label: "I need help understanding the likely investment",
    description: "We can talk through scope before any figures are discussed.",
  },
  {
    value: "exploring",
    label: "I’m still exploring the idea",
    description: "You are gathering information, not committing to a number.",
  },
];

export const timelineOptions: Choice<Timeline>[] = [
  {
    value: "asap",
    label: "As soon as reasonably possible",
    description: "This is a hope, not a delivery promise.",
  },
  {
    value: "1-3-months",
    label: "Within 1–3 months",
    description: "A near-term window, depending on scope.",
  },
  {
    value: "3-6-months",
    label: "Within 3–6 months",
    description: "Room to plan the work properly.",
  },
  {
    value: "later",
    label: "Later than 6 months",
    description: "The work can wait until the brief is clear.",
  },
  {
    value: "flexible",
    label: "I’m flexible",
    description: "Timing can follow from the right approach.",
  },
];
