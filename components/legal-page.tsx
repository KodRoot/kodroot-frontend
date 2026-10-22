import type { ReactNode } from "react";
import { PageContainer } from "@/components/page-container";
import { PageTransition } from "@/components/page-transition";
import { Kicker } from "@/components/ui/kicker";

type LegalPageProps = {
  title: string;
  updated: string;
  children: ReactNode;
};

export function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <PageTransition>
      <main id="main-content" className="bg-paper">
        <PageContainer className="py-16 sm:py-20 lg:py-28">
          <div className="max-w-3xl">
            <Kicker className="text-muted">{updated}</Kicker>
            <h1 className="type-display mt-4 text-[clamp(2.75rem,6vw,5rem)]">
              {title}
            </h1>
            <div className="rule-draw mt-8 h-px w-16 bg-mark" />
            <div className="mt-14 space-y-12 text-lg leading-relaxed">
              {children}
            </div>
          </div>
        </PageContainer>
      </main>
    </PageTransition>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-2xl text-ink">{title}</h2>
      <div className="mt-4 space-y-4 text-muted">{children}</div>
    </section>
  );
}
