import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import TiltCard from "./TiltCard";
import { services } from "@/data/services";

const Services = () => (
  <section id="services" className="py-14 sm:py-20 bg-background">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <AnimatedSection className="text-center mb-14">
        <p className="section-label mb-3">What I Do</p>
        <h2 className="section-title max-w-xl mx-auto">
          The Right Fix Depends on What's Actually Broken
        </h2>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <AnimatedSection key={s.slug} delay={i * 0.08}>
              <TiltCard>
                <Link
                  to={`/services#${s.slug}`}
                  className="group block bg-card border border-border hover:border-primary rounded-xl p-8 h-full shadow-sm transition-all duration-300 hover:shadow-[0_0_25px_hsl(var(--primary)/0.5)]"
                >
                  <div className="w-12 h-12 rounded-xl bg-forest-light flex items-center justify-center mb-5">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-3 text-foreground">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                    {s.tagline}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Learn More <ArrowRight size={14} />
                  </span>
                </Link>
              </TiltCard>
            </AnimatedSection>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-forest-dark transition-colors animate-pulse-glow"
        >
          See All Services <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  </section>
);

export default Services;
