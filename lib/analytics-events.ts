import { track } from "@vercel/analytics";
import type { AnalyticsEventName, AnalyticsEventProps } from "@/lib/analytics";
import { readStoredUtm, utmKeys, type UtmParams } from "@/lib/attribution";
import { inquirySteps, type InquiryStep } from "@/types/inquiry";

const SEEN_KEY = "kodroot:events";
const SEEN_LIMIT = 50;

type StorageLike = Pick<Storage, "getItem" | "setItem">;

type FormTrackerOptions = {
  send: (name: AnalyticsEventName, props: AnalyticsEventProps) => void;
  getStorage: () => StorageLike | null;
  getUtm: () => UtmParams;
};

/**
 * Sends the three form events at most once each per browser session.
 * Properties are limited to step identifiers, step numbers and campaign
 * parameters. No answers ever pass through here.
 */
export function createFormTracker({
  send,
  getStorage,
  getUtm,
}: FormTrackerOptions) {
  const seenInMemory = new Set<string>();

  function utmProps(): AnalyticsEventProps {
    const utm = getUtm();
    const props: AnalyticsEventProps = {};
    for (const key of utmKeys) {
      const value = utm[key];
      if (value) {
        props[key] = value;
      }
    }
    return props;
  }

  function readSeen(storage: StorageLike | null): string[] {
    try {
      const parsed: unknown = JSON.parse(storage?.getItem(SEEN_KEY) ?? "[]");
      return Array.isArray(parsed)
        ? parsed.filter((item): item is string => typeof item === "string")
        : [];
    } catch {
      return [];
    }
  }

  function once(key: string): boolean {
    if (seenInMemory.has(key)) {
      return false;
    }
    seenInMemory.add(key);

    const storage = getStorage();
    const seen = readSeen(storage);
    if (seen.includes(key)) {
      return false;
    }
    try {
      storage?.setItem(
        SEEN_KEY,
        JSON.stringify([...seen, key].slice(-SEEN_LIMIT)),
      );
    } catch {
      // Storage is optional; the in-memory set still prevents repeats.
    }
    return true;
  }

  return {
    formStarted() {
      if (once("form_started")) {
        send("form_started", utmProps());
      }
    },
    stepReached(step: InquiryStep) {
      // Step 1 is covered by form_started, so only later steps are reported.
      const index = inquirySteps.indexOf(step) + 1;
      if (index > 1 && once(`form_step_reached:${step}`)) {
        send("form_step_reached", { step, index, ...utmProps() });
      }
    },
    inquirySent(submissionId: string) {
      if (submissionId && once(`inquiry_sent:${submissionId}`)) {
        send("inquiry_sent", utmProps());
      }
    },
  };
}

function sessionStore(): StorageLike | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

const tracker = createFormTracker({
  send: (name, props) => track(name, props),
  getStorage: sessionStore,
  getUtm: readStoredUtm,
});

export const trackFormStarted = tracker.formStarted;
export const trackFormStepReached = tracker.stepReached;
export const trackInquirySent = tracker.inquirySent;
