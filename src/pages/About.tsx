import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
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
  { icon: Users, value: "128+", label: "Clients Helped" },
  { icon: TrendingUp, value: "95%", label: "Avg Traffic Growth" },
  { icon: Award, value: "4+", label: "Years Experience" },
  { icon: Target, value: "95%", label: "Client Satisfaction" },
];

const team = [
  {
    image: aboutImg,
    initials: "GC",
    name: "Georgia J. Chase",
    role: "Lead SEO Strategist and Founder",
    description:
      "Leads every client audit personally. Responsible for strategy, results and your overall growth plan.",
  },
  {
    image: null,
    initials: "TT",
    name: "The Technical Team",
    role: "Technical SEO and Site Performance",
    description:
      "Handles the deep technical fixes. Speed, indexing, schema, crawlability and everything Google checks under the hood.",
  },
  {
    image: null,
    initials: "CT",
    name: "The Content Team",
    role: "Content Strategy and AEO",
    description:
      "Builds the content and structure that makes your business show up on Google, Maps, and AI search platforms.",
  },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="About Georgia J. Chase | SEO Specialist | 500+ Businesses Ranked"
      description="Meet Georgia J. Chase and her team of SEO specialists, content strategists, and technical experts helping business owners get found on Google."
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
                loading="eager"
                decoding="async"
                fetchPriority="high"
                sizes="(min-width: 1024px) 600px, 100vw"
                className="relative rounded-2xl shadow-2xl w-full object-cover"
              />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="section-label mb-3">About Our Team</p>
            <h1 className="section-title mb-5">
              We Are a Small Team With One Big Focus. Growing Your Business Online.
            </h1>
            <p className="fluid-lead text-muted-foreground">
              Georgia J. Chase leads a dedicated team of SEO specialists, content strategists, and technical experts. We work as a unit inside your business so you get focused expertise at every level. Not one person stretched thin.
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
                  {s.value}
                </p>
                <p className="text-sm font-medium mt-2 text-white">{s.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <AnimatedSection className="text-center mb-10">
          <p className="section-label mb-3">Meet the Team</p>
          <h2 className="section-title">The People Behind Your Growth</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <AnimatedSection key={member.name} delay={i * 0.08}>
              <div className="rounded-2xl bg-white/[0.03] border border-primary/30 p-7 h-full backdrop-blur-xl text-center">
                <div className="relative mx-auto mb-5 w-28 h-28">
                  <div className="absolute -inset-2 rounded-full bg-primary/25 blur-xl" aria-hidden />
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      width="112"
                      height="112"
                      loading="lazy"
                      decoding="async"
                      sizes="112px"
                      className="relative w-28 h-28 rounded-full object-cover border-2 border-primary/50 shadow-xl"
                    />
                  ) : (
                    <div className="relative w-28 h-28 rounded-full border-2 border-primary/50 shadow-xl flex items-center justify-center bg-gradient-to-br from-primary/30 via-primary/15 to-background">
                      <span
                        className="font-heading font-extrabold text-3xl text-foreground"
                        style={{ textShadow: "0 0 18px hsl(var(--primary) / 0.55)" }}
                      >
                        {member.initials}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-1">{member.name}</h3>
                <p className="text-sm font-semibold text-primary mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{member.description}</p>
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
          <p className="section-label mb-3">Our Story</p>
          <h2 className="section-title mb-6">From Overlooked to Found</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed fluid-lead">
            <p>
              If your website isn't bringing in the traffic or customers you expected from Google, you're definitely not alone. And honestly, it's usually not your fault.
            </p>
            <p>
              Most websites have hidden SEO issues that are quietly holding them back. Things like technical errors, indexing problems, weak page signals, or poor local visibility. These are the real reasons why good businesses end up staying invisible online.
            </p>
            <p className="font-semibold text-foreground">That's where we come in. We find those hidden problems and fix them properly.</p>
            <p>
              Our team has hands on experience across WordPress, Shopify, Wix, Webflow, and plenty of other platforms. We've helped business owners in all kinds of industries get found on Google, build trust with their audience, and bring in more paying customers.
            </p>
            <p>
              We don't do shortcuts or quick fixes. We focus on building a strong SEO foundation that holds up over time and keeps delivering results long after the work is done.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* Mission */}
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection>
            <div className="rounded-2xl bg-white/[0.03] border border-primary/30 p-7 h-full backdrop-blur-xl">
              <Target className="text-primary mb-4" size={32} />
              <h3 className="font-heading font-bold text-2xl text-foreground mb-3">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To make sure every business owner we work with gets a fair shot at being found by the people already searching for what they offer. No jargon, no smoke, just honest SEO that works.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="rounded-2xl bg-white/[0.03] border border-primary/30 p-7 h-full backdrop-blur-xl">
              <Award className="text-primary mb-4" size={32} />
              <h3 className="font-heading font-bold text-2xl text-foreground mb-3">Our Approach</h3>
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
          <h2 className="section-title">What We Bring to Your Business</h2>
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
    <section className="py-20" style={{ backgroundColor: "#0d1f35" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div
            className="relative rounded-3xl p-10 sm:p-14 text-center max-w-3xl mx-auto overflow-hidden"
            style={{ backgroundColor: "#1a2f4a", border: "1px solid #22c55e" }}
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: "rgba(34,197,94,0.2)" }} />
            <div className="relative">
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
                Ready to See What Your Site Is Missing?
              </h2>
              <p className="fluid-lead text-slate-300 mb-7 max-w-xl mx-auto">
                One submission. One personal review. One straight answer within 24 hours.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#22c55e" }}
              >
                Get Your Free Growth Audit <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>

    <Footer />
  </div>
);

export default About;
