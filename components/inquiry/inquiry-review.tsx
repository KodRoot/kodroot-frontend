import { summarizeInquiry } from "@/lib/inquiry/brief";
import { TextButton } from "@/components/ui/text-link";
import type { InquiryAnswers, InquiryStep } from "@/types/inquiry";

type InquiryReviewProps = {
  answers: InquiryAnswers;
  onEdit: (step: InquiryStep) => void;
};

export function InquiryReview({ answers, onEdit }: InquiryReviewProps) {
  const items = summarizeInquiry(answers);

  return (
    <div>
      <h3 className="type-display text-[clamp(1.75rem,3vw,2.5rem)] text-ink">
        Check your answers.
      </h3>
      <p className="mt-3 leading-relaxed text-muted">A brief, not a quote.</p>
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
              <TextButton variant="secondary" onClick={() => onEdit(item.step)}>
                Change
              </TextButton>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
