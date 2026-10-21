import type { ReactNode } from "react";

type KickerProps = {
  children: ReactNode;
  className?: string;
};

export function Kicker({ children, className = "" }: KickerProps) {
  return (
    <p
      className={`text-[11px] font-semibold uppercase tracking-label ${className}`.trim()}
    >
      {children}
    </p>
  );
}
