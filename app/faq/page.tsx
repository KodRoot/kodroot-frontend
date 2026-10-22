import type { Metadata } from "next";
import { PageContainer } from "@/components/page-container";
import { PageTransition } from "@/components/page-transition";
import { Kicker } from "@/components/ui/kicker";
import { TextLink } from "@/components/ui/text-link";
import { faqDescription, faqHeading, faqs } from "@/lib/faq";
import { navCta } from "@/lib/navigation";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: faqHeading,
  description: faqDescription,
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    url: "/faq",
    title: faqHeading,
    description: faqDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: faqHeading,
    description: faqDescription,
  },
};

export default function FaqPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: `${site.url}/faq`,
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <PageTransition>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main id="main-content" className="bg-paper">
        <PageContainer className="py-16 sm:py-20 lg:py-28">
          <div className="max-w-3xl">
            <Kicker className="text-muted">FAQ</Kicker>
            <h1 className="type-display mt-4 text-[clamp(2.75rem,6vw,5rem)]">
              {faqHeading}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {faqDescription}
            </p>
            <div className="rule-draw mt-10 h-px bg-ink/15" />
            <div className="divide-y divide-ink/15">
              {faqs.map((item) => (
                <section key={item.question} className="py-10">
                  <h2 className="text-2xl leading-snug text-ink sm:text-3xl">
                    {item.question}
                  </h2>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
                    {item.answer}
                  </p>
                </section>
              ))}
            </div>
            <div className="border-t border-ink/15 pt-10">
              <TextLink href={navCta.href}>{navCta.label}</TextLink>
            </div>
          </div>
        </PageContainer>
      </main>
    </PageTransition>
  );
}
