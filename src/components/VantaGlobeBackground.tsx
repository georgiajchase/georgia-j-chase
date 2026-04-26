import { useEffect, useRef, useState } from "react";

/**
 * Vanta.js GLOBE animated background.
 * - Dark navy base, orange accent points
 * - Desktop only (hidden < md) for performance
 * - Lazy-loads vanta + three only when mounted
 * - Respects prefers-reduced-motion
 */
const VantaGlobeBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<{ destroy: () => void } | null>(null);
  const [enabled, setEnabled] = useState(false);

  // Only enable on desktop + non-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const update = () => setEnabled(mq.matches && !reduced);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;
    let cancelled = false;

    (async () => {
      const THREE = await import("three");
      // @ts-ignore - vanta has no bundled types
      const GLOBE = (await import("vanta/dist/vanta.globe.min")).default;
      if (cancelled || !containerRef.current) return;

      effectRef.current = GLOBE({
        el: containerRef.current,
        THREE,
        mouseControls: true,
        touchControls: false,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        // Dark navy backdrop
        backgroundColor: 0x0a1024,
        // Orange points + accent
        color: 0xf57316,
        color2: 0xff9447,
        size: 1.0,
      });
    })();

    return () => {
      cancelled = true;
      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, [enabled]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 hidden md:block pointer-events-none"
    />
  );
};

export default VantaGlobeBackground;
