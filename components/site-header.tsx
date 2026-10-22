import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { PageContainer } from "@/components/page-container";
import { TextLink } from "@/components/ui/text-link";
import { navCta, navItems } from "@/lib/navigation";

export function SiteHeader() {
  return (
    <header
      className="surface-dark sticky top-0 z-50 border-b border-paper/15"
      style={{ viewTransitionName: "site-header" }}
    >
      <PageContainer className="flex h-[var(--header-height)] items-center justify-between gap-8">
        <Logo priority variant="dark" />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <TextLink
              key={item.href}
              href={item.href}
              variant="secondary"
              surface="night"
            >
              {item.label}
            </TextLink>
          ))}
          <TextLink href={navCta.href} surface="night">
            {navCta.label}
          </TextLink>
        </nav>
        <MobileNav />
      </PageContainer>
    </header>
  );
}
