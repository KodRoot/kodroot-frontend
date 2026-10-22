import type { BeforeSendEvent } from "@vercel/analytics/next";

export function prepareAnalyticsEvent(
  event: BeforeSendEvent,
): BeforeSendEvent | null {
  if (event.type !== "pageview") {
    return null;
  }

  let url: URL;
  try {
    url = new URL(event.url, "https://kodroot.com");
  } catch {
    return null;
  }

  if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
    return null;
  }

  url.search = "";
  url.hash = "";
  return { type: "pageview", url: url.href };
}
