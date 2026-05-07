import { ClipboardList, ScanEye, Mail } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const steps = [
  {
    num: "01",
    icon: ClipboardList,
    title: "You Submit Your Site",
    text: "Fill in the short form. Tell me what you're struggling with. Takes 2 minutes.",
  },
  {
    num: "02",
    icon: ScanEye,
    title: "Georgia Reviews It Personally",
    text: "I personally look at your site within 24 hours. No VA. No automated tool. Just me.",
  },
  {
    num: "03",
    icon: Mail,
    title: "You Get Real Answers",
    text: "I tell you exactly what is holding your site back and what to do about it. Free. No strings attached.",
  },
];

const WhatHappens = () => (
  <section className="py-14 sm:py-20 bg-background">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <AnimatedSection className="text-center mb-14">
        <p className="section-label mb-3">The Process</p>
        <h2 className="section-title max-w-3xl mx-auto">
          Here Is Exactly What Happens When You Reach Out
        </h2>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((s, i) => (
          <AnimatedSection key={s.num} delay={i * 0.15} className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-conversion text-conversion-foreground font-heading font-bold text-lg mb-4">
              {s.num}
            </div>
            <div className="w-12 h-12 mx-auto rounded-xl bg-card border border-border flex items-center justify-center mb-4 shadow-sm">
              <s.icon className="text-primary" size={24} />
            </div>
            <h3 className="font-heading font-bold text-xl mb-3 text-foreground">{s.title}</h3>
            <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">{s.text}</p>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default WhatHappens;
