import { expect, test, type Page } from "@playwright/test";
import {
  chooseOption,
  continueInquiry,
  fillHappyPath,
  useOwnClientAddress,
  validInquiry,
} from "./helpers/inquiry";

type VaCall = [string, { name?: string; data?: Record<string, unknown> }?];

async function recordAnalytics(page: Page) {
  await page.addInitScript(() => {
    const calls: unknown[] = [];
    (window as unknown as { __va: unknown[] }).__va = calls;
    (window as unknown as { va: unknown }).va = (...args: unknown[]) => {
      calls.push(args);
    };
  });
}

async function events(page: Page) {
  const calls = await page.evaluate(
    () => (window as unknown as { __va: VaCall[] }).__va,
  );
  return calls
    .filter(([kind]) => kind === "event")
    .map(([, payload]) => ({ name: payload?.name, data: payload?.data }));
}

const campaign = "?utm_source=newsletter&utm_medium=email&email=a@b.co";

test.describe("form analytics events", () => {
  test("send nothing on load and one form_started on the first interaction", async ({
    page,
  }) => {
    await recordAnalytics(page);
    await page.goto(`/discuss-your-project${campaign}`);
    await expect(
      page.getByRole("heading", { name: "What are you looking to build?" }),
    ).toBeVisible();
    expect(await events(page)).toEqual([]);

    await chooseOption(page, "A business website");
    await chooseOption(page, "A web application");
    expect(await events(page)).toEqual([
      {
        name: "form_started",
        data: { utm_source: "newsletter", utm_medium: "email" },
      },
    ]);
  });

  test("send each step once and keep campaign values after client navigation", async ({
    page,
  }) => {
    await recordAnalytics(page);
    await page.goto(`/${campaign}`);
    await page
      .getByRole("banner")
      .getByRole("link", { name: "Discuss your project" })
      .click();
    await expect(page).toHaveURL(/\/discuss-your-project$/);

    await chooseOption(page, "A business website");
    await continueInquiry(page);
    await page.getByRole("button", { name: "Back" }).click();
    await continueInquiry(page);

    const names = (await events(page)).map((event) => ({
      name: event.name,
      step: event.data?.step,
      index: event.data?.index,
    }));
    expect(names).toEqual([
      { name: "form_started", step: undefined, index: undefined },
      { name: "form_step_reached", step: "goals", index: 2 },
    ]);
    for (const event of await events(page)) {
      expect(event.data).toMatchObject({
        utm_source: "newsletter",
        utm_medium: "email",
      });
    }
  });

  test("send inquiry_sent once after success and never any answers", async ({
    page,
  }) => {
    await recordAnalytics(page);
    await useOwnClientAddress(page);
    await page.goto(`/discuss-your-project${campaign}`);
    await fillHappyPath(page);
    await page.getByRole("button", { name: "Send inquiry" }).click();
    await expect(
      page.getByRole("heading", { name: "We have the brief." }),
    ).toBeVisible();

    const sent = (await events(page)).filter(
      (event) => event.name === "inquiry_sent",
    );
    expect(sent).toEqual([
      {
        name: "inquiry_sent",
        data: { utm_source: "newsletter", utm_medium: "email" },
      },
    ]);

    const serialised = JSON.stringify(await events(page));
    expect(serialised).not.toContain(validInquiry.email);
    expect(serialised).not.toContain(validInquiry.name);
    expect(serialised).not.toContain("services page");
    expect(serialised).not.toContain("business-website");
    expect(serialised).not.toContain("flexible");

    const allowed = new Set(["step", "index", "utm_source", "utm_medium"]);
    for (const event of await events(page)) {
      for (const key of Object.keys(event.data ?? {})) {
        expect(allowed.has(key)).toBe(true);
      }
    }
  });

  test("do not send inquiry_sent when the server rejects the inquiry, then send once on a successful retry", async ({
    page,
  }) => {
    await recordAnalytics(page);
    let attempt = 0;
    await page.route("**/api/inquiry", async (route) => {
      attempt += 1;
      if (attempt === 1) {
        await route.fulfill({
          status: 502,
          contentType: "application/json",
          body: JSON.stringify({ status: "error", message: "Try again." }),
        });
        return;
      }
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ status: "received" }),
      });
    });
    await page.goto("/discuss-your-project");
    await fillHappyPath(page);
    await page.getByRole("button", { name: "Send inquiry" }).click();
    await expect(page.locator("p[role='alert']")).toBeVisible();
    expect(
      (await events(page)).filter((event) => event.name === "inquiry_sent"),
    ).toHaveLength(0);

    await page.getByRole("button", { name: "Send inquiry" }).click();
    await expect(
      page.getByRole("heading", { name: "We have the brief." }),
    ).toBeVisible();
    expect(
      (await events(page)).filter((event) => event.name === "inquiry_sent"),
    ).toHaveLength(1);
  });

  test("do not send inquiry_sent for a 200 without the success shape", async ({
    page,
  }) => {
    await recordAnalytics(page);
    await page.route("**/api/inquiry", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ status: "error", message: "Not sent." }),
      }),
    );
    await page.goto("/discuss-your-project");
    await fillHappyPath(page);
    await page.getByRole("button", { name: "Send inquiry" }).click();
    await expect(page.locator("p[role='alert']")).toBeVisible();
    expect(
      (await events(page)).filter((event) => event.name === "inquiry_sent"),
    ).toHaveLength(0);
  });
});
