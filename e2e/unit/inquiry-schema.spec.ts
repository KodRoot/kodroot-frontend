import { expect, test } from "@playwright/test";
import { inquiryRequest } from "../helpers/inquiry";
import {
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
    expect(validateInquiryStep("type", emptyInquiryAnswers)).toMatch(/Choose/);
    expect(
      validateInquiryStep("type", {
        ...emptyInquiryAnswers,
        projectType: "business-website",
      }),
    ).toBeNull();
  });
});
