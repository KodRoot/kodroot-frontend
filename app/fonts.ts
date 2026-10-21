import localFont from "next/font/local";

export const sourceSans = localFont({
  src: [
    {
      path: "./fonts/source-sans-3-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/source-sans-3-600.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-source-sans",
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});
