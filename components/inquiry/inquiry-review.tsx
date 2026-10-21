import { summarizeInquiry } from "@/lib/inquiry/brief";
import type { InquiryAnswers, InquiryStep } from "@/types/inquiry";

type InquiryReviewProps = {
  answers: InquiryAnswers;
  onEdit: (step: InquiryStep) => void;
};

export function InquiryReview({ answers, onEdit }: InquiryReviewProps) {
  const items = summarizeInquiry(answers);

  return (
    <div>
      <h3 className="text-2xl leading-snug text-ink">
        Check your answers before sending.
      </h3>
      <p className="mt-3 leading-relaxed text-muted">
        This is a project brief, not a quote. No price and no delivery date have
        been promised.
      </p>
      <dl className="mt-8 border-t border-ink/12">
        {items.map((item) => (
          <div
            key={`${item.step}-${item.label}`}
            className="grid gap-2 border-b border-ink/12 py-5 sm:grid-cols-12 sm:items-start"
          >
            <dt className="text-[13px] font-semibold uppercase tracking-label text-muted sm:col-span-4">
              {item.label}
            </dt>
            <dd className="sm:col-span-6">
              <p className="leading-relaxed text-ink">{item.value}</p>
            </dd>
            <dd className="sm:col-span-2 sm:text-right">
              <button
                type="button"
                onClick={() => onEdit(item.step)}
                className="inline-flex min-h-11 items-center border-b border-ink/35 pb-0.5 text-[13px] font-semibold uppercase tracking-label text-muted hover:border-ink hover:text-ink"
              >
                Change
              </button>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
