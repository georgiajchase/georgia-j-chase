import { Quote, Star } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import TiltCard from "./TiltCard";

const testimonials = [
  {
    quote: "Georgia found issues that my last agency completely missed. Within 8 weeks, my phone started ringing again.",
    name: "Mark T.",
    role: "Local Service Business Owner",
    rating: 5,
  },
  {
    quote: "I had no idea my website had so many hidden errors. The audit was eye opening, and the results were real.",
    name: "Sandra O.",
    role: "Ecommerce Store Owner",
    rating: 5,
  },
  {
    quote: "Finally someone who explains SEO in plain English and actually delivers results, not just reports.",
    name: "James K.",
    role: "Consultant & Coach",
    rating: 5,
  },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const Results = () => (
  <section id="results" className="py-14 sm:py-20 bg-background text-foreground">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <AnimatedSection className="text-center mb-14">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">Real Results</p>
        <h2 className="section-title leading-tight">
          Here's What Happens When<br className="hidden sm:inline" />{" "}We Fix the Foundation
        </h2>
      </AnimatedSection>

      {/* Big result card */}
      <AnimatedSection className="max-w-lg mx-auto mb-14">
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 text-center shadow-xl">
          <p className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-primary break-words">$19,463</p>
          <p className="text-lg font-semibold text-gold mt-1">Per Week</p>
          <p className="text-muted-foreground mt-4 leading-relaxed text-sm">
            One of my clients was struggling with barely any traffic. After I ran a full website and SEO audit and fixed the problems that were holding them back, they started generating this amount every single week.
          </p>
        </div>
      </AnimatedSection>

      {/* Testimonials with glassmorphism */}
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <AnimatedSection key={t.name} delay={i * 0.1}>
            <TiltCard>
              <div className="bg-card border border-border rounded-xl p-6 h-full shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:border-primary/50 transition-colors">
                <Quote className="text-gold mb-3" size={24} />

                {/* Star rating */}
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="text-gold fill-gold" size={16} />
                  ))}
                </div>

                <p className="text-foreground/90 leading-relaxed mb-5 text-sm">"{t.quote}"</p>

                {/* Avatar + Name */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold to-primary flex items-center justify-center font-heading font-bold text-primary-foreground text-sm shadow-lg">
                    {getInitials(t.name)}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-sm text-foreground">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default Results;
