import type { ReactNode } from "react";
import { PageContainer } from "@/components/page-container";

type SectionProps = {
  id?: string;
  labelledBy: string;
  surface?: "paper" | "night" | "mark";
  className?: string;
  children: ReactNode;
};

const surfaceClass = {
  paper: "bg-paper",
  night: "surface-dark",
  mark: "surface-mark",
} as const;

export function Section({
  id,
  labelledBy,
  surface = "paper",
  className = "",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${surfaceClass[surface]} ${className}`.trim()}
    >
      <PageContainer className="py-[var(--section-y)] lg:py-[var(--section-y-lg)]">
        {children}
      </PageContainer>
    </section>
  );
}
