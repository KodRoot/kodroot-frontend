import Image from "next/image";
import { AppLink } from "@/components/app-link";
import { PageContainer } from "@/components/page-container";
import { brandAssets } from "@/lib/brand";
import { navCta } from "@/lib/navigation";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading">
      <PageContainer className="py-16 sm:py-20 lg:py-28">
        <Image
          src={brandAssets.logoPrimary}
          alt={site.name}
          width={360}
          height={81}
          priority
          className="h-auto w-[13.5rem] sm:w-[18rem]"
        />
        <div className="mt-12 grid items-end gap-10 lg:mt-20 lg:grid-cols-12">
          <h1
            id="hero-heading"
            className="max-w-5xl text-4xl leading-[1.08] sm:text-6xl lg:col-span-8 lg:text-[4.75rem]"
          >
            {site.headline}
          </h1>
          <div className="lg:col-span-4">
            <p className="max-w-md text-lg leading-relaxed text-muted">
              {site.supportingCopy}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <AppLink
                href={navCta.href}
                className="inline-flex min-h-11 items-center border-b-2 border-mark pb-0.5 text-[13px] font-semibold uppercase tracking-label"
              >
                {navCta.label}
              </AppLink>
              <AppLink
                href="/#services"
                className="inline-flex min-h-11 items-center border-b border-ink/35 pb-0.5 text-[13px] font-semibold uppercase tracking-label text-muted hover:border-ink hover:text-ink"
              >
                Explore our work
              </AppLink>
            </div>
          </div>
        </div>
      </PageContainer>
      <div className="h-3 bg-mark" aria-hidden="true" />
      <PageContainer className="py-6">
        <p className="text-[13px] font-semibold uppercase tracking-label text-muted">
          Founded in Kosovo. Building for businesses everywhere.
        </p>
      </PageContainer>
    </section>
  );
}
