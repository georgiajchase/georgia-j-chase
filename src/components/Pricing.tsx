import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import TiltCard from "./TiltCard";

const tiers = [
  {
    name: "SEO Audit",
    tag: "Best place to start",
    price: "197",
    priceSuffix: " one time",
    priceNote: "One time payment. No subscription.",
    outcome:
      "Find out exactly what is holding your site back before spending anything else.",
    features: [
      "Full technical SEO audit",
      "On page analysis across all pages",
      "Google Search Console review",
      "Core Web Vitals assessment",
      "Prioritized fix list in plain English",
      "Delivered within 5 business days",
      "PDF report with screenshots and proof of every issue found",
    ],
    cta: "Get My Audit Report $197 →",
    footnote:
      "This is where most clients start. Many upgrade after seeing the results.",
    highlighted: false,
    badge: null as string | null,
  },
  {
    name: "Foundation",
    tag: "Most popular for small businesses",
    price: "597",
    priceSuffix: "/mo",
    priceNote: "Month to month. Cancel anytime.",
    outcome:
      "Get found on Google and stop losing customers to competitors who do.",
    features: [
      "Everything in the Audit",
      "Up to 10 pages fully optimized",
      "Keyword strategy built around buyer intent",
      "Google Business Profile optimization",
      "Monthly ranking report in plain English",
      "Technical errors fixed monthly",
      "Email support within 48 hours",
    ],
    cta: "Start Foundation →",
    footnote: null as string | null,
    highlighted: false,
    badge: null as string | null,
  },
  {
    name: "Growth",
    tag: "Most popular for growing businesses",
    price: "1,497",
    priceSuffix: "/mo",
    priceNote: "Month to month. Cancel anytime.",
    outcome:
      "More traffic, more leads, measurable revenue growth within 90 days.",
    features: [
      "Everything in Foundation",
      "Up to 30 pages optimized",
      "Link building from real relevant sites",
      "AEO and GEO setup for AI search",
      "Competitor gap analysis",
      "Bi weekly ranking reports",
      "Priority support within 24 hours",
      "Dedicated Slack channel",
    ],
    cta: "Choose Growth →",
    footnote: null as string | null,
    highlighted: true,
    badge: "RECOMMENDED",
  },
  {
    name: "Authority",
    tag: "For established brands scaling fast",
    price: "2,997",
    priceSuffix: "/mo",
    priceNote: "3 month minimum commitment.",
    outcome:
      "Full market dominance across Google, Maps, AI search and Pinterest.",
    features: [
      "Everything in Growth",
      "Unlimited page optimization",
      "Pinterest traffic strategy and execution",
      "Ecommerce SEO specialization",
      "Custom analytics dashboard",
      "Dedicated strategist",
      "Weekly performance reviews",
      "Monthly competitor deep dive",
    ],
    cta: "Go Authority →",
    footnote: null as string | null,
    highlighted: false,
    badge: null as string | null,
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
        <AnimatedSection className="text-center mb-10">
          <p className="section-label mb-3">Simple Pricing</p>
          <h2 className="section-title max-w-3xl mx-auto">
            Start Where You Are. Scale When You Are Ready.
          </h2>
          <p className="fluid-lead text-muted-foreground mt-5 max-w-2xl mx-auto">
            Every engagement starts with a free audit. No commitment until you have seen the results we find.
          </p>
          <p className="mt-6 text-sm font-semibold text-primary">
            All plans are month to month except Authority. Cancel anytime. No lock in contracts.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {tiers.map((tier, i) => (
            <AnimatedSection key={tier.name} delay={i * 0.08} className="h-full">
              <TiltCard>
                <div
                  className={`relative h-full rounded-2xl p-6 flex flex-col transition-all duration-300 ${
                    tier.highlighted
                      ? "bg-card border-2 border-conversion shadow-[0_0_40px_hsl(var(--conversion)/0.4)]"
                      : "bg-card border border-border hover:border-primary/50"
                  }`}
                >
                  {tier.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-conversion text-conversion-foreground px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg whitespace-nowrap">
                      <Sparkles size={14} />
                      {tier.badge}
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="font-heading font-bold text-2xl text-foreground mb-2">
                      {tier.name}
                    </h3>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {tier.tag}
                    </p>
                  </div>

                  <div className="mb-4 pb-4 border-b border-border">
                    <div className="flex items-baseline gap-1 flex-wrap">
                      <span className="text-2xl font-bold text-foreground">$</span>
                      <span
                        className={`text-4xl font-extrabold font-heading ${
                          tier.highlighted ? "text-primary text-glow-orange" : "text-foreground"
                        }`}
                      >
                        {tier.price}
                      </span>
                      <span className="text-muted-foreground text-sm ml-1">
                        {tier.priceSuffix}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {tier.priceNote}
                    </p>
                  </div>

                  <p className="text-sm font-semibold text-conversion leading-relaxed mb-5">
                    {tier.outcome}
                  </p>

                  <ul className="space-y-3 mb-6 flex-grow">
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
                    className={`w-full text-center font-semibold text-sm rounded-md py-3 transition-colors ${
                      tier.highlighted
                        ? "bg-conversion text-conversion-foreground hover:bg-conversion/90"
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    }`}
                  >
                    {tier.cta}
                  </button>

                  {tier.footnote && (
                    <p className="text-xs text-muted-foreground mt-3 text-center leading-relaxed">
                      {tier.footnote}
                    </p>
                  )}
                </div>
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-16 max-w-2xl mx-auto bg-card border border-border rounded-2xl p-8">
          <h3 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-3">
            Not Sure Where to Start?
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Send us your site and we will tell you personally which option makes the most sense for your situation. No pressure. No obligation.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-conversion text-conversion-foreground font-semibold rounded-md px-6 py-3 hover:bg-conversion/90 transition-colors"
          >
            Send Me Your Site <ArrowRight size={16} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Pricing;
