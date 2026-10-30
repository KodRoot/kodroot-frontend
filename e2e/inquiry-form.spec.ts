import { expect, test } from "@playwright/test";
import {
  chooseMany,
  chooseOption,
  continueInquiry,
  fillHappyPath,
  fillMinimalPath,
  useOwnClientAddress,
} from "./helpers/inquiry";

test.describe("project inquiry form", () => {
  test("blocks an empty first step and keeps the user on the question", async ({
    page,
  }) => {
    await page.goto("/discuss-your-project");
    await continueInquiry(page);
    await expect(page.locator("p[role='alert']")).toContainText(
      "Choose the option that best matches what you want to build.",
    );
    await expect(
      page.getByRole("heading", { name: "What are you looking to build?" }),
    ).toBeVisible();
  });

  test("lets the description and technical questions be skipped, but validates an invalid email", async ({
    page,
  }) => {
    await page.goto("/discuss-your-project");
    await chooseOption(page, "A business website");
    await continueInquiry(page);
    await expect(page.locator("p[role='alert']")).toHaveCount(0);
    await expect(
      page.getByRole("heading", { name: "What should it help you do?" }),
    ).toBeVisible();

    await continueInquiry(page);
    await expect(page.locator("p[role='alert']")).toContainText(
      "Select at least one outcome",
    );
    await chooseMany(page, "Present my business and services");
    await continueInquiry(page);
    await continueInquiry(page);
    await continueInquiry(page);
    await continueInquiry(page);
    await expect(page.locator("p[role='alert']")).toContainText(
      "Choose when you hope to launch",
    );
    await chooseOption(page, "I’m flexible");
    await continueInquiry(page);

    await page.locator("#inquiry-name").fill("Alex");
    await page.locator("#inquiry-email").fill("not-an-email");
    await page.getByRole("checkbox", { name: /I agree that KodRoot/ }).check();
    await continueInquiry(page);
    await expect(page.locator("p[role='alert']")).toContainText("valid email");
  });

  test("sends an inquiry with only the required answers", async ({ page }) => {
    await useOwnClientAddress(page);
    let body: Record<string, unknown> | null = null;
    page.on("request", (request) => {
      if (request.url().endsWith("/api/inquiry")) {
        body = request.postDataJSON() as Record<string, unknown>;
      }
    });
    await page.goto("/discuss-your-project");
    await fillMinimalPath(page);
    await continueInquiry(page);
    await expect(
      page.getByRole("heading", { name: "Check your answers." }),
    ).toBeVisible();
    await expect(page.getByText("Not answered").first()).toBeVisible();
    await page.getByRole("button", { name: "Send inquiry" }).click();
    await expect(
      page.getByRole("heading", { name: "We have the brief." }),
    ).toBeVisible();
    expect(body).toMatchObject({
      projectType: "business-website",
      projectDescription: "",
      payments: null,
      accounts: null,
      contentManagement: null,
      referral: null,
    });
  });

  test("offers an optional referral question and shows it on review", async ({
    page,
  }) => {
    await page.goto("/discuss-your-project");
    await fillMinimalPath(page);
    await expect(
      page.getByRole("group", { name: "How did you hear about us?" }),
    ).toBeVisible();
    await expect(
      page
        .getByRole("group", { name: "How did you hear about us?" })
        .getByRole("radio"),
    ).toHaveCount(5);
    await chooseOption(page, "A friend or colleague");
    await continueInquiry(page);
    const review = page.locator("dl");
    await expect(review).toContainText("How you heard about us");
    await expect(review).toContainText("A friend or colleague");

    await useOwnClientAddress(page);
    let body: Record<string, unknown> | null = null;
    page.on("request", (request) => {
      if (request.url().endsWith("/api/inquiry")) {
        body = request.postDataJSON() as Record<string, unknown>;
      }
    });
    await page.getByRole("button", { name: "Send inquiry" }).click();
    await expect(
      page.getByRole("heading", { name: "We have the brief." }),
    ).toBeVisible();
    expect(body).toMatchObject({ referral: "referral" });
  });

  test("renders single choices as circles and multiple choices as squares", async ({
    page,
  }) => {
    await page.goto("/discuss-your-project");
    const radioIndicator = page
      .locator("label.inquiry-choice")
      .first()
      .locator("span[aria-hidden='true']");
    const radius = await radioIndicator.evaluate(
      (node) => getComputedStyle(node).borderTopLeftRadius,
    );
    expect(Number.parseFloat(radius)).toBeGreaterThan(4);

    await chooseOption(page, "A business website");
    await continueInquiry(page);
    const checkboxIndicator = page
      .locator("label.inquiry-choice")
      .first()
      .locator("span[aria-hidden='true']");
    expect(
      await checkboxIndicator.evaluate(
        (node) => getComputedStyle(node).borderTopLeftRadius,
      ),
    ).toBe("0px");
  });

  test("preserves answers when moving backward", async ({ page }) => {
    await page.goto("/discuss-your-project");
    await chooseOption(page, "A business website");
    await page
      .getByRole("textbox", { name: /Project description/i })
      .fill("A small business site with a services page.");
    await continueInquiry(page);
    await page.getByRole("button", { name: "Back" }).click();
    await expect(
      page.getByRole("textbox", { name: /Project description/i }),
    ).toHaveValue("A small business site with a services page.");
  });

  test("keeps the next question in view after continue", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 700 });
    await page.goto("/discuss-your-project");
    await chooseOption(page, "A business website");
    await page
      .getByRole("textbox", { name: /Project description/i })
      .fill("A small business site with a services page.");
    await continueInquiry(page);
    const heading = page.getByRole("heading", {
      name: "What should it help you do?",
    });
    await expect(heading).toBeVisible();
    await expect(heading).toBeInViewport();

    await page.getByRole("button", { name: "Back" }).click();
    const previous = page.getByRole("heading", {
      name: "What are you looking to build?",
    });
    await expect(previous).toBeVisible();
    await expect(previous).toBeInViewport();
  });

  test("returns to review after changing an answer", async ({ page }) => {
    await page.goto("/discuss-your-project");
    await fillHappyPath(page);
    await page.getByRole("button", { name: "Change" }).first().click();
    await expect(
      page.getByRole("heading", { name: "What are you looking to build?" }),
    ).toBeVisible();
    await continueInquiry(page);
    await expect(
      page.getByRole("heading", { name: "Check your answers." }),
    ).toBeVisible();
  });

  test("shows success only when the server accepts the inquiry", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 700 });
    await page.goto("/discuss-your-project");
    await fillHappyPath(page);
    await page.getByRole("button", { name: "Send inquiry" }).click();
    const heading = page.getByRole("heading", { name: "We have the brief." });
    await expect(heading).toBeVisible();
    await expect(heading).toBeInViewport();
    await expect(page.getByText("Received")).toBeInViewport();
    await expect(page.getByRole("status")).toContainText(
      "KodRoot will reply by email",
    );
  });

  test("surfaces a network failure without claiming success", async ({
    page,
  }) => {
    await page.route("**/api/inquiry", (route) => route.abort("failed"));
    await page.goto("/discuss-your-project");
    await fillHappyPath(page);
    await page.getByRole("button", { name: "Send inquiry" }).click();
    await expect(page.locator("p[role='alert']")).toContainText(
      "Check your connection",
    );
    await expect(
      page.getByRole("heading", { name: "We have the brief." }),
    ).toHaveCount(0);
  });

  test("surfaces a server error and a rate-limit response", async ({
    page,
  }) => {
    await page.route("**/api/inquiry", async (route) => {
      await route.fulfill({
        status: 502,
        contentType: "application/json",
        body: JSON.stringify({
          status: "error",
          message: "The inquiry was not sent. Try again in a moment.",
        }),
      });
    });
    await page.goto("/discuss-your-project");
    await fillHappyPath(page);
    await page.getByRole("button", { name: "Send inquiry" }).click();
    await expect(page.locator("p[role='alert']")).toContainText("was not sent");

    await page.unroute("**/api/inquiry");
    await page.route("**/api/inquiry", async (route) => {
      await route.fulfill({
        status: 429,
        contentType: "application/json",
        body: JSON.stringify({
          status: "limited",
          message:
            "Too many attempts from this connection. Wait, then try again.",
        }),
      });
    });
    await page.getByRole("button", { name: "Send inquiry" }).click();
    await expect(page.locator("p[role='alert']")).toContainText(
      "Too many attempts",
    );
  });

  test("does not send a second inquiry while one is in progress", async ({
    page,
  }) => {
    let posts = 0;
    let release!: () => void;
    const held = new Promise<void>((resolve) => {
      release = resolve;
    });
    await page.route("**/api/inquiry", async (route) => {
      posts += 1;
      await held;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ status: "received" }),
      });
    });
    await page.goto("/discuss-your-project");
    await fillHappyPath(page);
    await page.getByRole("button", { name: "Send inquiry" }).click();
    const sending = page.getByRole("button", { name: "Sending" });
    await expect(sending).toBeDisabled();
    await sending.click({ force: true });
    expect(posts).toBe(1);
    release();
    await expect(
      page.getByRole("heading", { name: "We have the brief." }),
    ).toBeVisible();
    expect(posts).toBe(1);
  });

  test("can be completed with the keyboard", async ({ page }) => {
    await page.goto("/discuss-your-project");
    await chooseOption(page, "A business website");
    await page
      .getByRole("textbox", { name: /Project description/i })
      .fill("A small business site with a services page.");
    await page.getByRole("button", { name: "Continue" }).focus();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("heading", {
        name: "What should it help you do?",
      }),
    ).toBeVisible();
  });

  test("stays usable on a narrow viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/discuss-your-project");
    await expect(
      page.getByRole("heading", { name: "What are you looking to build?" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Continue" })).toBeVisible();
  });

  test("shows the progress and first question in the first phone screen", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/discuss-your-project");
    const heading = page.getByRole("heading", {
      name: "What are you looking to build?",
    });
    await expect(heading).toBeInViewport();
    await expect(page.getByRole("progressbar")).toBeInViewport();
    const box = await heading.boundingBox();
    expect(box?.y ?? Number.POSITIVE_INFINITY).toBeLessThan(812 * 0.4);
  });

  test("reload after success does not keep a received state", async ({
    page,
  }) => {
    await page.goto("/discuss-your-project");
    await fillHappyPath(page);
    await page.getByRole("button", { name: "Send inquiry" }).click();
    await expect(
      page.getByRole("heading", { name: "We have the brief." }),
    ).toBeVisible();
    await page.reload();
    await expect(
      page.getByRole("heading", { name: "What are you looking to build?" }),
    ).toBeVisible();
  });
});
