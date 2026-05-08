import { Link } from "react-router-dom";
import { ArrowRight, Search, Layout, Wrench, PenTool } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import TiltCard from "./TiltCard";
import { Button } from "./ui/button";

const categories = [
  {
    title: "Search & Visibility",
    icon: Search,
    services: [
      "SEO Audit and Optimization",
      "Local SEO",
      "Ecommerce SEO",
      "Technical SEO",
      "Generative Engine Optimization (GEO)",
      "AI and Answer Engine Optimization (AEO)",
      "Search Engine Marketing (SEM)",
      "Video SEO",
      "Link Building",
      "Content Strategy",
    ],
  },
  {
    title: "Website Design and Development",
    icon: Layout,
    services: [
      "Business Websites",
      "Ecommerce Development",
      "Custom Websites",
      "Landing Pages",
      "Dropshipping Websites",
      "WordPress Development",
      "Shopify Development",
      "Wix Development",
      "Webflow Development",
      "Bubble Development",
    ],
  },
  {
    title: "Website Maintenance and Performance",
    icon: Wrench,
    services: [
      "Website Speed Optimization",
      "Bug Fixes",
      "Website Customization",
      "Backup and Migration",
      "Website Redesign",
      "Core Web Vitals Improvement",
    ],
  },
  {
    title: "Content and Copywriting",
    icon: PenTool,
    services: [
      "Articles and Blog Posts",
      "Website Content",
      "Content Strategy",
      "Scriptwriting",
      "Podcast Writing",
      "Research and Summaries",
      "Creative Writing",
    ],
  },
];

const ServiceCategories = () => (
  <section className="py-14 sm:py-20 bg-background">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <AnimatedSection className="text-center mb-10 max-w-3xl mx-auto">
        <p className="section-label mb-3">Our Capabilities</p>
        <h2 className="section-title mb-5">
          Everything Your Business Needs to Grow Online
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg">
          We are a full service digital growth team. Whatever your website needs, we have the specialist for it.
        </p>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <AnimatedSection key={cat.title} delay={i * 0.08}>
              <TiltCard>
                <div className="bg-card border border-white/10 rounded-2xl p-7 sm:p-8 h-full flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-heading font-bold text-2xl text-primary">
                      {cat.title}
                    </h3>
                  </div>
                  <ul className="space-y-2.5 mb-7 flex-1">
                    {cat.services.map((s) => (
                      <li key={s} className="flex items-start gap-2.5 text-foreground">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span className="text-sm sm:text-base leading-relaxed">{s}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="w-full bg-primary text-primary-foreground hover:bg-forest-dark rounded-full"
                  >
                    <Link to="/contact">
                      Get Started <ArrowRight className="ml-1" size={16} />
                    </Link>
                  </Button>
                </div>
              </TiltCard>
            </AnimatedSection>
          );
        })}
      </div>

      <AnimatedSection className="text-center mt-12 max-w-2xl mx-auto">
        <p className="text-muted-foreground text-base sm:text-lg mb-5">
          Not sure what you need? Send us your site and we will tell you exactly where to start.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-forest-dark rounded-full px-8"
        >
          <Link to="/contact">
            Send Me Your Site <ArrowRight className="ml-1" size={18} />
          </Link>
        </Button>
      </AnimatedSection>
    </div>
  </section>
);

export default ServiceCategories;
