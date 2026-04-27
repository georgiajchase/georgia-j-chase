import { useEffect, useRef, useState } from "react";
import { Users, TrendingUp, DollarSign, Trophy } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

interface Stat {
  icon: typeof Users;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: number;
}

const stats: Stat[] = [
  { icon: Users, value: 500, suffix: "+", label: "Clients Helped" },
  { icon: TrendingUp, value: 98, suffix: "%", label: "Success Rate" },
  { icon: DollarSign, value: 2, prefix: "$", suffix: "M", label: "Revenue Generated" },
  { icon: Trophy, value: 1, prefix: "#", label: "Google Rankings" },
];

const Counter = ({ stat }: { stat: Stat }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setCount(stat.value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const duration = 2000;
            const start = performance.now();
            const animate = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(stat.value * eased);
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stat.value]);

  const displayValue = stat.value < 10 && stat.value % 1 === 0
    ? Math.floor(count)
    : Math.round(count);

  return (
    <span ref={ref}>
      {stat.prefix}
      {displayValue}
      {stat.suffix}
    </span>
  );
};

const Stats = () => (
  <section className="py-14 sm:py-20 bg-background border-y border-border">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <AnimatedSection className="text-center mb-14">
        <p className="section-label mb-3">By The Numbers</p>
        <h2 className="section-title max-w-2xl mx-auto">
          Real Results, Backed By Real Numbers
        </h2>
      </AnimatedSection>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <AnimatedSection key={stat.label} delay={i * 0.1}>
            <div className="bg-card border border-border rounded-xl p-8 text-center h-full hover:border-primary transition-all duration-300 hover:shadow-[0_0_25px_hsl(var(--primary)/0.4)]">
              <div className="w-12 h-12 mx-auto rounded-xl bg-forest-light flex items-center justify-center mb-4">
                <stat.icon className="text-primary" size={24} />
              </div>
              <p className="text-4xl md:text-5xl font-extrabold font-heading text-primary text-glow-orange mb-2">
                <Counter stat={stat} />
              </p>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
