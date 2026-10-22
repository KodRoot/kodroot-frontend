"use client";

import { TextButton } from "@/components/ui/text-link";

type InquirySuccessProps = {
  onReset: () => void;
};

export function InquirySuccess({ onReset }: InquirySuccessProps) {
  return (
    <div className="form-note" role="status">
      <p className="text-[12px] font-semibold uppercase tracking-label text-muted">
        Received
      </p>
      <h2 className="type-display mt-4 text-[clamp(1.6rem,2.8vw,2.25rem)] text-ink">
        We have the brief.
      </h2>
      <p className="mt-4 max-w-md leading-relaxed text-muted">
        KodRoot will reply by email. This is not a quote.
      </p>
      <div className="mt-8">
        <TextButton variant="secondary" onClick={onReset}>
          Start another
        </TextButton>
      </div>
    </div>
  );
}
