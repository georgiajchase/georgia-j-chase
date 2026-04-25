/**
 * Premium animated wireframe globe.
 * - Pure SVG + CSS, transparent sphere (no solid fill)
 * - Thin glowing orange latitude/longitude lines
 * - Slow rotation via CSS keyframes
 * - Floating dot particles travelling along the surface
 */
const HeroGlobe = () => {
  const longitudes = [-80, -60, -40, -20, 0, 20, 40, 60, 80];
  const latitudes = [-70, -50, -30, -10, 10, 30, 50, 70];

  // Particle positions (in degrees lon/lat) — projected onto the sphere face
  const particles = [
    { lon: -40, lat: -20, r: 1.2, delay: "0s" },
    { lon: 15, lat: 10, r: 1.4, delay: "1.2s" },
    { lon: 45, lat: -35, r: 1, delay: "2.4s" },
    { lon: -60, lat: 30, r: 1.3, delay: "0.6s" },
    { lon: 5, lat: 55, r: 1, delay: "1.8s" },
    { lon: 30, lat: 40, r: 1.1, delay: "3s" },
    { lon: -20, lat: -55, r: 1, delay: "2.1s" },
    { lon: 60, lat: 15, r: 1.2, delay: "0.9s" },
  ];

  return (
    <div className="hero-globe-svg-wrapper" aria-hidden="true">
      <div className="hero-grid-bg" />
      <div className="hero-globe-aura" />

      <div className="hero-globe-spin">
        <svg
          viewBox="-110 -110 220 220"
          className="hero-globe-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="globeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="particleGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="1.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Equator + outer sphere outline */}
          <g
            stroke="hsl(25 95% 60%)"
            strokeWidth="0.35"
            fill="none"
            opacity="0.85"
            filter="url(#globeGlow)"
          >
            <circle r="100" />
          </g>

          {/* Latitudes (horizontal ellipses) */}
          <g
            stroke="hsl(25 95% 60%)"
            strokeWidth="0.3"
            fill="none"
            opacity="0.55"
            filter="url(#globeGlow)"
          >
            {latitudes.map((lat) => {
              const cy = 100 * Math.sin((lat * Math.PI) / 180);
              const ry = 100 * Math.cos((lat * Math.PI) / 180) * 0.18;
              return (
                <ellipse
                  key={`lat-${lat}`}
                  cx="0"
                  cy={cy}
                  rx={100 * Math.cos((lat * Math.PI) / 180)}
                  ry={Math.max(ry, 0.4)}
                />
              );
            })}
          </g>

          {/* Longitudes (rotating meridians) */}
          <g
            className="hero-globe-meridians"
            stroke="hsl(25 95% 65%)"
            strokeWidth="0.3"
            fill="none"
            opacity="0.7"
            filter="url(#globeGlow)"
          >
            {longitudes.map((lon) => (
              <ellipse
                key={`lon-${lon}`}
                cx="0"
                cy="0"
                rx={Math.max(Math.abs(100 * Math.sin((lon * Math.PI) / 180)), 0.4)}
                ry="100"
              />
            ))}
            <line x1="0" y1="-100" x2="0" y2="100" />
          </g>

          {/* Floating dot particles */}
          <g fill="hsl(25 95% 70%)" filter="url(#particleGlow)">
            {particles.map((p, i) => {
              const x = 100 * Math.cos((p.lat * Math.PI) / 180) * Math.sin((p.lon * Math.PI) / 180);
              const y = 100 * Math.sin((p.lat * Math.PI) / 180);
              return (
                <circle
                  key={`p-${i}`}
                  cx={x}
                  cy={y}
                  r={p.r}
                  className="hero-globe-particle"
                  style={{ animationDelay: p.delay }}
                />
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default HeroGlobe;
