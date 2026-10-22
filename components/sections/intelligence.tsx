import type { CSSProperties } from "react";
import { RevealGroup } from "@/components/motion/reveal-group";
import { Section } from "@/components/ui/section";
import { Kicker } from "@/components/ui/kicker";
import { intelligenceCapabilities, intelligenceHeading } from "@/lib/content";

export function Intelligence() {
  return (
    <Section
      id="intelligence"
      labelledBy="intelligence-heading"
      surface="night"
    >
      <div className="grid gap-16 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <Kicker className="text-paper/60">02</Kicker>
          <h2
            id="intelligence-heading"
            className="motion-reveal-x type-display mt-4 max-w-md text-[clamp(2.75rem,5vw,4.75rem)] text-paper"
          >
            {intelligenceHeading}
          </h2>
        </div>
        <div className="relative lg:col-span-6 lg:col-start-7">
          <span
            className="rule-draw-y absolute inset-y-0 left-0 w-0.5 bg-mark"
            aria-hidden="true"
          />
          <RevealGroup>
            <ol>
              {intelligenceCapabilities.map((item, index) => (
                <li
                  key={item.id}
                  className="replay border-b border-paper/15 py-8 pl-6 first:pt-0 last:border-b-0 last:pb-0 sm:pl-8"
                >
                  <p
                    className="cue text-[11px] font-semibold tracking-label text-paper/60"
                    style={{ "--i": index } as CSSProperties}
                  >
                    {item.number}
                  </p>
                  <h3 className="mt-3 text-2xl leading-snug text-paper sm:text-3xl">
                    {item.name}
                  </h3>
                  <p className="mt-3 max-w-sm leading-relaxed text-paper/70">
                    {item.summary}
                  </p>
                </li>
              ))}
            </ol>
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
