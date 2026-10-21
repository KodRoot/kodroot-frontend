import { PageContainer } from "@/components/page-container";
import { audienceLine, capabilities, capabilitiesIntro } from "@/lib/content";

export function Capabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="bg-paper"
    >
      <PageContainer className="py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-[12px] font-semibold uppercase tracking-label text-muted">
              Also part of the work
            </p>
            <h2
              id="capabilities-heading"
              className="mt-4 max-w-sm text-3xl leading-snug sm:text-4xl"
            >
              Decide what to build, then build it well.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="max-w-2xl text-lg leading-relaxed">
              {capabilitiesIntro}
            </p>
            <div className="mt-14 grid gap-12 sm:grid-cols-2 sm:gap-16">
              {capabilities.map((capability) => (
                <article
                  key={capability.id}
                  className="border-t border-ink/12 pt-6"
                >
                  <h3 className="text-xl">{capability.name}</h3>
                  <p className="mt-3 leading-relaxed text-muted">
                    {capability.summary}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-14 max-w-2xl leading-relaxed text-muted">
              {audienceLine}
            </p>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
