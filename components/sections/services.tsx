import { PageContainer } from "@/components/page-container";
import { brandAssets } from "@/lib/brand";
import { services, servicesIntro } from "@/lib/content";

export function Services() {
  const [primaryService, ...otherServices] = services;

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="surface-dark relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[28%] bg-repeat opacity-40 lg:block"
        style={{
          backgroundImage: `url(${brandAssets.patternNight})`,
          backgroundSize: "220px 200px",
        }}
      />
      <PageContainer className="relative py-24 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <p className="text-[12px] font-semibold uppercase tracking-label text-paper/55 lg:col-span-4">
            What we build
          </p>
          <h2
            id="services-heading"
            className="max-w-xl text-2xl leading-snug text-paper sm:text-3xl lg:col-span-7 lg:col-start-6"
          >
            {servicesIntro}
          </h2>
        </div>

        <ol className="mt-20 grid lg:grid-cols-2">
          <li className="border-t border-paper/15 py-12 lg:col-span-2 lg:py-16">
            <div className="grid gap-4 lg:grid-cols-12">
              <p className="text-[13px] font-semibold uppercase tracking-label text-paper/45 lg:col-span-2">
                {primaryService.number}
              </p>
              <div className="lg:col-span-8">
                <h3 className="text-3xl text-paper sm:text-4xl">
                  {primaryService.name}
                </h3>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper/75">
                  {primaryService.summary}
                </p>
              </div>
            </div>
          </li>
          {otherServices.map((service, index) => (
            <li
              key={service.id}
              className={`border-t border-paper/15 py-12 lg:py-16 ${
                index === 0
                  ? "lg:pr-16"
                  : "lg:border-l lg:border-paper/15 lg:pl-16"
              }`}
            >
              <p className="text-[13px] font-semibold uppercase tracking-label text-paper/45">
                {service.number}
              </p>
              <h3 className="mt-4 text-2xl text-paper">{service.name}</h3>
              <p className="mt-4 max-w-md leading-relaxed text-paper/75">
                {service.summary}
              </p>
            </li>
          ))}
        </ol>
      </PageContainer>
    </section>
  );
}
