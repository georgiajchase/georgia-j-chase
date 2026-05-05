import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import { portfolio } from "@/data/portfolio";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const Portfolio = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="SEO Portfolio | Real Client Results | Georgia J. Chase"
      description="See real SEO results delivered for real businesses. From 0 to page 1 rankings, traffic growth, and revenue increases."
      path="/portfolio"
    />
    <Navbar />

    <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <AnimatedSection>
          <p className="section-label mb-3">Portfolio</p>
          <h1 className="section-title mb-5">Real Work. Real Results.</h1>
          <p className="fluid-lead text-muted-foreground">
            Three projects. Three transformations. All verified.
          </p>
        </AnimatedSection>
      </div>
    </section>

    <section className="pb-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {portfolio.map((p, i) => (
            <AnimatedSection key={p.slug} delay={i * 0.08}>
              <article className="group h-full rounded-2xl bg-white/[0.03] backdrop-blur-xl border-2 border-primary/40 p-6 sm:p-7 transition-all hover:border-primary hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:-translate-y-1 flex flex-col">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                  {p.industry}
                </p>
                <h2 className="font-heading font-bold text-xl text-white mb-4">
                  {p.name}
                </h2>

                <div className="space-y-3 mb-5 text-sm">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/50 mb-1">Challenge</p>
                    <p className="text-white/80 leading-relaxed">{p.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/50 mb-1">Solution</p>
                    <p className="text-white/80 leading-relaxed">{p.solution}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-6 mt-auto">
                  {p.results.map((r) => (
                    <div
                      key={r}
                      className="flex items-center gap-2 rounded-lg bg-conversion/10 border border-conversion/40 px-3 py-2"
                    >
                      <CheckCircle2 size={16} className="text-conversion shrink-0" />
                      <span className="text-sm font-semibold text-conversion">{r}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-conversion text-conversion-foreground hover:bg-conversion-dark px-5 py-2.5 text-sm font-semibold transition-all"
                >
                  View Details <ArrowRight size={14} />
                </Link>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Portfolio;
