import { PageContainer } from "@/components/page-container";
import { TextLink } from "@/components/ui/text-link";
import { originLine } from "@/lib/content";
import { navCta } from "@/lib/navigation";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading">
      <PageContainer className="py-[var(--section-y)] lg:py-[var(--section-y-lg)]">
        <h1
          id="hero-heading"
          className="max-w-3xl text-4xl leading-tight sm:text-5xl"
        >
          {site.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {site.supportingCopy}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <TextLink href={navCta.href}>{navCta.label}</TextLink>
          <TextLink href="/#services" variant="secondary">
            What we build
          </TextLink>
        </div>
        <p className="mt-16 text-[13px] font-semibold uppercase tracking-label text-muted">
          {originLine}
        </p>
      </PageContainer>
    </section>
  );
}
