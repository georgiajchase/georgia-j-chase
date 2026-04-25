/**
 * Premium animated SVG wireframe globe.
 * - Pure SVG + CSS (no external embeds, no 3D libs)
 * - Slow rotation via CSS keyframes
 * - Orange glow + faint background lattice
 * - Hidden on mobile by parent
 */
const HeroGlobe = () => {
  // Build longitudes (vertical ellipses) and latitudes (horizontal ellipses)
  const longitudes = [-75, -50, -25, 0, 25, 50, 75];
  const latitudes = [-60, -40, -20, 0, 20, 40, 60];

  return (
    <div className="hero-globe-svg-wrapper" aria-hidden="true">
      {/* Background grid lattice */}
      <div className="hero-grid-bg" />
      {/* Soft outer glow */}
      <div className="hero-globe-aura" />

      {/* Spinning globe */}
      <div className="hero-globe-spin">
        <svg
          viewBox="-110 -110 220 220"
          className="hero-globe-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="globeFill" cx="35%" cy="35%" r="75%">
              <stop offset="0%" stopColor="hsl(25 95% 60% / 0.35)" />
              <stop offset="55%" stopColor="hsl(25 95% 50% / 0.10)" />
              <stop offset="100%" stopColor="hsl(222 65% 6% / 0)" />
            </radialGradient>
            <radialGradient id="globeRim" cx="50%" cy="50%" r="50%">
              <stop offset="85%" stopColor="hsl(25 95% 55% / 0)" />
              <stop offset="100%" stopColor="hsl(25 95% 60% / 0.9)" />
            </radialGradient>
            <filter id="globeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Sphere fill */}
          <circle r="100" cx="0" cy="0" fill="url(#globeFill)" />

          {/* Latitudes (horizontal ellipses, fixed) */}
          <g
            stroke="hsl(25 95% 55%)"
            strokeWidth="0.6"
            fill="none"
            opacity="0.55"
            filter="url(#globeGlow)"
          >
            {latitudes.map((lat) => {
              const ry = 100 * Math.cos((lat * Math.PI) / 180);
              const cy = 100 * Math.sin((lat * Math.PI) / 180);
              return <ellipse key={`lat-${lat}`} cx="0" cy={cy} rx="100" ry={Math.max(ry * 0.18, 0.5)} />;
            })}
            <circle r="100" />
          </g>

          {/* Longitudes (rotating meridians) */}
          <g
            className="hero-globe-meridians"
            stroke="hsl(25 95% 60%)"
            strokeWidth="0.6"
            fill="none"
            opacity="0.7"
            filter="url(#globeGlow)"
          >
            {longitudes.map((lon) => (
              <ellipse key={`lon-${lon}`} cx="0" cy="0" rx={Math.abs(100 * Math.sin((lon * Math.PI) / 180)) || 0.5} ry="100" />
            ))}
            {/* Vertical axis line */}
            <line x1="0" y1="-100" x2="0" y2="100" />
          </g>

          {/* Rim highlight */}
          <circle r="100" fill="url(#globeRim)" />

          {/* Tiny location dots */}
          <g fill="hsl(25 95% 65%)" filter="url(#globeGlow)">
            <circle cx="-30" cy="-25" r="1.6" />
            <circle cx="20" cy="10" r="1.4" />
            <circle cx="55" cy="-40" r="1.2" />
            <circle cx="-50" cy="40" r="1.4" />
            <circle cx="10" cy="60" r="1.2" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default HeroGlobe;
