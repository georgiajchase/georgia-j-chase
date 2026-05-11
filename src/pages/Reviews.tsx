import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import { reviews } from "@/data/reviews";
import { Star, BadgeCheck, ExternalLink, ArrowRight } from "lucide-react";

const GOOGLE_REVIEW_URL = "https://g.page/r/Ce6KgP9StDviEBM/review";

const StarRow = ({ value, size = 16 }: { value: number; size?: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        size={size}
        style={i <= value ? { color: "#f97316", fill: "#f97316" } : undefined}
        className={i <= value ? "" : "text-white/20"}
      />
    ))}
  </div>
);

const Reviews = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Client Reviews | Georgia J. Chase SEO Specialist"
        description="Real reviews from real businesses Georgia J. Chase has helped rank on Google."
        path="/reviews"
      />
      <Navbar />

      <section className="relative pt-32 pb-10 sm:pt-40 sm:pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <AnimatedSection>
            <p className="section-label mb-3">Reviews</p>
            <h1 className="section-title mb-5">
              Real Businesses. Real Results. Real Reviews.
            </h1>
            <p className="fluid-lead text-muted-foreground">
              Every quote below is from a paying client. Every number is verified. No fluff. No fabricated stories.
            </p>
          </AnimatedSection>

          <AnimatedSection className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-6 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <StarRow value={5} size={16} />
              <span className="text-white font-semibold">5.0 / 5.0</span>
              <span>from {reviews.length}+ verified clients</span>
            </div>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="inline-flex items-center gap-1.5 font-semibold" style={{ color: "#22c55e" }}>
              <BadgeCheck size={14} /> 100% Verified Reviews
            </span>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-5">
            {reviews.map((r, i) => (
              <AnimatedSection key={r.name + i} delay={i * 0.05}>
                <article
                  className="h-full"
                  style={{
                    backgroundColor: "#1a2f4a",
                    border: "1px solid rgba(34,197,94,0.2)",
                    borderRadius: "12px",
                    padding: "24px",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <StarRow value={r.rating} />
                    {r.verified && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: "#22c55e" }}>
                        <BadgeCheck size={14} /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-white leading-relaxed mb-4 text-[15px]">"{r.text}"</p>
                  <div className="pt-3 border-t border-white/10">
                    <p className="text-white font-bold text-sm">{r.name}</p>
                    <p className="text-white/50 text-xs">
                      {r.business} · {r.date}
                    </p>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Block 1: Google Review CTA */}
      <section className="bg-background pb-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div
              className="text-center mx-auto"
              style={{
                backgroundColor: "#1a2f4a",
                border: "1px solid #22c55e",
                borderRadius: "12px",
                padding: "32px",
                margin: "40px auto",
                maxWidth: "600px",
              }}
            >
              <Star size={32} className="mx-auto mb-3" style={{ color: "#22c55e", fill: "#22c55e" }} />
              <h2 className="text-white font-bold mb-3" style={{ fontSize: "22px" }}>
                Happy With Our Work?
              </h2>
              <p className="mb-6" style={{ color: "#94a3b8", fontSize: "15px" }}>
                Your review helps other business owners find us and tells Google we are the real deal. Takes 60 seconds.
              </p>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold google-review-btn"
                style={{
                  border: "2px solid #22c55e",
                  color: "#22c55e",
                  backgroundColor: "transparent",
                  padding: "12px 32px",
                  borderRadius: "30px",
                  transition: "all 0.2s",
                }}
              >
                Leave a Google Review <ExternalLink size={16} />
              </a>
              <p className="mt-3" style={{ color: "#94a3b8", fontSize: "12px" }}>
                Opens Google Reviews in a new tab.
              </p>
              <style>{`
                .google-review-btn:hover {
                  background-color: #22c55e !important;
                  color: #ffffff !important;
                }
              `}</style>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Block 2: Convert to lead */}
      <section style={{ backgroundColor: "#0d1f35", padding: "60px 24px", textAlign: "center" }}>
        <AnimatedSection>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-white font-bold mb-4" style={{ fontSize: "28px" }}>
              Ready to See Results Like These?
            </h2>
            <p className="mb-6" style={{ color: "#94a3b8", fontSize: "15px" }}>
              Send us your site. We go through it personally within 24 hours and tell you exactly what is holding it back.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 font-semibold w-full text-white"
              style={{
                maxWidth: "400px",
                backgroundColor: "#22c55e",
                padding: "14px 28px",
                borderRadius: "30px",
              }}
            >
              Get My Free Growth Audit <ArrowRight size={18} />
            </Link>
            <p className="mt-4" style={{ color: "#94a3b8", fontSize: "13px" }}>
              ✓ Free  ✓ Personal review by Georgia  ✓ Response within 24 hours  ✓ No obligation
            </p>
          </div>
        </AnimatedSection>
      </section>

      <Footer />
    </div>
  );
};

export default Reviews;
