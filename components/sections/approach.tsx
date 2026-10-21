import { Section } from "@/components/ui/section";
import { Kicker } from "@/components/ui/kicker";
import {
  approachBody,
  approachHeading,
  approachIntro,
  approachPrinciples,
} from "@/lib/content";

export function Approach() {
  return (
    <Section id="approach" labelledBy="approach-heading">
      <Kicker className="text-muted">How we work</Kicker>
      <h2
        id="approach-heading"
        className="mt-4 max-w-2xl text-3xl leading-snug sm:text-4xl"
      >
        {approachHeading}
      </h2>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed">{approachIntro}</p>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted">
        {approachBody}
      </p>
      <ol className="mt-12 max-w-2xl space-y-5">
        {approachPrinciples.map((principle, index) => (
          <li key={principle} className="text-xl leading-snug">
            <span className="mr-3 text-[13px] font-semibold uppercase tracking-label text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
            {principle}
          </li>
        ))}
      </ol>
    </Section>
  );
}
