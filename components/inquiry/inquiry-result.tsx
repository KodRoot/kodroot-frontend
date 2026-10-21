"use client";

import { useState } from "react";
import { site } from "@/lib/site";

type InquiryResultProps = {
  brief: string;
  mailto: string;
  onRevise: () => void;
  onReset: () => void;
};

export function InquiryResult({
  brief,
  mailto,
  onRevise,
  onReset,
}: InquiryResultProps) {
  const [copied, setCopied] = useState(false);

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div>
      <p className="text-[12px] font-semibold uppercase tracking-label text-muted">
        Brief ready
      </p>
      <h3 className="mt-3 text-2xl leading-snug text-ink">
        Your project brief is ready to send.
      </h3>
      <p className="mt-4 leading-relaxed text-muted">
        This page does not deliver the brief to KodRoot. Open the prepared
        email, or copy the brief and send it to {site.email} yourself. This is
        not a quote, and no delivery date has been promised.
      </p>
      <pre className="mt-8 max-h-80 overflow-auto border border-ink/12 bg-paper p-4 text-sm leading-relaxed whitespace-pre-wrap text-ink">
        {brief}
      </pre>
      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
        <a
          href={mailto}
          className="inline-flex min-h-11 items-center border-b-2 border-mark pb-0.5 text-[13px] font-semibold uppercase tracking-label"
        >
          Email this brief
        </a>
        <button
          type="button"
          onClick={copyBrief}
          className="inline-flex min-h-11 items-center border-b border-ink/35 pb-0.5 text-[13px] font-semibold uppercase tracking-label text-muted hover:border-ink hover:text-ink"
        >
          {copied ? "Brief copied" : "Copy brief"}
        </button>
        <button
          type="button"
          onClick={onRevise}
          className="inline-flex min-h-11 items-center border-b border-ink/35 pb-0.5 text-[13px] font-semibold uppercase tracking-label text-muted hover:border-ink hover:text-ink"
        >
          Review answers
        </button>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-11 items-center border-b border-ink/35 pb-0.5 text-[13px] font-semibold uppercase tracking-label text-muted hover:border-ink hover:text-ink"
        >
          Start again
        </button>
      </div>
    </div>
  );
}
