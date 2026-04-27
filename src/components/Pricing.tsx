import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";
import TiltCard from "./TiltCard";

const tiers = [
  {
    name: "Starter",
    price: "997",
    description: "Perfect for small businesses ready to fix the foundation and get found locally.",
    features: [
      "Up to 10 Pages Optimized",
      "Keyword Research & Strategy",
      "Monthly SEO Health Report",
      "Google Analytics Setup",
      "Email Support (48hr response)",
      "Monthly Ranking Update",
    ],
    highlighted: false,
    cta: "Start with Starter",
  },
  {
    name: "Growth",
    price: "1,997",
    description: "For growing businesses ready to outrank competitors and drive real revenue.",
    features: [
      "Everything in Starter",
      "Up to 30 Pages Optimized",
      "Link Building Campaign",
      "Bi Weekly Ranking Reports",
      "Competitor Analysis",
      "Priority Email Support (24hr response)",
      "Dedicated Slack Channel",
    ],
    highlighted: true,
    cta: "Choose Growth",
  },
  {
    name: "Enterprise",
    price: "3,997",
    description: "Full-scale SEO partnership for established brands scaling aggressively.",
    features: [
      "Everything in Growth",
      "Ecommerce SEO Specialization",
      "Unlimited Page Optimization",
      "Custom Analytics Dashboard",
      "Dedicated SEO Strategist",
      "Weekly Performance Reports",
      "Monthly Competitor Deep Dive Report",
    ],
    highlighted: false,
    cta: "Go Enterprise",
  },
];

const Pricing = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="py-14 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <p className="section-label mb-3">Simple Pricing</p>
          <h2 className="section-title max-w-2xl mx-auto">
            Choose the Plan That Fits Where Your Business Is Right Now
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {tiers.map((tier, i) => (
            <AnimatedSection key={tier.name} delay={i * 0.1} className="h-full">
              <TiltCard>
                <div
                  className={`relative h-full rounded-2xl p-6 sm:p-8 flex flex-col transition-all duration-300 ${
                    tier.highlighted
                      ? "bg-card border-2 border-primary shadow-[0_0_40px_hsl(var(--primary)/0.4)] lg:scale-105"
                      : "bg-card border border-border hover:border-primary/50"
                  }`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                      <Sparkles size={14} />
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="font-heading font-bold text-2xl text-foreground mb-2">
                      {tier.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  <div className="mb-6 pb-6 border-b border-border">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-foreground">$</span>
                      <span
                        className={`text-5xl font-extrabold font-heading ${
                          tier.highlighted ? "text-primary text-glow-orange" : "text-foreground"
                        }`}
                      >
                        {tier.price}
                      </span>
                      <span className="text-muted-foreground text-sm ml-1">/mo</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-forest-light flex items-center justify-center flex-shrink-0">
                          <Check className="text-primary" size={12} strokeWidth={3} />
                        </div>
                        <span className="text-muted-foreground leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={scrollToContact}
                    size="lg"
                    className={`w-full rounded-full ${
                      tier.highlighted
                        ? "bg-primary text-primary-foreground hover:bg-forest-dark animate-pulse-glow"
                        : "bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground border border-border hover:border-primary"
                    }`}
                  >
                    {tier.cta}
                  </Button>
                </div>
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-10">
          <p className="text-sm text-muted-foreground">
            Not sure which plan fits? Send me your website URL and I will personally analyze it and recommend the best plan for your business.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Pricing;
