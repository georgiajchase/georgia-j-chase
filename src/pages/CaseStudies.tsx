import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import AnimatedSection from "@/components/AnimatedSection";
import TiltCard from "@/components/TiltCard";

const caseStudies = [
  {
    client: "Local Plumbing Co.",
    industry: "Home Services",
    result: "+312% organic traffic in 6 months",
    summary:
      "Rebuilt their site structure, fixed 140+ technical issues, and ranked them #1 for their top 12 service keywords across the metro area.",
  },
  {
    client: "Boutique Skincare Brand",
    industry: "Ecommerce",
    result: "$480k extra revenue in 12 months",
    summary:
      "Optimized product pages, fixed indexation problems, and built a content strategy that turned organic search into their #1 sales channel.",
  },
  {
    client: "B2B SaaS Startup",
    industry: "Software",
    result: "From 0 to 18,000 monthly visitors",
    summary:
      "Built a programmatic SEO engine and topical authority strategy that took them from invisible to dominating their category in under a year.",
  },
];

const CaseStudies = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <AnimatedSection className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Back to home
          </Link>
          <p className="section-label mb-3">Case Studies</p>
          <h1 className="section-title mb-4">Real Results from Real Businesses</h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            A few of the businesses I have helped grow through honest, technical SEO work.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {caseStudies.map((cs, i) => (
            <AnimatedSection key={cs.client} delay={i * 0.1}>
              <TiltCard>
                <div className="bg-card border border-border rounded-2xl p-6 h-full hover:border-primary/50 transition-colors">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    {cs.industry}
                  </p>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-3">
                    {cs.client}
                  </h3>
                  <p className="text-primary font-semibold mb-4">{cs.result}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cs.summary}</p>
                </div>
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </main>
    <ContactSection />
    <Footer />
  </div>
);

export default CaseStudies;
