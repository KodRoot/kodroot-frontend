import { Logo } from "@/components/logo";
import { PageContainer } from "@/components/page-container";
import { Kicker } from "@/components/ui/kicker";
import { TextLink } from "@/components/ui/text-link";
import { services } from "@/lib/content";
import { navCta } from "@/lib/navigation";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer
      className="surface-dark border-t border-paper/15"
      style={{ viewTransitionName: "site-footer" }}
    >
      <PageContainer className="py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <Logo variant="dark" />
          </div>
          <div className="lg:col-span-3 lg:col-start-7">
            <Kicker className="text-paper/60">What we build</Kicker>
            <ul className="mt-5 space-y-3">
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
          <div className="lg:col-span-3">
            <Kicker className="text-paper/60">Contact</Kicker>
            <ul className="mt-5 space-y-4">
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
        <div className="mt-14 flex flex-wrap gap-x-6 gap-y-3 border-t border-paper/15 pt-6">
          <TextLink href="/privacy" variant="secondary" surface="night">
            Privacy policy
          </TextLink>
          <TextLink href="/terms" variant="secondary" surface="night">
            Terms and conditions
          </TextLink>
        </div>
      </PageContainer>
    </footer>
  );
}
