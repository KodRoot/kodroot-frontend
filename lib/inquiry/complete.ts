import { buildMailto, formatInquiryBrief } from "@/lib/inquiry/brief";
import { inquirySubmissionSchema } from "@/lib/inquiry/schema";
import { site } from "@/lib/site";
import type { SubmitInquiryResult } from "@/types/inquiry";

export function completeInquiry(input: unknown): SubmitInquiryResult {
  const parsed = inquirySubmissionSchema.safeParse(input);

  if (!parsed.success) {
    return {
      status: "invalid",
      message:
        "Some answers are missing or invalid. Go back and check the highlighted step.",
    };
  }

  const brief = formatInquiryBrief(parsed.data);

  return {
    status: "ready",
    brief,
    mailto: buildMailto(brief, site.email, parsed.data.name),
  };
}
