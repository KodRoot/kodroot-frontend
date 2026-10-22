import { expect, test } from "@playwright/test";
import { inquiryRequest } from "../helpers/inquiry";
import {
  applyInquiryPatch,
  inquiryRequestMetaSchema,
  inquirySubmissionSchema,
  validateInquiryStep,
} from "../../lib/inquiry/schema";
import { emptyInquiryAnswers } from "../../lib/inquiry/defaults";

test.describe("inquiry validation", () => {
  test("accepts a complete submission", () => {
    const parsed = inquirySubmissionSchema.safeParse(inquiryRequest());
    expect(parsed.success).toBe(true);
  });

  test("rejects an empty payload", () => {
    expect(inquirySubmissionSchema.safeParse({}).success).toBe(false);
  });

  test("rejects an invalid email", () => {
    const parsed = inquirySubmissionSchema.safeParse(
      inquiryRequest({ email: "not-an-email" }),
    );
    expect(parsed.success).toBe(false);
  });

  test("rejects a missing required description", () => {
    const parsed = inquirySubmissionSchema.safeParse(
      inquiryRequest({ projectDescription: "short" }),
    );
    expect(parsed.success).toBe(false);
  });

  test("rejects store follow-up gaps", () => {
    const parsed = inquirySubmissionSchema.safeParse(
      inquiryRequest({
        projectType: "online-store",
        payments: "sell-products",
        productCount: null,
      }),
    );
    expect(parsed.success).toBe(false);
  });

  test("rejects a missing consent", () => {
    const parsed = inquirySubmissionSchema.safeParse(
      inquiryRequest({ consent: false }),
    );
    expect(parsed.success).toBe(false);
  });

  test("requires a UUID submission id", () => {
    expect(
      inquiryRequestMetaSchema.safeParse({
        company: "",
        startedAt: Date.now(),
        submissionId: "not-a-uuid",
      }).success,
    ).toBe(false);
  });

  test("validates the first step in the browser", () => {
    expect(validateInquiryStep("project", emptyInquiryAnswers)).toMatch(
      /Choose/,
    );
    expect(
      validateInquiryStep("project", {
        ...emptyInquiryAnswers,
        projectType: "business-website",
      }),
    ).toMatch(/Describe/);
    expect(
      validateInquiryStep("project", {
        ...emptyInquiryAnswers,
        projectType: "business-website",
        projectDescription: "A small business site with a services page.",
      }),
    ).toBeNull();
  });

  test("clears follow-up answers that no longer apply", () => {
    const filled = applyInquiryPatch(emptyInquiryAnswers, {
      projectType: "online-store",
      payments: "sell-products",
      productCount: "few",
      manageStore: "yes",
      shipping: "no",
      accounts: "yes-accounts",
      accountFeatures: ["save-info"],
      goals: ["something-else"],
      goalsOther: "A private tool",
    });
    const cleared = applyInquiryPatch(filled, {
      projectType: "business-website",
      payments: "no-payments",
      accounts: "no-accounts",
      goals: ["present-business"],
    });
    expect(cleared.productCount).toBeNull();
    expect(cleared.manageStore).toBeNull();
    expect(cleared.shipping).toBeNull();
    expect(cleared.accountFeatures).toEqual([]);
    expect(cleared.goalsOther).toBe("");
  });
});
