import type { ReactNode } from "react";
import { PageContainer } from "@/components/page-container";

type SectionProps = {
  id?: string;
  labelledBy: string;
  surface?: "paper" | "night";
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  labelledBy,
  surface = "paper",
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${surface === "night" ? "surface-dark" : "bg-paper"} ${className}`.trim()}
    >
      <PageContainer className="py-[var(--section-y)] lg:py-[var(--section-y-lg)]">
        {children}
      </PageContainer>
    </section>
  );
}
