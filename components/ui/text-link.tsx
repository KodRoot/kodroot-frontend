import type { ButtonHTMLAttributes, ReactNode } from "react";
import { AppLink } from "@/components/app-link";

type TextLinkVariant = "primary" | "secondary";
type TextLinkSurface = "paper" | "night";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: TextLinkVariant;
  surface?: TextLinkSurface;
  onClick?: () => void;
};

export function textLinkClassName(
  variant: TextLinkVariant = "primary",
  surface: TextLinkSurface = "paper",
) {
  const base =
    "inline-flex min-h-11 items-center pb-0.5 text-[13px] font-semibold uppercase tracking-label motion-safe:transition-colors";

  if (surface === "night") {
    return variant === "primary"
      ? `${base} border-b-2 border-mark text-paper`
      : `${base} border-b border-paper/35 text-paper/75 hover:border-paper hover:text-paper`;
  }

  return variant === "primary"
    ? `${base} border-b-2 border-mark text-ink`
    : `${base} border-b border-ink/35 text-muted hover:border-ink hover:text-ink`;
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
