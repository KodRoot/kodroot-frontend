import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { PageContainer } from "@/components/page-container";
import { brandAssets } from "@/lib/brand";
import { discussCopy, discussGuidance, discussHeading } from "@/lib/content";

export function DiscussYourProject() {
  return (
    <section
      aria-labelledby="discuss-heading"
      className="surface-dark relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[22%] bg-repeat opacity-30 lg:block"
        style={{
          backgroundImage: `url(${brandAssets.patternNight})`,
          backgroundSize: "220px 200px",
        }}
      />
      <PageContainer className="relative py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="text-[12px] font-semibold uppercase tracking-label text-paper/55">
              Discuss your project
            </p>
            <h1
              id="discuss-heading"
              className="mt-4 max-w-md text-3xl leading-snug text-paper sm:text-4xl"
            >
              {discussHeading}
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/75">
              {discussCopy}
            </p>
            <p className="mt-4 max-w-md leading-relaxed text-paper/65">
              {discussGuidance}
            </p>
          </div>
          <div className="bg-paper p-6 text-ink sm:p-10 lg:col-span-8">
            <InquiryForm />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
