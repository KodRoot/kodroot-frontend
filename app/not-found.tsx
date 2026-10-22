import type { Metadata } from "next";
import { RootSymbol } from "@/components/brand/root-symbol";
import { PageContainer } from "@/components/page-container";
import { PageTransition } from "@/components/page-transition";
import { Kicker } from "@/components/ui/kicker";
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
    <PageTransition>
      <main id="main-content" className="surface-dark">
        <PageContainer className="grid min-h-[70vh] content-center gap-10 py-20 lg:grid-cols-12 lg:items-end lg:py-28">
          <div className="lg:col-span-8">
            <Kicker className="text-paper/60">404</Kicker>
            <h1 className="type-display mt-6 max-w-4xl text-[clamp(3rem,9vw,6.5rem)] text-paper">
              This page is not on the site.
            </h1>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <TextLink href="/" surface="night">
                KodRoot home
              </TextLink>
              <TextLink href={navCta.href} variant="secondary" surface="night">
                {navCta.label}
              </TextLink>
            </div>
          </div>
          <RootSymbol
            titleId="missing-symbol"
            animate
            className="w-28 lg:col-span-3 lg:col-start-10 lg:w-40"
          />
        </PageContainer>
      </main>
    </PageTransition>
  );
}
