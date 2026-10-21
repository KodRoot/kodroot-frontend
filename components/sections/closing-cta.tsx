import { AppLink } from "@/components/app-link";
import { Section } from "@/components/ui/section";
import { closingHeading } from "@/lib/content";
import { navCta } from "@/lib/navigation";

export function ClosingCta() {
  return (
    <Section labelledBy="closing-heading" surface="mark">
      <p className="text-[11px] font-semibold tracking-label text-paper/70">
        04
      </p>
      <h2
        id="closing-heading"
        className="type-display mt-6 max-w-5xl text-[clamp(3rem,9vw,7.5rem)]"
      >
        <AppLink
          href={navCta.href}
          className="text-paper underline decoration-paper/40 decoration-2 underline-offset-[0.14em] hover:decoration-paper"
        >
          {closingHeading}
        </AppLink>
      </h2>
    </Section>
  );
}
