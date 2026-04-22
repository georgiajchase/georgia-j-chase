import { Settings, MapPin, ShoppingCart } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import TiltCard from "./TiltCard";

const services = [
  {
    icon: Settings,
    title: "Technical SEO Audit",
    text: "I'll dig into the hidden technical errors, crawl issues, and indexing problems that are stopping Google from finding and ranking your website. This is the foundation that everything else depends on.",
  },
  {
    icon: MapPin,
    title: "On Page & Local SEO",
    text: "I'll optimise your pages, content, and local signals so that the right people can find you at exactly the right moment, especially the ones who are already looking for what you offer.",
  },
  {
    icon: ShoppingCart,
    title: "Ecommerce & Conversion SEO",
    text: "I'll help your online store rank higher, bring in more shoppers, and close the gaps that stop visitors from actually buying. The goal is more traffic that turns into real revenue.",
  },
];

const Services = () => (
  <section id="services" className="py-20 bg-background">
    <div className="container mx-auto px-4 lg:px-8">
      <AnimatedSection className="text-center mb-14">
        <p className="section-label mb-3">What I Do</p>
        <h2 className="section-title max-w-xl mx-auto">
          The Right Fix Depends on What's Actually Broken
        </h2>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <AnimatedSection key={s.title} delay={i * 0.1}>
            <TiltCard>
              <div className="group bg-card border border-border hover:border-primary rounded-xl p-8 h-full shadow-sm transition-all duration-300 hover:shadow-[0_0_25px_hsl(var(--primary)/0.5)]">
                <div className="w-12 h-12 rounded-xl bg-forest-light flex items-center justify-center mb-5">
                  <s.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3 text-foreground">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{s.text}</p>
                <a href="#lead-form" className="inline-block mt-4 text-sm font-semibold text-gold hover:underline">
                  Learn More →
                </a>
              </div>
            </TiltCard>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
