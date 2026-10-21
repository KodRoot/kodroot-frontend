import { Section } from "@/components/ui/section";
import { Kicker } from "@/components/ui/kicker";
import {
  audienceLine,
  capabilities,
  capabilitiesIntro,
  services,
  servicesIntro,
} from "@/lib/content";

export function Offering() {
  return (
    <Section id="services" labelledBy="services-heading" surface="night">
      <Kicker className="text-paper/55">What we build</Kicker>
      <h2
        id="services-heading"
        className="mt-4 max-w-2xl text-3xl leading-snug text-paper sm:text-4xl"
      >
        {servicesIntro}
      </h2>

      <div className="mt-12 space-y-12">
        {services.map((service) => (
          <article key={service.id} className="max-w-2xl">
            <p className="text-[13px] font-semibold uppercase tracking-label text-paper/45">
              {service.number}
            </p>
            <h3 className="mt-3 text-2xl text-paper sm:text-3xl">
              {service.name}
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-paper/75">
              {service.detail}
            </p>
            <p className="mt-3 leading-relaxed text-paper/75">
              {service.problems}
            </p>
            <p className="mt-3 leading-relaxed text-paper/75">
              {service.intelligence}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-16 max-w-2xl">
        <Kicker className="text-paper/55">How a project starts</Kicker>
        <p className="mt-4 text-lg leading-relaxed text-paper">
          {capabilitiesIntro}
        </p>
        <div className="mt-10 space-y-8">
          {capabilities.map((capability) => (
            <article key={capability.id}>
              <h3 className="text-xl text-paper">{capability.name}</h3>
              <p className="mt-3 leading-relaxed text-paper/75">
                {capability.summary}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-10 leading-relaxed text-paper/75">{audienceLine}</p>
      </div>
    </Section>
  );
}
