import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { PageContainer } from "@/components/page-container";
import { Kicker } from "@/components/ui/kicker";
import { discussCopy, discussGuidance, discussHeading } from "@/lib/content";

export function DiscussYourProject() {
  return (
    <section aria-labelledby="discuss-heading" className="bg-paper">
      <PageContainer className="py-[var(--section-y)] lg:py-[var(--section-y-lg)]">
        <Kicker className="text-muted">Discuss your project</Kicker>
        <h1
          id="discuss-heading"
          className="mt-4 max-w-2xl text-3xl leading-snug sm:text-4xl"
        >
          {discussHeading}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {discussCopy}
        </p>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          {discussGuidance}
        </p>
        <div className="mt-12 max-w-2xl">
          <InquiryForm />
        </div>
      </PageContainer>
    </section>
  );
}
