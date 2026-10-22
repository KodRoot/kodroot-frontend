import { connection } from "next/server";
import { sendInquiryEmail } from "@/lib/inquiry/delivery";
import { consumeRateLimit } from "@/lib/inquiry/rate-limit";
import {
  inquiryRequestMetaSchema,
  inquirySubmissionSchema,
} from "@/lib/inquiry/schema";
import { site } from "@/lib/site";
import type { InquiryApiResult } from "@/types/inquiry";

const WINDOW_MS = 15 * 60 * 1000;
const LIMIT = 6;
const MIN_FILL_MS = 2000;
const MAX_AGE_MS = 24 * 60 * 60 * 1000;
const MAX_BODY = 40_000;

function json(body: InquiryApiResult, status: number) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  return ip.slice(0, 80);
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) {
    return true;
  }

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  await connection();

  if (!sameOrigin(request)) {
    return json(
      { status: "invalid", message: "This inquiry could not be sent." },
      403,
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return json(
      { status: "invalid", message: "This inquiry could not be sent." },
      415,
    );
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY) {
    return json(
      { status: "invalid", message: "This inquiry is too long to send." },
      413,
    );
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(
      { status: "invalid", message: "This inquiry could not be sent." },
      400,
    );
  }

  if (!consumeRateLimit(clientKey(request), LIMIT, WINDOW_MS)) {
    return json(
      {
        status: "limited",
        message:
          "Too many attempts from this connection. Wait, then try again.",
      },
      429,
    );
  }

  const meta = inquiryRequestMetaSchema.safeParse(body);
  const submission = inquirySubmissionSchema.safeParse(body);

  if (!meta.success || !submission.success) {
    return json(
      {
        status: "invalid",
        message: "Some answers are missing or invalid. Go back and check them.",
      },
      400,
    );
  }

  if (meta.data.company.trim().length > 0) {
    return json(
      { status: "invalid", message: "This inquiry could not be sent." },
      400,
    );
  }

  const now = Date.now();
  const elapsed = now - meta.data.startedAt;
  if (meta.data.startedAt > now + 2 * 60 * 1000) {
    return json(
      { status: "invalid", message: "This inquiry could not be sent." },
      400,
    );
  }
  if (elapsed > MAX_AGE_MS) {
    return json(
      {
        status: "invalid",
        message: "This form has been open too long. Refresh and start again.",
      },
      400,
    );
  }
  if (elapsed >= 0 && elapsed < MIN_FILL_MS) {
    return json(
      { status: "invalid", message: "This inquiry could not be sent." },
      400,
    );
  }

  const result = await sendInquiryEmail({
    submission: submission.data,
    submissionId: meta.data.submissionId,
  });

  if (result === "sent") {
    return json({ status: "received" }, 200);
  }

  if (result === "unavailable") {
    return json(
      {
        status: "unavailable",
        message: `This form cannot send email yet. Write to ${site.email}.`,
      },
      503,
    );
  }

  return json(
    {
      status: "error",
      message: "The inquiry was not sent. Try again in a moment.",
    },
    502,
  );
}
