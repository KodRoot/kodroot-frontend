import type { ButtonHTMLAttributes, ReactNode } from "react";
import { AppLink } from "@/components/app-link";

function PrimaryLabel({ children }: { children: ReactNode }) {
  return (
    <>
      <span>{children}</span>
      <span className="cta-mark" aria-hidden="true" />
    </>
  );
}

type TextLinkVariant = "primary" | "secondary";
type TextLinkSurface = "paper" | "night" | "mark";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: TextLinkVariant;
  surface?: TextLinkSurface;
  onClick?: () => void;
  external?: boolean;
  "aria-label"?: string;
};

function textLinkClassName(
  variant: TextLinkVariant = "primary",
  surface: TextLinkSurface = "paper",
) {
  const base =
    "inline-flex min-h-12 items-center gap-3 text-[13px] font-semibold uppercase tracking-label motion-safe:transition-[color,background-color,transform] motion-safe:duration-200 disabled:cursor-not-allowed disabled:opacity-40 active:translate-y-px";

  if (variant === "primary") {
    if (surface === "mark") {
      return `${base} bg-paper px-5 text-ink hover:bg-night hover:text-paper`;
    }
    if (surface === "night") {
      return `${base} bg-mark px-5 text-paper hover:bg-paper hover:text-ink`;
    }
    return `${base} bg-mark px-5 text-paper hover:bg-ink`;
  }

  const quiet = `${base} link-rule pb-0.5`;
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
  external = false,
  "aria-label": ariaLabel,
}: TextLinkProps) {
  const classes = `${textLinkClassName(variant, surface)} ${className}`.trim();

  const label =
    variant === "primary" ? <PrimaryLabel>{children}</PrimaryLabel> : children;

  if (href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {label}
      </a>
    );
  }

  return (
    <AppLink href={href} className={classes} onClick={onClick}>
      {label}
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
  children,
  ...props
}: TextButtonProps) {
  return (
    <button
      type={type}
      className={`${textLinkClassName(variant, surface)} ${className}`.trim()}
      {...props}
    >
      {variant === "primary" ? (
        <PrimaryLabel>{children}</PrimaryLabel>
      ) : (
        children
      )}
    </button>
  );
}
