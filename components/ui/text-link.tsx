import type { ButtonHTMLAttributes, ReactNode } from "react";
import { AppLink } from "@/components/app-link";

type TextLinkVariant = "primary" | "secondary";
type TextLinkSurface = "paper" | "night" | "mark";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: TextLinkVariant;
  surface?: TextLinkSurface;
  onClick?: () => void;
};

function textLinkClassName(
  variant: TextLinkVariant = "primary",
  surface: TextLinkSurface = "paper",
) {
  const base =
    "inline-flex min-h-12 items-center text-[13px] font-semibold uppercase tracking-label motion-safe:transition-colors";

  if (variant === "primary") {
    if (surface === "mark") {
      return `${base} bg-paper px-5 text-ink hover:bg-night hover:text-paper`;
    }
    if (surface === "night") {
      return `${base} bg-mark px-5 text-paper hover:bg-paper hover:text-ink`;
    }
    return `${base} bg-mark px-5 text-paper hover:bg-ink`;
  }

  const quiet = `${base} border-b pb-0.5`;
  if (surface === "mark" || surface === "night") {
    return `${quiet} border-paper/40 text-paper/80 hover:border-paper hover:text-paper`;
  }
  return `${quiet} border-ink/30 text-muted hover:border-ink hover:text-ink`;
}

export function TextLink({
  href,
  children,
  className = "",
  variant = "primary",
  surface = "paper",
  onClick,
}: TextLinkProps) {
  const classes = `${textLinkClassName(variant, surface)} ${className}`.trim();

  if (href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <AppLink href={href} className={classes} onClick={onClick}>
      {children}
    </AppLink>
  );
}

type TextButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: TextLinkVariant;
  surface?: TextLinkSurface;
};

export function TextButton({
  variant = "primary",
  surface = "paper",
  className = "",
  type = "button",
  ...props
}: TextButtonProps) {
  return (
    <button
      type={type}
      className={`${textLinkClassName(variant, surface)} ${className}`.trim()}
      {...props}
    />
  );
}
