import type { Metadata } from "next";
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
        <h1 className="max-w-2xl text-4xl leading-tight sm:text-5xl">
          This page is not on the site.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
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
