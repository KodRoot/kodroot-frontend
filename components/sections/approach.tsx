import type { CSSProperties } from "react";
import { RevealGroup } from "@/components/motion/reveal-group";
import { Section } from "@/components/ui/section";
import { Kicker } from "@/components/ui/kicker";
import { approachHeading, approachPrinciples } from "@/lib/content";

export function Approach() {
  return (
    <Section id="approach" labelledBy="approach-heading" className="relative">
      <div className="hero-guides" aria-hidden="true">
        <span className="section-guide-x" />
        <span className="section-guide-y" />
      </div>
      <Kicker className="text-muted">03</Kicker>
      <h2
        id="approach-heading"
        className="motion-reveal-x type-display mt-4 max-w-3xl text-[clamp(2.75rem,6vw,5.5rem)]"
      >
        {approachHeading}
      </h2>
      <div className="rule-draw mt-14 h-px bg-ink/15 lg:mt-20" />
      <RevealGroup>
        <ol>
          {approachPrinciples.map((principle, index) => (
            <li
              key={principle}
              className="approach-row replay flex items-baseline justify-between gap-6 py-6 sm:py-8"
              style={{ "--i": index } as CSSProperties}
            >
              <p className="approach-line text-[clamp(1.5rem,3.4vw,2.75rem)] leading-tight">
                {principle}
              </p>
              <span className="cue shrink-0 text-[11px] font-semibold tracking-label text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
            </li>
          ))}
        </ol>
      </RevealGroup>
    </Section>
  );
}
