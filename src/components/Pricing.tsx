import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import TiltCard from "./TiltCard";

const tiers = [
  {
    name: "Foundation",
    tagline: "For businesses that need to get found first.",
    price: "997",
    goal: "Goal: Show up on Google and stop losing customers to competitors who do.",
    features: [
      "Up to 10 pages fully optimized for search",
      "Keyword strategy built around buyer intent",
      "Google Analytics and Search Console configured",
      "Monthly ranking report with plain English summary",
      "Technical errors identified and fixed",
      "Email support within 48 hours",
    ],
    highlighted: false,
    cta: "Start With Foundation",
  },
  {
    name: "Growth",
    tagline: "For businesses ready to outrank and convert.",
    price: "1,997",
    goal: "Goal: More traffic, more leads, measurable revenue growth within 90 days.",
    features: [
      "Everything in Foundation",
      "Up to 30 pages optimized",
      "Link building from real relevant websites",
      "Competitor gap analysis, find what they rank for that you do not",
      "AEO and GEO setup for AI and voice search",
      "Bi weekly ranking reports",
      "Priority support within 24 hours",
      "Dedicated Slack channel for direct access",
    ],
    highlighted: true,
    cta: "Choose Growth",
  },
  {
    name: "Authority",
    tagline: "For established brands scaling aggressively.",
    price: "3,997",
    goal: "Goal: Full market dominance, Google, Maps, AI search and Pinterest working together.",
    features: [
      "Everything in Growth",
      "Unlimited page optimization",
      "Pinterest traffic strategy and execution",
      "Ecommerce SEO specialization",
      "Custom analytics dashboard showing real revenue impact",
      "Dedicated strategist, one person, full accountability",
      "Weekly performance reviews",
      "Monthly competitor deep dive report",
    ],
    highlighted: false,
    cta: "Go Authority",
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const goToPlan = (plan: string) => {
    navigate(`/contact?plan=${encodeURIComponent(plan)}`);
  };

  return (
    <section id="pricing" className="py-14 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <p className="section-label mb-3">Simple Pricing</p>
          <h2 className="section-title max-w-3xl mx-auto">
            Invest in the Version of Your Business That Customers Can Actually Find
          </h2>
          <p className="fluid-lead text-muted-foreground mt-5 max-w-2xl mx-auto">
            Every plan includes a personal audit before we start. No guesswork. No wasted budget.
          </p>
          <p className="mt-6 text-sm font-semibold text-gold">
            Currently accepting 3 new clients this month.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {tiers.map((tier, i) => (
            <AnimatedSection key={tier.name} delay={i * 0.1} className="h-full">
              <TiltCard>
                <div
                  className={`relative h-full rounded-2xl p-6 sm:p-8 flex flex-col transition-all duration-300 ${
                    tier.highlighted
                      ? "bg-card border-2 border-conversion shadow-[0_0_40px_hsl(var(--conversion)/0.4)] lg:scale-105"
                      : "bg-card border border-border hover:border-primary/50"
                  }`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-conversion text-conversion-foreground px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                      <Sparkles size={14} />
                      Most Popular
                    </div>
                  )}

                  <div className="mb-5">
                    <h3 className="font-heading font-bold text-2xl text-foreground mb-2">
                      {tier.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tier.tagline}
                    </p>
                  </div>

                  <div className="mb-5 pb-5 border-b border-border">
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

                  <p className="text-sm font-semibold text-conversion leading-relaxed mb-5">
                    {tier.goal}
                  </p>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-conversion/15 flex items-center justify-center flex-shrink-0">
                          <Check className="text-conversion" size={12} strokeWidth={3} />
                        </div>
                        <span className="text-muted-foreground leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => goToPlan(tier.name)}
                    className="w-full text-center text-primary font-semibold text-sm hover:underline underline-offset-4"
                  >
                    {tier.cta} →
                  </button>
                </div>
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-12 max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Every plan starts with a personal audit. I review your site first and confirm which plan actually fits your situation before you spend anything. If I do not think any plan is right for you, I will tell you that too.
          </p>
          <Link
            to="/contact"
            className="mt-4 inline-flex items-center gap-1.5 text-conversion font-semibold text-sm hover:underline underline-offset-4"
          >
            Send me your site for a free assessment <ArrowRight size={14} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Pricing;
