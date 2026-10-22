import { PageTransition } from "@/components/page-transition";
import { Approach } from "@/components/sections/approach";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Hero } from "@/components/sections/hero";
import { Intelligence } from "@/components/sections/intelligence";
import { Offering } from "@/components/sections/offering";

export default function Home() {
  return (
    <PageTransition>
      <main id="main-content">
        <Hero />
        <Offering />
        <Intelligence />
        <Approach />
        <ClosingCta />
      </main>
    </PageTransition>
  );
}
