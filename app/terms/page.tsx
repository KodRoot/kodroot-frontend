import type { Metadata } from "next";
import { AppLink } from "@/components/app-link";
import { LegalPage, LegalSection } from "@/components/legal-page";
import { site } from "@/lib/site";

const description = "The terms for using the KodRoot website.";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description,
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    url: "/terms",
    title: "Terms and conditions",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms and conditions",
    description,
  },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms and conditions" updated="22 October 2026">
      <LegalSection title="The site">
        <p>
          These terms cover use of {site.domain}. Project work is covered by a
          separate agreement, not by this page.
        </p>
        <p>
          The pages describe what KodRoot does. They are not an offer to start
          work, and they are not a quote.
        </p>
      </LegalSection>
      <LegalSection title="Inquiries">
        <p>
          The project form collects what we need to reply. A hoped-for launch
          date is your note. It is not a delivery promise. Cost is discussed
          after we understand the project, and nothing on this site is a quote.
        </p>
        <p>Work starts only when both sides agree in writing.</p>
        <p>
          How we handle the details you send is described in the{" "}
          <AppLink
            href="/privacy"
            className="text-ink underline underline-offset-4"
          >
            privacy policy
          </AppLink>
          .
        </p>
      </LegalSection>
      <LegalSection title="Using the site">
        <p>
          Use the site and the form for a genuine inquiry. Do not misuse the
          form, try to break the site, or send anything unlawful.
        </p>
        <p>
          The text, design, and brand on this site belong to KodRoot. Do not
          copy them for your own commercial use.
        </p>
      </LegalSection>
      <LegalSection title="Liability">
        <p>
          We take care with the information on the site. We do not promise that
          every page is complete or free of interruption. Nothing here replaces
          the agreement that covers a project.
        </p>
        <p>
          To the extent the law allows, KodRoot is not liable for loss that
          comes from using the website itself. Liability for project work is set
          in the project agreement.
        </p>
      </LegalSection>
      <LegalSection title="Changes and law">
        <p>
          We may update these terms. The date at the top will change. Continuing
          to use the site after an update means the current terms apply.
        </p>
        <p>
          KodRoot is based in Kosovo. These terms are governed by the laws of
          Kosovo.
        </p>
        <p>
          Questions go to{" "}
          <a
            className="text-ink underline underline-offset-4"
            href={`mailto:${site.email}`}
          >
            {site.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
