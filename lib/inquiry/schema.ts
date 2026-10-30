import * as z from "zod";
import { UTM_VALUE_MAX } from "@/lib/attribution";
import {
  accountFeatures,
  accountNeeds,
  contentManagement,
  integrations,
  paymentsNeeds,
  productCounts,
  projectGoals,
  projectTypes,
  referralSources,
  timelines,
  yesNoUnsure,
} from "@/types/inquiry";
import type { InquiryAnswers, InquiryStep } from "@/types/inquiry";

const attributionValue = z
  .string()
  .trim()
  .max(UTM_VALUE_MAX)
  .regex(/^[^\p{Cc}]*$/u)
  .optional();

const attributionSchema = z.object({
  utm_source: attributionValue,
  utm_medium: attributionValue,
  utm_campaign: attributionValue,
  utm_content: attributionValue,
  utm_term: attributionValue,
});

export const inquirySubmissionSchema = z
  .object({
    projectType: z.enum(projectTypes),
    goals: z.array(z.enum(projectGoals)).min(1).max(projectGoals.length),
    goalsOther: z.string().trim().max(500),
    payments: z.enum(paymentsNeeds).nullish(),
    productCount: z.enum(productCounts).nullish(),
    manageStore: z.enum(yesNoUnsure).nullish(),
    shipping: z.enum(yesNoUnsure).nullish(),
    accounts: z.enum(accountNeeds).nullish(),
    accountFeatures: z
      .array(z.enum(accountFeatures))
      .max(accountFeatures.length),
    contentManagement: z.enum(contentManagement).nullish(),
    integrations: z.array(z.enum(integrations)).max(integrations.length),
    integrationsOther: z.string().trim().max(500),
    timeline: z.enum(timelines),
    name: z.string().trim().min(1).max(120),
    businessName: z.string().trim().max(160),
    email: z.email().max(200),
    projectDescription: z.string().trim().max(4000).default(""),
    existingWebsite: z.string().trim().max(300),
    referral: z.enum(referralSources).nullish(),
    attribution: attributionSchema.optional(),
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
  payments?: InquiryAnswers["payments"] | undefined;
}): boolean {
  return (
    answers.projectType === "online-store" ||
    answers.payments === "sell-products"
  );
}

export function applyInquiryPatch(
  current: InquiryAnswers,
  partial: Partial<InquiryAnswers>,
): InquiryAnswers {
  const next = { ...current, ...partial };

  if (!needsStoreFollowUp(next)) {
    next.productCount = null;
    next.manageStore = null;
    next.shipping = null;
  }

  if (next.accounts !== "yes-accounts") {
    next.accountFeatures = [];
  }

  if (!next.goals.includes("something-else")) {
    next.goalsOther = "";
  }

  if (!next.integrations.includes("other")) {
    next.integrationsOther = "";
  }

  return next;
}

export function validateInquiryStep(
  step: InquiryStep,
  answers: InquiryAnswers,
): string | null {
  switch (step) {
    case "project":
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
    case "customers":
      return null;
    case "running":
      if (
        answers.integrations.includes("other") &&
        answers.integrationsOther.trim().length === 0
      ) {
        return "Briefly describe the other tools you have in mind, or deselect that option.";
      }
      return null;
    case "timing":
      return answers.timeline
        ? null
        : "Choose when you hope to launch. This is not a delivery promise.";
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
