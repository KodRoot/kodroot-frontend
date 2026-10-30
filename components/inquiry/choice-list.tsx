import type { Choice } from "@/lib/inquiry/options";

type SingleChoiceListProps<T extends string> = {
  legend: string;
  options: Choice<T>[];
  value: T | null;
  onChange: (value: T) => void;
  multiple?: false;
};

type MultipleChoiceListProps<T extends string> = {
  legend: string;
  options: Choice<T>[];
  value: T[];
  onChange: (value: T) => void;
  multiple: true;
};

type ChoiceListProps<T extends string> =
  SingleChoiceListProps<T> | MultipleChoiceListProps<T>;

function isSelected<T extends string>(
  props: ChoiceListProps<T>,
  option: T,
): boolean {
  if (props.multiple) {
    return props.value.includes(option);
  }
  return props.value === option;
}

export function ChoiceList<T extends string>(props: ChoiceListProps<T>) {
  const { legend, options, onChange } = props;

  return (
    <fieldset>
      <legend className="sr-only">{legend}</legend>
      <div className="flex flex-col border-t border-ink/12">
        {options.map((option) => {
          const selected = isSelected(props, option.value);
          return (
            <label
              key={option.value}
              className="inquiry-choice flex min-h-14 cursor-pointer gap-4 border-b border-ink/12 py-5 motion-safe:transition-colors hover:bg-ink/[0.03] sm:py-6"
            >
              <input
                type={props.multiple ? "checkbox" : "radio"}
                name={legend}
                value={option.value}
                checked={selected}
                autoComplete="off"
                onChange={() => onChange(option.value)}
                className="sr-only focus-visible:outline-none"
              />
              {props.multiple ? (
                <span
                  aria-hidden="true"
                  className={`mt-1.5 h-3 w-3 shrink-0 border ${
                    selected ? "border-mark bg-mark" : "border-ink/35 bg-paper"
                  }`}
                />
              ) : (
                <span
                  aria-hidden="true"
                  className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border bg-paper ${
                    selected ? "border-mark" : "border-ink/35"
                  }`}
                >
                  {selected ? (
                    <span className="h-2 w-2 rounded-full bg-mark" />
                  ) : null}
                </span>
              )}
              <span className="min-w-0">
                <span className="block text-xl leading-snug text-ink">
                  {option.label}
                </span>
                {option.description ? (
                  <span className="mt-1 block leading-relaxed text-muted">
                    {option.description}
                  </span>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
