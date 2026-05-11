import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import { reviews } from "@/data/reviews";
import { Star, BadgeCheck, CheckCircle2, ExternalLink } from "lucide-react";

const FORMSPREE = "https://formspree.io/f/mpqbolyq";
const GOOGLE_REVIEW_URL = "https://g.page/r/Ce6KgP9StDviEBM/review";

const StarRow = ({ value }: { value: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        size={16}
        style={i <= value ? { color: "#f97316", fill: "#f97316" } : undefined}
        className={i <= value ? "" : "text-white/20"}
      />
    ))}
  </div>
);

const Reviews = () => {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const timeoutId = setTimeout(() => {
      setLoading(false);
      setStatus("error");
    }, 8000);

    try {
      const response = await fetch(FORMSPREE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          form_source: "Review Submission",
          reviewer_name: name,
          business_or_website: business,
          star_rating: rating + " stars",
          review_text: reviewText,
        }),
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      clearTimeout(timeoutId);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Client Reviews | Georgia J. Chase SEO Specialist"
        description="Real reviews from real businesses Georgia J. Chase has helped rank on Google."
        path="/reviews"
      />
      <Navbar />

      <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <AnimatedSection>
            <p className="section-label mb-3">Reviews</p>
            <h1 className="section-title mb-5">What Clients Say</h1>
            <p className="fluid-lead text-muted-foreground">
              Real results from real business owners.
            </p>
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

      <section className="py-16 bg-[#0a0f1e]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <AnimatedSection>
            <div
              className="text-center mb-10 rounded-2xl p-6 sm:p-8"
              style={{ backgroundColor: "#1a2f4a", border: "1px solid rgba(34,197,94,0.2)" }}
            >
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-3">
                Happy With Our Work?
              </h2>
              <p className="text-white/70 mb-5">
                Leave us a Google review and help other business owners find us.
              </p>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-colors"
                style={{
                  border: "2px solid #22c55e",
                  color: "#22c55e",
                  backgroundColor: "transparent",
                }}
              >
                Leave a Google Review <ExternalLink size={16} />
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection className="text-center mb-8">
            <p className="section-label mb-3">Share Your Experience</p>
            <h2 className="section-title">Submit Your Review</h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            {status === "success" ? (
              <div
                className="rounded-2xl p-8 text-center"
                style={{ backgroundColor: "rgba(34,197,94,0.1)", border: "1px solid #22c55e" }}
              >
                <CheckCircle2 size={56} className="mx-auto mb-4" style={{ color: "#22c55e" }} />
                <h3 className="font-heading font-bold text-2xl text-white mb-3">
                  Thank You for Your Review!
                </h3>
                <p className="text-white/80">
                  We appreciate you sharing your experience. Georgia will read this personally.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleReviewSubmit}
                className="space-y-4 rounded-2xl bg-white/[0.03] border border-primary/30 p-6 sm:p-8 backdrop-blur-xl"
              >
                <div>
                  <label className="block text-sm font-medium text-white mb-1.5">Your Name *</label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg bg-background/50 border border-white/10 px-4 py-2.5 text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1.5">Your Business or Website *</label>
                  <input
                    required
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                    className="w-full rounded-lg bg-background/50 border border-white/10 px-4 py-2.5 text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                    placeholder="acme.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1.5">Star Rating *</label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setRating(n)}
                        className="transition-transform hover:scale-110"
                        aria-label={`${n} stars`}
                      >
                        <Star
                          size={28}
                          style={n <= rating ? { color: "#f97316", fill: "#f97316" } : undefined}
                          className={n <= rating ? "" : "text-white/20"}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1.5">Your Review *</label>
                  <textarea
                    required
                    rows={5}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full rounded-lg bg-background/50 border border-white/10 px-4 py-2.5 text-white placeholder:text-white/40 focus:border-primary focus:outline-none resize-none"
                    placeholder="Tell others about your experience working with Georgia..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-conversion text-conversion-foreground hover:bg-conversion-dark px-6 py-3 font-semibold transition-all disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send My Review"}
                </button>
                {status === "error" && (
                  <p className="text-center text-sm" style={{ color: "#ef4444" }}>
                    Something went wrong. Please email your review directly to chasegeorgiaj@gmail.com
                  </p>
                )}
              </form>
            )}
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Reviews;
