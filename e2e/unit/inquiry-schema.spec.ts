import { expect, test } from "@playwright/test";
import { inquiryRequest } from "../helpers/inquiry";
import {
  applyInquiryPatch,
  inquiryRequestMetaSchema,
  inquirySubmissionSchema,
  validateInquiryStep,
} from "../../lib/inquiry/schema";
import { emptyInquiryAnswers } from "../../lib/inquiry/defaults";
import { formatInquiryBrief, summarizeInquiry } from "../../lib/inquiry/brief";

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

  test("accepts store follow-up gaps because they are optional", () => {
    const parsed = inquirySubmissionSchema.safeParse(
      inquiryRequest({
        projectType: "online-store",
        payments: "sell-products",
        productCount: null,
        manageStore: null,
        shipping: null,
      }),
    );
    expect(parsed.success).toBe(true);
  });

  test("accepts a submission with only the required answers", () => {
    const parsed = inquirySubmissionSchema.safeParse({
      projectType: "web-application",
      goals: ["automation"],
      goalsOther: "",
      accountFeatures: [],
      integrations: [],
      integrationsOther: "",
      timeline: "flexible",
      name: "Alex Rivera",
      businessName: "",
      email: "alex.rivera@example.com",
      existingWebsite: "",
      consent: true,
    });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.projectDescription).toBe("");
      const brief = formatInquiryBrief(parsed.data);
      expect(brief).toContain("Online payments: Not answered");
      expect(brief).toContain("Customer accounts: Not answered");
      expect(brief).toContain("Updating the content: Not answered");
      expect(brief).toContain("How they heard about KodRoot: Not answered");
      expect(brief).not.toContain("Attribution:");
      expect(brief).not.toContain("undefined");
      expect(brief).not.toContain("null");
    }
  });

  test("still requires the essentials", () => {
    for (const override of [
      { projectType: null },
      { goals: [] },
      { goals: ["something-else"], goalsOther: "  " },
      { timeline: null },
      { name: "  " },
      { email: "nope" },
      { consent: false },
    ]) {
      expect(
        inquirySubmissionSchema.safeParse(inquiryRequest(override)).success,
        JSON.stringify(override),
      ).toBe(false);
    }
  });

  test("accepts a short or empty description", () => {
    for (const projectDescription of ["", "Short"]) {
      expect(
        inquirySubmissionSchema.safeParse(
          inquiryRequest({ projectDescription }),
        ).success,
      ).toBe(true);
    }
    expect(
      inquirySubmissionSchema.safeParse(
        inquiryRequest({ projectDescription: "x".repeat(4001) }),
      ).success,
    ).toBe(false);
  });

  test("validates the optional referral answer", () => {
    for (const referral of [null, undefined, "google", "referral", "other"]) {
      expect(
        inquirySubmissionSchema.safeParse(inquiryRequest({ referral })).success,
      ).toBe(true);
    }
    expect(
      inquirySubmissionSchema.safeParse(inquiryRequest({ referral: "tv" }))
        .success,
    ).toBe(false);
    const parsed = inquirySubmissionSchema.safeParse(
      inquiryRequest({ referral: "referral" }),
    );
    expect(parsed.success && formatInquiryBrief(parsed.data)).toContain(
      "How they heard about KodRoot: A friend or colleague",
    );
  });

  test("validates attribution and keeps only allowlisted keys", () => {
    const parsed = inquirySubmissionSchema.safeParse(
      inquiryRequest({
        attribution: {
          utm_source: "newsletter",
          utm_medium: " email ",
          injected: "x",
        },
      }),
    );
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.attribution).toEqual({
        utm_source: "newsletter",
        utm_medium: "email",
      });
      expect(formatInquiryBrief(parsed.data)).toContain(
        "Attribution: utm_source=newsletter; utm_medium=email",
      );
    }
    expect(
      inquirySubmissionSchema.safeParse(
        inquiryRequest({ attribution: { utm_source: "x".repeat(101) } }),
      ).success,
    ).toBe(false);
    expect(
      inquirySubmissionSchema.safeParse(
        inquiryRequest({
          attribution: { utm_source: "a\nBcc: b@example.com" },
        }),
      ).success,
    ).toBe(false);
    expect(
      inquirySubmissionSchema.safeParse(
        inquiryRequest({ attribution: { utm_source: 5 } }),
      ).success,
    ).toBe(false);
  });

  test("summarises unanswered optional questions on the review step", () => {
    const items = summarizeInquiry({
      ...emptyInquiryAnswers,
      projectType: "online-store",
      goals: ["sell"],
      timeline: "flexible",
    });
    const value = (label: string) =>
      items.find((item) => item.label === label)?.value;
    expect(value("Project")).toBe("Not answered");
    expect(value("Online payments")).toBe("Not answered");
    expect(value("Catalogue size")).toBe("Not answered");
    expect(value("Customer accounts")).toBe("Not answered");
    expect(value("Updating the content")).toBe("Not answered");
    expect(value("How you heard about us")).toBe("Not answered");
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

  test("only requires a project type on the first step", () => {
    expect(validateInquiryStep("project", emptyInquiryAnswers)).toMatch(
      /Choose/,
    );
    expect(
      validateInquiryStep("project", {
        ...emptyInquiryAnswers,
        projectType: "business-website",
      }),
    ).toBeNull();
    expect(
      validateInquiryStep("project", {
        ...emptyInquiryAnswers,
        projectType: "business-website",
        projectDescription: "A small business site with a services page.",
      }),
    ).toBeNull();
  });

  test("does not require the technical questions in the browser", () => {
    expect(validateInquiryStep("customers", emptyInquiryAnswers)).toBeNull();
    expect(
      validateInquiryStep("customers", {
        ...emptyInquiryAnswers,
        projectType: "online-store",
      }),
    ).toBeNull();
    expect(validateInquiryStep("running", emptyInquiryAnswers)).toBeNull();
    expect(
      validateInquiryStep("running", {
        ...emptyInquiryAnswers,
        integrations: ["other"],
      }),
    ).toMatch(/other tools/);
    expect(validateInquiryStep("contact", emptyInquiryAnswers)).toMatch(/name/);
    expect(
      validateInquiryStep("contact", {
        ...emptyInquiryAnswers,
        name: "Alex",
        email: "alex@example.com",
        consent: true,
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
