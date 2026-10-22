import { Resend } from "resend";
import * as z from "zod";
import { formatInquiryBrief } from "@/lib/inquiry/brief";
import type { InquirySubmission } from "@/lib/inquiry/schema";

function addressFrom(value: string): string {
  const match = value.match(/<([^>]+)>/);
  return (match?.[1] ?? value).trim();
}

function deliverySettings() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.INQUIRY_FROM_EMAIL?.trim();
  const to = process.env.INQUIRY_TO_EMAIL?.trim();

  if (!apiKey || !from || !to) {
    return null;
  }

  if (from.toLowerCase().includes("resend.dev")) {
    return null;
  }

  if (!z.email().safeParse(addressFrom(from)).success) {
    return null;
  }

  if (!z.email().safeParse(to).success) {
    return null;
  }

  return { apiKey, from, to };
}

export function inquiryDeliveryConfigured(): boolean {
  return deliverySettings() !== null;
}

export async function sendInquiryEmail(input: {
  submission: InquirySubmission;
  submissionId: string;
}): Promise<"sent" | "unavailable" | "failed"> {
  const settings = deliverySettings();
  if (!settings) {
    return "unavailable";
  }

  const resend = new Resend(settings.apiKey);
  const subjectName = input.submission.name
    .replace(/[\r\n]+/g, " ")
    .slice(0, 80);

  try {
    const { data, error } = await resend.emails.send(
      {
        from: settings.from,
        to: [settings.to],
        replyTo: input.submission.email,
        subject: `Project inquiry from ${subjectName}`,
        text: formatInquiryBrief(input.submission),
        tags: [{ name: "category", value: "project_inquiry" }],
      },
      { idempotencyKey: `inquiry/${input.submissionId}` },
    );

    if (error || !data?.id) {
      console.error(
        "Inquiry email was not accepted",
        error?.name ?? "missing_id",
      );
      return "failed";
    }
  } catch {
    console.error("Inquiry email request failed");
    return "failed";
  }

  return "sent";
}
