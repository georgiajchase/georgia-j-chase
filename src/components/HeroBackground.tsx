/**
 * Pure CSS / SVG hero background.
 * Dark navy base, subtle orange grid, slow rotating wireframe sphere on the right,
 * and 8 floating orange dots. Sphere and dots hidden on mobile via CSS.
 */
const ORANGE = "#f97316";
const particles = Array.from({ length: 8 });

const HeroBackground = () => (
  <div aria-hidden="true" className="hero-bg-root">
    <div className="hero-bg-grid" />
    <div className="hero-bg-glow" />

    <svg
      className="hero-bg-wireframe"
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="wfGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={ORANGE} stopOpacity="0.18" />
          <stop offset="100%" stopColor={ORANGE} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="195" fill="url(#wfGlow)" />
      <g fill="none" stroke={ORANGE} strokeOpacity="0.4" strokeWidth="0.8">
        <circle cx="200" cy="200" r="190" />
        <circle cx="200" cy="200" r="150" />
        <circle cx="200" cy="200" r="110" />
        <circle cx="200" cy="200" r="70" />
        <ellipse cx="200" cy="200" rx="190" ry="60" />
        <ellipse cx="200" cy="200" rx="190" ry="120" />
        <ellipse cx="200" cy="200" rx="60" ry="190" />
        <ellipse cx="200" cy="200" rx="120" ry="190" />
        <line x1="10" y1="200" x2="390" y2="200" />
        <line x1="200" y1="10" x2="200" y2="390" />
      </g>
    </svg>

    <div className="hero-bg-particles">
      {particles.map((_, i) => (
        <span
          key={i}
          className="hero-bg-particle"
          style={{
            left: `${10 + i * 11}%`,
            top: `${70 + (i % 3) * 8}%`,
            animationDelay: `${i * 1.4}s`,
            animationDuration: `${10 + (i % 4) * 2}s`,
          }}
        />
      ))}
    </div>
  </div>
);

export default HeroBackground;
