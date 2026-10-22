import type { Metadata } from "next";
import { AppLink } from "@/components/app-link";
import { LegalPage, LegalSection } from "@/components/legal-page";
import { site } from "@/lib/site";

const description =
  "What KodRoot does with information sent through this website.";

export const metadata: Metadata = {
  title: "Privacy policy",
  description,
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    url: "/privacy",
    title: "Privacy policy",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy policy",
    description,
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
          give: the project type and description, goals, follow-up answers, a
          hoped-for launch window, your name, and your email. Business name and
          an existing website are optional. The form does not ask for a budget.
        </p>
        <p>
          There is no account on this site. The server may hold an IP address in
          memory for a short time so the form can refuse repeated submissions.
          That record is not written to a database.
        </p>
      </LegalSection>
      <LegalSection title="How we use it">
        <p>
          We use the inquiry to reply. Sending the form is not a contract, a
          quote, or a promise of a delivery date.
        </p>
        <p>
          The inquiry is emailed to KodRoot through Resend. The sender address
          is set by KodRoot. Your email is used only as a reply address. We do
          not sell the information, and asking about a project does not add you
          to a mailing list.
        </p>
      </LegalSection>
      <LegalSection title="How long we keep it">
        <p>
          Inquiry messages stay in our email while we need them to reply and to
          keep a record of the conversation. Write to us if you want that record
          deleted.
        </p>
      </LegalSection>
      <LegalSection title="Website analytics">
        <p>
          This site uses Vercel Web Analytics so KodRoot can see which pages are
          visited, which sites send traffic here, and a coarse picture of
          location, browser, and device. That is for understanding the public
          website, not for advertising.
        </p>
        <p>
          Vercel documents this product as cookieless. Visitors are counted with
          a hash taken from the incoming request. That hash is discarded after
          24 hours and is not used to follow someone across other websites or
          from one day to the next.
        </p>
        <p>
          A data point may include the page path, a filtered query string, the
          referrer, country, region, city, operating system, browser, and device
          type. It is not shown in the dashboard against a name, an email
          address, or an IP address. Inquiry answers are not sent to analytics.
          This site does not load advertising pixels or a second analytics
          product.
        </p>
        <p>
          Vercel processes those measurements as the host of the site. Because
          this implementation does not set analytics cookies, the pages do not
          show a cookie consent banner for it. Questions about this processing
          go to{" "}
          <a
            className="text-ink underline underline-offset-4"
            href={`mailto:${site.email}`}
          >
            {site.email}
          </a>
          .
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
          The site is hosted on Vercel. Ordinary server logs, such as an IP
          address, the browser, and the page requested, may be kept in order to
          run and protect the site.
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
