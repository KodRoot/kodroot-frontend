import type { InquiryStep } from "@/types/inquiry";

export const questionSteps = [
  "type",
  "goals",
  "payments",
  "accounts",
  "content",
  "integrations",
  "budget",
  "contact",
] as const satisfies readonly InquiryStep[];

type QuestionStep = (typeof questionSteps)[number];

export const stepCopy: Record<
  QuestionStep,
  { kicker: string; question: string; hint?: string }
> = {
  type: {
    kicker: "Project type",
    question: "What are you looking to build?",
  },
  goals: {
    kicker: "Outcomes",
    question: "What should your website or product help you do?",
    hint: "Select all that apply.",
  },
  payments: {
    kicker: "Payments",
    question: "Will customers need to pay you online?",
  },
  accounts: {
    kicker: "Accounts",
    question: "Will your customers need their own accounts?",
  },
  content: {
    kicker: "Content",
    question: "Would you like to update the website yourself?",
  },
  integrations: {
    kicker: "Other tools",
    question: "Does the project need to work with any other tools?",
    hint: "Optional.",
  },
  budget: {
    kicker: "Budget and timing",
    question: "Do you have a budget in mind?",
    hint: "A date here is a hope, not a promise.",
  },
  contact: {
    kicker: "Contact",
    question: "How should we reach you?",
    hint: "Used only to reply.",
  },
};

export function isQuestionStep(step: InquiryStep): step is QuestionStep {
  return step !== "review";
}
