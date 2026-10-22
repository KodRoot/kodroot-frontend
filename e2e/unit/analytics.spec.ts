import { expect, test } from "@playwright/test";
import { prepareAnalyticsEvent } from "../../lib/analytics";

test.describe("analytics event filter", () => {
  test("keeps a production page view without query data", () => {
    expect(
      prepareAnalyticsEvent({
        type: "pageview",
        url: "https://kodroot.com/discuss-your-project?email=alex@example.com",
      }),
    ).toEqual({
      type: "pageview",
      url: "https://kodroot.com/discuss-your-project",
    });
  });

  test("drops custom events so inquiry fields cannot be sent", () => {
    expect(
      prepareAnalyticsEvent({
        type: "event",
        url: "https://kodroot.com/discuss-your-project",
      }),
    ).toBeNull();
  });

  test("drops local development traffic", () => {
    expect(
      prepareAnalyticsEvent({
        type: "pageview",
        url: "http://127.0.0.1:4173/",
      }),
    ).toBeNull();
  });
});
