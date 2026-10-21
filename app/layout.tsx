import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KodRoot",
  description:
    "KodRoot is a software development company founded in Kosovo, building digital solutions for businesses everywhere.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
