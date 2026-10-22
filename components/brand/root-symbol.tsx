type RootSymbolProps = {
  titleId: string;
  animate?: boolean;
  className?: string;
};

export function RootSymbol({
  titleId,
  animate = false,
  className = "",
}: RootSymbolProps) {
  const maskId = `${titleId}-mask`;

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {animate ? (
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="black" />
            <g
              transform="translate(0 3)"
              fill="none"
              stroke="white"
              strokeWidth="28"
              strokeLinecap="square"
              strokeLinejoin="miter"
            >
              <path
                className="symbol-stroke"
                pathLength={1}
                d="M6 68 L24 88 L58 8 H94"
              />
            </g>
          </mask>
        </defs>
      ) : null}
      <g fill="#7C2430" mask={animate ? `url(#${maskId})` : undefined}>
        <g transform="translate(0 3)">
          <polygon points="-2.49,65.49 19.51,91.49 32.49,80.51 10.49,54.51" />
          <polygon points="33.86,89.23 65.86,11.23 50.14,4.77 18.14,82.77" />
          <rect x="50.35" y="-0.5" width="42" height="17" />
        </g>
      </g>
    </svg>
  );
}
