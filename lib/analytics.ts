import type { BeforeSendEvent } from "@vercel/analytics/next";
import {
  pickUtmParams,
  sanitizeUtmParams,
  utmKeys,
  type UtmParams,
} from "@/lib/attribution";
import { inquirySteps } from "@/types/inquiry";

export const analyticsEventNames = [
  "form_started",
  "form_step_reached",
  "inquiry_sent",
] as const;

export type AnalyticsEventName = (typeof analyticsEventNames)[number];
export type AnalyticsEventProps = Record<string, string | number>;

// At runtime the Vercel script also passes the event name and properties as
// `payload`, which the published BeforeSendEvent type does not describe.
type RuntimeEvent = BeforeSendEvent & {
  payload?: { name?: unknown; data?: unknown };
};

function isEventName(value: unknown): value is AnalyticsEventName {
  return (
    typeof value === "string" &&
    (analyticsEventNames as readonly string[]).includes(value)
  );
}

function cleanUrl(raw: string): string | null {
  let url: URL;
  try {
    url = new URL(raw, "https://kodroot.com");
  } catch {
    return null;
  }

  if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
    return null;
  }

  const utm = pickUtmParams(url.searchParams);
  const search = new URLSearchParams();
  for (const key of utmKeys) {
    const value = utm[key];
    if (value) {
      search.set(key, value);
    }
  }
  url.search = search.toString();
  url.hash = "";
  return url.href;
}

function cleanEventData(
  name: AnalyticsEventName,
  data: unknown,
): AnalyticsEventProps | null {
  const input =
    typeof data === "object" && data !== null
      ? (data as Record<string, unknown>)
      : {};
  const props: AnalyticsEventProps = {};

  if (name === "form_step_reached") {
    const step = input.step;
    const index = input.index;
    const position = inquirySteps.findIndex((item) => item === step);
    if (position === -1 || index !== position + 1) {
      return null;
    }
    props.step = inquirySteps[position] as string;
    props.index = position + 1;
  }

  const utm: UtmParams = sanitizeUtmParams(input);
  for (const key of utmKeys) {
    const value = utm[key];
    if (value) {
      props[key] = value;
    }
  }

  return props;
}

export function prepareAnalyticsEvent(
  event: BeforeSendEvent,
): BeforeSendEvent | null {
  const url = cleanUrl(event.url);
  if (!url) {
    return null;
  }

  if (event.type === "pageview") {
    return { type: "pageview", url };
  }

  const payload = (event as RuntimeEvent).payload;
  if (!isEventName(payload?.name)) {
    return null;
  }

  const data = cleanEventData(payload.name, payload.data);
  if (!data) {
    return null;
  }

  const result: RuntimeEvent = {
    type: "event",
    url,
    payload: { name: payload.name, data },
  };
  return result;
}
