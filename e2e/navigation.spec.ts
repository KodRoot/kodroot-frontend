import { expect, test } from "@playwright/test";

test.describe("navigation", () => {
  test("header, logo, footer, and hash links go to the intended places", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", {
        name: "Software built on solid foundations.",
      }),
    ).toBeVisible();

    await page.getByRole("link", { name: "What we build" }).first().click();
    await expect(page).toHaveURL(/#services/);
    await expect(page.locator("#services")).toBeInViewport();

    await page.getByRole("link", { name: "Approach" }).first().click();
    await expect(page).toHaveURL(/#approach/);
    await expect(page.locator("#approach")).toBeInViewport();

    await page
      .getByRole("link", { name: "Discuss your project" })
      .first()
      .click();
    await expect(page).toHaveURL(/\/discuss-your-project$/);
    await expect(
      page.getByRole("heading", { name: "Discuss your project" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Discuss your project" }).first(),
    ).toHaveAttribute("aria-current", "page");

    await page.getByRole("link", { name: "KodRoot home" }).first().click();
    await expect(page).toHaveURL("/");

    await page.getByRole("link", { name: "Privacy policy" }).click();
    await expect(page).toHaveURL(/\/privacy$/);
    await page.getByRole("link", { name: "Terms and conditions" }).click();
    await expect(page).toHaveURL(/\/terms$/);

    await page.goBack();
    await expect(page).toHaveURL(/\/privacy$/);
    await page.goForward();
    await expect(page).toHaveURL(/\/terms$/);

    const mailto = page
      .getByRole("link", { name: "hello@kodroot.com" })
      .first();
    await expect(mailto).toHaveAttribute("href", "mailto:hello@kodroot.com");
  });

  test("mobile menu opens, closes, and navigates", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const menu = page.getByRole("button", { name: "Menu" });
    await expect(menu).toBeVisible();
    await menu.click();
    await expect(page.getByRole("dialog", { name: "Site menu" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Site menu" })).toHaveCount(
      0,
    );

    await menu.click();
    await page.getByRole("button", { name: "Close" }).click();
    await expect(page.getByRole("dialog", { name: "Site menu" })).toHaveCount(
      0,
    );

    await menu.click();
    await page
      .getByRole("dialog", { name: "Site menu" })
      .getByRole("link", { name: /What we build/ })
      .click();
    await expect(page).toHaveURL(/#services/);
    await expect(page.getByRole("dialog", { name: "Site menu" })).toHaveCount(
      0,
    );
  });

  test("unknown routes render the branded not-found page", async ({
    page,
    request,
  }) => {
    const response = await page.goto("/this-page-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { name: "This page is not on the site." }),
    ).toBeVisible();

    const api = await request.get("/api/inquiry");
    expect(api.status()).toBe(405);
  });

  test("skip link moves keyboard focus to main content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: "Skip to content" }),
    ).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#main-content")).toBeVisible();
  });
});
