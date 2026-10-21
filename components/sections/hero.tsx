import Image from "next/image";
import { PageContainer } from "@/components/page-container";
import { TextLink } from "@/components/ui/text-link";
import { brandAssets } from "@/lib/brand";
import { navCta } from "@/lib/navigation";
import { site } from "@/lib/site";

const heroHeadline = "Software built on solid foundations.";

const heroLines =
  site.headline === heroHeadline
    ? ["Software built", "on solid", "foundations."]
    : [site.headline];

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="surface-dark">
      <PageContainer className="flex min-h-[calc(100svh-var(--header-height))] flex-col py-8 sm:py-10 lg:py-12">
        <div className="motion-rise my-auto grid items-end gap-10 py-16 lg:grid-cols-12 lg:py-24">
          <h1
            id="hero-heading"
            className="type-display text-[clamp(2.35rem,8vw,6.25rem)] text-paper lg:col-span-8"
          >
            {heroLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <Image
            src={brandAssets.symbol}
            alt=""
            width={280}
            height={280}
            priority
            className="w-24 justify-self-end sm:w-28 lg:col-span-4 lg:w-52 xl:w-64"
          />
        </div>

        <div className="grid gap-8 border-t border-paper/15 pt-8 lg:grid-cols-12 lg:items-end">
          <p className="max-w-md text-lg leading-relaxed text-paper/75 lg:col-span-6">
            {site.supportingCopy}
          </p>
          <div className="flex flex-wrap items-center gap-4 lg:col-span-6 lg:justify-end">
            <TextLink href={navCta.href} surface="night">
              {navCta.label}
            </TextLink>
            <TextLink href="/#services" variant="secondary" surface="night">
              What we build
            </TextLink>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
