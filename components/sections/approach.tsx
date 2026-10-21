import { Section } from "@/components/ui/section";
import { Kicker } from "@/components/ui/kicker";
import { approachHeading, approachPrinciples } from "@/lib/content";

export function Approach() {
  return (
    <Section id="approach" labelledBy="approach-heading">
      <Kicker className="text-muted">03</Kicker>
      <h2
        id="approach-heading"
        className="type-display mt-4 max-w-3xl text-[clamp(2.75rem,6vw,5.5rem)]"
      >
        {approachHeading}
      </h2>
      <ol className="mt-14 border-t border-ink/15 lg:mt-20">
        {approachPrinciples.map((principle, index) => (
          <li
            key={principle}
            className="motion-enter flex items-baseline justify-between gap-6 border-b border-ink/15 py-6 sm:py-8"
          >
            <p className="text-[clamp(1.5rem,3.4vw,2.75rem)] leading-tight">
              {principle}
            </p>
            <span className="shrink-0 text-[11px] font-semibold tracking-label text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
          </li>
        ))}
      </ol>
    </Section>
  );
}
