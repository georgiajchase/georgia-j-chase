import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Quote, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import CaseStudyCTA from "@/components/CaseStudyCTA";
import AnimatedSection from "@/components/AnimatedSection";
import TiltCard from "@/components/TiltCard";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/data/caseStudies";

const CaseStudies = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="SEO Case Studies | Proven Results | Georgia J. Chase"
      description="Deep-dive case studies showing exactly how Georgia J. Chase helped businesses rank on page 1 and grow organic revenue."
      path="/case-studies"
    />
    <Navbar />
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <AnimatedSection className="mb-14">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Back to home
          </Link>
          <p className="section-label mb-3">Our Work</p>
          <h1 className="section-title mb-4">Real Results from Real Businesses</h1>
          <p className="fluid-lead text-muted-foreground max-w-2xl">
            Three deep-dive stories of businesses we helped grow through honest, technical SEO work.
          </p>
        </AnimatedSection>

        <div className="space-y-10">
          {caseStudies.map((cs, i) => (
            <AnimatedSection key={cs.slug} delay={i * 0.08}>
              <TiltCard>
                <article className="group bg-card border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-[0_0_40px_hsl(var(--primary)/0.25)] transition-all">
                  <div className="grid lg:grid-cols-2">
                    <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                      <img
                        src={cs.image}
                        alt={cs.client}
                        width={1280}
                        height={720}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/20 to-transparent lg:bg-gradient-to-l" />
                      <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-primary/20 border border-primary/40 px-3 py-1 text-xs font-semibold text-primary">
                        {cs.industry}
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 flex flex-col">
                      <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                        {cs.headline}
                      </h2>
                      <p className="text-sm text-muted-foreground mb-5 leading-relaxed line-clamp-4">
                        {cs.summary}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {cs.highlights.map((h) => (
                          <span
                            key={h}
                            className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 border border-primary/30 px-3 py-1 text-xs font-semibold text-foreground"
                          >
                            <TrendingUp size={12} className="text-primary" /> {h}
                          </span>
                        ))}
                      </div>

                      <blockquote className="relative pl-4 border-l-2 border-primary/60 text-sm text-foreground/85 italic mb-6">
                        <Quote
                          size={14}
                          className="absolute -left-2 -top-1 text-primary bg-card"
                        />
                        "{cs.testimonial.quote.slice(0, 140)}…"
                        <footer className="not-italic mt-2 text-xs text-muted-foreground">
                          . {cs.testimonial.name}, {cs.testimonial.role}
                        </footer>
                      </blockquote>

                      <div className="mt-auto">
                        <Button
                          asChild
                          className="bg-primary text-primary-foreground hover:bg-forest-dark rounded-full"
                        >
                          <Link to={`/case-studies/${cs.slug}`}>
                            Read Full Case Study <ArrowRight size={14} className="ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </main>

    <CaseStudyCTA />
    <Footer />
  </div>
);

export default CaseStudies;
