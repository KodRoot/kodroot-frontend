import { Section } from "@/components/ui/section";
import { Kicker } from "@/components/ui/kicker";
import {
  intelligenceCapabilities,
  intelligenceHeading,
  intelligenceIntro,
} from "@/lib/content";

export function Intelligence() {
  return (
    <Section id="intelligence" labelledBy="intelligence-heading">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Kicker className="text-muted">Intelligence in the work</Kicker>
          <h2
            id="intelligence-heading"
            className="mt-4 max-w-md text-3xl leading-snug sm:text-4xl lg:text-[2.75rem]"
          >
            {intelligenceHeading}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            {intelligenceIntro}
          </p>
        </div>
        <ol className="relative border-l-2 border-mark pl-8 lg:col-span-6 lg:col-start-7">
          {intelligenceCapabilities.map((item) => (
            <li
              key={item.id}
              className="motion-enter py-8 first:pt-0 last:pb-0"
            >
              <p className="text-[13px] font-semibold uppercase tracking-label text-muted">
                {item.number}
              </p>
              <h3 className="mt-3 max-w-md text-xl leading-snug sm:text-2xl">
                {item.name}
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted">
                {item.summary}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
