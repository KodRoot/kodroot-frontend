import type { Viewport } from "next";
import Script from "next/script";
import { RestoreHashScroll } from "@/components/restore-hash-scroll";
import { SiteAnalytics } from "@/components/site-analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteJsonLd } from "@/components/site-json-ld";
import { brandColors } from "@/lib/brand";
import { siteMetadata } from "@/lib/site";
import { sourceSans } from "./fonts";
import "./globals.css";

export const metadata = siteMetadata;

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: brandColors.night,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <Script id="scroll-restoration" strategy="beforeInteractive">
          {`try{if("scrollRestoration"in history)history.scrollRestoration="manual";var h=location.hash;if(h){sessionStorage.setItem("kodroot-pending-hash",h);history.replaceState(null,"",location.pathname+location.search);document.documentElement.style.visibility="hidden";setTimeout(function(){document.documentElement.style.visibility=""},800)}}catch(e){}`}
        </Script>
        <RestoreHashScroll />
        <SiteJsonLd />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[80] focus:bg-paper focus:px-3 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <SiteAnalytics />
      </body>
    </html>
  );
}
