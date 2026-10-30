import { expect, test } from "@playwright/test";
import {
  prepareAnalyticsEvent,
  analyticsEventNames,
} from "../../lib/analytics";
import { createFormTracker } from "../../lib/analytics-events";
import {
  captureUtmParams,
  readStoredUtm,
  sanitizeUtmValue,
} from "../../lib/attribution";
import type { BeforeSendEvent } from "@vercel/analytics/next";

const page = "https://kodroot.com/discuss-your-project";

function customEvent(name: unknown, data?: unknown, url = page) {
  return {
    type: "event",
    url,
    payload: { name, data },
  } as unknown as BeforeSendEvent;
}

function fakeStorage(initial: Record<string, string> = {}) {
  const store = new Map(Object.entries(initial));
  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
  };
}

test.describe("analytics page views", () => {
  test("keeps a production page view without non-campaign query data", () => {
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

  test("keeps only allowlisted campaign parameters and drops the hash", () => {
    expect(
      prepareAnalyticsEvent({
        type: "pageview",
        url: "https://kodroot.com/?utm_source=newsletter&email=a@b.co&utm_medium=email&utm_campaign=spring&utm_content=cta&utm_term=web&gclid=abc&utm_id=9#top",
      }),
    ).toEqual({
      type: "pageview",
      url: "https://kodroot.com/?utm_source=newsletter&utm_medium=email&utm_campaign=spring&utm_content=cta&utm_term=web",
    });
  });

  test("trims, caps and drops empty campaign values", () => {
    const long = "x".repeat(300);
    const result = prepareAnalyticsEvent({
      type: "pageview",
      url: `https://kodroot.com/?utm_source=%20%20news%20&utm_medium=&utm_campaign=${long}`,
    });
    const url = new URL(result?.url ?? "");
    expect(url.searchParams.get("utm_source")).toBe("news");
    expect(url.searchParams.has("utm_medium")).toBe(false);
    expect(url.searchParams.get("utm_campaign")).toHaveLength(100);
    expect(sanitizeUtmValue("   ")).toBeNull();
  });

  test("drops local development traffic", () => {
    expect(
      prepareAnalyticsEvent({
        type: "pageview",
        url: "http://127.0.0.1:4173/",
      }),
    ).toBeNull();
    expect(
      prepareAnalyticsEvent(
        customEvent("form_started", {}, "http://localhost:3000/"),
      ),
    ).toBeNull();
  });
});

test.describe("analytics custom events", () => {
  test("drops events without a name and unknown event names", () => {
    expect(prepareAnalyticsEvent({ type: "event", url: page })).toBeNull();
    expect(prepareAnalyticsEvent(customEvent("identify", {}))).toBeNull();
    expect(prepareAnalyticsEvent(customEvent("Purchase", {}))).toBeNull();
    expect(prepareAnalyticsEvent(customEvent(undefined, {}))).toBeNull();
  });

  test("allows exactly the three form events", () => {
    expect(analyticsEventNames).toEqual([
      "form_started",
      "form_step_reached",
      "inquiry_sent",
    ]);
    expect(prepareAnalyticsEvent(customEvent("form_started", {}))).toEqual({
      type: "event",
      url: page,
      payload: { name: "form_started", data: {} },
    });
    expect(
      prepareAnalyticsEvent(
        customEvent("form_step_reached", { step: "goals", index: 2 }),
      ),
    ).toEqual({
      type: "event",
      url: page,
      payload: { name: "form_step_reached", data: { step: "goals", index: 2 } },
    });
    expect(prepareAnalyticsEvent(customEvent("inquiry_sent", {}))).toEqual({
      type: "event",
      url: page,
      payload: { name: "inquiry_sent", data: {} },
    });
  });

  test("passes through only step values and campaign values", () => {
    const result = prepareAnalyticsEvent(
      customEvent(
        "form_step_reached",
        {
          step: "contact",
          index: 6,
          utm_source: "newsletter",
          utm_foo: "nope",
          email: "alex@example.com",
          name: "Alex",
          projectDescription: "A private tool",
          projectType: "web-application",
          referral: "instagram",
          businessName: "Rivera Studio",
          existingWebsite: "https://example.com",
        },
        `${page}?email=alex@example.com&utm_medium=email`,
      ),
    );
    expect(result).toEqual({
      type: "event",
      url: `${page}?utm_medium=email`,
      payload: {
        name: "form_step_reached",
        data: { step: "contact", index: 6, utm_source: "newsletter" },
      },
    });
  });

  test("drops a step event whose step or index is not valid", () => {
    expect(
      prepareAnalyticsEvent(
        customEvent("form_step_reached", {
          step: "alex@example.com",
          index: 2,
        }),
      ),
    ).toBeNull();
    expect(
      prepareAnalyticsEvent(
        customEvent("form_step_reached", { step: "goals", index: 5 }),
      ),
    ).toBeNull();
    expect(
      prepareAnalyticsEvent(customEvent("form_step_reached", {})),
    ).toBeNull();
  });
});

test.describe("campaign parameter storage", () => {
  test("keeps the first campaign of a session and ignores empty ones", () => {
    const storage = fakeStorage();
    expect(captureUtmParams("?foo=bar", storage)).toEqual({});
    expect(readStoredUtm(storage)).toEqual({});
    expect(captureUtmParams("?utm_source=&utm_medium=", storage)).toEqual({});

    expect(
      captureUtmParams("?utm_source=newsletter&email=a@b.co", storage),
    ).toEqual({ utm_source: "newsletter" });
    expect(captureUtmParams("?utm_source=other&utm_medium=x", storage)).toEqual(
      { utm_source: "newsletter" },
    );
    expect(readStoredUtm(storage)).toEqual({ utm_source: "newsletter" });
  });

  test("survives storage that throws", () => {
    const broken = {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
    };
    expect(readStoredUtm(broken)).toEqual({});
    expect(captureUtmParams("?utm_source=a", broken)).toEqual({
      utm_source: "a",
    });
    expect(readStoredUtm(broken)).toEqual({});
    expect(readStoredUtm(null)).toEqual({});
  });

  test("ignores tampered stored values", () => {
    const storage = fakeStorage({
      "kodroot:utm": JSON.stringify({
        utm_source: "ok",
        email: "alex@example.com",
        utm_term: 5,
      }),
    });
    expect(readStoredUtm(storage)).toEqual({ utm_source: "ok" });
  });
});

test.describe("form event tracker", () => {
  function setup(utm: Record<string, string> = {}, storage = fakeStorage()) {
    const sent: Array<{ name: string; props: Record<string, unknown> }> = [];
    const tracker = createFormTracker({
      send: (name, props) => sent.push({ name, props }),
      getStorage: () => storage,
      getUtm: () => utm,
    });
    return { sent, tracker, storage };
  }

  test("sends form_started once with campaign values only", () => {
    const { sent, tracker } = setup({ utm_source: "newsletter" });
    tracker.formStarted();
    tracker.formStarted();
    expect(sent).toEqual([
      { name: "form_started", props: { utm_source: "newsletter" } },
    ]);
  });

  test("sends each later step once and never step 1", () => {
    const { sent, tracker } = setup();
    tracker.stepReached("project");
    tracker.stepReached("goals");
    tracker.stepReached("project");
    tracker.stepReached("goals");
    tracker.stepReached("customers");
    tracker.stepReached("review");
    expect(sent).toEqual([
      { name: "form_step_reached", props: { step: "goals", index: 2 } },
      { name: "form_step_reached", props: { step: "customers", index: 3 } },
      { name: "form_step_reached", props: { step: "review", index: 7 } },
    ]);
  });

  test("sends inquiry_sent once per submission id, also across remounts", () => {
    const first = setup({}, fakeStorage());
    const id = "7f0e0a32-7d1d-4f3e-8a50-52f6a8c1f2f4";
    first.tracker.inquirySent(id);
    first.tracker.inquirySent(id);
    first.tracker.inquirySent("");
    expect(first.sent).toEqual([{ name: "inquiry_sent", props: {} }]);

    const remounted = setup({}, first.storage);
    remounted.tracker.inquirySent(id);
    expect(remounted.sent).toEqual([]);
    remounted.tracker.inquirySent("0b8f6a0e-7f66-4a0b-9d44-3f3fd5b1d1aa");
    expect(remounted.sent).toHaveLength(1);
  });

  test("still dedupes in memory when storage is unavailable", () => {
    const sent: string[] = [];
    const tracker = createFormTracker({
      send: (name) => sent.push(name),
      getStorage: () => null,
      getUtm: () => ({}),
    });
    tracker.formStarted();
    tracker.formStarted();
    expect(sent).toEqual(["form_started"]);
  });
});
