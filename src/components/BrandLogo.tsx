interface BrandLogoProps {
  className?: string;
  showText?: boolean;
}

/**
 * Inline SVG brand logo.
 * - White "G" lettermark
 * - Orange #22c55e lightning bolt accent inside the G
 * - White "Georgia J. Chase" wordmark
 * - Fully transparent background, scales cleanly.
 */
const BrandLogo = ({ className, showText = true }: BrandLogoProps) => (
  <svg
    viewBox="0 0 320 80"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Georgia J. Chase"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    {/* G lettermark */}
    <g transform="translate(8 6)">
      <path
        d="M34 4 C16 4 4 18 4 36 C4 54 16 68 34 68 C46 68 56 62 60 54 L60 38 L36 38 L36 48 L48 48 L48 50 C46 54 41 58 34 58 C22 58 14 49 14 36 C14 23 22 14 34 14 C41 14 46 17 49 22 L58 16 C53 9 45 4 34 4 Z"
        fill="#ffffff"
      />
      {/* Orange lightning bolt accent inside the G */}
      <path
        d="M40 18 L26 42 L36 42 L30 60 L50 34 L40 34 L46 18 Z"
        fill="#22c55e"
      />
    </g>

    {showText && (
      <text
        x="86"
        y="50"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontWeight="700"
        fontSize="26"
        fill="#ffffff"
        letterSpacing="0.5"
      >
        Georgia J. Chase
      </text>
    )}
  </svg>
);

export default BrandLogo;
