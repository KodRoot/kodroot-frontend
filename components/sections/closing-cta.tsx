import { RadicalLockup } from "@/components/brand/radical-lockup";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { closingCopy, closingHeading } from "@/lib/content";
import { navCta } from "@/lib/navigation";

export function ClosingCta() {
  return (
    <Section labelledBy="closing-heading">
      <RadicalLockup className="mb-10 h-8 text-[2rem] sm:mb-12 sm:h-10 sm:text-[2.5rem]" />
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <h2
          id="closing-heading"
          className="max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.08] lg:col-span-8"
        >
          {closingHeading}
        </h2>
        <div className="lg:col-span-4">
          <p className="max-w-md text-lg leading-relaxed text-muted">
            {closingCopy}
          </p>
          <TextLink href={navCta.href} className="mt-8">
            {navCta.label}
          </TextLink>
        </div>
      </div>
    </Section>
  );
}
