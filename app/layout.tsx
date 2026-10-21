import type { Viewport } from "next";
import { sourceSans } from "./fonts";
import { brandColors } from "@/lib/brand";
import { siteMetadata } from "@/lib/site";
import "./globals.css";

export const metadata = siteMetadata;

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: brandColors.paper,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sourceSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
