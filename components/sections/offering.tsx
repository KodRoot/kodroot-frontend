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
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <Kicker className="text-paper/55 lg:col-span-4">What we build</Kicker>
        <h2
          id="services-heading"
          className="max-w-xl text-2xl leading-snug text-paper sm:text-3xl lg:col-span-7 lg:col-start-6"
        >
          {servicesIntro}
        </h2>
      </div>

      <div className="mt-16 border-t border-paper/15 lg:mt-24">
        {services.map((service) => (
          <article
            key={service.id}
            className="grid gap-4 border-b border-paper/15 py-10 lg:grid-cols-12 lg:py-14"
          >
            <p className="text-[13px] font-semibold uppercase tracking-label text-paper/45 lg:col-span-2">
              {service.number}
            </p>
            <div className="lg:col-span-8">
              <h3 className="text-2xl text-paper sm:text-3xl lg:text-4xl">
                {service.name}
              </h3>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper/75">
                {service.detail}
              </p>
              <p className="mt-4 max-w-2xl leading-relaxed text-paper/75">
                {service.problems}
              </p>
              <p className="mt-4 max-w-2xl leading-relaxed text-paper/75">
                {service.intelligence}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 border-t border-paper/15 pt-12 lg:mt-20 lg:grid lg:grid-cols-12 lg:gap-8 lg:pt-16">
        <Kicker className="text-paper/55 lg:col-span-4">
          How a project starts
        </Kicker>
        <div className="mt-6 max-w-2xl lg:col-span-7 lg:col-start-6 lg:mt-0">
          <p className="text-lg leading-relaxed text-paper">
            {capabilitiesIntro}
          </p>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:gap-12">
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
      </div>
    </Section>
  );
}
