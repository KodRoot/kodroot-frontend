import { Section } from "@/components/ui/section";
import { Kicker } from "@/components/ui/kicker";
import {
  approachBody,
  approachHeading,
  approachIntro,
  approachPrinciples,
} from "@/lib/content";

export function Approach() {
  return (
    <Section id="approach" labelledBy="approach-heading">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <Kicker className="text-muted lg:col-span-4">How we work</Kicker>
        <h2
          id="approach-heading"
          className="max-w-xl text-3xl leading-snug sm:text-4xl lg:col-span-7 lg:col-start-6"
        >
          {approachHeading}
        </h2>
      </div>

      <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12">
        <div className="max-w-xl lg:col-span-5">
          <p className="text-lg leading-relaxed">{approachIntro}</p>
          <p className="mt-6 leading-relaxed text-muted">{approachBody}</p>
        </div>
        <ol className="relative border-l-2 border-mark pl-8 lg:col-span-6 lg:col-start-7">
          {approachPrinciples.map((principle, index) => (
            <li
              key={principle}
              className="motion-enter flex gap-5 py-5 first:pt-0 last:pb-0"
            >
              <span className="w-8 shrink-0 text-[13px] font-semibold uppercase tracking-label text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-xl leading-snug">{principle}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
