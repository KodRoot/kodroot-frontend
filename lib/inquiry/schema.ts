import * as z from "zod";
import {
  accountFeatures,
  accountNeeds,
  budgetStances,
  contentManagement,
  integrations,
  paymentsNeeds,
  productCounts,
  projectGoals,
  projectTypes,
  timelines,
  yesNoUnsure,
} from "@/types/inquiry";
import type { InquiryAnswers, InquiryStep } from "@/types/inquiry";

export const inquirySubmissionSchema = z.object({
  projectType: z.enum(projectTypes),
  goals: z.array(z.enum(projectGoals)).min(1),
  goalsOther: z.string(),
  payments: z.enum(paymentsNeeds),
  productCount: z.enum(productCounts).nullable(),
  manageStore: z.enum(yesNoUnsure).nullable(),
  shipping: z.enum(yesNoUnsure).nullable(),
  accounts: z.enum(accountNeeds),
  accountFeatures: z.array(z.enum(accountFeatures)),
  contentManagement: z.enum(contentManagement),
  integrations: z.array(z.enum(integrations)),
  integrationsOther: z.string(),
  budgetStance: z.enum(budgetStances),
  budgetAmount: z.string(),
  timeline: z.enum(timelines),
  name: z.string().trim().min(1),
  businessName: z.string(),
  email: z.email(),
  projectDescription: z.string(),
  existingWebsite: z.string(),
  consent: z.literal(true),
});

export type InquirySubmission = z.infer<typeof inquirySubmissionSchema>;

export function needsStoreFollowUp(answers: {
  projectType: InquiryAnswers["projectType"];
  payments: InquiryAnswers["payments"];
}): boolean {
  return (
    answers.projectType === "online-store" ||
    answers.payments === "sell-products"
  );
}

export function validateInquiryStep(
  step: InquiryStep,
  answers: InquiryAnswers,
): string | null {
  switch (step) {
    case "type":
      return answers.projectType
        ? null
        : "Choose the option that best matches what you want to build.";
    case "goals":
      if (answers.goals.length === 0) {
        return "Select at least one outcome, or choose “Something else”.";
      }
      if (
        answers.goals.includes("something-else") &&
        answers.goalsOther.trim().length === 0
      ) {
        return "Briefly describe the other outcome you have in mind.";
      }
      return null;
    case "payments":
      if (!answers.payments) {
        return "Tell us whether customers will need to pay you online.";
      }
      if (needsStoreFollowUp(answers) && !answers.productCount) {
        return "Give a rough sense of how many products you will sell.";
      }
      if (needsStoreFollowUp(answers) && !answers.manageStore) {
        return "Tell us whether you need to manage products and orders yourself.";
      }
      if (needsStoreFollowUp(answers) && !answers.shipping) {
        return "Tell us whether you need delivery or shipping options.";
      }
      return null;
    case "accounts":
      return answers.accounts
        ? null
        : "Tell us whether people will need their own accounts.";
    case "content":
      return answers.contentManagement
        ? null
        : "Tell us whether you want to update the website yourself.";
    case "integrations":
      if (
        answers.integrations.includes("other") &&
        answers.integrationsOther.trim().length === 0
      ) {
        return "Briefly describe the other tools you have in mind, or deselect that option.";
      }
      return null;
    case "budget":
      if (!answers.budgetStance) {
        return "Choose the option that best matches where you are with budget.";
      }
      if (!answers.timeline) {
        return "Choose when you hope to launch. This is not a delivery promise.";
      }
      return null;
    case "contact":
      if (answers.name.trim().length === 0) {
        return "Enter your name.";
      }
      if (!z.email().safeParse(answers.email.trim()).success) {
        return "Enter a valid email address so we can reply.";
      }
      if (!answers.consent) {
        return "Please confirm we may use these details to respond to this inquiry.";
      }
      return null;
    case "review":
      return null;
    default:
      return null;
  }
}
