import { RadicalLockup } from "@/components/brand/radical-lockup";
import { PageContainer } from "@/components/page-container";
import { TextLink } from "@/components/ui/text-link";
import { originLine } from "@/lib/content";
import { navCta } from "@/lib/navigation";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading">
      <PageContainer className="pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32">
        <RadicalLockup
          className="h-10 text-[2.5rem] sm:h-14 sm:text-[3.5rem] lg:h-16 lg:text-[4rem]"
          barClassName="motion-draw-bar"
        />
        <div className="mt-8 grid items-end gap-10 lg:mt-10 lg:grid-cols-12 lg:gap-12">
          <h1
            id="hero-heading"
            className="max-w-5xl text-[clamp(2.5rem,7vw,5.75rem)] leading-[1.05] lg:col-span-8"
          >
            {site.headline}
          </h1>
          <div className="lg:col-span-4">
            <p className="max-w-md text-lg leading-relaxed text-muted">
              {site.supportingCopy}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <TextLink href={navCta.href}>{navCta.label}</TextLink>
              <TextLink href="/#services" variant="secondary">
                What we build
              </TextLink>
            </div>
          </div>
        </div>
        <p className="mt-16 text-[13px] font-semibold uppercase tracking-label text-muted sm:mt-20">
          {originLine}
        </p>
      </PageContainer>
    </section>
  );
}
