import type { ReactNode } from "react";
import { PageContainer } from "@/components/page-container";

type SectionProps = {
  id?: string;
  labelledBy: string;
  surface?: "paper" | "night";
  children: ReactNode;
};

export function Section({
  id,
  labelledBy,
  surface = "paper",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={surface === "night" ? "surface-dark" : "bg-paper"}
    >
      <PageContainer className="py-[var(--section-y)] lg:py-[var(--section-y-lg)]">
        {children}
      </PageContainer>
    </section>
  );
}
