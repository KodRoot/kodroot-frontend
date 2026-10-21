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
      <h3 className="type-display mt-4 text-[clamp(1.75rem,3vw,2.5rem)] text-ink">
        Ready to send.
      </h3>
      <p className="mt-4 leading-relaxed text-muted">
        Nothing is sent from this page. Email the brief, or copy it to{" "}
        {site.email}.
      </p>
      <pre className="mt-8 max-h-80 overflow-auto border border-ink/15 p-5 text-sm leading-relaxed whitespace-pre-wrap text-ink">
        {brief}
      </pre>
      <div className="mt-8 flex flex-wrap items-center gap-4">
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
