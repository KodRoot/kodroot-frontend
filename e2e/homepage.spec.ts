import { expect, test } from "@playwright/test";
import { assertNoHorizontalOverflow } from "./helpers/layout";

test.describe("homepage", () => {
  test("renders the major sections and keeps CTAs usable", async ({ page }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await page.goto("/");
    await expect(page.locator("#hero-heading")).toBeVisible();
    await expect(page.locator("#services")).toBeVisible();
    await expect(page.locator("#intelligence")).toBeVisible();
    await expect(page.locator("#approach")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Discuss your project" }).last(),
    ).toBeVisible();

    const widths = await page
      .locator("img")
      .evaluateAll((images) =>
        images.map((image) =>
          image instanceof HTMLImageElement ? image.naturalWidth : 0,
        ),
      );
    expect(widths.length).toBeGreaterThan(0);
    expect(widths.every((width) => width > 0)).toBe(true);

    await page
      .getByRole("link", { name: "Discuss your project" })
      .nth(1)
      .click();
    await expect(page).toHaveURL(/\/discuss-your-project$/);

    expect(pageErrors).toEqual([]);
  });

  test("remains readable when motion is reduced", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator("#hero-heading")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Discuss your project" }).first(),
    ).toBeEnabled();
    const line = page.locator(".hero-line").first();
    await expect(line).toHaveCSS("animation-name", "none");
  });

  test("does not introduce a horizontal scrollbar on desktop", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await assertNoHorizontalOverflow(page);
  });
});
