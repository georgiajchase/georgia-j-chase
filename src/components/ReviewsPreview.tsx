import { Link } from "react-router-dom";
import { Star, BadgeCheck, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { reviews } from "@/data/reviews";

const ReviewsPreview = () => {
  const top = reviews.slice(0, 3);
  return (
    <section className="py-14 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10">
          <p className="section-label mb-3">Reviews</p>
          <h2 className="section-title mb-4">What Clients Are Saying</h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {top.map((r, i) => (
            <AnimatedSection key={r.name + i} delay={i * 0.08}>
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
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        size={14}
                        style={n <= r.rating ? { color: "#f97316", fill: "#f97316" } : undefined}
                        className={n <= r.rating ? "" : "text-white/20"}
                      />
                    ))}
                  </div>
                  {r.verified && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: "#22c55e" }}>
                      <BadgeCheck size={12} /> Verified
                    </span>
                  )}
                </div>
                <p className="text-white leading-relaxed text-sm mb-4">"{r.text}"</p>
                <div className="pt-3 border-t border-white/10">
                  <p className="text-white font-bold text-sm">{r.name}</p>
                  <p className="text-white/50 text-xs">{r.business} · {r.date}</p>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 text-primary font-semibold text-base hover:underline underline-offset-4"
          >
            Read all reviews <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ReviewsPreview;
