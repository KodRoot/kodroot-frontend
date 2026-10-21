import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { PageContainer } from "@/components/page-container";
import { Kicker } from "@/components/ui/kicker";
import { discussCopy, discussGuidance, discussHeading } from "@/lib/content";

export function DiscussYourProject() {
  return (
    <section aria-labelledby="discuss-heading" className="bg-paper">
      <PageContainer className="py-[var(--section-y)] lg:py-[var(--section-y-lg)]">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4 lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:self-start">
            <Kicker className="text-muted">Discuss your project</Kicker>
            <h1
              id="discuss-heading"
              className="mt-4 max-w-md text-3xl leading-snug sm:text-4xl"
            >
              {discussHeading}
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              {discussCopy}
            </p>
            <p className="mt-4 max-w-md leading-relaxed text-muted">
              {discussGuidance}
            </p>
          </div>
          <div className="lg:col-span-8">
            <InquiryForm />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
