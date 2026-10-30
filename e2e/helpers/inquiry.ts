import { expect, type APIRequestContext, type Page } from "@playwright/test";

export const validInquiry = {
  projectType: "business-website",
  goals: ["present-business"],
  goalsOther: "",
  payments: "no-payments",
  productCount: null,
  manageStore: null,
  shipping: null,
  accounts: "no-accounts",
  accountFeatures: [],
  contentManagement: "mostly-static",
  integrations: ["nothing"],
  integrationsOther: "",
  timeline: "flexible",
  name: "Alex Rivera",
  businessName: "Rivera Studio",
  email: "alex.rivera@example.com",
  projectDescription:
    "A small business site with a clear services page and a way to enquire.",
  existingWebsite: "",
  consent: true,
} as const;

export function inquiryRequest(overrides: Record<string, unknown> = {}) {
  return {
    ...validInquiry,
    company: "",
    startedAt: Date.now() - 5_000,
    submissionId: crypto.randomUUID(),
    ...overrides,
  };
}

export async function postInquiry(
  request: APIRequestContext,
  body: unknown,
  headers: Record<string, string> = {},
) {
  return request.post("/api/inquiry", {
    data: body,
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": `198.51.100.${Math.floor(Math.random() * 200) + 20}`,
      ...headers,
    },
  });
}

// Gives a page its own client address so tests that post to the real route do
// not share the per-address rate limit.
export async function useOwnClientAddress(page: Page) {
  const address = `192.0.2.${Math.floor(Math.random() * 200) + 20}`;
  await page.route("**/api/inquiry", (route) =>
    route.continue({
      headers: { ...route.request().headers(), "x-forwarded-for": address },
    }),
  );
}

export async function chooseOption(page: Page, label: string) {
  await page
    .locator("label.inquiry-choice")
    .filter({ has: page.getByText(label, { exact: true }) })
    .click();
}

export async function chooseMany(page: Page, label: string) {
  await page
    .locator("label.inquiry-choice")
    .filter({ has: page.getByText(label, { exact: true }) })
    .click();
}

export async function continueInquiry(page: Page) {
  await page.getByRole("button", { name: "Continue" }).click();
}

// The API refuses forms filled in under two seconds. Scripted clicks can beat
// that, so tests that post to the real route wait like a person would.
const MIN_HUMAN_FILL_MS = 2_300;

async function padToHumanSpeed(page: Page, startedAt: number) {
  const remaining = MIN_HUMAN_FILL_MS - (Date.now() - startedAt);
  if (remaining > 0) {
    await page.waitForTimeout(remaining);
  }
}

export async function fillHappyPath(page: Page) {
  const startedAt = Date.now();
  await chooseOption(page, "A business website");
  await page
    .getByRole("textbox", { name: /Project description/i })
    .fill(validInquiry.projectDescription);
  await continueInquiry(page);
  await expect(
    page.getByRole("heading", {
      name: "What should it help you do?",
    }),
  ).toBeVisible();

  await chooseMany(page, "Present my business and services");
  await continueInquiry(page);
  await expect(
    page.getByRole("heading", { name: "How will people use it?" }),
  ).toBeVisible();

  await chooseOption(page, "No, nothing needs to be paid for online");
  await chooseOption(page, "No, people can use it without signing in");
  await continueInquiry(page);
  await expect(
    page.getByRole("heading", {
      name: "How would you like to run it day to day?",
    }),
  ).toBeVisible();

  await chooseOption(page, "No, it can stay mostly as it is");
  await chooseMany(page, "Nothing specific");
  await continueInquiry(page);
  await expect(
    page.getByRole("heading", { name: "When do you hope to launch?" }),
  ).toBeVisible();

  await chooseOption(page, "I’m flexible");
  await continueInquiry(page);
  await expect(
    page.getByRole("heading", { name: "How should we reach you?" }),
  ).toBeVisible();

  await page.locator("#inquiry-name").fill(validInquiry.name);
  await page.locator("#inquiry-email").fill(validInquiry.email);
  await page.getByRole("checkbox", { name: /I agree that KodRoot/ }).check();
  await continueInquiry(page);
  await expect(
    page.getByRole("heading", { name: "Check your answers." }),
  ).toBeVisible();
  await padToHumanSpeed(page, startedAt);
}

export async function fillMinimalPath(page: Page) {
  const startedAt = Date.now();
  await chooseOption(page, "A business website");
  await continueInquiry(page);
  await chooseMany(page, "Present my business and services");
  await continueInquiry(page);
  await expect(
    page.getByRole("heading", { name: "How will people use it?" }),
  ).toBeVisible();
  await continueInquiry(page);
  await expect(
    page.getByRole("heading", {
      name: "How would you like to run it day to day?",
    }),
  ).toBeVisible();
  await continueInquiry(page);
  await chooseOption(page, "I’m flexible");
  await continueInquiry(page);
  await expect(
    page.getByRole("heading", { name: "How should we reach you?" }),
  ).toBeVisible();
  await page.locator("#inquiry-name").fill(validInquiry.name);
  await page.locator("#inquiry-email").fill(validInquiry.email);
  await page.getByRole("checkbox", { name: /I agree that KodRoot/ }).check();
  await padToHumanSpeed(page, startedAt);
}

export async function assertNoPageErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => {
    errors.push(error.message);
  });
  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(message.text());
    }
  });
  return () => {
    const unexpected = errors.filter(
      (message) =>
        !message.includes("favicon") &&
        !message.includes("Download the React DevTools"),
    );
    expect(unexpected, unexpected.join("\n")).toEqual([]);
  };
}
