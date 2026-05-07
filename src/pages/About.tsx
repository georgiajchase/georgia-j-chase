import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Target, TrendingUp, Users } from "lucide-react";
import aboutImg from "@/assets/georgia-about.webp";

const skills = [
  "Technical SEO", "Local SEO", "On Page SEO", "Ecommerce SEO",
  "WordPress", "Shopify", "Wix", "Webflow", "Squarespace",
  "Google Search Console", "Joomla", "Drupal", "Magento 1 & 2",
  "GoDaddy", "Google Tag Manager", "Google Analytics",
  "Google Data Studio", "Ahrefs", "SEMrush",
  "Conversion Rate Optimization",
];

const stats = [
  { icon: Users, end: 500, suffix: "+", label: "Clients Helped" },
  { icon: TrendingUp, end: 287, suffix: "%", label: "Avg Traffic Growth" },
  { icon: Award, end: 8, suffix: "+", label: "Years Experience" },
  { icon: Target, end: 95, suffix: "%", label: "Client Satisfaction" },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="About Georgia J. Chase | SEO Specialist | 500+ Businesses Ranked"
      description="Meet Georgia J. Chase — SEO Specialist with 8+ years experience helping business owners get found on Google. 500+ clients ranked."
      path="/about"
    />
    <Navbar />

    {/* Hero */}
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection className="flex justify-center md:order-2">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-2xl" />
              <img
                src={aboutImg}
                alt="Georgia J. Chase, SEO Specialist"
                width="600"
                height="600"
                fetchPriority="high"
                className="relative rounded-2xl shadow-2xl w-full object-cover"
              />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="section-label mb-3">About Georgia J. Chase</p>
            <h1 className="section-title mb-5">
              Hi, I'm Georgia. I Help Businesses Get Found on Google.
            </h1>
            <p className="fluid-lead text-muted-foreground">
              An SEO Specialist obsessed with finding the hidden problems holding good businesses back, then fixing them properly so the results actually last.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 0.05}>
              <div className="rounded-2xl bg-white/[0.03] border border-primary/30 p-6 text-center backdrop-blur-xl">
                <s.icon className="mx-auto mb-3" size={28} style={{ color: "#22c55e" }} />
                <p
                  className="font-heading font-extrabold text-4xl md:text-5xl"
                  style={{ color: "#22c55e", textShadow: "0 0 20px rgba(34, 197, 94, 0.5)" }}
                >
                  <AnimatedCounter end={s.end} suffix={s.suffix} duration={2000} />
                </p>
                <p className="text-sm font-medium mt-2 text-white">{s.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Story */}
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <AnimatedSection>
          <p className="section-label mb-3">My Story</p>
          <h2 className="section-title mb-6">From Overlooked to Found</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed fluid-lead">
            <p>
              If your website isn't bringing in the traffic or customers you expected from Google, you're definitely not alone. And honestly, it's usually not your fault.
            </p>
            <p>
              Most websites have hidden SEO issues that are quietly holding them back. Things like technical errors, indexing problems, weak page signals, or poor local visibility. These are the real reasons why good businesses end up staying invisible online.
            </p>
            <p className="font-semibold text-foreground">That's where I come in. I find those hidden problems and fix them properly.</p>
            <p>
              I'm an SEO Specialist with hands on experience across WordPress, Shopify, Wix, Webflow, and plenty of other platforms. I've helped business owners in all kinds of industries get found on Google, build trust with their audience, and bring in more paying customers.
            </p>
            <p>
              I don't do shortcuts or quick fixes. I focus on building a strong SEO foundation that holds up over time and keeps delivering results long after the work is done.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* My Mission */}
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection>
            <div className="rounded-2xl bg-white/[0.03] border border-primary/30 p-7 h-full backdrop-blur-xl">
              <Target className="text-primary mb-4" size={32} />
              <h3 className="font-heading font-bold text-2xl text-foreground mb-3">My Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To make sure every business owner I work with gets a fair shot at being found by the people already searching for what they offer. No jargon, no smoke, just honest SEO that works.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="rounded-2xl bg-white/[0.03] border border-primary/30 p-7 h-full backdrop-blur-xl">
              <Award className="text-primary mb-4" size={32} />
              <h3 className="font-heading font-bold text-2xl text-foreground mb-3">My Approach</h3>
              <p className="text-muted-foreground leading-relaxed">
                Diagnose the real problem first. Fix the foundation. Then build long term visibility through technical SEO, content, and trust signals that compound over time.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* Skills */}
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <AnimatedSection className="text-center mb-8">
          <p className="section-label mb-3">Tools & Expertise</p>
          <h2 className="section-title">What I Work With Every Day</h2>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap gap-2 justify-center">
            {skills.map((s) => (
              <span key={s} className="px-3.5 py-1.5 bg-white/[0.04] rounded-full text-sm font-medium text-primary border border-primary/30">
                {s}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/40 p-10 sm:p-14 text-center max-w-3xl mx-auto overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="section-title mb-4">Ready to Get Found on Google?</h2>
              <p className="fluid-lead text-muted-foreground mb-7 max-w-xl mx-auto">
                Let's talk about what's holding your website back and how to fix it.
              </p>
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 h-12">
                <Link to="/contact" className="inline-flex items-center gap-2">
                  Get In Touch <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>

    <Footer />
  </div>
);

export default About;
