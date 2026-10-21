import { PageContainer } from "@/components/page-container";
import {
  approachBody,
  approachHeading,
  approachIntro,
  approachPrinciples,
} from "@/lib/content";

export function Approach() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-heading"
      className="surface-dark"
    >
      <PageContainer className="py-24 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <p className="text-[12px] font-semibold uppercase tracking-label text-paper/55 lg:col-span-4">
            How we work
          </p>
          <h2
            id="approach-heading"
            className="max-w-xl text-3xl leading-snug text-paper sm:text-4xl lg:col-span-7 lg:col-start-6"
          >
            {approachHeading}
          </h2>
        </div>

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12">
          <div className="max-w-xl lg:col-span-5">
            <p className="text-lg leading-relaxed text-paper">
              {approachIntro}
            </p>
            <p className="mt-6 leading-relaxed text-paper/75">{approachBody}</p>
          </div>
          <ol className="lg:col-span-6 lg:col-start-7">
            {approachPrinciples.map((principle, index) => (
              <li
                key={principle}
                className="flex gap-6 border-t border-paper/15 py-5 text-paper last:border-b"
              >
                <span className="w-8 shrink-0 text-[13px] font-semibold uppercase tracking-label text-paper/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-xl leading-snug">{principle}</p>
              </li>
            ))}
          </ol>
        </div>
      </PageContainer>
    </section>
  );
}
