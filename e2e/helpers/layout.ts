import { expect, type Page } from "@playwright/test";

export const viewports = [
  { width: 320, height: 568 },
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
] as const;

export async function assertNoHorizontalOverflow(page: Page) {
  const sizes = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
  }));
  expect(sizes.scroll).toBeLessThanOrEqual(sizes.client + 1);
}

export async function collectFailedRequests(page: Page) {
  const failed: string[] = [];
  page.on("requestfailed", (request) => {
    failed.push(
      `${request.method()} ${request.url()} ${request.failure()?.errorText}`,
    );
  });
  page.on("response", (response) => {
    if (response.status() >= 400 && !response.url().includes("/api/inquiry")) {
      failed.push(`${response.status()} ${response.url()}`);
    }
  });
  return () => failed.filter((item) => !item.includes("favicon"));
}
