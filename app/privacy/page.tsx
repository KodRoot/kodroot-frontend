import type { Metadata } from "next";
import { AppLink } from "@/components/app-link";
import { LegalPage, LegalSection } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What KodRoot does with information sent through this website.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="22 October 2026">
      <LegalSection title="Who we are">
        <p>
          KodRoot designs and builds websites, mobile products, and custom
          software. KodRoot is based in Kosovo. Questions about this policy go
          to{" "}
          <a
            className="text-ink underline underline-offset-4"
            href={`mailto:${site.email}`}
          >
            {site.email}
          </a>
          .
        </p>
      </LegalSection>
      <LegalSection title="What the form collects">
        <p>
          If you send a project inquiry, we receive the answers you choose to
          give: the project type and description, goals, follow-up answers,
          budget range, timeline, your name, and your email. Business name and
          an existing website are optional.
        </p>
        <p>
          There is no account on this site. We do not use advertising or
          analytics cookies.
        </p>
        <p>
          The server may hold an IP address in memory for a short time so the
          form can refuse repeated submissions. That record is not written to a
          database.
        </p>
      </LegalSection>
      <LegalSection title="How we use it">
        <p>
          We use the inquiry to reply. Sending the form is not a contract, a
          quote, or a promise of a delivery date.
        </p>
        <p>
          The inquiry is emailed to KodRoot through Resend. We do not sell the
          information, and asking about a project does not add you to a mailing
          list.
        </p>
      </LegalSection>
      <LegalSection title="How long we keep it">
        <p>
          Inquiry messages stay in our email while we need them to reply and to
          keep a record of the conversation. Write to us if you want that record
          deleted.
        </p>
      </LegalSection>
      <LegalSection title="Your choices">
        <p>
          Email {site.email} to ask what we hold, to correct it, or to ask us to
          delete it. We will reply.
        </p>
      </LegalSection>
      <LegalSection title="The site itself">
        <p>
          A hosting provider may keep ordinary server logs, such as an IP
          address, the browser, and the page requested, in order to run and
          protect the site.
        </p>
      </LegalSection>
      <LegalSection title="Changes">
        <p>
          If this policy changes, the date at the top changes with it. The{" "}
          <AppLink
            href="/terms"
            className="text-ink underline underline-offset-4"
          >
            terms
          </AppLink>{" "}
          cover use of the site.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
