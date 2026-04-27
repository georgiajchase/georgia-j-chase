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
        backgroundColor: 0x050a18,
        color: 0xf97316,
        color2: 0xf97316,
        size: 1.0,
        offsetX: 0.5,
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
