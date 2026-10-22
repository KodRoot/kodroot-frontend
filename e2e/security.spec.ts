import { expect, test } from "@playwright/test";
import { inquiryRequest, postInquiry } from "./helpers/inquiry";

test.describe("security", () => {
  test("does not expose secrets in the inquiry response", async ({
    request,
  }) => {
    const response = await postInquiry(request, inquiryRequest());
    const text = await response.text();
    expect(text).not.toMatch(/re_[A-Za-z0-9]/);
    expect(text).not.toMatch(/RESEND_API_KEY/);
    expect(text).not.toContain("stack");
  });

  test("bounds oversized inquiry bodies", async ({ request }) => {
    const response = await request.post("/api/inquiry", {
      headers: { "content-type": "application/json" },
      data: `${"x".repeat(50_000)}`,
    });
    expect([400, 413]).toContain(response.status());
  });

  test("sends security headers on public pages", async ({ request }) => {
    const response = await request.get("/");
    const headers = response.headers();
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["x-powered-by"]).toBeFalsy();
  });

  test("does not put the Resend key in the homepage HTML", async ({
    request,
  }) => {
    const response = await request.get("/");
    const html = await response.text();
    expect(html).not.toMatch(/re_[A-Za-z0-9]{10,}/);
    expect(html).not.toContain("RESEND_API_KEY");
    expect(html).not.toContain("INQUIRY_MOCK_DELIVERY");
  });
});
