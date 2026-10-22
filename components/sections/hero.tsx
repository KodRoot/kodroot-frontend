import { RootSymbol } from "@/components/brand/root-symbol";
import { HeroPointer } from "@/components/motion/hero-pointer";
import { ScrollReplay } from "@/components/motion/scroll-replay";
import { PageContainer } from "@/components/page-container";
import { TextLink } from "@/components/ui/text-link";
import { navCta } from "@/lib/navigation";
import { site } from "@/lib/site";

const heroHeadline = "Software built on solid foundations.";

const heroLines =
  site.headline === heroHeadline
    ? ["Software built", "on solid", "foundations."]
    : [site.headline];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="hero-field surface-dark relative overflow-hidden"
    >
      <ScrollReplay />
      <div className="hero-guides" aria-hidden="true">
        <span className="hero-guide hero-guide-x" />
        <span className="hero-guide hero-guide-y" />
      </div>
      <HeroPointer>
        <PageContainer className="relative flex min-h-[calc(100svh-var(--header-height))] flex-col py-8 sm:py-10 lg:py-12">
          <div className="my-auto grid items-end gap-10 py-16 lg:grid-cols-12 lg:py-24">
            <div className="lg:col-span-8">
              <p className="hero-line max-w-md text-[15px] leading-relaxed text-paper/70">
                {site.motto}
              </p>
              <h1
                id="hero-heading"
                className="type-display mt-5 text-[clamp(2.35rem,8vw,6.25rem)] text-paper sm:mt-6"
              >
                {heroLines.map((line) => (
                  <span key={line} className="hero-line block">
                    {line}
                  </span>
                ))}
              </h1>
            </div>
            <div className="hero-symbol w-24 justify-self-end sm:w-28 lg:col-span-4 lg:w-52 xl:w-64">
              <RootSymbol titleId="hero-symbol" animate className="w-full" />
            </div>
          </div>

          <div className="hero-late grid gap-8 border-t border-paper/15 pt-8 lg:grid-cols-12 lg:items-end">
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
      </HeroPointer>
    </section>
  );
}
