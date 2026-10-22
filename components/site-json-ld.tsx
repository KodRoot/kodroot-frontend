import { site } from "@/lib/site";

export function SiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: site.name,
        url: site.url,
        email: site.email,
        slogan: site.motto,
      },
      {
        "@type": "WebSite",
        name: site.name,
        url: site.url,
        description: site.description,
        inLanguage: "en",
        publisher: {
          "@type": "Organization",
          name: site.name,
          url: site.url,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
