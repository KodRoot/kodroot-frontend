import type { InquiryStep } from "@/types/inquiry";

export const questionSteps = [
  "project",
  "goals",
  "customers",
  "running",
  "budget",
  "contact",
] as const satisfies readonly InquiryStep[];

type QuestionStep = (typeof questionSteps)[number];

export const stepCopy: Record<
  QuestionStep,
  { kicker: string; question: string; hint?: string }
> = {
  project: {
    kicker: "The project",
    question: "What are you looking to build?",
    hint: "Then a sentence or two about it.",
  },
  goals: {
    kicker: "Outcomes",
    question: "What should your website or product help you do?",
    hint: "Select all that apply.",
  },
  customers: {
    kicker: "Customers",
    question: "How will people use it?",
  },
  running: {
    kicker: "Running it",
    question: "How would you like to work with the site?",
  },
  budget: {
    kicker: "Budget and timing",
    question: "What range are you considering?",
    hint: "Your bracket, in euro. Not a quote.",
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
