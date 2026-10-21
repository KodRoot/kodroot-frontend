import { RadicalHook } from "@/components/brand/radical-hook";

type RadicalLockupProps = {
  className?: string;
  barClassName?: string;
};

export function RadicalLockup({
  className = "",
  barClassName = "",
}: RadicalLockupProps) {
  return (
    <div className={`flex items-start text-mark ${className}`.trim()}>
      <RadicalHook className="h-[1em] w-auto shrink-0" />
      <div
        className={`-ml-[0.08em] h-[0.12em] min-w-0 flex-1 bg-current ${barClassName}`.trim()}
        aria-hidden="true"
      />
    </div>
  );
}
