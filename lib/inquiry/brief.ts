import { site } from "@/lib/site";
import {
  accountFeatureOptions,
  accountOptions,
  contentOptions,
  integrationOptions,
  paymentsOptions,
  productCountOptions,
  projectGoalOptions,
  projectTypeOptions,
  timelineOptions,
  yesNoUnsureOptions,
} from "@/lib/inquiry/options";
import type { Choice } from "@/lib/inquiry/options";
import { needsStoreFollowUp } from "@/lib/inquiry/schema";
import type { InquirySubmission } from "@/lib/inquiry/schema";
import type { InquiryAnswers, InquiryStep } from "@/types/inquiry";

function labelFor<T extends string>(
  options: Choice<T>[],
  value: T | null | undefined,
): string {
  if (!value) {
    return "Not specified";
  }
  return options.find((option) => option.value === value)?.label ?? value;
}

function labelsFor<T extends string>(
  options: Choice<T>[],
  values: T[],
): string {
  if (values.length === 0) {
    return "Not specified";
  }
  return values.map((value) => labelFor(options, value)).join("; ");
}

export function formatInquiryBrief(data: InquirySubmission): string {
  const lines = [
    `Project inquiry for ${site.name}`,
    "",
    `Name: ${data.name}`,
    `Business: ${data.businessName.trim() || "Not specified"}`,
    `Email: ${data.email}`,
    `Existing website: ${data.existingWebsite.trim() || "Not specified"}`,
    "",
    `What they want to build: ${labelFor(projectTypeOptions, data.projectType)}`,
    `Outcomes: ${labelsFor(projectGoalOptions, data.goals)}`,
  ];

  if (data.goalsOther.trim()) {
    lines.push(`Other outcome: ${data.goalsOther.trim()}`);
  }

  lines.push(`Online payments: ${labelFor(paymentsOptions, data.payments)}`);

  if (needsStoreFollowUp(data)) {
    lines.push(
      `Catalogue size: ${labelFor(productCountOptions, data.productCount)}`,
    );
    lines.push(
      `Manage products and orders themselves: ${labelFor(yesNoUnsureOptions, data.manageStore)}`,
    );
    lines.push(
      `Delivery or shipping: ${labelFor(yesNoUnsureOptions, data.shipping)}`,
    );
  }

  lines.push(`Customer accounts: ${labelFor(accountOptions, data.accounts)}`);
  if (data.accounts === "yes-accounts" && data.accountFeatures.length > 0) {
    lines.push(
      `Account features: ${labelsFor(accountFeatureOptions, data.accountFeatures)}`,
    );
  }

  lines.push(
    `Updating the website: ${labelFor(contentOptions, data.contentManagement)}`,
  );
  lines.push(
    `Other tools: ${labelsFor(integrationOptions, data.integrations)}`,
  );
  if (data.integrationsOther.trim()) {
    lines.push(`Other tools described: ${data.integrationsOther.trim()}`);
  }

  lines.push(
    `Hoped launch window: ${labelFor(timelineOptions, data.timeline)} (not a delivery promise)`,
  );

  lines.push("", "Project:", data.projectDescription.trim());

  lines.push("", "Working notes for KodRoot:");
  for (const note of deriveInternalNotes(data)) {
    lines.push(`- ${note}`);
  }

  return lines.join("\n");
}

function deriveInternalNotes(data: InquirySubmission): string[] {
  const notes: string[] = [];

  notes.push(`Project type: ${data.projectType}`);

  if (
    data.payments === "sell-products" ||
    data.projectType === "online-store"
  ) {
    notes.push("Likely needs product catalogue and online payments.");
  } else if (data.payments === "pay-for-bookings") {
    notes.push("Likely needs payments tied to bookings or services.");
  }

  if (data.accounts === "yes-accounts") {
    notes.push("Likely needs customer accounts / sign-in.");
  }

  if (
    data.contentManagement === "edit-text-images" ||
    data.contentManagement === "publish-articles" ||
    data.contentManagement === "manage-products"
  ) {
    notes.push("Likely needs a way for the client to update content.");
  }

  if (data.integrations.length > 0 && !data.integrations.includes("nothing")) {
    notes.push("Likely needs connections to existing tools.");
  }

  if (data.goals.includes("intelligent-features")) {
    notes.push(
      "Visitor asked for intelligent features in the product, in plain language.",
    );
  }

  if (data.goals.includes("automation")) {
    notes.push("Visitor asked to reduce repetitive work.");
  }

  notes.push("No price was quoted. No delivery date was promised.");
  return notes;
}

type InquirySummaryItem = {
  step: InquiryStep;
  label: string;
  value: string;
};

export function summarizeInquiry(
  answers: InquiryAnswers,
): InquirySummaryItem[] {
  const items: InquirySummaryItem[] = [
    {
      step: "project",
      label: "What you want to build",
      value: labelFor(projectTypeOptions, answers.projectType),
    },
    {
      step: "project",
      label: "Project",
      value: answers.projectDescription.trim() || "Not specified",
    },
    {
      step: "goals",
      label: "Outcomes",
      value: labelsFor(projectGoalOptions, answers.goals),
    },
  ];

  if (answers.goalsOther.trim()) {
    items.push({
      step: "goals",
      label: "Other outcome",
      value: answers.goalsOther.trim(),
    });
  }

  items.push({
    step: "customers",
    label: "Online payments",
    value: labelFor(paymentsOptions, answers.payments),
  });

  if (needsStoreFollowUp(answers)) {
    items.push(
      {
        step: "customers",
        label: "Catalogue size",
        value: labelFor(productCountOptions, answers.productCount),
      },
      {
        step: "customers",
        label: "Manage products and orders yourself",
        value: labelFor(yesNoUnsureOptions, answers.manageStore),
      },
      {
        step: "customers",
        label: "Delivery or shipping",
        value: labelFor(yesNoUnsureOptions, answers.shipping),
      },
    );
  }

  items.push({
    step: "customers",
    label: "Customer accounts",
    value: labelFor(accountOptions, answers.accounts),
  });

  if (answers.accounts === "yes-accounts") {
    items.push({
      step: "customers",
      label: "Account features",
      value: labelsFor(accountFeatureOptions, answers.accountFeatures),
    });
  }

  items.push(
    {
      step: "running",
      label: "Updating the website",
      value: labelFor(contentOptions, answers.contentManagement),
    },
    {
      step: "running",
      label: "Other tools",
      value: labelsFor(integrationOptions, answers.integrations),
    },
  );

  if (answers.integrationsOther.trim()) {
    items.push({
      step: "running",
      label: "Other tools described",
      value: answers.integrationsOther.trim(),
    });
  }

  items.push({
    step: "timing",
    label: "Hoped launch window",
    value: `${labelFor(timelineOptions, answers.timeline)} (not a delivery promise)`,
  });

  items.push(
    {
      step: "contact",
      label: "Name",
      value: answers.name.trim() || "Not specified",
    },
    {
      step: "contact",
      label: "Business",
      value: answers.businessName.trim() || "Not specified",
    },
    {
      step: "contact",
      label: "Email",
      value: answers.email.trim() || "Not specified",
    },
    {
      step: "contact",
      label: "Existing website",
      value: answers.existingWebsite.trim() || "Not specified",
    },
  );

  return items;
}
