import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Quote,
  TrendingUp,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { getCaseStudyBySlug } from "@/data/caseStudies";

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const cs = slug ? getCaseStudyBySlug(slug) : undefined;

  useEffect(() => {
    if (!cs) return;
    document.title = `${cs.client} — Case Study | Georgia J. Chase`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", cs.summary.slice(0, 155));
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [cs]);

  if (!cs) return <Navigate to="/case-studies" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <AnimatedSection>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
              <ArrowLeft size={16} /> All case studies
            </Link>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 border border-primary/40 px-3 py-1 text-xs font-semibold text-primary mb-4">
              {cs.industry}
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight mb-4">
              {cs.headline}
            </h1>
            <p className="fluid-lead text-muted-foreground mb-5">{cs.client}</p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground mb-8">
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} className="text-primary" /> Timeframe: {cs.duration}
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.05}>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 mb-10 shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
              <img
                src={cs.image}
                alt={cs.client}
                width={1280}
                height={720}
                loading="lazy"
                decoding="async"
                className="w-full h-auto block"
              />
              <div className="absolute inset-0 ring-1 ring-primary/20 rounded-2xl pointer-events-none" />
            </div>
          </AnimatedSection>

          {/* Highlight chips */}
          <AnimatedSection delay={0.08}>
            <div className="grid sm:grid-cols-3 gap-4 mb-12">
              {cs.highlights.map((h) => (
                <div
                  key={h}
                  className="rounded-2xl border border-primary/30 bg-primary/10 p-5 text-center"
                >
                  <TrendingUp className="mx-auto mb-2 text-primary" size={22} />
                  <p className="font-heading font-bold text-foreground text-lg">{h}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Before / After Stats */}
          <AnimatedSection delay={0.1}>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-5">
              Before vs After
            </h2>
            <div className="rounded-2xl border border-white/10 overflow-hidden mb-12">
              <div className="grid grid-cols-3 bg-white/[0.04] text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                <div className="px-4 py-3">Metric</div>
                <div className="px-4 py-3 text-center">Before</div>
                <div className="px-4 py-3 text-center text-primary">After</div>
              </div>
              {cs.stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`grid grid-cols-3 items-center text-sm sm:text-base ${
                    i % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
                  }`}
                >
                  <div className="px-4 py-4 font-medium text-foreground/90">{s.label}</div>
                  <div className="px-4 py-4 text-center text-muted-foreground">{s.before}</div>
                  <div className="px-4 py-4 text-center font-bold text-primary">{s.after}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Challenge */}
          <AnimatedSection delay={0.12}>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-4">
              The Challenge
            </h2>
            {cs.challenge.map((p, i) => (
              <p
                key={i}
                className="text-foreground/90 text-base sm:text-lg leading-relaxed mb-5"
              >
                {p}
              </p>
            ))}
          </AnimatedSection>

          {/* Approach */}
          <AnimatedSection delay={0.14}>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mt-8 mb-5">
              What We Did
            </h2>
            <div className="space-y-4 mb-10">
              {cs.approach.map((step, i) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-9 h-9 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center font-heading font-bold text-primary">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-foreground mb-1.5">
                        {step.title}
                      </p>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Results */}
          <AnimatedSection delay={0.16}>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-5">
              The Results
            </h2>
            <ul className="space-y-3 mb-10">
              {cs.results.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-primary shrink-0 mt-0.5"
                  />
                  <span className="text-foreground/90 text-base sm:text-lg leading-relaxed">
                    {r}
                  </span>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Testimonial */}
          <AnimatedSection delay={0.18}>
            <figure className="relative rounded-2xl border border-primary/30 bg-primary/10 p-6 sm:p-8 mb-12">
              <Quote className="absolute -top-3 -left-3 text-primary bg-background rounded-full p-1" size={32} />
              <blockquote className="text-lg sm:text-xl text-foreground/95 italic leading-relaxed">
                "{cs.testimonial.quote}"
              </blockquote>
              <figcaption className="mt-4 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {cs.testimonial.name}
                </span>{" "}
                — {cs.testimonial.role}
              </figcaption>
            </figure>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-heading font-bold text-lg text-foreground mb-1">
                  Want results like this for your business?
                </p>
                <p className="text-sm text-muted-foreground">
                  Pick the contact option below — I reply within 24 hours.
                </p>
              </div>
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-forest-dark rounded-full whitespace-nowrap"
              >
                <a href="#contact">
                  See Contact Options <ArrowRight size={14} className="ml-1" />
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </main>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
