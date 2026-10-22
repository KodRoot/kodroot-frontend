import { expect, test } from "@playwright/test";
import {
  chooseMany,
  chooseOption,
  continueInquiry,
  fillHappyPath,
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

  test("validates the description and an invalid email", async ({ page }) => {
    await page.goto("/discuss-your-project");
    await chooseOption(page, "A business website");
    await continueInquiry(page);
    await continueInquiry(page);
    await expect(page.locator("p[role='alert']")).toContainText(
      "Describe the project in a sentence or two.",
    );

    await page
      .getByRole("textbox", { name: /Project description/i })
      .fill("A small business site with a services page.");
    await continueInquiry(page);
    await chooseMany(page, "Present my business and services");
    await continueInquiry(page);
    await chooseOption(page, "No, I only need to present my business");
    await continueInquiry(page);
    await chooseOption(
      page,
      "No, visitors can use the website without signing in",
    );
    await continueInquiry(page);
    await chooseOption(page, "No, the information can stay mostly as it is");
    await continueInquiry(page);
    await chooseMany(page, "Nothing specific");
    await continueInquiry(page);
    await chooseOption(page, "I’d rather discuss it");
    await chooseOption(page, "I’m flexible");
    await continueInquiry(page);

    await page.locator("#inquiry-name").fill("Alex");
    await page.locator("#inquiry-email").fill("not-an-email");
    await page.getByRole("checkbox", { name: /I agree that KodRoot/ }).check();
    await continueInquiry(page);
    await expect(page.locator("p[role='alert']")).toContainText("valid email");
  });

  test("preserves answers when moving backward", async ({ page }) => {
    await page.goto("/discuss-your-project");
    await chooseOption(page, "A business website");
    await continueInquiry(page);
    await page
      .getByRole("textbox", { name: /Project description/i })
      .fill("A small business site with a services page.");
    await continueInquiry(page);
    await page.getByRole("button", { name: "Back" }).click();
    await expect(
      page.getByRole("textbox", { name: /Project description/i }),
    ).toHaveValue("A small business site with a services page.");
  });

  test("shows success only when the server accepts the inquiry", async ({
    page,
  }) => {
    await page.goto("/discuss-your-project");
    await fillHappyPath(page);
    await page.getByRole("button", { name: "Send inquiry" }).click();
    await expect(
      page.getByRole("heading", { name: "We have the brief." }),
    ).toBeVisible();
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
    await page.getByRole("button", { name: "Continue" }).focus();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("heading", { name: "What should we know about it?" }),
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
