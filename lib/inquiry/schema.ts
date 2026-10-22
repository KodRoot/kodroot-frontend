import * as z from "zod";
import {
  accountFeatures,
  accountNeeds,
  budgetRanges,
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

export const inquirySubmissionSchema = z
  .object({
    projectType: z.enum(projectTypes),
    goals: z.array(z.enum(projectGoals)).min(1).max(projectGoals.length),
    goalsOther: z.string().trim().max(500),
    payments: z.enum(paymentsNeeds),
    productCount: z.enum(productCounts).nullable(),
    manageStore: z.enum(yesNoUnsure).nullable(),
    shipping: z.enum(yesNoUnsure).nullable(),
    accounts: z.enum(accountNeeds),
    accountFeatures: z
      .array(z.enum(accountFeatures))
      .max(accountFeatures.length),
    contentManagement: z.enum(contentManagement),
    integrations: z.array(z.enum(integrations)).max(integrations.length),
    integrationsOther: z.string().trim().max(500),
    budgetRange: z.enum(budgetRanges),
    timeline: z.enum(timelines),
    name: z.string().trim().min(1).max(120),
    businessName: z.string().trim().max(160),
    email: z.email().max(200),
    projectDescription: z.string().trim().min(10).max(4000),
    existingWebsite: z.string().trim().max(300),
    consent: z.literal(true),
  })
  .superRefine((data, ctx) => {
    if (
      data.goals.includes("something-else") &&
      data.goalsOther.trim().length === 0
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Describe the other outcome.",
        path: ["goalsOther"],
      });
    }

    if (needsStoreFollowUp(data)) {
      if (!data.productCount) {
        ctx.addIssue({
          code: "custom",
          message: "Choose a catalogue size.",
          path: ["productCount"],
        });
      }
      if (!data.manageStore) {
        ctx.addIssue({
          code: "custom",
          message: "Say whether you will manage products and orders.",
          path: ["manageStore"],
        });
      }
      if (!data.shipping) {
        ctx.addIssue({
          code: "custom",
          message: "Say whether you need shipping.",
          path: ["shipping"],
        });
      }
    }

    if (
      data.integrations.includes("other") &&
      data.integrationsOther.trim().length === 0
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Describe the other tools.",
        path: ["integrationsOther"],
      });
    }
  });

export type InquirySubmission = z.infer<typeof inquirySubmissionSchema>;

export const inquiryRequestMetaSchema = z.object({
  company: z.string().max(500),
  startedAt: z.number().finite(),
  submissionId: z.uuid(),
});

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
    case "description":
      return answers.projectDescription.trim().length >= 10
        ? null
        : "Describe the project in a sentence or two.";
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
      if (!answers.budgetRange) {
        return "Choose a budget range, or say you would rather discuss it.";
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
