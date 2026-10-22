import { ViewTransition, type ReactNode } from "react";

const pageMotion = {
  "nav-forward": "page-forward",
  "nav-back": "page-back",
  default: "none",
} as const;

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={pageMotion} exit={pageMotion} default="none">
      {children}
    </ViewTransition>
  );
}
