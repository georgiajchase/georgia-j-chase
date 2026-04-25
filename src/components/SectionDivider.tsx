import { useEffect, useRef, useState } from "react";

/**
 * Subtle orange gradient sweep between sections.
 * Animates across once the divider scrolls into view.
 */
const SectionDivider = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative h-px w-full overflow-hidden bg-border/40"
    >
      <div
        className={`absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent transition-transform duration-[1600ms] ease-out ${
          visible ? "translate-x-[300%]" : "-translate-x-full"
        }`}
        style={{ filter: "drop-shadow(0 0 8px hsl(var(--primary) / 0.6))" }}
      />
    </div>
  );
};

export default SectionDivider;
