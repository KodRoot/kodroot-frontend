import Link from "next/link";
import { Logo } from "@/components/logo";
import { PageContainer } from "@/components/page-container";
import { originLine, services } from "@/lib/content";
import { navCta } from "@/lib/navigation";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="surface-dark mt-auto border-t border-paper/10">
      <PageContainer className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Logo variant="dark" />
            <p className="mt-8 max-w-sm leading-relaxed text-paper/75">
              {site.description}
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-label text-paper/55">
                Services
              </p>
              <ul className="mt-4 space-y-3">
                {services.map((service) => (
                  <li key={service.id}>
                    <Link
                      href="/#services"
                      className="text-paper underline-offset-4 hover:underline"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-label text-paper/55">
                Contact
              </p>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    href={navCta.href}
                    className="text-paper underline-offset-4 hover:underline"
                  >
                    Project inquiry
                  </Link>
                </li>
                <li>
                  <a
                    href={site.url}
                    className="text-paper underline-offset-4 hover:underline"
                  >
                    {site.domain}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-paper underline-offset-4 hover:underline"
                  >
                    {site.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-16 border-t border-paper/10 pt-6 text-[13px] font-semibold uppercase tracking-label text-paper/55">
          {originLine}
        </p>
      </PageContainer>
    </footer>
  );
}
