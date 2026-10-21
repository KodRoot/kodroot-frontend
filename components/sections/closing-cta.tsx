import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { closingCopy, closingHeading } from "@/lib/content";
import { navCta } from "@/lib/navigation";

export function ClosingCta() {
  return (
    <Section labelledBy="closing-heading">
      <h2
        id="closing-heading"
        className="max-w-2xl text-3xl leading-snug sm:text-4xl"
      >
        {closingHeading}
      </h2>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
        {closingCopy}
      </p>
      <TextLink href={navCta.href} className="mt-8">
        {navCta.label}
      </TextLink>
    </Section>
  );
}
