import { expect, test } from "@playwright/test";
import { inquiryRequest, postInquiry } from "./helpers/inquiry";

test.describe("POST /api/inquiry", () => {
  test("rejects an empty body", async ({ request }) => {
    const response = await postInquiry(request, {});
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.status).toBe("invalid");
    expect(JSON.stringify(body)).not.toMatch(/re_/);
    expect(JSON.stringify(body)).not.toMatch(/stack/i);
  });

  test("rejects an invalid email on the server", async ({ request }) => {
    const response = await postInquiry(
      request,
      inquiryRequest({ email: "not-an-email" }),
    );
    expect(response.status()).toBe(400);
    expect((await response.json()).status).toBe("invalid");
  });

  test("rejects a honeypot submission", async ({ request }) => {
    const response = await postInquiry(
      request,
      inquiryRequest({ company: "Spam Co" }),
    );
    expect(response.status()).toBe(400);
    expect((await response.json()).status).toBe("invalid");
  });

  test("rejects a mismatched origin", async ({ request }) => {
    const response = await postInquiry(request, inquiryRequest(), {
      origin: "https://evil.example",
    });
    expect(response.status()).toBe(403);
  });

  test("rejects a fill that is too fast", async ({ request }) => {
    const response = await postInquiry(
      request,
      inquiryRequest({ startedAt: Date.now() }),
    );
    expect(response.status()).toBe(400);
  });

  test("accepts a valid submission when delivery is mocked", async ({
    request,
  }) => {
    const response = await postInquiry(request, inquiryRequest());
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ status: "received" });
  });

  test("does not trust a client-provided sender", async ({ request }) => {
    const response = await postInquiry(
      request,
      inquiryRequest({
        email: "visitor@example.com",
        name: "Visitor\nBcc: attacker@example.com",
      }),
    );
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ status: "received" });
  });

  test("rate-limits repeated posts from one address", async ({ request }) => {
    const ip = `203.0.113.${Math.floor(Math.random() * 200) + 1}`;
    const headers = { "x-forwarded-for": ip };
    const statuses: number[] = [];
    for (let index = 0; index < 7; index += 1) {
      const response = await postInquiry(
        request,
        inquiryRequest({ submissionId: crypto.randomUUID() }),
        headers,
      );
      statuses.push(response.status());
    }
    expect(statuses.slice(0, 6).every((status) => status === 200)).toBe(true);
    expect(statuses[6]).toBe(429);
  });

  test("live Resend delivery is skipped unless explicitly enabled", async () => {
    test.skip(
      process.env.E2E_LIVE_INQUIRY !== "1",
      "Live email is gated behind E2E_LIVE_INQUIRY=1 and an authorized recipient.",
    );
  });
});
