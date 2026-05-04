/**
 * Pure CSS / SVG hero background.
 * - Dark navy base
 * - Subtle orange grid lines
 * - Slow rotating wireframe circle on the right (SVG + CSS keyframes)
 * - Floating orange particles (CSS animation only)
 * Zero JS libraries. Replaces the previous Vanta + Three.js setup.
 */
const particles = Array.from({ length: 14 });

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
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="195" fill="url(#wfGlow)" />
      <g fill="none" stroke="#f97316" strokeOpacity="0.45" strokeWidth="0.8">
        <circle cx="200" cy="200" r="190" />
        <circle cx="200" cy="200" r="150" />
        <circle cx="200" cy="200" r="110" />
        <circle cx="200" cy="200" r="70" />
        {/* meridians */}
        <ellipse cx="200" cy="200" rx="190" ry="60" />
        <ellipse cx="200" cy="200" rx="190" ry="120" />
        <ellipse cx="200" cy="200" rx="60" ry="190" />
        <ellipse cx="200" cy="200" rx="120" ry="190" />
        {/* cross lines */}
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
            left: `${(i * 7.3) % 100}%`,
            top: `${(i * 11.7) % 100}%`,
            animationDelay: `${(i % 7) * 0.8}s`,
            animationDuration: `${8 + (i % 5) * 2}s`,
          }}
        />
      ))}
    </div>
  </div>
);

export default HeroBackground;
