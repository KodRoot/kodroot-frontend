import type { Metadata } from "next";
import { DiscussYourProject } from "@/components/inquiry/discuss-your-project";
import { PageTransition } from "@/components/page-transition";
import { discussCopy } from "@/lib/content";

export const metadata: Metadata = {
  title: "Discuss your project",
  description: discussCopy,
  alternates: {
    canonical: "/discuss-your-project",
  },
  openGraph: {
    url: "/discuss-your-project",
    title: "Discuss your project",
    description: discussCopy,
  },
  twitter: {
    card: "summary_large_image",
    title: "Discuss your project",
    description: discussCopy,
  },
};

export default function DiscussYourProjectPage() {
  return (
    <PageTransition>
      <main id="main-content">
        <DiscussYourProject />
      </main>
    </PageTransition>
  );
}
