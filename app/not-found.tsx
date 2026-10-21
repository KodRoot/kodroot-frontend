import type { Metadata } from "next";
import { RadicalLockup } from "@/components/brand/radical-lockup";
import { PageContainer } from "@/components/page-container";
import { TextLink } from "@/components/ui/text-link";
import { navCta } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Page not found",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main id="main-content">
      <PageContainer className="py-[var(--section-y)] lg:py-[var(--section-y-lg)]">
        <RadicalLockup className="h-8 text-[2rem] sm:h-10 sm:text-[2.5rem]" />
        <h1 className="mt-10 max-w-3xl text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.08]">
          This page is not on the site.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
          The address may be mistyped, or the page may have moved. The rest of
          KodRoot is still here.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
          <TextLink href="/">KodRoot home</TextLink>
          <TextLink href={navCta.href} variant="secondary">
            {navCta.label}
          </TextLink>
        </div>
      </PageContainer>
    </main>
  );
}
