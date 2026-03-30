import { Settings, MapPin, ShoppingCart } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const services = [
  {
    icon: Settings,
    title: "Technical SEO Audit",
    text: "I dig into the hidden technical errors, crawl issues and indexing problems that stop Google from finding and ranking your website. This is the foundation everything else sits on.",
  },
  {
    icon: MapPin,
    title: "On Page & Local SEO",
    text: "I optimise your pages, content, and local signals so the right people find you at the right moment. Especially buyers already searching for what you offer.",
  },
  {
    icon: ShoppingCart,
    title: "Ecommerce & Conversion SEO",
    text: "I help your online store rank higher, attract more shoppers, and fix the gaps that stop visitors from becoming buyers. More traffic that actually converts.",
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
            <div className="bg-background border border-border rounded-xl p-8 card-hover h-full">
              <div className="w-12 h-12 rounded-xl bg-forest-light flex items-center justify-center mb-5">
                <s.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-heading font-bold text-xl mb-3 text-foreground">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{s.text}</p>
              <a href="#lead-form" className="inline-block mt-4 text-sm font-semibold text-gold hover:underline">
                Learn More →
              </a>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
