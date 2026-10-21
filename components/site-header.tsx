import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { PageContainer } from "@/components/page-container";
import { TextLink } from "@/components/ui/text-link";
import { navCta, navItems } from "@/lib/navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-paper">
      <PageContainer className="flex h-[var(--header-height)] items-center justify-between gap-8">
        <Logo priority />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <TextLink key={item.href} href={item.href} variant="secondary">
              {item.label}
            </TextLink>
          ))}
          <TextLink href={navCta.href}>{navCta.label}</TextLink>
        </nav>
        <MobileNav />
      </PageContainer>
      <div className="h-px bg-ink/12" aria-hidden="true" />
    </header>
  );
}
