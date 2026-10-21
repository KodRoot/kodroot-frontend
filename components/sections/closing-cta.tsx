import { AppLink } from "@/components/app-link";
import { PageContainer } from "@/components/page-container";
import { closingCopy, closingHeading } from "@/lib/content";
import { navCta } from "@/lib/navigation";

export function ClosingCta() {
  return (
    <section aria-labelledby="closing-heading" className="bg-paper">
      <PageContainer className="py-24 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2
            id="closing-heading"
            className="max-w-3xl text-4xl leading-snug sm:text-5xl lg:col-span-8 lg:text-6xl"
          >
            {closingHeading}
          </h2>
          <div className="lg:col-span-4">
            <p className="max-w-md text-lg leading-relaxed text-muted">
              {closingCopy}
            </p>
            <AppLink
              href={navCta.href}
              className="mt-8 inline-flex min-h-11 items-center border-b-2 border-mark pb-0.5 text-[13px] font-semibold uppercase tracking-label"
            >
              {navCta.label}
            </AppLink>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
