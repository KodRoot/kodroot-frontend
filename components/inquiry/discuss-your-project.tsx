import Image from "next/image";
import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { brandAssets } from "@/lib/brand";
import { discussCopy, discussHeading } from "@/lib/content";

export function DiscussYourProject() {
  return (
    <section
      aria-labelledby="discuss-heading"
      className="lg:grid lg:grid-cols-12"
    >
      <div className="surface-dark lg:col-span-5">
        <div className="px-5 py-14 sm:px-8 lg:sticky lg:top-[var(--header-height)] lg:flex lg:min-h-[calc(100svh-var(--header-height))] lg:flex-col lg:px-12 lg:py-16">
          <h1
            id="discuss-heading"
            className="type-display max-w-md text-[clamp(2.75rem,4vw,4.5rem)] text-paper"
          >
            {discussHeading}
          </h1>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-paper/75">
            {discussCopy}
          </p>
          <Image
            src={brandAssets.symbol}
            alt=""
            width={120}
            height={120}
            className="mt-16 w-20 lg:mt-auto"
          />
        </div>
      </div>
      <div className="bg-paper lg:col-span-7">
        <div className="px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}
