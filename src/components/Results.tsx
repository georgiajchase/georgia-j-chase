import { Quote } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import TiltCard from "./TiltCard";

const testimonials = [
  {
    quote: "Georgia found issues that my last agency completely missed. Within 8 weeks, my phone started ringing again.",
    name: "Mark T.",
    role: "Local Service Business Owner",
  },
  {
    quote: "I had no idea my website had so many hidden errors. The audit was eye opening, and the results were real.",
    name: "Sandra O.",
    role: "Ecommerce Store Owner",
  },
  {
    quote: "Finally someone who explains SEO in plain English and actually delivers results, not just reports.",
    name: "James K.",
    role: "Consultant & Coach",
  },
];

const Results = () => (
  <section id="results" className="py-20 bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 lg:px-8">
      <AnimatedSection className="text-center mb-14">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">Real Results</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading leading-tight">
          Here's What Happens When<br />We Fix the Foundation
        </h2>
      </AnimatedSection>

      {/* Big result card */}
      <AnimatedSection className="max-w-lg mx-auto mb-14">
        <div className="bg-background rounded-2xl p-8 text-center shadow-xl">
          <p className="text-5xl md:text-6xl font-extrabold font-heading text-primary">$19,463</p>
          <p className="text-lg font-semibold text-gold mt-1">Per Week</p>
           <p className="text-muted-foreground mt-4 leading-relaxed text-sm">
             One of my clients was struggling with barely any traffic. After I ran a full website and SEO audit and fixed the problems that were holding them back, they started generating this amount every single week.
           </p>
        </div>
      </AnimatedSection>

      {/* Testimonials */}
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <AnimatedSection key={t.name} delay={i * 0.1}>
            <TiltCard>
              <div className="bg-forest-dark/40 backdrop-blur rounded-xl p-6 h-full border border-primary-foreground/10">
                <Quote className="text-gold mb-3" size={24} />
                <p className="text-primary-foreground/90 leading-relaxed mb-4 text-sm">"{t.quote}"</p>
                <p className="font-heading font-semibold text-sm">{t.name}</p>
                <p className="text-primary-foreground/60 text-xs">{t.role}</p>
              </div>
            </TiltCard>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default Results;
