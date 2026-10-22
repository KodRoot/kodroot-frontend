import { expect, test } from "@playwright/test";
import { assertNoHorizontalOverflow, viewports } from "./helpers/layout";

const routes = ["/", "/discuss-your-project", "/privacy"] as const;

test.describe("responsive layout", () => {
  for (const viewport of viewports) {
    test(`does not overflow at ${viewport.width}x${viewport.height}`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      for (const route of routes) {
        await page.goto(route);
        await assertNoHorizontalOverflow(page);
        await expect(page.locator("header")).toBeVisible();
        await expect(page.locator("footer")).toBeVisible();
      }
    });
  }

  test("uses the menu on a phone-sized viewport and the nav on desktop", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Menu" })).toBeVisible();
    await expect(page.locator("header nav.lg\\:flex")).toBeHidden();

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await expect(page.locator("header nav.lg\\:flex")).toBeVisible();
    await expect(page.getByRole("button", { name: "Menu" })).toHaveCount(0);
  });

  test("records visual snapshots of key pages", async ({ page }) => {
    test.skip(!process.env.E2E_SCREENSHOTS, "Visual files are opt-in.");
    const shots = [
      { route: "/", name: "home", width: 1440, height: 900 },
      { route: "/", name: "home", width: 390, height: 844 },
      { route: "/", name: "home", width: 320, height: 568 },
      { route: "/", name: "home", width: 768, height: 1024 },
      {
        route: "/discuss-your-project",
        name: "discuss",
        width: 1440,
        height: 900,
      },
      {
        route: "/discuss-your-project",
        name: "discuss",
        width: 390,
        height: 844,
      },
      { route: "/privacy", name: "privacy", width: 1280, height: 800 },
    ] as const;
    for (const shot of shots) {
      await page.setViewportSize({ width: shot.width, height: shot.height });
      await page.goto(shot.route, { waitUntil: "networkidle" });
      await page.screenshot({
        path: `reports/screenshots/${shot.name}-${shot.width}.png`,
        fullPage: true,
      });
    }
  });
});
