import type { Metadata } from "next";

export const site = {
  name: "KodRoot",
  domain: "kodroot.com",
  url: "https://kodroot.com",
  email: "hello@kodroot.com",
  locale: "en",
  tagline: "Rooted in code. Built for growth.",
  headline: "Software built on solid foundations.",
  description:
    "KodRoot is a software development company founded in Kosovo, building digital solutions for businesses everywhere.",
  supportingCopy:
    "KodRoot designs and builds websites, mobile products, and custom software for businesses ready to grow — including intelligent features when they serve the work.",
} as const;

export const siteMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.headline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: `${site.name} — ${site.headline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.headline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};
