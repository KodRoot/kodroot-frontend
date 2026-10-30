import { expect, test } from "@playwright/test";

const pages = [
  {
    path: "/",
    title: /KodRoot — Software built on solid foundations/,
    canonical: "https://kodroot.com",
  },
  {
    path: "/discuss-your-project",
    title: /Discuss your project — KodRoot/,
    canonical: "https://kodroot.com/discuss-your-project",
  },
  {
    path: "/faq",
    title: /Questions — KodRoot/,
    canonical: "https://kodroot.com/faq",
  },
  {
    path: "/privacy",
    title: /Privacy policy — KodRoot/,
    canonical: "https://kodroot.com/privacy",
  },
  {
    path: "/terms",
    title: /Terms and conditions — KodRoot/,
    canonical: "https://kodroot.com/terms",
  },
] as const;

test.describe("SEO", () => {
  for (const entry of pages) {
    test(`${entry.path} has unique metadata and a production canonical`, async ({
      page,
    }) => {
      await page.goto(entry.path);
      await expect(page).toHaveTitle(entry.title);
      const description = page.locator('meta[name="description"]');
      await expect(description).toHaveAttribute("content", /.+/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        entry.canonical,
      );
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
        "content",
        /.+/,
      );
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      const robots = await page
        .locator('meta[name="robots"]')
        .getAttribute("content");
      expect(robots ?? "").not.toMatch(/noindex/i);
    });
  }

  test("robots.txt and sitemap list the public routes", async ({ request }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.ok()).toBe(true);
    const robotsText = await robots.text();
    expect(robotsText).toContain("Allow: /");
    expect(robotsText).toContain("https://kodroot.com/sitemap.xml");
    expect(robotsText).not.toContain("localhost");

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBe(true);
    const xml = await sitemap.text();
    expect(xml).toContain("https://kodroot.com</loc>");
    expect(xml).toContain("https://kodroot.com/discuss-your-project");
    expect(xml).toContain("https://kodroot.com/faq");
    expect(xml).toContain("https://kodroot.com/privacy");
    expect(xml).toContain("https://kodroot.com/terms");
    expect(xml).not.toContain("localhost");
  });

  test("favicon is a stable, crawlable image Google Search can use", async ({
    request,
    page,
  }) => {
    const ico = await request.get("/favicon.ico");
    expect(ico.ok()).toBe(true);
    expect(ico.headers()["content-type"] ?? "").toMatch(/image\//);

    await page.goto("/");
    const iconHrefs = await page
      .locator('link[rel="icon"], link[rel="apple-touch-icon"]')
      .evaluateAll((nodes) =>
        nodes.map((node) => ({
          href: node.getAttribute("href") ?? "",
          type: node.getAttribute("type") ?? "",
        })),
      );
    expect(
      iconHrefs.some(
        (icon) =>
          icon.type === "image/png" ||
          icon.href.includes(".png") ||
          icon.href.includes("favicon.ico"),
      ),
    ).toBe(true);
  });

  test("structured data describes KodRoot without invented claims", async ({
    page,
  }) => {
    await page.goto("/");
    const json = await page
      .locator('script[type="application/ld+json"]')
      .first()
      .textContent();
    expect(json).toBeTruthy();
    const data = JSON.parse(json ?? "{}") as {
      "@graph": Array<Record<string, unknown>>;
    };
    const types = data["@graph"].map((node) => node["@type"]);
    expect(types).toContain("Organization");
    expect(types).toContain("WebSite");
    const organization = data["@graph"].find(
      (node) => node["@type"] === "Organization",
    );
    expect(organization?.sameAs).toEqual([
      "https://www.instagram.com/kodroot/",
    ]);
    expect(JSON.stringify(data)).toContain("Rooted in code. Built for growth.");
    expect(JSON.stringify(data)).not.toMatch(/reviewRating|aggregateRating/);
    expect(JSON.stringify(data)).not.toContain("localhost");
  });

  test("not-found pages are excluded from indexing", async ({ page }) => {
    await page.goto("/missing-route");
    const robots = await page
      .locator('meta[name="robots"]')
      .evaluateAll((nodes) =>
        nodes.map((node) => node.getAttribute("content") ?? "").join(" "),
      );
    expect(robots).toMatch(/noindex/i);
  });
});
