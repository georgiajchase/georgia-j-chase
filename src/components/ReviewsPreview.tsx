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
              <article className="h-full rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-primary/30 p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} size={14} className={n <= r.rating ? "text-primary fill-primary" : "text-white/20"} />
                    ))}
                  </div>
                  {r.verified && (
                    <span className="inline-flex items-center gap-1 text-xs text-conversion font-semibold">
                      <BadgeCheck size={12} /> Verified
                    </span>
                  )}
                </div>
                <p className="text-white/85 leading-relaxed text-sm mb-4">"{r.text}"</p>
                <div className="pt-3 border-t border-white/10">
                  <p className="text-white font-semibold text-sm">{r.name}</p>
                  <p className="text-white/50 text-xs">{r.business}</p>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 rounded-full bg-conversion text-conversion-foreground hover:bg-conversion-dark px-6 py-3 font-semibold transition-all"
          >
            Read All Reviews <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ReviewsPreview;
