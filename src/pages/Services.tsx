import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Check, Clock, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ContactSection from "@/components/ContactSection";
import AnimatedSection from "@/components/AnimatedSection";
import TiltCard from "@/components/TiltCard";
import SectionDivider from "@/components/SectionDivider";
import ServiceCategories from "@/components/ServiceCategories";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";

const ServicesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else navigate("/contact");
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [location.hash, location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="SEO Services | Local SEO, Technical Audit, Link Building | Georgia J. Chase"
        description="Professional SEO services including Local SEO, Ecommerce SEO, Technical Audits, Link Building and Content Strategy. Results in 30 to 90 days."
        path="/services"
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16 bg-background overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <AnimatedSection>
            <p className="section-label mb-3">Services</p>
            <h1 className="fluid-h1 font-extrabold text-foreground mb-6">
              Everything Your Business Needs to <span className="text-primary">Get Found, Get Clicks, and Get Customers</span>
            </h1>
            <p className="fluid-lead text-muted-foreground max-w-2xl mx-auto">
              One team. Every service. One goal. Growing your business online.
            </p>
          </AnimatedSection>

          {/* Quick nav */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {services.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="px-4 py-2 rounded-full text-sm font-medium bg-card border border-white/10 text-muted-foreground hover:text-foreground hover:border-primary/60 hover:bg-primary/10 transition-colors"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />
      <ServiceCategories />

      {/* Service sections */}
      {services.map((service, idx) => {
        const Icon = service.icon;
        return (
          <div key={service.slug}>
            <SectionDivider />
            <section id={service.slug} className="py-14 sm:py-20 bg-background scroll-mt-24">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
                  {/* Left: description */}
                  <AnimatedSection>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                        Service {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-5 text-primary">
                      <Icon size={26} />
                    </div>
                    <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-3">
                      {service.title}
                    </h2>
                    <p className="text-primary font-semibold mb-5">{service.tagline}</p>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>
                    {service.tags && service.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {service.tags.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 border border-primary/30 text-primary"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-8 p-4 rounded-xl bg-card border border-white/10">
                      <Clock className="text-primary shrink-0" size={20} />
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                          Timeline
                        </p>
                        <p className="text-sm text-foreground">{service.timeline}</p>
                      </div>
                    </div>

                    <Button
                      onClick={scrollToContact}
                      size="lg"
                      className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-forest-dark rounded-full px-8 animate-pulse-glow"
                    >
                      Get Started <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </AnimatedSection>

                  {/* Right: deliverables */}
                  <AnimatedSection delay={0.1}>
                    <TiltCard>
                      <div className="bg-card border border-white/10 rounded-2xl p-7 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
                        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-5">
                          What's Included
                        </p>
                        <ul className="space-y-4">
                          {service.deliverables.map((item) => (
                            <li key={item} className="flex items-start gap-3">
                              <span className="mt-0.5 w-6 h-6 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0 text-primary">
                                <Check size={14} />
                              </span>
                              <span className="text-sm text-foreground/90 leading-relaxed">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TiltCard>
                  </AnimatedSection>
                </div>
              </div>
            </section>
          </div>
        );
      })}

      <SectionDivider />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default ServicesPage;
