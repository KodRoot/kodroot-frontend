import type { HTMLAttributes, ReactNode } from "react";
import type { Integration } from "@/types/inquiry";

export function FollowUp({
  question,
  hint,
  children,
}: {
  question: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="text-lg leading-snug text-ink">{question}</p>
      {hint ? <p className="mt-2 leading-relaxed text-muted">{hint}</p> : null}
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function TextField({
  id,
  label,
  value,
  onChange,
  hint,
  required,
  type = "text",
  autoComplete,
  inputMode,
  multiline = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  multiline?: boolean;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const fieldClassName = "field-line mt-2 w-full px-0 py-3 text-lg text-ink";

  return (
    <div>
      <label
        htmlFor={id}
        className="text-[13px] font-semibold uppercase tracking-label text-ink"
      >
        {label}
        {required ? (
          <span className="font-normal text-muted"> required</span>
        ) : null}
      </label>
      {hint ? (
        <p id={hintId} className="mt-1 text-sm leading-relaxed text-muted">
          {hint}
        </p>
      ) : null}
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          aria-describedby={hintId}
          rows={4}
          className={`${fieldClassName} min-h-32`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-describedby={hintId}
          className={`${fieldClassName} min-h-11`}
        />
      )}
    </div>
  );
}

export function toggleIntegration(
  current: Integration[],
  value: Integration,
): Integration[] {
  if (value === "nothing" || value === "not-sure") {
    return current.includes(value) ? [] : [value];
  }

  const withoutExclusive = current.filter(
    (item) => item !== "nothing" && item !== "not-sure",
  );

  return withoutExclusive.includes(value)
    ? withoutExclusive.filter((item) => item !== value)
    : [...withoutExclusive, value];
}
