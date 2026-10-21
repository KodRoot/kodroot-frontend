import { Logo } from "@/components/logo";
import { PageContainer } from "@/components/page-container";
import { Kicker } from "@/components/ui/kicker";
import { TextLink } from "@/components/ui/text-link";
import { originLine, services } from "@/lib/content";
import { navCta } from "@/lib/navigation";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="surface-dark">
      <div className="h-[2px] bg-mark" aria-hidden="true" />
      <PageContainer className="py-16 lg:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-sm">
            <Logo variant="dark" />
            <p className="mt-8 leading-relaxed text-paper/75">
              {site.description}
            </p>
          </div>
          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
            <div>
              <Kicker className="text-paper/55">What we build</Kicker>
              <ul className="mt-4 space-y-3">
                {services.map((service) => (
                  <li key={service.id}>
                    <TextLink
                      href="/#services"
                      variant="secondary"
                      surface="night"
                    >
                      {service.name}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Kicker className="text-paper/55">Contact</Kicker>
              <ul className="mt-4 space-y-3">
                <li>
                  <TextLink href={navCta.href} surface="night">
                    {navCta.label}
                  </TextLink>
                </li>
                <li>
                  <TextLink
                    href={`mailto:${site.email}`}
                    variant="secondary"
                    surface="night"
                  >
                    {site.email}
                  </TextLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-16 pt-6 text-[13px] font-semibold uppercase tracking-label text-paper/55">
          {originLine}
        </p>
      </PageContainer>
    </footer>
  );
}
