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
      <Kicker className="text-muted">Intelligence in the work</Kicker>
      <h2
        id="intelligence-heading"
        className="mt-4 max-w-2xl text-3xl leading-snug sm:text-4xl"
      >
        {intelligenceHeading}
      </h2>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
        {intelligenceIntro}
      </p>
      <ol className="mt-12 max-w-2xl space-y-10">
        {intelligenceCapabilities.map((item) => (
          <li key={item.id}>
            <p className="text-[13px] font-semibold uppercase tracking-label text-muted">
              {item.number}
            </p>
            <h3 className="mt-3 text-xl leading-snug sm:text-2xl">
              {item.name}
            </h3>
            <p className="mt-3 leading-relaxed text-muted">{item.summary}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
