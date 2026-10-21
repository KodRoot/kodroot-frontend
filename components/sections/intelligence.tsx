import { Section } from "@/components/ui/section";
import { Kicker } from "@/components/ui/kicker";
import { intelligenceCapabilities, intelligenceHeading } from "@/lib/content";

export function Intelligence() {
  return (
    <Section
      id="intelligence"
      labelledBy="intelligence-heading"
      surface="night"
    >
      <div className="grid gap-16 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <Kicker className="text-paper/45">02</Kicker>
          <h2
            id="intelligence-heading"
            className="type-display mt-4 max-w-md text-[clamp(2.75rem,5vw,4.75rem)] text-paper"
          >
            {intelligenceHeading}
          </h2>
        </div>
        <ol className="border-l-2 border-mark lg:col-span-6 lg:col-start-7">
          {intelligenceCapabilities.map((item) => (
            <li
              key={item.id}
              className="motion-enter border-b border-paper/15 py-8 pl-6 first:pt-0 last:border-b-0 last:pb-0 sm:pl-8"
            >
              <p className="text-[11px] font-semibold tracking-label text-paper/45">
                {item.number}
              </p>
              <h3 className="mt-3 text-2xl leading-snug text-paper sm:text-3xl">
                {item.name}
              </h3>
              <p className="mt-3 max-w-sm leading-relaxed text-paper/70">
                {item.summary}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
