import { Search, Gauge, MapPin, Sparkles, Pin, TrendingUp } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import TiltCard from "./TiltCard";

const items = [
  {
    icon: Search,
    title: "Google Rankings",
    desc: "Show up when customers search for what you sell",
  },
  {
    icon: Gauge,
    title: "Website Speed and Performance",
    desc: "Fast sites rank higher and convert better",
  },
  {
    icon: MapPin,
    title: "Local and Maps Visibility",
    desc: "Dominate your area before competitors do",
  },
  {
    icon: Sparkles,
    title: "AI and Voice Search Presence",
    desc: "Be the answer when people ask Google, ChatGPT and Siri",
  },
  {
    icon: Pin,
    title: "Pinterest Traffic Engine",
    desc: "Drive consistent buyers to your site every day",
  },
  {
    icon: TrendingUp,
    title: "Conversion and Revenue",
    desc: "More traffic means nothing without the right structure to convert it into paying customers",
  },
];

const WhatWeFix = () => (
  <section className="py-14 sm:py-20 bg-background">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <AnimatedSection className="text-center mb-12">
        <p className="section-label mb-3">Growth Areas</p>
        <h2 className="section-title max-w-2xl mx-auto">What We Fix and Grow</h2>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <AnimatedSection key={it.title} delay={i * 0.06}>
            <TiltCard>
              <div className="bg-card border border-border hover:border-primary rounded-xl p-7 h-full transition-all duration-300 hover:shadow-[0_0_25px_hsl(var(--primary)/0.4)]">
                <div className="w-12 h-12 rounded-xl bg-forest-light flex items-center justify-center mb-4">
                  <it.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                  {it.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {it.desc}
                </p>
              </div>
            </TiltCard>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default WhatWeFix;
