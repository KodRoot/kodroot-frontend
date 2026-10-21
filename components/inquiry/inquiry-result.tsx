"use client";

import { useState } from "react";
import { Kicker } from "@/components/ui/kicker";
import { TextButton, TextLink } from "@/components/ui/text-link";
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
      <Kicker className="text-muted">Brief ready</Kicker>
      <h3 className="mt-3 text-2xl leading-snug text-ink sm:text-3xl">
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
        <TextLink href={mailto}>Email this brief</TextLink>
        <TextButton variant="secondary" onClick={copyBrief}>
          {copied ? "Brief copied" : "Copy brief"}
        </TextButton>
        <TextButton variant="secondary" onClick={onRevise}>
          Review answers
        </TextButton>
        <TextButton variant="secondary" onClick={onReset}>
          Start again
        </TextButton>
      </div>
    </div>
  );
}
