import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

export function PageContainer({
  children,
  className = "",
}: PageContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[1440px] px-6 lg:px-10 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
