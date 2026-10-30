"use client";

import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import { prepareAnalyticsEvent } from "@/lib/analytics";
import { captureUtmParams } from "@/lib/attribution";

export function SiteAnalytics() {
  useEffect(() => {
    captureUtmParams(window.location.search);
  }, []);

  return <Analytics beforeSend={prepareAnalyticsEvent} />;
}
