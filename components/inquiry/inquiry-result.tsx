"use client";

import { useLayoutEffect, useRef } from "react";
import { TextButton } from "@/components/ui/text-link";
import { revealInquiry } from "@/lib/inquiry/reveal";

type InquirySuccessProps = {
  onReset: () => void;
};

export function InquirySuccess({ onReset }: InquirySuccessProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    revealInquiry(panelRef.current, headingRef.current);
    const retry = window.setTimeout(() => {
      revealInquiry(panelRef.current, headingRef.current);
    }, 50);
    return () => window.clearTimeout(retry);
  }, []);

  return (
    <div ref={panelRef} className="inquiry-panel form-note" role="status">
      <p className="text-[12px] font-semibold uppercase tracking-label text-muted">
        Received
      </p>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="type-display mt-4 text-[clamp(1.6rem,2.8vw,2.25rem)] text-ink outline-none"
      >
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
