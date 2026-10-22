import { expect, test } from "@playwright/test";

test.describe("privacy and analytics", () => {
  test("the privacy policy describes analytics, Resend, and how to write", async ({
    page,
  }) => {
    await page.goto("/privacy");
    await expect(page).toHaveTitle(/Privacy policy — KodRoot/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://kodroot.com/privacy",
    );
    await expect(
      page.getByRole("heading", { name: "Website analytics" }),
    ).toBeVisible();
    await expect(page.locator("main")).toContainText("Vercel Web Analytics");
    await expect(page.locator("main")).toContainText(
      "does not set analytics cookies",
    );
    await expect(page.locator("main")).toContainText("Resend");
    await expect(page.locator("main")).toContainText("hello@kodroot.com");
    await expect(
      page
        .getByRole("contentinfo")
        .getByRole("link", { name: "Privacy policy" }),
    ).toHaveAttribute("href", "/privacy");
  });

  test("does not show a cookie banner and does not set analytics cookies", async ({
    page,
    context,
  }) => {
    await page.goto("/");
    await expect(page.locator("#hero-heading")).toBeVisible();
    await expect(
      page.getByRole("button", {
        name: /accept cookies|reject cookies|accept all|reject all/i,
      }),
    ).toHaveCount(0);
    await expect(
      page.getByRole("dialog", { name: /cookie|consent/i }),
    ).toHaveCount(0);

    await page
      .getByRole("banner")
      .getByRole("link", { name: "Discuss your project" })
      .click();
    await expect(page).toHaveURL(/\/discuss-your-project$/);

    const tracking = (await context.cookies()).filter((cookie) =>
      /^(va|vaid|_ga|_gid|_fbp|_gid)/i.test(cookie.name),
    );
    expect(tracking).toEqual([]);
  });

  test("loads the Vercel Analytics script once and keeps client navigation usable", async ({
    page,
  }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await page.goto("/");
    await expect
      .poll(async () => page.evaluate(() => typeof window.va))
      .toBe("function");
    await expect(page.locator('script[src*="insights"]')).toHaveCount(1);

    await page
      .getByRole("banner")
      .getByRole("link", { name: "Discuss your project" })
      .click();
    await expect(
      page.getByRole("heading", { name: "What are you looking to build?" }),
    ).toBeVisible();
    await expect(page.locator('script[src*="insights"]')).toHaveCount(1);
    expect(pageErrors).toEqual([]);
  });
});
