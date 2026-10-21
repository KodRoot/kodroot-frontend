import { Capabilities } from "@/components/sections/capabilities";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Services />
      <Capabilities />
    </main>
  );
}
