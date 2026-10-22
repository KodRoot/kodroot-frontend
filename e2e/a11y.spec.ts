import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/discuss-your-project",
  "/faq",
  "/privacy",
  "/terms",
] as const;

test.describe("accessibility", () => {
  for (const route of routes) {
    test(`has no serious axe violations on ${route}`, async ({ page }) => {
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      const serious = results.violations.filter(
        (violation) =>
          violation.impact === "serious" || violation.impact === "critical",
      );
      expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
    });
  }

  test("inquiry errors are announced", async ({ page }) => {
    await page.goto("/discuss-your-project");
    await page.getByRole("button", { name: "Continue" }).click();
    const alert = page.locator("p[role='alert']");
    await expect(alert).toBeVisible();
    await expect(alert).toBeFocused();
  });

  test("header controls expose accessible names", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("banner").getByRole("link", { name: "KodRoot home" }),
    ).toBeVisible();
    await expect(page.getByRole("banner")).toBeVisible();
  });
});
