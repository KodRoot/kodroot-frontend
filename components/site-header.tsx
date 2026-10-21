import { AppLink } from "@/components/app-link";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { PageContainer } from "@/components/page-container";
import { navCta, navItems } from "@/lib/navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/12 bg-paper">
      <PageContainer className="flex h-[var(--header-height)] items-center justify-between gap-8">
        <Logo priority />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <AppLink
              key={item.href}
              href={item.href}
              className="border-b border-transparent pb-0.5 text-[13px] font-semibold uppercase tracking-label text-muted hover:border-ink/40 hover:text-ink"
            >
              {item.label}
            </AppLink>
          ))}
          <AppLink
            href={navCta.href}
            className="border-b-2 border-mark pb-0.5 text-[13px] font-semibold uppercase tracking-label text-ink"
          >
            {navCta.label}
          </AppLink>
        </nav>
        <MobileNav />
      </PageContainer>
    </header>
  );
}
