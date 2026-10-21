import { Approach } from "@/components/sections/approach";
import { Capabilities } from "@/components/sections/capabilities";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Services />
      <Capabilities />
      <Approach />
      <ClosingCta />
    </main>
  );
}
