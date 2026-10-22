import type { CSSProperties } from "react";
import { RevealGroup } from "@/components/motion/reveal-group";
import { Section } from "@/components/ui/section";
import { Kicker } from "@/components/ui/kicker";
import { capabilities, services, servicesHeading } from "@/lib/content";

export function Offering() {
  return (
    <Section id="services" labelledBy="services-heading">
      <Kicker className="text-muted">01</Kicker>
      <h2
        id="services-heading"
        className="motion-reveal type-display mt-4 max-w-3xl text-[clamp(2.75rem,6vw,5.5rem)]"
      >
        {servicesHeading}
      </h2>

      <div className="rule-draw mt-16 h-px bg-ink/15 lg:mt-24" />
      <RevealGroup>
        {services.map((service, index) => (
          <article
            key={service.id}
            className="service-row replay relative grid gap-4 border-b border-ink/15 py-10 lg:grid-cols-12 lg:items-baseline lg:py-14"
          >
            <span className="service-marker" aria-hidden="true" />
            <p
              className="cue service-index type-display text-4xl text-mark sm:text-5xl lg:col-span-2 lg:text-6xl"
              style={{ "--i": index } as CSSProperties}
            >
              {service.number}
            </p>
            <h3 className="text-3xl leading-none sm:text-4xl lg:col-span-4">
              {service.name}
            </h3>
            <p className="max-w-md text-lg leading-relaxed text-muted lg:col-span-5 lg:col-start-8">
              {service.detail}
            </p>
          </article>
        ))}
      </RevealGroup>

      <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:mt-24 lg:gap-16">
        {capabilities.map((capability) => (
          <article key={capability.id} className="capability">
            <h3 className="text-2xl leading-tight sm:text-3xl">
              {capability.name}
            </h3>
            <p className="mt-4 max-w-md leading-relaxed text-muted">
              {capability.summary}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
