type VinculumProps = {
  className?: string;
  progress?: number;
  label?: string;
};

export function Vinculum({
  className = "",
  progress,
  label = "Progress",
}: VinculumProps) {
  if (progress !== undefined) {
    const value = Math.round(Math.min(1, Math.max(0, progress)) * 100);

    return (
      <div
        className={`h-[3px] bg-ink/12 ${className}`.trim()}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-label={label}
      >
        <div
          className="h-full origin-left bg-mark motion-safe:transition-[width] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: `${value}%` }}
        />
      </div>
    );
  }

  return (
    <div className={`h-[3px] bg-mark ${className}`.trim()} aria-hidden="true" />
  );
}
