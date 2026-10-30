import { RootSymbol } from "@/components/brand/root-symbol";
import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { ScrollReplay } from "@/components/motion/scroll-replay";
import { discussCopy, discussHeading } from "@/lib/content";

export function DiscussYourProject() {
  return (
    <section
      aria-labelledby="discuss-heading"
      className="lg:grid lg:grid-cols-12"
    >
      <div className="surface-dark lg:col-span-5">
        <div className="relative overflow-hidden px-5 py-6 sm:px-8 sm:py-10 lg:sticky lg:top-[var(--header-height)] lg:flex lg:min-h-[calc(100svh-var(--header-height))] lg:flex-col lg:px-12 lg:py-16">
          <ScrollReplay />
          <div className="hero-guides" aria-hidden="true">
            <span className="hero-guide panel-guide-x" />
            <span className="hero-guide panel-guide-y" />
          </div>
          <h1
            id="discuss-heading"
            className="hero-line type-display max-w-md text-[2rem] text-paper sm:text-[2.75rem] lg:text-[clamp(2.75rem,4vw,4.5rem)]"
          >
            {discussHeading}
          </h1>
          <p className="hero-late mt-2 max-w-sm text-base leading-relaxed sm:mt-4 sm:text-lg lg:mt-6 text-paper/75">
            {discussCopy}
          </p>
          <RootSymbol
            titleId="discuss-symbol"
            animate
            className="mt-16 hidden w-20 lg:mt-auto lg:block"
          />
        </div>
      </div>
      <div className="bg-paper lg:col-span-7">
        <div className="px-5 py-6 sm:px-8 sm:py-10 lg:px-12 lg:py-16">
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}
